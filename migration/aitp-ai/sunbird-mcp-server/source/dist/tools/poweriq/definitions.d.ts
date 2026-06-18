export declare const poweriqToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            datacenterId?: undefined;
            cabinetId?: undefined;
            pageSize?: undefined;
            pduId?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            datacenterId: {
                type: string;
                description: string;
            };
            cabinetId: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                default: number;
            };
            pduId?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pduId: {
                type: string;
                description: string;
            };
            datacenterId?: undefined;
            cabinetId?: undefined;
            pageSize?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pduId: {
                type: string;
                description?: undefined;
            };
            includeOutlets: {
                type: string;
                default: boolean;
            };
            datacenterId?: undefined;
            cabinetId?: undefined;
            pageSize?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sensorType: {
                type: string;
                enum: string[];
            };
            cabinetId: {
                type: string;
                description?: undefined;
            };
            pageSize: {
                type: string;
                default: number;
            };
            datacenterId?: undefined;
            pduId?: undefined;
            includeOutlets?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sensorId: {
                type: string;
            };
            datacenterId?: undefined;
            cabinetId?: undefined;
            pageSize?: undefined;
            pduId?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            datacenterId: {
                type: string;
                description?: undefined;
            };
            startTime: {
                type: string;
            };
            endTime: {
                type: string;
            };
            resolution: {
                type: string;
                enum: string[];
                default: string;
            };
            cabinetId?: undefined;
            pageSize?: undefined;
            pduId?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            severity: {
                type: string;
                enum: string[];
            };
            type: {
                type: string;
                enum: string[];
            };
            acknowledged: {
                type: string;
            };
            limit: {
                type: string;
                default: number;
            };
            datacenterId?: undefined;
            cabinetId?: undefined;
            pageSize?: undefined;
            pduId?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            cabinetId: {
                type: string;
                description?: undefined;
            };
            pageSize: {
                type: string;
                default: number;
            };
            datacenterId?: undefined;
            pduId?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pduId: {
                type: string;
                description?: undefined;
            };
            datacenterId?: undefined;
            cabinetId?: undefined;
            pageSize?: undefined;
            includeOutlets?: undefined;
            sensorType?: undefined;
            sensorId?: undefined;
            startTime?: undefined;
            endTime?: undefined;
            resolution?: undefined;
            severity?: undefined;
            type?: undefined;
            acknowledged?: undefined;
            limit?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=definitions.d.ts.map