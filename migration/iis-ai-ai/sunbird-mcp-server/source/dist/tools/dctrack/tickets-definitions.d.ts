/**
 * MCP tool definitions for dcTrack tickets operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackTicketsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketId: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketDesc: {
                type: string;
                description: string;
            };
            summary: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            severity: {
                type: string;
                description: string;
            };
            ticketPurpose: {
                type: string;
                description: string;
            };
            ticketType: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            assignedTo: {
                type: string;
                description: string;
            };
            ticketComments: {
                type: string;
                description: string;
            };
            ticketId?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
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
            ticketId?: undefined;
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            entityType: {
                type: string;
                description: string;
            };
            ticketId: {
                type: string;
                description: string;
            };
            entityId: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=tickets-definitions.d.ts.map