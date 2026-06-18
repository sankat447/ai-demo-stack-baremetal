/**
 * MCP tool definitions for dcTrack parts operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackPartsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            className: {
                type: string;
                description: string;
            };
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
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
            className?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelName: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
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
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partModelId: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            quantity: {
                type: string;
                description: string;
            };
            serialNumber: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            activity: {
                type: string;
                enum: string[];
                description: string;
            };
            quantity: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assignmentType: {
                type: string;
                enum: string[];
                description: string;
            };
            assignments: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=parts-definitions.d.ts.map