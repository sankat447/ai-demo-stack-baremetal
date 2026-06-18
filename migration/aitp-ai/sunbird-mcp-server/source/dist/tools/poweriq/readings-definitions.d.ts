export declare const poweriqReadingsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            inletId: {
                type: string;
                description: string;
            };
            circuitId?: undefined;
            rackId?: undefined;
            resourceType?: undefined;
            id?: undefined;
            interval?: undefined;
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
            circuitId: {
                type: string;
                description: string;
            };
            inletId?: undefined;
            rackId?: undefined;
            resourceType?: undefined;
            id?: undefined;
            interval?: undefined;
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
            rackId: {
                type: string;
                description: string;
            };
            inletId?: undefined;
            circuitId?: undefined;
            resourceType?: undefined;
            id?: undefined;
            interval?: undefined;
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
            resourceType: {
                type: string;
                enum: string[];
                description: string;
            };
            id: {
                type: string;
                description: string;
            };
            interval: {
                type: string;
                enum: string[];
                description: string;
            };
            inletId?: undefined;
            circuitId?: undefined;
            rackId?: undefined;
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
            resourceType: {
                type: string;
                enum: string[];
                description: string;
            };
            id: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            inletId?: undefined;
            circuitId?: undefined;
            rackId?: undefined;
            interval?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=readings-definitions.d.ts.map