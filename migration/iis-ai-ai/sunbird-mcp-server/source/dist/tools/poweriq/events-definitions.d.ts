export declare const poweriqEventsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            severity: {
                type: string;
                enum: string[];
                description: string;
            };
            eventable_type: {
                type: string;
                description: string;
            };
            eventable_id: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            id?: undefined;
            eventIds?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
            severity?: undefined;
            eventable_type?: undefined;
            eventable_id?: undefined;
            limit?: undefined;
            eventIds?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            eventIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            severity?: undefined;
            eventable_type?: undefined;
            eventable_id?: undefined;
            limit?: undefined;
            id?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=events-definitions.d.ts.map