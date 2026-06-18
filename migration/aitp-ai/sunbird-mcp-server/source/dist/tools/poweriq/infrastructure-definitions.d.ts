export declare const poweriqInfraToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
            name?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            capacity?: undefined;
            contact_name?: undefined;
            external_key?: undefined;
            updates?: undefined;
            resourceType?: undefined;
            types?: undefined;
            targetType?: undefined;
            targetId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            city: {
                type: string;
                description: string;
            };
            state: {
                type: string;
                description: string;
            };
            country: {
                type: string;
                description: string;
            };
            capacity: {
                type: string;
                description: string;
            };
            contact_name: {
                type: string;
                description: string;
            };
            external_key: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            resourceType?: undefined;
            types?: undefined;
            targetType?: undefined;
            targetId?: undefined;
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
            name?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            capacity?: undefined;
            contact_name?: undefined;
            external_key?: undefined;
            resourceType?: undefined;
            types?: undefined;
            targetType?: undefined;
            targetId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id?: undefined;
            name?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            capacity?: undefined;
            contact_name?: undefined;
            external_key?: undefined;
            updates?: undefined;
            resourceType?: undefined;
            types?: undefined;
            targetType?: undefined;
            targetId?: undefined;
        };
        required: never[];
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
            name?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            capacity?: undefined;
            contact_name?: undefined;
            external_key?: undefined;
            updates?: undefined;
            types?: undefined;
            targetType?: undefined;
            targetId?: undefined;
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
            types: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            name?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            capacity?: undefined;
            contact_name?: undefined;
            external_key?: undefined;
            updates?: undefined;
            targetType?: undefined;
            targetId?: undefined;
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
                description: string;
                enum?: undefined;
            };
            id: {
                type: string;
                description: string;
            };
            targetType: {
                type: string;
                description: string;
            };
            targetId: {
                type: string;
                description: string;
            };
            name?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            capacity?: undefined;
            contact_name?: undefined;
            external_key?: undefined;
            updates?: undefined;
            types?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=infrastructure-definitions.d.ts.map