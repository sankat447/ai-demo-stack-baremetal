export declare const combinedToolDefinitions: ({
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
            requiredU?: undefined;
            requiredPowerKw?: undefined;
            requiredPorts?: undefined;
            locationId?: undefined;
            contiguous?: undefined;
            includeAlerts?: undefined;
            includePUE?: undefined;
            powerThresholdWatts?: undefined;
            itemId?: undefined;
            includeRecommendations?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            requiredU: {
                type: string;
            };
            requiredPowerKw: {
                type: string;
            };
            requiredPorts: {
                type: string;
            };
            locationId: {
                type: string;
            };
            contiguous: {
                type: string;
                default: boolean;
            };
            cabinetId?: undefined;
            cabinetName?: undefined;
            includeAlerts?: undefined;
            includePUE?: undefined;
            powerThresholdWatts?: undefined;
            itemId?: undefined;
            includeRecommendations?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            locationId: {
                type: string;
            };
            includeAlerts: {
                type: string;
                default: boolean;
            };
            includePUE: {
                type: string;
                default: boolean;
            };
            cabinetId?: undefined;
            cabinetName?: undefined;
            requiredU?: undefined;
            requiredPowerKw?: undefined;
            requiredPorts?: undefined;
            contiguous?: undefined;
            powerThresholdWatts?: undefined;
            itemId?: undefined;
            includeRecommendations?: undefined;
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
            };
            powerThresholdWatts: {
                type: string;
                default: number;
            };
            cabinetId?: undefined;
            cabinetName?: undefined;
            requiredU?: undefined;
            requiredPowerKw?: undefined;
            requiredPorts?: undefined;
            contiguous?: undefined;
            includeAlerts?: undefined;
            includePUE?: undefined;
            itemId?: undefined;
            includeRecommendations?: undefined;
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
            };
            cabinetId?: undefined;
            cabinetName?: undefined;
            requiredU?: undefined;
            requiredPowerKw?: undefined;
            requiredPorts?: undefined;
            locationId?: undefined;
            contiguous?: undefined;
            includeAlerts?: undefined;
            includePUE?: undefined;
            powerThresholdWatts?: undefined;
            includeRecommendations?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            locationId: {
                type: string;
            };
            cabinetId: {
                type: string;
                description?: undefined;
            };
            includeRecommendations: {
                type: string;
                default: boolean;
            };
            cabinetName?: undefined;
            requiredU?: undefined;
            requiredPowerKw?: undefined;
            requiredPorts?: undefined;
            contiguous?: undefined;
            includeAlerts?: undefined;
            includePUE?: undefined;
            powerThresholdWatts?: undefined;
            itemId?: undefined;
        };
        required: never[];
    };
})[];
//# sourceMappingURL=definitions.d.ts.map