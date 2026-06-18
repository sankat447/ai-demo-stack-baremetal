export declare const poweriqAssetsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id?: undefined;
            updates?: undefined;
            assetStripId?: undefined;
            rackUnitId?: undefined;
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
            updates?: undefined;
            assetStripId?: undefined;
            rackUnitId?: undefined;
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
            assetStripId?: undefined;
            rackUnitId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assetStripId: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            rackUnitId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            rackUnitId: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            assetStripId?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=assets-definitions.d.ts.map