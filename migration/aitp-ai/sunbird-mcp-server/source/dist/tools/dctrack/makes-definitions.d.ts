/**
 * MCP tool definitions for dcTrack makes/models operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackMakesToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId: {
                type: string;
                description: string;
            };
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeName: {
                type: string;
                description: string;
            };
            accountNumber: {
                type: string;
                description: string;
            };
            aliases: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            notes: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            searchString: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            model: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            subclass: {
                type: string;
                description: string;
            };
            mounting: {
                type: string;
                enum: string[];
                description: string;
            };
            formFactor: {
                type: string;
                enum: string[];
                description: string;
            };
            ruHeight: {
                type: string;
                description: string;
            };
            dimHeight: {
                type: string;
                description: string;
            };
            dimWidth: {
                type: string;
                description: string;
            };
            dimDepth: {
                type: string;
                description: string;
            };
            weight: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
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
            model: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
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
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            filters: {
                type: string;
                description: string;
            };
            pageNumber: {
                type: string;
                description: string;
                default: number;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
})[];
//# sourceMappingURL=makes-definitions.d.ts.map