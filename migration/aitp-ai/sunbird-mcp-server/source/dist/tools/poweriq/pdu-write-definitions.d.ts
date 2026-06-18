export declare const poweriqPduWriteToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ip_address: {
                type: string;
                description: string;
            };
            snmp_community_string: {
                type: string;
                description: string;
            };
            proxy_index: {
                type: string;
                description: string;
            };
            snmp3_enabled: {
                type: string;
                description: string;
            };
            snmp3_user: {
                type: string;
                description: string;
            };
            snmp3_auth_level: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            pdus?: undefined;
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
            ip_address?: undefined;
            snmp_community_string?: undefined;
            proxy_index?: undefined;
            snmp3_enabled?: undefined;
            snmp3_user?: undefined;
            snmp3_auth_level?: undefined;
            pdus?: undefined;
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
            ip_address?: undefined;
            snmp_community_string?: undefined;
            proxy_index?: undefined;
            snmp3_enabled?: undefined;
            snmp3_user?: undefined;
            snmp3_auth_level?: undefined;
            updates?: undefined;
            pdus?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            pdus: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            ip_address?: undefined;
            snmp_community_string?: undefined;
            proxy_index?: undefined;
            snmp3_enabled?: undefined;
            snmp3_user?: undefined;
            snmp3_auth_level?: undefined;
            id?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=pdu-write-definitions.d.ts.map