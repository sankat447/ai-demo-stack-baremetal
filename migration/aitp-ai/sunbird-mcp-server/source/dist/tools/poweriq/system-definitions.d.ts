export declare const poweriqSystemToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            jobId?: undefined;
            id?: undefined;
            updates?: undefined;
            outlets?: undefined;
            pdu_id?: undefined;
            device_id?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            jobId: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            outlets?: undefined;
            pdu_id?: undefined;
            device_id?: undefined;
        };
        required: string[];
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
            updates: {
                type: string;
                description: string;
            };
            jobId?: undefined;
            outlets?: undefined;
            pdu_id?: undefined;
            device_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            outlets: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                };
            };
            jobId?: undefined;
            id?: undefined;
            updates?: undefined;
            pdu_id?: undefined;
            device_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pdu_id: {
                type: string;
                description: string;
            };
            device_id: {
                type: string;
                description: string;
            };
            jobId?: undefined;
            id?: undefined;
            updates?: undefined;
            outlets?: undefined;
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
            jobId?: undefined;
            updates?: undefined;
            outlets?: undefined;
            pdu_id?: undefined;
            device_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pdu_id: {
                type: string;
                description: string;
            };
            jobId?: undefined;
            id?: undefined;
            updates?: undefined;
            outlets?: undefined;
            device_id?: undefined;
        };
        required: never[];
    };
})[];
//# sourceMappingURL=system-definitions.d.ts.map