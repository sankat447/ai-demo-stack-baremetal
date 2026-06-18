/**
 * Sunbird dcTrack & Power IQ MCP Server - Fixed Edition
 * Handles 308 redirect issues with proper URL normalization
 */

const http = require("http");
const https = require("https");
const fs = require("fs");

// Configuration - strip https:// prefix if present
const stripProtocol = (url) => url ? url.replace(/^https?:\/\//, '') : url;
const POWERIQ_URL = stripProtocol(process.env.POWERIQ_URL || process.env.POWERIQ_BASE_URL || "192.168.200.201");
const DCTRACK_URL = stripProtocol(process.env.DCTRACK_URL || process.env.DCTRACK_BASE_URL || "192.168.200.202");
const AUTH = process.env.AUTH_HEADER || "Basic QVBJOn4hVW5pdmVyc2FsMQ==";
const PORT = process.env.PORT || 8080;

console.log(`Config: DCTRACK=${DCTRACK_URL}, POWERIQ=${POWERIQ_URL}`);

// Tool definitions
const TOOLS = [
  { name: "dctrack_list_locations", description: "List all locations from dcTrack", agent: "dctrack" },
  { name: "dctrack_get_location", description: "Get location by ID", agent: "dctrack" },
  { name: "dctrack_create_location", description: "Create a new location", agent: "dctrack" },
  { name: "dctrack_list_items", description: "List items (cabinets, devices, etc.)", agent: "dctrack" },
  { name: "dctrack_search_items", description: "Search items with filters", agent: "dctrack" },
  { name: "dctrack_get_item", description: "Get item by ID", agent: "dctrack" },
  { name: "dctrack_create_item", description: "Create a new item", agent: "dctrack" },
  { name: "dctrack_update_item", description: "Update an existing item", agent: "dctrack" },
  { name: "dctrack_delete_item", description: "Delete an item", agent: "dctrack" },
  { name: "dctrack_list_cabinets", description: "List all cabinets", agent: "dctrack" },
  { name: "dctrack_get_cabinet_capacity", description: "Get cabinet capacity and U space", agent: "dctrack" },
  { name: "dctrack_list_models", description: "List all models/makes", agent: "dctrack" },
  { name: "dctrack_get_model", description: "Get model by ID", agent: "dctrack" },
  { name: "dctrack_list_power_ports", description: "List power ports for an item", agent: "dctrack" },
  { name: "dctrack_list_data_ports", description: "List data ports for an item", agent: "dctrack" },
  { name: "dctrack_create_power_connection", description: "Create power connection", agent: "dctrack" },
  { name: "dctrack_create_data_connection", description: "Create data connection", agent: "dctrack" },
  { name: "poweriq_list_pdus", description: "List PDUs from Power IQ", agent: "poweriq" },
  { name: "poweriq_get_pdu", description: "Get PDU by ID", agent: "poweriq" },
  { name: "poweriq_list_outlets", description: "List outlets for a PDU", agent: "poweriq" },
  { name: "poweriq_get_readings", description: "Get power readings", agent: "poweriq" },
  { name: "poweriq_list_sensors", description: "List environmental sensors", agent: "poweriq" },
  { name: "poweriq_get_sensor_readings", description: "Get sensor readings", agent: "poweriq" },
  { name: "poweriq_list_alerts", description: "List active alerts", agent: "poweriq" },
  { name: "poweriq_get_pue", description: "Get PUE data", agent: "poweriq" },
  { name: "dcim_get_rack_summary", description: "Get full rack summary with power and thermal", agent: "combined" },
  { name: "dcim_find_capacity", description: "Find available capacity", agent: "combined" },
  { name: "dcim_get_health_status", description: "Get overall health status", agent: "combined" }
];

// HTTP request helper for dcTrack
function dctrackRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    console.log(`[dcTrack] ${method} ${path}`);
    const options = {
      hostname: DCTRACK_URL,
      port: 443,
      path: path,
      method: method,
      rejectUnauthorized: false,
      headers: {
        "Authorization": AUTH,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        console.log(`[dcTrack] Response: ${res.statusCode} (${data.length} bytes)`);
        try {
          // Handle empty response
          if (!data || data.trim() === "") {
            resolve({ status: res.statusCode, data: {} });
            return;
          }
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          // Return raw data if not JSON
          console.log(`[dcTrack] Non-JSON response: ${data.substring(0, 200)}`);
          resolve({ status: res.statusCode, data: { raw: data } });
        }
      });
    });

    req.on("error", (e) => {
      console.error(`[dcTrack] Error: ${e.message}`);
      reject(new Error(`dcTrack request failed: ${e.message}`));
    });

    if (body) {
      const bodyStr = JSON.stringify(body);
      console.log(`[dcTrack] Body: ${bodyStr.substring(0, 200)}`);
      req.write(bodyStr);
    }
    req.end();
  });
}

// HTTP request helper for Power IQ
function poweriqRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: POWERIQ_URL,
      port: 443,
      path: path,
      method: method,
      rejectUnauthorized: false,
      headers: {
        "Authorization": AUTH,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          if (!data || data.trim() === "") {
            resolve({ status: res.statusCode, data: {} });
            return;
          }
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: { raw: data } });
        }
      });
    });

    req.on("error", (e) => {
      reject(new Error(`Power IQ request failed: ${e.message}`));
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Tool handlers
const toolHandlers = {
  // ==================== dcTrack Locations ====================
  dctrack_list_locations: async (args) => {
    const pageSize = args.pageSize || 100;
    const page = args.page || 1;
    const body = {
      columns: [
        { name: "tiLocationName", filter: { contains: args.filter || "" } }
      ],
      selectedColumns: [
        { name: "id" },
        { name: "tiLocationName" },
        { name: "tiLocationType" },
        { name: "tiLocationArea" },
        { name: "tiLocationParent" }
      ],
      pageNumber: page,
      pageSize: pageSize
    };
    return await dctrackRequest("POST", "/api/v2/dcimoperations/locations/quicksearch", body);
  },

  dctrack_get_location: async (args) => {
    if (!args.id) throw new Error("Location ID required");
    return await dctrackRequest("GET", `/api/v2/dcimoperations/locations/${args.id}`);
  },

  dctrack_create_location: async (args) => {
    if (!args.name) throw new Error("Location name required");
    const body = {
      tiLocationName: args.name,
      tiLocationType: args.type || "Room",
      tiLocationParent: args.parent || null,
      tiLocationArea: args.area || null
    };
    return await dctrackRequest("POST", "/api/v2/dcimoperations/locations", body);
  },

  // ==================== dcTrack Items ====================
  dctrack_list_items: async (args) => {
    const body = {
      columns: [],
      selectedColumns: [
        { name: "id" },
        { name: "tiName" },
        { name: "tiClass" },
        { name: "cmbLocation" },
        { name: "cmbCabinet" },
        { name: "tiMake" },
        { name: "tiModel" },
        { name: "cmbUPosition" },
        { name: "tiSerialNumber" },
        { name: "tiAssetTag" }
      ],
      pageNumber: args.page || 1,
      pageSize: args.pageSize || 100
    };
    
    // Add filters if provided
    if (args.class) {
      body.columns.push({ name: "tiClass", filter: { eq: args.class } });
    }
    if (args.location) {
      body.columns.push({ name: "cmbLocation", filter: { contains: args.location } });
    }
    if (args.cabinet) {
      body.columns.push({ name: "cmbCabinet", filter: { contains: args.cabinet } });
    }
    if (args.name) {
      body.columns.push({ name: "tiName", filter: { contains: args.name } });
    }
    
    return await dctrackRequest("POST", "/api/v2/dcimoperations/items/quicksearch", body);
  },

  dctrack_search_items: async (args) => {
    return await toolHandlers.dctrack_list_items(args);
  },

  dctrack_get_item: async (args) => {
    if (!args.id) throw new Error("Item ID required");
    return await dctrackRequest("GET", `/api/v2/dcimoperations/items/${args.id}`);
  },

  dctrack_create_item: async (args) => {
    if (!args.name) throw new Error("Item name required");
    const body = {
      tiName: args.name,
      tiClass: args.class || "Device",
      cmbLocation: args.location,
      cmbCabinet: args.cabinet,
      cmbMake: args.make,
      cmbModel: args.model,
      cmbUPosition: args.uPosition,
      tiSerialNumber: args.serialNumber,
      tiAssetTag: args.assetTag
    };
    // Remove null/undefined fields
    Object.keys(body).forEach(key => body[key] == null && delete body[key]);
    return await dctrackRequest("POST", "/api/v2/dcimoperations/items", body);
  },

  dctrack_update_item: async (args) => {
    if (!args.id) throw new Error("Item ID required");
    return await dctrackRequest("PUT", `/api/v2/dcimoperations/items/${args.id}`, args.data || args);
  },

  dctrack_delete_item: async (args) => {
    if (!args.id) throw new Error("Item ID required");
    return await dctrackRequest("DELETE", `/api/v2/dcimoperations/items/${args.id}`);
  },

  // ==================== dcTrack Cabinets ====================
  dctrack_list_cabinets: async (args) => {
    const modArgs = { ...args, class: "Cabinet" };
    return await toolHandlers.dctrack_list_items(modArgs);
  },

  dctrack_get_cabinet_capacity: async (args) => {
    if (!args.id && !args.name) throw new Error("Cabinet ID or name required");
    
    let cabinetId = args.id;
    if (!cabinetId && args.name) {
      // Search for cabinet by name
      const searchResult = await toolHandlers.dctrack_list_items({ name: args.name, class: "Cabinet" });
      if (searchResult.data?.searchResults?.items?.length > 0) {
        cabinetId = searchResult.data.searchResults.items[0].id;
      } else {
        throw new Error(`Cabinet not found: ${args.name}`);
      }
    }
    
    return await dctrackRequest("GET", `/api/v2/dcimoperations/items/${cabinetId}/cabinet-space`);
  },

  // ==================== dcTrack Models ====================
  dctrack_list_models: async (args) => {
    const body = {
      columns: [],
      selectedColumns: [
        { name: "id" },
        { name: "cmbMake" },
        { name: "tiModel" },
        { name: "tiClass" },
        { name: "tiUHeight" },
        { name: "tiWeight" },
        { name: "tiPowerBudget" }
      ],
      pageNumber: args.page || 1,
      pageSize: args.pageSize || 100
    };
    
    if (args.make) {
      body.columns.push({ name: "cmbMake", filter: { contains: args.make } });
    }
    if (args.class) {
      body.columns.push({ name: "tiClass", filter: { eq: args.class } });
    }
    
    return await dctrackRequest("POST", "/api/v2/dcimoperations/models/quicksearch", body);
  },

  dctrack_get_model: async (args) => {
    if (!args.id) throw new Error("Model ID required");
    return await dctrackRequest("GET", `/api/v2/dcimoperations/models/${args.id}`);
  },

  // ==================== dcTrack Ports & Connections ====================
  dctrack_list_power_ports: async (args) => {
    if (!args.itemId) throw new Error("Item ID required");
    return await dctrackRequest("GET", `/api/v2/dcimoperations/items/${args.itemId}/powerports`);
  },

  dctrack_list_data_ports: async (args) => {
    if (!args.itemId) throw new Error("Item ID required");
    return await dctrackRequest("GET", `/api/v2/dcimoperations/items/${args.itemId}/dataports`);
  },

  dctrack_create_power_connection: async (args) => {
    if (!args.sourcePortId || !args.destPortId) throw new Error("Source and destination port IDs required");
    const body = {
      sourcePortId: args.sourcePortId,
      destinationPortId: args.destPortId,
      cableColor: args.cableColor || "Black"
    };
    return await dctrackRequest("POST", "/api/v2/dcimoperations/connections/power", body);
  },

  dctrack_create_data_connection: async (args) => {
    if (!args.sourcePortId || !args.destPortId) throw new Error("Source and destination port IDs required");
    const body = {
      sourcePortId: args.sourcePortId,
      destinationPortId: args.destPortId,
      mediaType: args.mediaType || "CAT6",
      cableColor: args.cableColor || "Blue"
    };
    return await dctrackRequest("POST", "/api/v2/dcimoperations/connections/data", body);
  },

  // ==================== Power IQ ====================
  poweriq_list_pdus: async (args) => {
    return await poweriqRequest("GET", "/api/v2/pdus");
  },

  poweriq_get_pdu: async (args) => {
    if (!args.id) throw new Error("PDU ID required");
    return await poweriqRequest("GET", `/api/v2/pdus/${args.id}`);
  },

  poweriq_list_outlets: async (args) => {
    if (!args.pduId) throw new Error("PDU ID required");
    return await poweriqRequest("GET", `/api/v2/pdus/${args.pduId}/outlets`);
  },

  poweriq_get_readings: async (args) => {
    const path = args.pduId 
      ? `/api/v2/pdus/${args.pduId}/readings` 
      : "/api/v2/readings/active_power";
    return await poweriqRequest("GET", path);
  },

  poweriq_list_sensors: async (args) => {
    return await poweriqRequest("GET", "/api/v2/sensors");
  },

  poweriq_get_sensor_readings: async (args) => {
    if (!args.sensorId) throw new Error("Sensor ID required");
    return await poweriqRequest("GET", `/api/v2/sensors/${args.sensorId}/readings`);
  },

  poweriq_list_alerts: async (args) => {
    const severity = args.severity ? `?severity=${args.severity}` : "";
    return await poweriqRequest("GET", `/api/v2/alerts/active${severity}`);
  },

  poweriq_get_pue: async (args) => {
    return await poweriqRequest("GET", "/api/v2/pue");
  },

  // ==================== Combined/DCIM Tools ====================
  dcim_get_rack_summary: async (args) => {
    if (!args.cabinetId && !args.cabinetName) throw new Error("Cabinet ID or name required");
    
    let cabinetId = args.cabinetId;
    if (!cabinetId && args.cabinetName) {
      const searchResult = await toolHandlers.dctrack_list_items({ name: args.cabinetName, class: "Cabinet" });
      if (searchResult.data?.searchResults?.items?.length > 0) {
        cabinetId = searchResult.data.searchResults.items[0].id;
      } else {
        throw new Error(`Cabinet not found: ${args.cabinetName}`);
      }
    }
    
    const [itemDetails, capacity, items] = await Promise.all([
      dctrackRequest("GET", `/api/v2/dcimoperations/items/${cabinetId}`),
      dctrackRequest("GET", `/api/v2/dcimoperations/items/${cabinetId}/cabinet-space`),
      toolHandlers.dctrack_list_items({ cabinet: args.cabinetName || cabinetId.toString() })
    ]);
    
    return {
      status: 200,
      data: {
        cabinet: itemDetails.data,
        capacity: capacity.data,
        items: items.data?.searchResults?.items || []
      }
    };
  },

  dcim_find_capacity: async (args) => {
    const requiredU = args.requiredU || 1;
    const requiredPower = args.requiredPowerKw || 0;
    
    const cabinets = await toolHandlers.dctrack_list_cabinets({ pageSize: 500 });
    const availableCabinets = [];
    
    for (const cabinet of (cabinets.data?.searchResults?.items || []).slice(0, 20)) {
      try {
        const capacity = await dctrackRequest("GET", `/api/v2/dcimoperations/items/${cabinet.id}/cabinet-space`);
        const availableU = capacity.data?.availableUs || 0;
        if (availableU >= requiredU) {
          availableCabinets.push({
            id: cabinet.id,
            name: cabinet.tiName,
            location: cabinet.cmbLocation,
            availableU: availableU,
            totalU: capacity.data?.totalUs || 42
          });
        }
      } catch (e) {
        // Skip cabinets we can't get capacity for
      }
    }
    
    return {
      status: 200,
      data: {
        requiredU,
        requiredPowerKw: requiredPower,
        availableCabinets: availableCabinets.sort((a, b) => b.availableU - a.availableU)
      }
    };
  },

  dcim_get_health_status: async (args) => {
    const [alerts, pue] = await Promise.all([
      poweriqRequest("GET", "/api/v2/alerts/active").catch(() => ({ data: { alerts: [] } })),
      poweriqRequest("GET", "/api/v2/pue").catch(() => ({ data: {} }))
    ]);
    
    return {
      status: 200,
      data: {
        activeAlerts: alerts.data?.alerts?.length || 0,
        criticalAlerts: (alerts.data?.alerts || []).filter(a => a.severity === "critical").length,
        pue: pue.data?.current_pue || null,
        status: (alerts.data?.alerts || []).some(a => a.severity === "critical") ? "critical" : "healthy"
      }
    };
  }
};

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // CRITICAL FIX: Normalize URL - remove trailing slash and handle case
  let url = req.url || "/";
  url = url.split("?")[0]; // Remove query string
  url = url.replace(/\/+$/, "") || "/"; // Remove trailing slashes

  console.log(`[${new Date().toISOString()}] ${req.method} ${url}`);

  // Health check
  if (url === "/health" && req.method === "GET") {
    res.end(JSON.stringify({ status: "healthy", tools: TOOLS.length, timestamp: new Date().toISOString() }));
    return;
  }

  // List tools
  if (url === "/tools" && req.method === "GET") {
    res.end(JSON.stringify({ tools: TOOLS }));
    return;
  }

  // Object types reference
  if (url === "/object-types" && req.method === "GET") {
    res.end(JSON.stringify({
      itemClasses: ["Device", "Network", "Data Panel", "Cabinet", "Rack PDU", "Floor PDU", "UPS", "CRAC", "Probe", "Passive"],
      locationTypes: ["Site", "Building", "Floor", "Room", "Zone"],
      connectionTypes: ["Power", "Data"]
    }));
    return;
  }

  // Direct tool invocation: POST /tools/{toolName} or POST /tool/{toolName}
  const toolMatch = url.match(/^\/tools?\/([a-zA-Z0-9_]+)$/);
  if (toolMatch && req.method === "POST") {
    const toolName = toolMatch[1];
    let body = "";
    
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const args = body ? JSON.parse(body) : {};
        
        if (toolHandlers[toolName]) {
          try {
            const result = await toolHandlers[toolName](args);
            res.writeHead(result.status || 200);
            res.end(JSON.stringify(result.data));
          } catch (err) {
            console.error(`Tool error [${toolName}]:`, err.message);
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
          }
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: `Tool not found: ${toolName}`, availableTools: TOOLS.map(t => t.name) }));
        }
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      }
    });
    return;
  }

  // MCP JSON-RPC endpoint
  if (url === "/mcp" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const request = JSON.parse(body);
        
        // Handle tools/list
        if (request.method === "tools/list") {
          res.end(JSON.stringify({
            jsonrpc: "2.0",
            id: request.id,
            result: {
              tools: TOOLS.map(t => ({
                name: t.name,
                description: t.description,
                inputSchema: { type: "object", properties: {} }
              }))
            }
          }));
          return;
        }

        // Handle tools/call
        if (request.method === "tools/call") {
          const toolName = request.params?.name;
          const args = request.params?.arguments || {};
          
          if (toolHandlers[toolName]) {
            try {
              const result = await toolHandlers[toolName](args);
              res.end(JSON.stringify({
                jsonrpc: "2.0",
                id: request.id,
                result: {
                  content: [{ type: "text", text: JSON.stringify(result.data, null, 2) }]
                }
              }));
            } catch (err) {
              res.end(JSON.stringify({
                jsonrpc: "2.0",
                id: request.id,
                error: { code: -32000, message: err.message }
              }));
            }
          } else {
            res.end(JSON.stringify({
              jsonrpc: "2.0",
              id: request.id,
              error: { code: -32601, message: `Tool not found: ${toolName}` }
            }));
          }
          return;
        }

        // Unknown method
        res.end(JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          error: { code: -32601, message: "Method not found" }
        }));
        
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // Fallback 404
  res.writeHead(404);
  res.end(JSON.stringify({ 
    error: "Not found", 
    path: url,
    availableEndpoints: ["/health", "/tools", "/mcp", "/tools/{toolName}", "/object-types"]
  }));
});

// Start server
server.listen(PORT, () => {
  console.log("═".repeat(60));
  console.log("  Sunbird dcTrack & Power IQ MCP Server - Fixed Edition");
  console.log("═".repeat(60));
  console.log(`  Port:        ${PORT}`);
  console.log(`  Power IQ:    ${POWERIQ_URL}`);
  console.log(`  dcTrack:     ${DCTRACK_URL}`);
  console.log(`  Tools:       ${TOOLS.length}`);
  console.log("─".repeat(60));
  console.log("  Endpoints:");
  console.log("    GET  /health         - Health check");
  console.log("    GET  /tools          - List all tools");
  console.log("    GET  /object-types   - Object type reference");
  console.log("    POST /tools/:name    - Direct tool invocation");
  console.log("    POST /mcp            - MCP JSON-RPC endpoint");
  console.log("═".repeat(60));
});
