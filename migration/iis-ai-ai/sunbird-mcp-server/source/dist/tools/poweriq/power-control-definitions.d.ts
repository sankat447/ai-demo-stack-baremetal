export declare const poweriqPowerControlToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            outletIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            state: {
                type: string;
                enum: string[];
                description: string;
            };
            deviceId?: undefined;
            rackId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            deviceId: {
                type: string;
                description: string;
            };
            state: {
                type: string;
                enum: string[];
                description: string;
            };
            outletIds?: undefined;
            rackId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            rackId: {
                type: string;
                description: string;
            };
            state: {
                type: string;
                enum: string[];
                description: string;
            };
            outletIds?: undefined;
            deviceId?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=power-control-definitions.d.ts.map