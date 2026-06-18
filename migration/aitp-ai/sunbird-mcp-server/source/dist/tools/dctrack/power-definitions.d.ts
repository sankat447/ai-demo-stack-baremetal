/**
 * MCP tool definitions for dcTrack power and space operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackPowerToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            locationId: {
                type: string;
                description: string;
            };
            nodeFields: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
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
            locationId?: undefined;
            nodeFields?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            portId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            portId: {
                type: string;
                description: string;
            };
            readings: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            locationName: {
                type: string;
                description: string;
            };
            locationIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            minAvailableRUs: {
                type: string;
                description: string;
            };
            minAvailablePowerKw: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            cabinetId: {
                type: string;
                description: string;
            };
            ruNeeded: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            locationId: {
                type: string;
                description: string;
            };
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            subLocationId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            name?: undefined;
            type?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=power-definitions.d.ts.map