/**
 * MCP tool definitions for dcTrack admin/configuration operations.
 *
 * Each object matches the MCP SDK Tool shape: name, description, inputSchema.
 */
export declare const dctrackAdminToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            customFieldId: {
                type: string;
                description: string;
            };
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            label: {
                type: string;
                description: string;
            };
            fieldType: {
                type: string;
                description: string;
            };
            appliedTo: {
                type: string;
                description: string;
            };
            options: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            customFieldId?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            customFieldId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            filters: {
                type: string;
                description: string;
            };
            selectedColumns: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            pageNumber: {
                type: string;
                description: string;
                default: number;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            chartId: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            chartId: {
                type: string;
                description: string;
            };
            params: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            panelItemId: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            panelItemId: {
                type: string;
                description: string;
            };
            breaker: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            panelItemId: {
                type: string;
                description: string;
            };
            breakerPortId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            breaker?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            panelItemId: {
                type: string;
                description: string;
            };
            breakerPortId: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            breaker?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            listType: {
                type: string;
                description: string;
            };
            id: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            listType: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            config: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
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
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            relationship: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            params: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            permission: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            permissionId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            permissionId: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            locationId?: undefined;
            username?: undefined;
            entityType?: undefined;
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
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            username?: undefined;
            entityType?: undefined;
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
                description: string;
            };
            config: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            username?: undefined;
            entityType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            username: {
                type: string;
                description: string;
            };
            entityType: {
                type: string;
                description: string;
            };
            customFieldId?: undefined;
            label?: undefined;
            fieldType?: undefined;
            appliedTo?: undefined;
            options?: undefined;
            updates?: undefined;
            filters?: undefined;
            selectedColumns?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            chartId?: undefined;
            params?: undefined;
            panelItemId?: undefined;
            breaker?: undefined;
            breakerPortId?: undefined;
            listType?: undefined;
            id?: undefined;
            config?: undefined;
            relationship?: undefined;
            permission?: undefined;
            permissionId?: undefined;
            locationId?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=admin-definitions.d.ts.map