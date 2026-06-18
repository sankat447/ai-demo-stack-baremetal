/**
 * MCP tool definitions for dcTrack projects operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackProjectsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            projectId: {
                type: string;
                description: string;
            };
            projectName: {
                type: string;
                description: string;
            };
            projectNumber?: undefined;
            location?: undefined;
            description?: undefined;
            status?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            projectManager?: undefined;
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
            projectName: {
                type: string;
                description: string;
            };
            projectNumber: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                description: string;
            };
            startDate: {
                type: string;
                description: string;
            };
            endDate: {
                type: string;
                description: string;
            };
            projectManager: {
                type: string;
                description: string;
            };
            projectId?: undefined;
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
            projectId: {
                type: string;
                description: string;
            };
            projectName: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            projectNumber?: undefined;
            location?: undefined;
            description?: undefined;
            status?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            projectManager?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=projects-definitions.d.ts.map