/**
 * MCP tool definitions for dcTrack READ operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackReadToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            parentId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
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
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
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
            cabinetName: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            minAvailableRu: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            query: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            cabinetId: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            connectionId: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            query: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            name?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=definitions.d.ts.map