/**
 * dcTrack REST API client.
 *
 * Encapsulates every dcTrack v2 API call used by the MCP tools.
 * Read operations are cached; write operations bypass the cache.
 */
import { BaseClient } from './base-client.js';
import { config } from '../../config/index.js';
import { logger } from '../logger.js';
export class DcTrackClient extends BaseClient {
    /** Pagination metadata from the last quicksearch call */
    _lastSearchMeta = {
        totalRows: -1, pageNumber: 0, pageSize: 0,
    };
    /** Get pagination metadata from the most recent quicksearch call */
    get lastSearchMeta() { return { ...this._lastSearchMeta }; }
    /** Track pagination metadata from a quicksearch API response */
    trackSearchMeta(res, pageSize) {
        this._lastSearchMeta = {
            totalRows: typeof res.totalRows === 'number' ? res.totalRows : -1,
            pageNumber: typeof res.pageNumber === 'number' ? res.pageNumber : 0,
            pageSize,
        };
    }
    constructor() {
        super('dctrack', '/api/v2', config.sunbird.dctrackBaseUrl);
    }
    // =======================================================================
    // READ OPERATIONS
    // =======================================================================
    async listLocations(params) {
        // dcTrack uses v1 API for locations list
        const res = await this.get('/../v1/locations', params);
        return res.locations ?? res.data ?? [];
    }
    async getLocation(locationId) {
        const res = await this.get(`/../v1/locations/${locationId}`);
        return res.location ?? res;
    }
    async listCabinets(params) {
        // dcTrack has no dedicated cabinets endpoint — use quicksearch with class filter
        const columns = [
            { name: 'tiClass', filter: { eq: 'Cabinet' } },
        ];
        if (params?.location) {
            columns.push({ name: 'tiMultiField', filter: { eq: params.location } });
        }
        else if (params?.locationId) {
            columns.push({ name: 'cmbLocation', filter: { eq: String(params.locationId) } });
        }
        const pageSize = params?.pageSize ?? 1000;
        const url = `/quicksearch/items?pageNumber=${params?.pageNumber ?? 0}&pageSize=${pageSize}`;
        const res = await this.post(url, {
            columns,
            selectedColumns: [
                { name: 'id' }, { name: 'tiName' }, { name: 'cmbLocation' }, { name: 'cmbStatus' },
                { name: 'cmbModel' }, { name: 'cmbMake' }, { name: 'tiRUs' },
            ],
        });
        this.trackSearchMeta(res, pageSize);
        return res.searchResults?.items ?? res.items ?? [];
    }
    async getCabinet(cabinetId) {
        // Get cabinet details via quicksearch by ID
        const res = await this.post('/quicksearch/items?pageSize=1', {
            columns: [{ name: 'id', filter: { eq: String(cabinetId) } }],
            selectedColumns: [
                { name: 'tiName' }, { name: 'cmbLocation' }, { name: 'cmbStatus' },
                { name: 'tiRUs' }, { name: 'cmbMake' }, { name: 'cmbModel' },
            ],
        });
        const items = res.searchResults?.items ?? [];
        return items[0] ?? null;
    }
    async getCabinetItems(cabinetId) {
        const res = await this.get(`/items/cabinetItems/${cabinetId}`);
        return res.cabinetItems ?? res.items ?? res.data ?? [];
    }
    async getCabinetCapacity(cabinetId) {
        // Build capacity from cabinet details + installed items count
        const cabinet = await this.getCabinet(cabinetId);
        if (!cabinet)
            return null;
        const items = await this.getCabinetItems(cabinetId);
        const totalRu = Number(cabinet.ruHeight) || 42;
        // Only count racked items (skip ZeroU-mounted items like PDUs which span full cabinet)
        const rackedItems = items.filter((item) => {
            const mounting = (item.mounting || '').toLowerCase();
            return mounting !== 'zerou' && mounting !== 'zero u';
        });
        const usedRu = rackedItems.reduce((sum, item) => sum + (Number(item.tiRackUnits) || 0), 0);
        const availableRu = totalRu - usedRu;
        const zeroUItems = items.length - rackedItems.length;
        return {
            cabinetId,
            totalRu,
            usedRu,
            availableRu,
            ratedPowerKw: 0,
            spaceUtilizationPercent: totalRu > 0 ? Math.round((usedRu / totalRu) * 100) : 0,
            installedItems: items.length,
            rackedItems: rackedItems.length,
            zeroUItems,
        };
    }
    async getCabinetUMap(cabinetId) {
        const cabinet = await this.getCabinet(cabinetId);
        if (!cabinet)
            throw new Error(`Cabinet ${cabinetId} not found`);
        const totalRu = Number(cabinet.ruHeight) || 42;
        const cabinetName = cabinet.tiName || String(cabinetId);
        const items = await this.getCabinetItems(cabinetId);
        // Build U-position map: for each racked item, mark the U positions it occupies
        const uMap = {};
        const zeroUList = [];
        for (const it of items) {
            const mounting = it.mounting || '';
            if (mounting.toLowerCase() === 'zerou' || mounting.toLowerCase() === 'zero u') {
                zeroUList.push({
                    item: it.tiName || '?',
                    class: it.className || '?',
                    make: it.cmbMake || '',
                    model: it.cmbModel || '',
                    mounting,
                });
                continue;
            }
            const startU = Number(it.cmbUPosition) || 0;
            const ruHeight = Number(it.tiRackUnits) || 1;
            const railsUsed = it.radioRailsUsed || 'Both';
            if (startU <= 0)
                continue;
            for (let u = startU; u < startU + ruHeight && u <= totalRu; u++) {
                uMap[u] = {
                    item: it.tiName || '?',
                    class: it.className || '?',
                    make: it.cmbMake || '',
                    model: it.cmbModel || '',
                    mounting,
                    side: railsUsed,
                };
            }
        }
        // Build ordered array from U1 to U(totalRu)
        const positions = [];
        let usedCount = 0;
        for (let u = totalRu; u >= 1; u--) {
            const occupied = uMap[u];
            if (occupied) {
                usedCount++;
                positions.push({
                    uPosition: `U${u}`,
                    status: 'Occupied',
                    itemName: occupied.item,
                    class: occupied.class,
                    make: occupied.make,
                    model: occupied.model,
                    mounting: occupied.mounting,
                    side: occupied.side,
                });
            }
            else {
                positions.push({
                    uPosition: `U${u}`,
                    status: 'Available',
                    itemName: '',
                    class: '',
                    make: '',
                    model: '',
                    mounting: '',
                    side: '',
                });
            }
        }
        return {
            cabinetName,
            cabinetId,
            totalRu,
            usedRu: usedCount,
            availableRu: totalRu - usedCount,
            zeroUItems: zeroUList,
            positions,
        };
    }
    async searchItems(params) {
        // Build quicksearch v2 payload using the correct column/filter format
        const columns = [];
        if (params.name)
            columns.push({ name: 'tiName', filter: { eq: params.name } });
        else if (params.query)
            columns.push({ name: 'tiMultiField', filter: { eq: params.query } });
        if (params.class)
            columns.push({ name: 'tiClass', filter: { eq: params.class } });
        if (params.status)
            columns.push({ name: 'cmbStatus', filter: { eq: params.status } });
        if (params.location)
            columns.push({ name: 'tiMultiField', filter: { eq: params.location } });
        else if (params.locationId)
            columns.push({ name: 'cmbLocation', filter: { eq: String(params.locationId) } });
        const pageSize = params.pageSize ?? 1000;
        const url = `/quicksearch/items?pageNumber=${params.pageNumber ?? 0}&pageSize=${pageSize}`;
        const res = await this.post(url, {
            columns,
            selectedColumns: [
                { name: 'id' }, { name: 'tiName' }, { name: 'cmbLocation' }, { name: 'cmbCabinet' },
                { name: 'tiClass' }, { name: 'cmbStatus' }, { name: 'tiSerialNumber' },
                { name: 'cmbMake' }, { name: 'cmbModel' }, { name: 'tiRUs' },
            ],
        });
        this.trackSearchMeta(res, pageSize);
        return res.searchResults?.items ?? res.items ?? [];
    }
    async getItem(itemId) {
        const res = await this.get(`/dcimoperations/items/${itemId}`);
        return res.item ?? res;
    }
    async listConnections(params) {
        if (!params?.itemId) {
            // No list-all-connections endpoint exists; return helpful message
            return [];
        }
        // Get connections for a specific item by fetching its data ports (which include connection info)
        const dataPorts = await this.listDataPorts(params.itemId);
        const powerPorts = await this.listPowerPorts(params.itemId);
        const connections = [];
        for (const port of [...dataPorts, ...powerPorts]) {
            if (port.connectedToItemId || port.connectedPortId) {
                connections.push({
                    id: port.portId ?? port.id,
                    sourceItemName: String(params.itemId),
                    sourcePortName: port.portName ?? port.name,
                    destItemName: port.connectedToItemName ?? '',
                    destPortName: port.connectedPortName ?? '',
                    connectionType: port.portType ?? 'data',
                });
            }
        }
        return connections;
    }
    async getConnection(connectionId) {
        // Try data connection first, then power connection
        try {
            const res = await this.get(`/connections/dataconnections/${connectionId}`);
            return res.dataConnection ?? res.connection ?? res;
        }
        catch {
            try {
                const res = await this.get(`/connections/powerconnections/${connectionId}`);
                return res.powerConnection ?? res.connection ?? res;
            }
            catch {
                return null;
            }
        }
    }
    async listModels(params) {
        // No dedicated list endpoint — use quicksearch/models
        const columns = [];
        if (params?.query)
            columns.push({ name: 'model', filter: { eq: params.query } });
        if (params?.class)
            columns.push({ name: 'class', filter: { eq: params.class } });
        if (params?.make)
            columns.push({ name: 'make', filter: { eq: params.make } });
        const pageSize = params?.pageSize ?? 1000;
        const url = `/quicksearch/models?pageNumber=0&pageSize=${pageSize}`;
        const res = await this.post(url, {
            columns,
            selectedColumns: [{ name: 'model' }, { name: 'make' }, { name: 'class' }, { name: 'mounting' }, { name: 'formFactor' }, { name: 'ruHeight' }],
        });
        this.trackSearchMeta(res, pageSize);
        return res.searchResults?.models ?? res.models ?? [];
    }
    async getModel(modelId) {
        const res = await this.get(`/models/${modelId}?usedCounts=true`);
        return res.model ?? res;
    }
    // =======================================================================
    // WRITE OPERATIONS
    // =======================================================================
    async createItem(item) {
        const payload = { tiName: item.tiName, tiClass: item.tiClass };
        // Make and Model — dcTrack requires these for most item classes
        if (item.make)
            payload.cmbMake = item.make;
        if (item.model)
            payload.cmbModel = item.model;
        if (item.modelId)
            payload.cmbModel = item.modelId;
        // Resolve cabinet: accept cabinetName (string) or cabinetId (number)
        // dcTrack's cmbCabinet field expects the cabinet name string, not an ID
        let resolvedCabinetName;
        let resolvedLocation = item.cmbLocation;
        // Resolve locationName to full location path if no cmbLocation provided
        if (!resolvedLocation && item.locationName) {
            try {
                const locs = await this.listLocations();
                const query = item.locationName.toLowerCase().replace(/[-_\s]+/g, ' ').trim();
                const match = locs.find((l) => {
                    const name = (l.tiLocationName || '').toLowerCase().replace(/[-_\s]+/g, ' ').trim();
                    return name === query;
                }) || locs.find((l) => {
                    const code = (l.tiLocationCode || '').toLowerCase();
                    const lastSeg = code.split('>').pop()?.replace(/[-_\s]+/g, ' ').trim() || '';
                    return lastSeg === query;
                });
                if (match)
                    resolvedLocation = match.tiLocationCode || match.tiLocationName;
            }
            catch { }
        }
        if (item.cabinetName) {
            resolvedCabinetName = item.cabinetName;
            // If no location provided, resolve it from the cabinet
            if (!resolvedLocation) {
                try {
                    const results = await this.searchItems({ query: item.cabinetName, class: 'Cabinet', pageSize: 1 });
                    const found = results[0];
                    if (found?.cmbLocation)
                        resolvedLocation = found.cmbLocation;
                }
                catch { }
            }
        }
        else if (item.cabinetId) {
            try {
                const cab = await this.getCabinet(item.cabinetId);
                if (cab) {
                    resolvedCabinetName = cab.tiName ?? String(item.cabinetId);
                    if (!resolvedLocation)
                        resolvedLocation = cab.cmbLocation;
                }
            }
            catch {
                resolvedCabinetName = String(item.cabinetId);
            }
        }
        if (resolvedLocation)
            payload.cmbLocation = resolvedLocation;
        if (resolvedCabinetName)
            payload.cmbCabinet = resolvedCabinetName;
        if (item.tiUPosition != null) {
            payload.cmbUPosition = item.tiUPosition;
            payload.tiUPosition = item.tiUPosition;
        }
        if (item.tiMounting)
            payload.tiMounting = item.tiMounting;
        if (item.radioRailsUsed)
            payload.radioRailsUsed = item.radioRailsUsed;
        if (item.radioDepthPosition)
            payload.radioDepthPosition = item.radioDepthPosition;
        if (item.tiSerialNumber)
            payload.tiSerialNumber = item.tiSerialNumber;
        if (item.tiAssetTag)
            payload.tiAssetTag = item.tiAssetTag;
        if (item.cmbStatus)
            payload.cmbStatus = item.cmbStatus;
        if (item.customFields)
            Object.assign(payload, item.customFields);
        logger.info({ itemName: item.tiName, payload }, 'Creating item');
        const res = await this.post('/dcimoperations/items?returnDetails=true&proceedOnWarning=true', payload);
        // Log the full response for debugging
        logger.info({ itemName: item.tiName, response: JSON.stringify(res).substring(0, 1000) }, 'Create item response');
        // dcTrack sometimes returns 200 with various error formats
        if (res && res.success === false) {
            const errMsg = res.message || (res.errorList && res.errorList[0]) || JSON.stringify(res).substring(0, 300);
            throw new Error(`Failed to create item "${item.tiName}": ${errMsg}`);
        }
        // Also check for errorList without success:false
        if (res && res.errorList && res.errorList.length > 0) {
            throw new Error(`Failed to create item "${item.tiName}": ${res.errorList.join(', ')}`);
        }
        logger.info({ itemName: item.tiName }, 'Item created');
        return res.item ?? res;
    }
    async updateItem(itemId, updates) {
        const res = await this.put(`/dcimoperations/items/${itemId}?returnDetails=true&proceedOnWarning=true`, updates);
        logger.info({ itemId }, 'Item updated');
        return res.item ?? res;
    }
    async moveItem(itemId, targetCabinet, targetUPosition, targetMounting) {
        // cmbCabinet expects the cabinet NAME (string), not a numeric ID.
        // If a numeric ID was passed, resolve it to a name first.
        let cabinetName;
        if (typeof targetCabinet === 'string') {
            cabinetName = targetCabinet;
        }
        else {
            const cab = await this.getCabinet(targetCabinet);
            cabinetName = cab?.tiName || String(targetCabinet);
        }
        const payload = {
            cmbCabinet: cabinetName,
            cmbUPosition: targetUPosition,
            tiUPosition: targetUPosition,
        };
        if (targetMounting)
            payload.radioFrontFaces = targetMounting;
        const res = await this.put(`/dcimoperations/items/${itemId}?proceedOnWarning=true`, payload);
        logger.info({ itemId, targetCabinet: cabinetName, targetUPosition }, 'Item moved');
        return res.item ?? res;
    }
    async deleteItem(itemId, force = false) {
        await this.del(`/dcimoperations/items/${itemId}?proceedOnWarning=true`);
        logger.info({ itemId }, 'Item deleted');
        return { success: true, message: `Item ${itemId} deleted` };
    }
    async createConnection(connection) {
        // Resolve item names/locations from IDs for the API
        let startItem = null;
        let endItem = null;
        try {
            startItem = await this.getItem(connection.sourceItemId);
            endItem = await this.getItem(connection.destItemId);
        }
        catch {
            // If we can't resolve items, try with IDs
        }
        const payload = {};
        if (startItem) {
            payload.startingItemName = startItem.tiName;
            payload.startingItemLocation = startItem.cmbLocation ?? startItem.tiLocationName;
        }
        if (endItem) {
            payload.endingItemName = endItem.tiName;
            payload.endingItemLocation = endItem.cmbLocation ?? endItem.tiLocationName;
        }
        if (connection.sourcePortName)
            payload.startingPortName = connection.sourcePortName;
        if (connection.destPortName)
            payload.endingPortName = connection.destPortName;
        if (connection.cableId) {
            payload.cordList = [{ cordId: connection.cableId, cordType: 'PatchCord' }];
        }
        payload.proceedOnWarning = true;
        // Use dataconnections for Network/Fiber/Serial/KVM, powerconnections for Power
        const isPower = connection.connectionType === 'Power';
        const endpoint = isPower ? '/connections/powerconnections' : '/connections/dataconnections';
        const res = await this.post(endpoint, payload);
        logger.info({ src: connection.sourceItemId, dest: connection.destItemId }, 'Connection created');
        return res.connection ?? res;
    }
    async deleteConnection(connectionId) {
        // Try data connection first, fallback to power connection
        try {
            await this.del(`/connections/dataconnections/${connectionId}`);
        }
        catch {
            await this.del(`/connections/powerconnections/${connectionId}`);
        }
        logger.info({ connectionId }, 'Connection deleted');
        return { success: true, message: `Connection ${connectionId} deleted` };
    }
    async createChangeRequest(request) {
        // dcTrack requests use /dcimoperations/requests endpoint
        // Supported request types: InstallItem, PlanforDecommission, MoveItem, etc.
        const requestTypeMap = {
            Install: 'InstallItem',
            Move: 'MoveItem',
            Decommission: 'PlanforDecommission',
            PowerOn: 'PowerOn',
            PowerOff: 'PowerOff',
            Other: 'Other',
        };
        const payload = {
            requestType: requestTypeMap[request.requestType] ?? request.requestType ?? 'Other',
            comments: request.summary + (request.description ? ` - ${request.description}` : ''),
        };
        const itemIds = request.itemIds;
        if (itemIds && itemIds.length > 0) {
            const firstItemId = itemIds[0];
            payload.itemId = firstItemId;
            try {
                const item = await this.getItem(firstItemId);
                payload.itemName = item?.tiName;
            }
            catch {
                // ok
            }
        }
        else {
            // No specific item — use a placeholder item ID if dcTrack requires one
            // dcTrack requires itemId for change requests, so find the first available item
            try {
                const items = await this.searchItems({ query: 'AI-CAB', pageSize: 1 });
                const first = items[0];
                if (first?.id) {
                    payload.itemId = Number(first.id);
                    payload.itemName = first.tiName;
                    logger.info({ itemId: first.id, itemName: first.tiName }, 'Using first available item for change request');
                }
            }
            catch {
                // proceed without itemId — API may reject it
            }
        }
        if (request.scheduledDate)
            payload.dueDate = request.scheduledDate;
        if (request.priority)
            payload.priority = request.priority;
        if (request.assignee)
            payload.requestedBy = request.assignee;
        logger.info({ payload }, 'createChangeRequest payload');
        const res = await this.post('/dcimoperations/requests', payload);
        logger.info({ summary: request.summary }, 'Change request created');
        return res.request ?? res;
    }
    async updateChangeRequest(requestId, updates) {
        if (updates.status === 'Completed' || updates.status === 'Complete') {
            // Use the set-to-complete endpoint
            const res = await this.put(`/dcimoperations/requests/${requestId}/complete`, {});
            logger.info({ requestId }, 'Change request completed');
            return res;
        }
        if (updates.status === 'Cancelled' || updates.status === 'Canceled') {
            // Cancel = delete
            await this.del(`/dcimoperations/requests/${requestId}`);
            logger.info({ requestId }, 'Change request cancelled');
            return { success: true, message: `Request ${requestId} cancelled` };
        }
        // For other updates, not directly supported — return info
        return { requestId, message: 'Request status updates are managed through Complete or Cancel operations in dcTrack' };
    }
    async bulkImport(importType, data, options) {
        const endpoint = importType === 'items'
            ? '/dcimoperations/items/import'
            : importType === 'connections'
                ? '/dcimoperations/connections/import'
                : '/dcimoperations/models/import';
        const res = await this.post(endpoint, {
            data,
            options: {
                updateExisting: options?.updateExisting ?? false,
                validateOnly: options?.validateOnly ?? false,
                templateId: options?.templateId,
            },
        });
        logger.info({ importType, count: data.length }, 'Bulk import completed');
        return {
            success: true,
            imported: res.imported ?? data.length,
            failed: res.failed ?? 0,
            errors: res.errors ?? [],
        };
    }
    async bulkUpdate(itemIds, updates) {
        const results = { success: true, updated: 0, failed: 0, errors: [] };
        for (const itemId of itemIds) {
            try {
                await this.updateItem(itemId, updates);
                results.updated++;
            }
            catch (err) {
                results.failed++;
                results.errors.push({ itemId, error: err.message });
            }
        }
        results.success = results.failed === 0;
        logger.info({ updated: results.updated, failed: results.failed }, 'Bulk update completed');
        return results;
    }
    async createCabinet(cabinet) {
        // Cabinets are created through the items API — there is no /dcimoperations/cabinets endpoint
        // Need full location path (e.g., "ORSTED > ROOM 01"), not just name
        let locationPath;
        // Resolve locationName to locationId if needed
        let resolvedLocationId = cabinet.locationId;
        if (!resolvedLocationId && cabinet.locationName) {
            const locs = await this.listLocations();
            const query = cabinet.locationName.toLowerCase().replace(/[-_\s]+/g, ' ').trim();
            let match = locs.find((l) => {
                const name = (l.tiLocationName || '').toLowerCase().replace(/[-_\s]+/g, ' ').trim();
                return name === query;
            });
            if (!match) {
                match = locs.find((l) => {
                    const code = (l.tiLocationCode || '').toLowerCase();
                    const lastSeg = code.split('>').pop()?.replace(/[-_\s]+/g, ' ').trim() || '';
                    return lastSeg === query;
                });
            }
            if (!match) {
                const candidates = locs.filter((l) => (l.tiLocationCode || '').toLowerCase().replace(/[-_\s]+/g, ' ').includes(query));
                if (candidates.length === 1)
                    match = candidates[0];
            }
            if (match) {
                resolvedLocationId = Number(match.id);
                locationPath = match.tiLocationCode ?? match.tiLocationName;
            }
            else {
                throw new Error(`Location "${cabinet.locationName}" not found`);
            }
        }
        if (!locationPath && resolvedLocationId) {
            try {
                const loc = await this.getLocation(resolvedLocationId);
                locationPath = loc?.tiLocationCode ?? loc?.cmbLocation ?? loc?.tiLocationName ?? loc?.name ?? String(resolvedLocationId);
            }
            catch {
                locationPath = String(resolvedLocationId);
            }
        }
        if (!locationPath)
            throw new Error('Either locationId or locationName is required');
        const payload = {
            tiName: cabinet.name,
            cmbLocation: locationPath,
        };
        // Make & model by name — dcTrack resolves these to IDs internally
        if (cabinet.make)
            payload.cmbMake = cabinet.make;
        if (cabinet.model)
            payload.cmbModel = cabinet.model;
        if (cabinet.modelId)
            payload.cmbModel = cabinet.modelId;
        if (cabinet.ratedPowerKw)
            payload.tiRatedPowerKw = cabinet.ratedPowerKw;
        if (cabinet.rowPosition)
            payload.cmbRowPosition = cabinet.rowPosition;
        if (cabinet.customFields)
            Object.assign(payload, cabinet.customFields);
        const res = await this.post('/dcimoperations/items?returnDetails=true&proceedOnWarning=true', payload);
        logger.info({ cabinetName: cabinet.name }, 'Cabinet created');
        return res.item ?? res;
    }
    async createLocation(location) {
        // Location creation uses v1 API — resolve parent location code from parentId
        let parentLocationCode;
        if (location.parentId) {
            try {
                const parent = await this.getLocation(location.parentId);
                parentLocationCode = parent?.tiLocationCode ?? parent?.tiLocationName ?? parent?.name;
            }
            catch {
                // fallback: just use the ID
            }
        }
        // Map user-friendly type to dcTrack hierarchy level
        const hierarchyMap = {
            Site: 'DataCenter',
            Building: 'Building',
            Floor: 'Floor',
            Room: 'Room',
            Aisle: 'Aisle',
            Row: 'Row',
        };
        const payload = {
            tiLocationName: location.name,
            cmbHierarchyLevel: hierarchyMap[location.type] ?? location.type,
        };
        if (parentLocationCode)
            payload.tiParentLocationCode = parentLocationCode;
        if (location.code)
            payload.tiLocationCode = location.code;
        if (location.address)
            payload.cmbAddressLine1 = location.address;
        if (location.city)
            payload.cmbAddressCity = location.city;
        if (location.state)
            payload.cmbAddressState = location.state;
        if (location.country)
            payload.cmbAddressCountry = location.country;
        if (location.customFields)
            Object.assign(payload, location.customFields);
        // v1 API — need to go up one level from /api/v2
        const res = await this.post('/../v1/locations?proceedOnWarning=true', payload);
        logger.info({ locationName: location.name, type: location.type }, 'Location created');
        return res.location ?? res;
    }
    async listImportTemplates(templateType) {
        const params = templateType ? { type: templateType } : {};
        const res = await this.get('/import/templates', params);
        return res.templates ?? res.data ?? [];
    }
    async getImportTemplate(templateId) {
        const res = await this.get(`/import/templates/${templateId}`);
        return res.template ?? res;
    }
    async validateImportData(importType, data, templateId) {
        const res = await this.post(`/import/validate/${importType}`, {
            data,
            templateId,
        });
        return {
            valid: res.valid ?? res.errors?.length === 0,
            errors: res.errors ?? [],
            warnings: res.warnings ?? [],
        };
    }
    // =======================================================================
    // MAKES
    // =======================================================================
    async listMakes() {
        const res = await this.get('/makes');
        return Array.isArray(res) ? res : res.makes ?? [];
    }
    async getMake(makeId) {
        // No GET /makes/{id} endpoint — filter from full list
        const all = await this.listMakes();
        return all.find((m) => m.makeId === makeId) ?? null;
    }
    async createMake(make) {
        const res = await this.post('/makes', make);
        logger.info({ makeName: make.makeName }, 'Make created');
        return res;
    }
    async updateMake(makeId, updates) {
        const res = await this.put(`/makes/${makeId}`, { makeId, ...updates });
        logger.info({ makeId }, 'Make updated');
        return res;
    }
    async deleteMake(makeId) {
        await this.del(`/makes/${makeId}`);
        logger.info({ makeId }, 'Make deleted');
        return { success: true, message: `Make ${makeId} deleted` };
    }
    async searchMakes(searchString) {
        const res = await this.post('/dcimoperations/search/list/makes', { searchString });
        return res.cmbMake ?? [];
    }
    // =======================================================================
    // MODEL WRITE OPERATIONS
    // =======================================================================
    async createModel(model) {
        const res = await this.post('/models?returnDetails=true&proceedOnWarning=true', model);
        logger.info({ model: model.model }, 'Model created');
        return res;
    }
    async updateModel(modelId, model) {
        const res = await this.put(`/models/${modelId}?returnDetails=true&proceedOnWarning=false`, model);
        logger.info({ modelId }, 'Model updated');
        return res;
    }
    async deleteModel(modelId) {
        await this.del(`/models/${modelId}`);
        logger.info({ modelId }, 'Model deleted');
        return { success: true, message: `Model ${modelId} deleted` };
    }
    async searchModels(params) {
        const res = await this.post(`/quicksearch/models?pageNumber=${params.pageNumber ?? 0}&pageSize=${params.pageSize ?? 1000}`, {
            columns: params.columns ?? [],
            selectedColumns: params.selectedColumns ?? [{ name: 'model' }, { name: 'make' }, { name: 'class' }],
        });
        return res;
    }
    // =======================================================================
    // DATA PORTS
    // =======================================================================
    async listDataPorts(itemId) {
        // Try v2 first, then v1 (v2 sometimes returns empty for API-created ports)
        const res = await this.get(`/dcimoperations/items/${itemId}/dataports`);
        const v2Ports = res.dataPorts ?? res.data ?? [];
        if (v2Ports.length > 0)
            return v2Ports;
        // Fallback to v1 API
        try {
            const baseUrl = this.http.defaults.baseURL || '';
            const v1Base = baseUrl.replace('/api/v2', '/api/v1');
            const url = `${v1Base}/items/${itemId}/dataports`;
            const { data: v1Res } = await this.http.get(url);
            return v1Res.dataports ?? v1Res.dataPorts ?? v1Res.data ?? [];
        }
        catch {
            return v2Ports;
        }
    }
    async getDataPort(itemId, portId) {
        const res = await this.get(`/dcimoperations/items/${itemId}/dataports/${portId}`);
        return res.dataPort ?? res;
    }
    async createDataPort(itemId, port) {
        const res = await this.post(`/dcimoperations/items/${itemId}/dataports`, port);
        logger.info({ itemId, portName: port.portName }, 'Data port created');
        return res.dataPort ?? res;
    }
    async updateDataPort(itemId, portId, updates) {
        const res = await this.put(`/dcimoperations/items/${itemId}/dataports/${portId}`, updates);
        logger.info({ itemId, portId }, 'Data port updated');
        return res.dataPort ?? res;
    }
    async deleteDataPort(itemId, portId) {
        await this.del(`/dcimoperations/items/${itemId}/dataports/${portId}`);
        logger.info({ itemId, portId }, 'Data port deleted');
        return { success: true, message: `Data port ${portId} deleted` };
    }
    // =======================================================================
    // POWER PORTS (v1 API)
    // =======================================================================
    async listPowerPorts(itemId) {
        // Power ports use the v1 API — build absolute URL to bypass the v2 baseURL
        const baseUrl = this.http.defaults.baseURL || '';
        const v1Base = baseUrl.replace('/api/v2', '/api/v1');
        const url = `${v1Base}/items/${itemId}/powerports`;
        logger.info({ itemId, url }, 'Listing power ports (v1 API)');
        const { data: res } = await this.http.get(url);
        logger.info({ itemId, responseKeys: Object.keys(res || {}), resultLength: JSON.stringify(res || '').length }, 'Power ports response');
        return res.powerports ?? res.powerPorts ?? res.data ?? res ?? [];
    }
    // =======================================================================
    // POWER CHAIN
    // =======================================================================
    async getPowerChainForLocation(locationId, nodeFields) {
        try {
            const res = await this.post(`/powerChain/${locationId}`, {
                nodeFields: nodeFields ?? ['tiName', 'cmbLocation', 'tiClass'],
            });
            return res;
        }
        catch (err) {
            // Power chain may not be configured for all locations — return friendly message
            const msg = err?.message ?? String(err);
            if (msg.includes('500') || msg.includes('Server error') || err?.statusCode >= 500) {
                return {
                    status: 'not_configured',
                    locationId,
                    powerChain: [],
                    summary: `The power chain is not configured for location ${locationId} in dcTrack. This means power distribution paths have not been set up for this location. To view power chain data, the dcTrack administrator needs to configure the power chain for this location first.`,
                };
            }
            throw err;
        }
    }
    async getActualReadingsByItem(itemId) {
        const res = await this.get(`/powerChain/items/actualReadings/${itemId}`, undefined, false);
        return res.actualReadings ?? res.portReadings ?? [];
    }
    async getActualReadingsByPort(portId) {
        const res = await this.get(`/powerChain/ports/actualReadings/${portId}`, undefined, false);
        return res;
    }
    async updateActualReadingsByPort(portId, readings) {
        const res = await this.put(`/powerChain/ports/actualReadings/${portId}`, readings);
        logger.info({ portId }, 'Actual readings updated');
        return res;
    }
    async getPowerSumBulk(itemIds) {
        const res = await this.post('/items/powerSum/bulk', {
            bodies: itemIds,
            method: 'GET',
            proceedOnWarning: true,
        });
        return res;
    }
    // =======================================================================
    // CABINET SPACE
    // =======================================================================
    async findAvailableCabinets(params) {
        // Resolve locationName to locationId if provided
        let locationId;
        if (params.locationName) {
            try {
                const locs = await this.listLocations();
                const query = params.locationName.toLowerCase().replace(/[-_\s]+/g, ' ').trim();
                // Priority 1: exact match on tiLocationName (normalize spaces/hyphens)
                let match = locs.find((l) => {
                    const name = (l.tiLocationName || '').toLowerCase().replace(/[-_\s]+/g, ' ').trim();
                    return name === query;
                });
                // Priority 2: match the last segment of tiLocationCode (the leaf location name)
                if (!match) {
                    match = locs.find((l) => {
                        const code = (l.tiLocationCode || '').toLowerCase();
                        const lastSeg = code.split('>').pop()?.replace(/[-_\s]+/g, ' ').trim() || '';
                        return lastSeg === query;
                    });
                }
                // Priority 3: full code contains query (fallback, but only if single match)
                if (!match) {
                    const candidates = locs.filter((l) => (l.tiLocationCode || '').toLowerCase().replace(/[-_\s]+/g, ' ').includes(query));
                    if (candidates.length === 1)
                        match = candidates[0];
                }
                if (match)
                    locationId = Number(match.id);
            }
            catch { }
        }
        else if (params.locationIds && params.locationIds.length > 0) {
            locationId = params.locationIds[0];
        }
        // Fetch cabinets filtered by location — prefer name-based filter (locationId doesn't work with cmbLocation path strings)
        const cabinets = await this.listCabinets({
            location: params.locationName || undefined,
            locationId: params.locationName ? undefined : locationId,
            pageSize: 200,
        });
        const results = [];
        for (const cab of cabinets) {
            const cap = await this.getCabinetCapacity(Number(cab.id));
            if (!cap)
                continue;
            const meetsSpace = !params.minAvailableRUs || cap.availableRu >= params.minAvailableRUs;
            if (meetsSpace) {
                results.push({
                    cabinetId: Number(cab.id), cabinetName: cab.tiName,
                    location: cab.cmbLocation,
                    totalRu: cap.totalRu, availableRu: cap.availableRu, usedRu: cap.usedRu,
                    spaceUtilization: cap.spaceUtilizationPercent,
                });
            }
        }
        return results;
    }
    async findAvailableUPositions(params) {
        const res = await this.post('/items/uposition/available', {
            cabinetId: params.cabinetId,
            ruNeeded: params.ruNeeded,
        });
        return res.availablePositions ?? res.data ?? [];
    }
    // =======================================================================
    // SUB-LOCATIONS
    // =======================================================================
    async listSubLocations(locationId) {
        const res = await this.get(`/subLocations/list/${locationId}`);
        return res.subLocations ?? res.data ?? [];
    }
    async getSubLocation(subLocationId) {
        const res = await this.get(`/subLocations/${subLocationId}`);
        return res.subLocation ?? res;
    }
    async createSubLocation(subLocation) {
        // Sub-location API requires a very specific nested format
        let locationValue;
        const locationId = subLocation.locationId;
        if (locationId) {
            try {
                const loc = await this.getLocation(locationId);
                locationValue = loc?.tiLocationCode ?? loc?.tiLocationName ?? loc?.name;
            }
            catch {
                locationValue = String(locationId);
            }
        }
        const payload = {
            cmbLocation: {
                label: 'Location',
                value: { id: locationId, value: locationValue ?? String(locationId) },
            },
            tiSubLocationName: {
                label: 'Name',
                value: subLocation.name,
            },
            cmbSubLocationType: {
                label: 'Type',
                value: { value: subLocation.type ?? 'Aisle' },
            },
        };
        if (subLocation.powerCapacity) {
            payload.tiPowerCapacity = { label: 'Capacity (kW)', value: subLocation.powerCapacity };
        }
        const res = await this.post('/subLocations', payload);
        logger.info({ name: subLocation.name }, 'Sub-location created');
        return res.subLocation ?? res;
    }
    async updateSubLocation(subLocationId, updates) {
        const res = await this.put(`/subLocations/${subLocationId}`, updates);
        logger.info({ subLocationId }, 'Sub-location updated');
        return res.subLocation ?? res;
    }
    async deleteSubLocation(subLocationId) {
        await this.del(`/subLocations/${subLocationId}`);
        logger.info({ subLocationId }, 'Sub-location deleted');
        return { success: true, message: `Sub-location ${subLocationId} deleted` };
    }
    // =======================================================================
    // TICKETS
    // =======================================================================
    async getTicket(ticketId) {
        const res = await this.get(`/tickets/${ticketId}`);
        return res.ticket ?? res;
    }
    async createTicket(ticket) {
        const desc = ticket.description || ticket.ticketDesc || ticket.summary || '';
        const summary = ticket.summary || desc;
        // Route through createChangeRequest which already works with /dcimoperations/requests
        try {
            return await this.createChangeRequest({
                requestType: 'Install',
                summary: summary,
                description: desc,
                priority: ticket.priority,
                assignee: ticket.assignedTo || ticket.requester,
            });
        }
        catch (err) {
            logger.warn({ error: err.message }, 'createChangeRequest failed, falling back to /tickets');
        }
        // Fallback: /tickets endpoint (works without items but no description)
        const fallbackPayload = {};
        if (desc)
            fallbackPayload.ticketDesc = desc;
        logger.info({ fallbackPayload }, 'Creating ticket via /tickets (fallback)');
        const res = await this.post('/tickets', fallbackPayload);
        return res.ticket ?? res;
    }
    async updateTicket(ticketId, updates) {
        // dcTrack expects: { ticket: { ticketNumber, description, ... } }
        const payload = { ticket: updates };
        logger.info({ ticketId, payload }, 'Updating ticket');
        const res = await this.put(`/tickets/${ticketId}`, payload);
        logger.info({ ticketId }, 'Ticket updated');
        return res.ticket ?? res;
    }
    async deleteTicket(ticketId, proceedOnWarning = true) {
        await this.del(`/tickets/${ticketId}?proceedOnWarning=${proceedOnWarning}`);
        logger.info({ ticketId }, 'Ticket deleted');
        return { success: true, message: `Ticket ${ticketId} deleted` };
    }
    async searchTickets(params) {
        const url = `/quicksearch/tickets?pageNumber=${params.pageNumber ?? 0}&pageSize=${params.pageSize ?? 1000}`;
        const res = await this.post(url, {
            columns: params.columns ?? [],
            selectedColumns: params.selectedColumns ?? [{ name: 'ticketNumber' }, { name: 'ticketDesc' }, { name: 'ticketStatus' }],
        });
        return res;
    }
    async getTicketFieldList() {
        const res = await this.get('/quicksearch/tickets/ticketListFields');
        return res ?? [];
    }
    async bulkTickets(bodies, method, proceedOnWarning = true) {
        const res = await this.post('/tickets/bulk', { bodies, method, proceedOnWarning });
        logger.info({ method, count: bodies.length }, 'Bulk ticket operation completed');
        return res;
    }
    async assignTicketEntity(entityType, ticketId, entityId) {
        const res = await this.post(`/tickets/assignment/${entityType}/assign`, { ticketId, entityId });
        logger.info({ ticketId, entityType, entityId }, 'Entity assigned to ticket');
        return res;
    }
    async unassignTicketEntity(entityType, ticketId, entityId) {
        const res = await this.post(`/tickets/assignment/${entityType}/unassign`, { ticketId, entityId });
        logger.info({ ticketId, entityType, entityId }, 'Entity unassigned from ticket');
        return res;
    }
    // =======================================================================
    // PROJECTS
    // =======================================================================
    async getProject(projectId) {
        const res = await this.get(`/dcimoperations/projects/${projectId}`);
        return res.project ?? res;
    }
    async searchProjects(query) {
        // dcTrack doesn't have a project search endpoint, so scan by ID
        const projects = [];
        for (let id = 1; id <= 50; id++) {
            try {
                const res = await this.get(`/dcimoperations/projects/${id}`);
                const proj = res.project ?? res;
                if (proj && proj.projectName) {
                    projects.push({ ...proj, projectId: id });
                }
            }
            catch {
                // Project doesn't exist at this ID, continue
            }
        }
        if (query) {
            const q = query.toLowerCase();
            return projects.filter(p => (p.projectName || '').toLowerCase().includes(q) ||
                (p.projectNumber || '').toLowerCase().includes(q));
        }
        return projects;
    }
    async resolveProjectId(projectId, projectName) {
        if (projectId)
            return projectId;
        if (!projectName)
            throw new Error('Either projectId or projectName is required');
        const matches = await this.searchProjects(projectName);
        if (!matches.length)
            throw new Error(`Project "${projectName}" not found`);
        logger.info({ projectName, resolvedId: matches[0].projectId }, 'Resolved project name to ID');
        return matches[0].projectId;
    }
    async createProject(project) {
        // dcTrack projects API: location expects the tiLocationCode string (e.g., "AI-DEMO-DC > AI-ROOM-01")
        const payload = { ...project };
        logger.info({ payload }, 'createProject payload');
        const res = await this.post('/dcimoperations/projects', payload);
        logger.info({ name: project.projectName }, 'Project created');
        return res.project ?? res;
    }
    async updateProject(projectId, updates) {
        const res = await this.put(`/dcimoperations/projects/${projectId}`, updates);
        logger.info({ projectId }, 'Project updated');
        return res.project ?? res;
    }
    async deleteProject(projectId) {
        await this.del(`/dcimoperations/projects/${projectId}`);
        logger.info({ projectId }, 'Project deleted');
        return { success: true, message: `Project ${projectId} deleted` };
    }
    // =======================================================================
    // PART CLASSES
    // =======================================================================
    async listPartClasses() {
        const res = await this.get('/parts/classes');
        return res.partClasses ?? res.data ?? [];
    }
    async createPartClass(partClass) {
        const res = await this.post('/parts/classes', partClass);
        logger.info({ className: partClass.className }, 'Part class created');
        return res;
    }
    async updatePartClass(partClassId, updates) {
        const res = await this.put(`/parts/classes/${partClassId}`, updates);
        logger.info({ partClassId }, 'Part class updated');
        return res;
    }
    async deletePartClass(partClassId) {
        await this.del(`/parts/classes/${partClassId}`);
        logger.info({ partClassId }, 'Part class deleted');
        return { success: true, message: `Part class ${partClassId} deleted` };
    }
    // =======================================================================
    // PART MODELS
    // =======================================================================
    async getPartModel(modelId) {
        const res = await this.get(`/partModels/${modelId}`);
        return res;
    }
    async createPartModel(model) {
        const res = await this.post('/partModels', model);
        logger.info({ modelName: model.modelName }, 'Part model created');
        return res;
    }
    async updatePartModel(modelId, updates) {
        const res = await this.put(`/partModels/${modelId}`, updates);
        logger.info({ modelId }, 'Part model updated');
        return res;
    }
    async deletePartModel(modelId) {
        await this.del(`/partModels/${modelId}`);
        logger.info({ modelId }, 'Part model deleted');
        return { success: true, message: `Part model ${modelId} deleted` };
    }
    async searchPartModels(params) {
        const url = `/quicksearch/parts/models?pageNumber=${params.pageNumber ?? 0}&pageSize=${params.pageSize ?? 1000}`;
        return this.post(url, {
            columns: params.columns ?? [],
            selectedColumns: params.selectedColumns ?? [{ name: 'modelName' }, { name: 'make' }],
        });
    }
    // =======================================================================
    // PARTS (INSTANCES)
    // =======================================================================
    async getPart(partId) {
        const res = await this.get(`/parts/${partId}`);
        return res.part ?? res;
    }
    async createPart(part) {
        const res = await this.post('/parts', part);
        logger.info({ partModelId: part.partModelId }, 'Part created');
        return res.part ?? res;
    }
    async updatePart(partId, updates) {
        const res = await this.put(`/parts/${partId}`, updates);
        logger.info({ partId }, 'Part updated');
        return res.part ?? res;
    }
    async deletePart(partId) {
        await this.del(`/parts/${partId}`);
        logger.info({ partId }, 'Part deleted');
        return { success: true, message: `Part ${partId} deleted` };
    }
    async searchParts(params) {
        const url = `/quicksearch/parts?pageNumber=${params.pageNumber ?? 0}&pageSize=${params.pageSize ?? 1000}`;
        return this.post(url, {
            columns: params.columns ?? [],
            selectedColumns: params.selectedColumns ?? [{ name: 'partModelName' }, { name: 'locationName' }],
        });
    }
    async adjustPartStock(partId, activity, quantity, locationId) {
        const payload = { quantity };
        if (locationId)
            payload.locationId = locationId;
        const res = await this.put(`/parts/${partId}/stock/${activity}`, payload);
        logger.info({ partId, activity, quantity }, 'Part stock adjusted');
        return res;
    }
    async assignParts(assignmentType, assignments) {
        const res = await this.post(`/parts/assignments/${assignmentType}`, { assignments });
        logger.info({ assignmentType, count: assignments.length }, 'Parts assigned');
        return res;
    }
    // =======================================================================
    // CUSTOM FIELDS
    // =======================================================================
    async listCustomFields() {
        const res = await this.get('/settings/lists/customFields');
        return res.customFields ?? res.data ?? [];
    }
    async getCustomField(customFieldId) {
        const res = await this.get(`/settings/lists/customFields/${customFieldId}`);
        return res.customField ?? res;
    }
    async createCustomField(field) {
        const res = await this.post('/settings/lists/customFields', field);
        logger.info({ label: field.label }, 'Custom field created');
        return res;
    }
    async updateCustomField(customFieldId, updates) {
        const res = await this.put(`/settings/lists/customFields/${customFieldId}`, updates);
        logger.info({ customFieldId }, 'Custom field updated');
        return res;
    }
    async deleteCustomField(customFieldId, proceedOnWarning = false) {
        await this.del(`/settings/lists/customFields/${customFieldId}?proceedOnWarning=${proceedOnWarning}`);
        logger.info({ customFieldId }, 'Custom field deleted');
        return { success: true, message: `Custom field ${customFieldId} deleted` };
    }
    // =======================================================================
    // AUDIT TRAIL
    // =======================================================================
    async searchAuditTrail(params) {
        const url = `/quicksearch/auditTrail?pageNumber=${params.pageNumber ?? 0}&pageSize=${params.pageSize ?? 1000}`;
        try {
            return await this.post(url, {
                columns: params.columns ?? [],
                selectedColumns: params.selectedColumns ?? [
                    { name: 'action' }, { name: 'changedBy' }, { name: 'changedDate' },
                    { name: 'entityName' }, { name: 'entityType' },
                ],
            });
        }
        catch (err) {
            const msg = err?.message ?? String(err);
            if (msg.includes('400')) {
                return {
                    status: 'not_available',
                    summary: 'The audit trail feature is not accessible with the current API credentials. This may require additional dcTrack licensing or the API user may need audit trail permissions enabled by an administrator.',
                    searchResults: { auditTrail: [] }, totalRows: 0,
                };
            }
            throw err;
        }
    }
    async getAuditTrailFieldList() {
        const res = await this.get('/quicksearch/auditTrail/auditTrailListFields');
        return res ?? [];
    }
    // =======================================================================
    // REPORTS / CHARTS
    // =======================================================================
    async listCharts() {
        const res = await this.get('/reports/charts');
        return res.charts ?? res.data ?? [];
    }
    async getChart(chartId) {
        const res = await this.get(`/reports/charts/${chartId}`);
        return res.chart ?? res;
    }
    async getChartData(chartId, params) {
        return this.post(`/reports/charts/${chartId}/data`, params ?? {});
    }
    // =======================================================================
    // BREAKERS
    // =======================================================================
    async listBreakers(panelItemId) {
        const res = await this.get(`/dcimoperations/items/${panelItemId}/breakers`);
        return res.breakers ?? res.data ?? [];
    }
    async getBreaker(panelItemId, breakerPortId) {
        const res = await this.get(`/dcimoperations/items/${panelItemId}/breakers/${breakerPortId}`);
        return res.breaker ?? res;
    }
    async createBreaker(panelItemId, breaker) {
        const res = await this.post(`/dcimoperations/items/${panelItemId}/breakers`, breaker);
        logger.info({ panelItemId }, 'Breaker created');
        return res.breaker ?? res;
    }
    async updateBreaker(panelItemId, breakerPortId, updates) {
        const res = await this.put(`/dcimoperations/items/${panelItemId}/breakers/${breakerPortId}`, updates);
        logger.info({ panelItemId, breakerPortId }, 'Breaker updated');
        return res.breaker ?? res;
    }
    async deleteBreaker(panelItemId, breakerPortId) {
        await this.del(`/dcimoperations/items/${panelItemId}/breakers/${breakerPortId}`);
        logger.info({ panelItemId, breakerPortId }, 'Breaker deleted');
        return { success: true, message: `Breaker ${breakerPortId} deleted` };
    }
    // =======================================================================
    // LOOKUP LISTS
    // =======================================================================
    async getLookupList(listType, id) {
        const path = id ? `/dcimoperations/lookups/${listType}/${id}` : `/dcimoperations/lookups/${listType}`;
        const res = await this.get(path);
        return res.data ?? res ?? [];
    }
    async getPicklistOptions(listType) {
        const res = await this.get(`/dcimoperations/picklists/${listType}`);
        return res.data ?? res ?? [];
    }
    async updatePicklistOptions(listType, options) {
        return this.put(`/dcimoperations/picklists/${listType}`, options);
    }
    // =======================================================================
    // WEBHOOKS
    // =======================================================================
    async getWebhookConfig() {
        const res = await this.get('/notifications/config');
        return res;
    }
    async updateWebhookConfig(config) {
        const res = await this.put('/notifications/config', config);
        logger.info('Webhook config updated');
        return res;
    }
    async deleteWebhookConfig() {
        await this.del('/notifications/config');
        logger.info('Webhook config deleted');
        return { success: true, message: 'Webhook config deleted' };
    }
    // =======================================================================
    // RELATIONSHIPS
    // =======================================================================
    async getRelationship(id) {
        const res = await this.get(`/relationship/${id}`);
        return res;
    }
    async createRelationship(relationship) {
        const res = await this.post('/relationship', relationship);
        logger.info('Relationship created');
        return res;
    }
    async searchRelationships(params) {
        const res = await this.post('/relationship/search', params);
        return res.relationships ?? res.data ?? [];
    }
    async getRelationshipsByEntity(entityType, entityId) {
        const res = await this.get(`/relationship/${entityType}/${entityId}`);
        return res.relationships ?? res.data ?? [];
    }
    async deleteRelationship(id) {
        await this.del(`/relationship/${id}`);
        logger.info({ id }, 'Relationship deleted');
        return { success: true, message: `Relationship ${id} deleted` };
    }
    // =======================================================================
    // PERMISSIONS
    // =======================================================================
    async listPermissions() {
        const res = await this.get('/permissions/explicit');
        return res.permissions ?? res.data ?? [];
    }
    async getPermission(permissionId) {
        const res = await this.get(`/permissions/explicit/${permissionId}`);
        return res.permission ?? res;
    }
    async createPermission(permission) {
        const res = await this.post('/permissions/explicit', permission);
        logger.info('Permission created');
        return res;
    }
    async updatePermission(permissionId, updates) {
        const res = await this.put(`/permissions/explicit/${permissionId}`, updates);
        logger.info({ permissionId }, 'Permission updated');
        return res;
    }
    async deletePermission(permissionId) {
        await this.del(`/permissions/explicit/${permissionId}`);
        logger.info({ permissionId }, 'Permission deleted');
        return { success: true, message: `Permission ${permissionId} deleted` };
    }
    // =======================================================================
    // VISUALIZATIONS (FLOORMAP)
    // =======================================================================
    async getFloormapConfig(locationId) {
        const res = await this.get(`/visualization/floormaps/configuration/${locationId}`);
        return res;
    }
    async getAllFloormapConfigs() {
        const res = await this.get('/visualization/floormaps/configuration');
        return res.configurations ?? res.data ?? [];
    }
    async updateFloormapConfig(locationId, config) {
        const res = await this.put(`/visualization/floormaps/configuration/${locationId}`, config);
        logger.info({ locationId }, 'Floormap config updated');
        return res;
    }
    // =======================================================================
    // LOCATION FAVORITES
    // =======================================================================
    async getLocationFavorites(username, entityType) {
        const res = await this.get(`/users/${username}/favorites/${entityType}`);
        return res.favorites ?? res.data ?? [];
    }
    async assignLocationFavorites(username, favorites) {
        return this.put(`/users/${username}/favorites`, favorites);
    }
    // =======================================================================
    // CONNECTION TEST
    // =======================================================================
    async testConnection() {
        try {
            // Use /makes as a lightweight v2 endpoint to verify connectivity
            await this.get('/makes');
            return true;
        }
        catch {
            return false;
        }
    }
}
//# sourceMappingURL=dctrack.client.js.map