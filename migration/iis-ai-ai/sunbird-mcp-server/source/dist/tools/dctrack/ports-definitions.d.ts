/**
 * MCP tool definitions for dcTrack ports operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackPortsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId?: undefined;
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
            updates?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId: {
                type: string;
                description: string;
            };
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portName: {
                type: string;
                description: string;
            };
            portSubclass: {
                type: string;
                description: string;
            };
            connector: {
                type: string;
                description: string;
            };
            mediaType: {
                type: string;
                description: string;
            };
            protocol: {
                type: string;
                description: string;
            };
            dataRate: {
                type: string;
                description: string;
            };
            portId?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=ports-definitions.d.ts.map