/**
 * Central tool registry.
 *
 * Aggregates every tool definition and routes incoming tool calls to
 * the correct domain handler.  This is the single entry point used by
 * both the MCP server and the HTTP transport.
 */
export declare const allToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            parentId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
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
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            minAvailableRu: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            query: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            cabinetId: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            connectionId: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            query: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            name?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tiName: {
                type: string;
                description: string;
            };
            tiClass: {
                type: string;
                description: string;
            };
            locationName: {
                type: string;
                description: string;
            };
            cmbLocation: {
                type: string;
                description: string;
            };
            cabinetName: {
                type: string;
                description: string;
            };
            cabinetId: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            model: {
                type: string;
                description: string;
            };
            tiUPosition: {
                type: string;
                description: string;
            };
            tiMounting: {
                type: string;
                enum: string[];
                description: string;
            };
            modelId: {
                type: string;
                description: string;
            };
            tiSerialNumber: {
                type: string;
                description: string;
            };
            tiAssetTag: {
                type: string;
                description: string;
            };
            cmbStatus: {
                type: string;
                enum: string[];
            };
            customFields: {
                type: string;
                description: string;
            };
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            targetCabinetId: {
                type: string;
                description: string;
            };
            targetCabinetName: {
                type: string;
                description: string;
            };
            targetUPosition: {
                type: string;
                description: string;
            };
            targetMounting: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            updates?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            force: {
                type: string;
                description: string;
                default: boolean;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sourceItemId: {
                type: string;
                description: string;
            };
            sourceItemName: {
                type: string;
                description: string;
            };
            sourcePortName: {
                type: string;
                description: string;
            };
            destItemId: {
                type: string;
                description: string;
            };
            destItemName: {
                type: string;
                description: string;
            };
            destPortName: {
                type: string;
                description: string;
            };
            connectionType: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            connectionId: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            requestType: {
                type: string;
                enum: string[];
                description: string;
            };
            summary: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            itemIds: {
                type: string;
                items: {
                    type: string;
                };
            };
            itemName: {
                type: string;
                description: string;
            };
            scheduledDate: {
                type: string;
            };
            assignee: {
                type: string;
            };
            priority: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            requestId: {
                type: string;
            };
            status: {
                type: string;
                enum: string[];
            };
            comments: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            importType: {
                type: string;
                enum: string[];
            };
            data: {
                type: string;
                items: {
                    type: string;
                };
            };
            options: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemIds: {
                type: string;
                items: {
                    type: string;
                };
            };
            updates: {
                type: string;
                description?: undefined;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
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
            locationName: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            model: {
                type: string;
                description: string;
            };
            ruHeight: {
                type: string;
                default: number;
            };
            ratedPowerKw: {
                type: string;
            };
            rowPosition: {
                type: string;
            };
            customFields: {
                type: string;
                description?: undefined;
            };
            tiName?: undefined;
            tiClass?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
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
                description?: undefined;
            };
            type: {
                type: string;
                enum: string[];
            };
            parentId: {
                type: string;
            };
            code: {
                type: string;
            };
            address: {
                type: string;
            };
            city: {
                type: string;
            };
            state: {
                type: string;
            };
            country: {
                type: string;
            };
            customFields: {
                type: string;
                description?: undefined;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            templateType: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            templateId: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            importType: {
                type: string;
                enum: string[];
            };
            data: {
                type: string;
                items: {
                    type: string;
                };
            };
            templateId: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId: {
                type: string;
                description: string;
            };
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeName: {
                type: string;
                description: string;
            };
            accountNumber: {
                type: string;
                description: string;
            };
            aliases: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            notes: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            searchString: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            model: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            subclass: {
                type: string;
                description: string;
            };
            mounting: {
                type: string;
                enum: string[];
                description: string;
            };
            formFactor: {
                type: string;
                enum: string[];
                description: string;
            };
            ruHeight: {
                type: string;
                description: string;
            };
            dimHeight: {
                type: string;
                description: string;
            };
            dimWidth: {
                type: string;
                description: string;
            };
            dimDepth: {
                type: string;
                description: string;
            };
            weight: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            model: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
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
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId?: undefined;
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
            updates?: undefined;
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
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId: {
                type: string;
                description: string;
            };
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portName: {
                type: string;
                description: string;
            };
            portSubclass: {
                type: string;
                description: string;
            };
            connector: {
                type: string;
                description: string;
            };
            mediaType: {
                type: string;
                description: string;
            };
            protocol: {
                type: string;
                description: string;
            };
            dataRate: {
                type: string;
                description: string;
            };
            portId?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
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
            nodeFields: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            itemId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            portId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            portId: {
                type: string;
                description: string;
            };
            readings: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            itemIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            locationName: {
                type: string;
                description: string;
            };
            locationIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            minAvailableRUs: {
                type: string;
                description: string;
            };
            minAvailablePowerKw: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
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
                description: string;
            };
            ruNeeded: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            locationId: {
                type: string;
                description: string;
            };
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            subLocationId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            name?: undefined;
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
            name: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketId: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketDesc: {
                type: string;
                description: string;
            };
            summary: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            severity: {
                type: string;
                description: string;
            };
            ticketPurpose: {
                type: string;
                description: string;
            };
            ticketType: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            assignedTo: {
                type: string;
                description: string;
            };
            ticketComments: {
                type: string;
                description: string;
            };
            ticketId?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
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
            ticketId?: undefined;
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            entityType: {
                type: string;
                description: string;
            };
            ticketId: {
                type: string;
                description: string;
            };
            entityId: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            projectId: {
                type: string;
                description: string;
            };
            projectName: {
                type: string;
                description: string;
            };
            projectNumber?: undefined;
            location?: undefined;
            description?: undefined;
            status?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            projectManager?: undefined;
            updates?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            projectName: {
                type: string;
                description: string;
            };
            projectNumber: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                description: string;
            };
            startDate: {
                type: string;
                description: string;
            };
            endDate: {
                type: string;
                description: string;
            };
            projectManager: {
                type: string;
                description: string;
            };
            projectId?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            projectId: {
                type: string;
                description: string;
            };
            projectName: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            projectNumber?: undefined;
            location?: undefined;
            description?: undefined;
            status?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            projectManager?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            className: {
                type: string;
                description: string;
            };
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelName: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
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
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partModelId: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            quantity: {
                type: string;
                description: string;
            };
            serialNumber: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            activity: {
                type: string;
                enum: string[];
                description: string;
            };
            quantity: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assignmentType: {
                type: string;
                enum: string[];
                description: string;
            };
            assignments: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
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
} | {
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
} | {
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
} | {
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
            id?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tagGroupId: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tagId: {
                type: string;
                description: string;
            };
            taggable_type: {
                type: string;
                description: string;
            };
            taggable_id: {
                type: string;
                description: string;
            };
            id?: undefined;
            name?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
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
        };
        required: string[];
    };
} | {
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
export declare function handleToolCall(toolName: string, args: Record<string, any>): Promise<any>;
export declare function getToolDefinition(toolName: string): {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            parentId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
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
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            minAvailableRu: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            query: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            cabinetId: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            connectionId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            connectionId: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            make?: undefined;
            modelId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            query: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
                default: number;
            };
            parentId?: undefined;
            type?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            name?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            modelId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            parentId?: undefined;
            type?: undefined;
            pageSize?: undefined;
            locationId?: undefined;
            location?: undefined;
            cabinetId?: undefined;
            cabinetName?: undefined;
            minAvailableRu?: undefined;
            query?: undefined;
            name?: undefined;
            class?: undefined;
            status?: undefined;
            itemId?: undefined;
            connectionId?: undefined;
            make?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tiName: {
                type: string;
                description: string;
            };
            tiClass: {
                type: string;
                description: string;
            };
            locationName: {
                type: string;
                description: string;
            };
            cmbLocation: {
                type: string;
                description: string;
            };
            cabinetName: {
                type: string;
                description: string;
            };
            cabinetId: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            model: {
                type: string;
                description: string;
            };
            tiUPosition: {
                type: string;
                description: string;
            };
            tiMounting: {
                type: string;
                enum: string[];
                description: string;
            };
            modelId: {
                type: string;
                description: string;
            };
            tiSerialNumber: {
                type: string;
                description: string;
            };
            tiAssetTag: {
                type: string;
                description: string;
            };
            cmbStatus: {
                type: string;
                enum: string[];
            };
            customFields: {
                type: string;
                description: string;
            };
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            targetCabinetId: {
                type: string;
                description: string;
            };
            targetCabinetName: {
                type: string;
                description: string;
            };
            targetUPosition: {
                type: string;
                description: string;
            };
            targetMounting: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            updates?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            force: {
                type: string;
                description: string;
                default: boolean;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            sourceItemId: {
                type: string;
                description: string;
            };
            sourceItemName: {
                type: string;
                description: string;
            };
            sourcePortName: {
                type: string;
                description: string;
            };
            destItemId: {
                type: string;
                description: string;
            };
            destItemName: {
                type: string;
                description: string;
            };
            destPortName: {
                type: string;
                description: string;
            };
            connectionType: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            connectionId: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            requestType: {
                type: string;
                enum: string[];
                description: string;
            };
            summary: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            itemIds: {
                type: string;
                items: {
                    type: string;
                };
            };
            itemName: {
                type: string;
                description: string;
            };
            scheduledDate: {
                type: string;
            };
            assignee: {
                type: string;
            };
            priority: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            requestId: {
                type: string;
            };
            status: {
                type: string;
                enum: string[];
            };
            comments: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            importType: {
                type: string;
                enum: string[];
            };
            data: {
                type: string;
                items: {
                    type: string;
                };
            };
            options: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemIds: {
                type: string;
                items: {
                    type: string;
                };
            };
            updates: {
                type: string;
                description?: undefined;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
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
            locationName: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            model: {
                type: string;
                description: string;
            };
            ruHeight: {
                type: string;
                default: number;
            };
            ratedPowerKw: {
                type: string;
            };
            rowPosition: {
                type: string;
            };
            customFields: {
                type: string;
                description?: undefined;
            };
            tiName?: undefined;
            tiClass?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
            templateId?: undefined;
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
                description?: undefined;
            };
            type: {
                type: string;
                enum: string[];
            };
            parentId: {
                type: string;
            };
            code: {
                type: string;
            };
            address: {
                type: string;
            };
            city: {
                type: string;
            };
            state: {
                type: string;
            };
            country: {
                type: string;
            };
            customFields: {
                type: string;
                description?: undefined;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            templateType?: undefined;
            templateId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            templateType: {
                type: string;
                enum: string[];
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            templateId: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            importType?: undefined;
            data?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            importType: {
                type: string;
                enum: string[];
            };
            data: {
                type: string;
                items: {
                    type: string;
                };
            };
            templateId: {
                type: string;
            };
            tiName?: undefined;
            tiClass?: undefined;
            locationName?: undefined;
            cmbLocation?: undefined;
            cabinetName?: undefined;
            cabinetId?: undefined;
            make?: undefined;
            model?: undefined;
            tiUPosition?: undefined;
            tiMounting?: undefined;
            modelId?: undefined;
            tiSerialNumber?: undefined;
            tiAssetTag?: undefined;
            cmbStatus?: undefined;
            customFields?: undefined;
            itemId?: undefined;
            itemName?: undefined;
            updates?: undefined;
            targetCabinetId?: undefined;
            targetCabinetName?: undefined;
            targetUPosition?: undefined;
            targetMounting?: undefined;
            force?: undefined;
            sourceItemId?: undefined;
            sourceItemName?: undefined;
            sourcePortName?: undefined;
            destItemId?: undefined;
            destItemName?: undefined;
            destPortName?: undefined;
            connectionType?: undefined;
            connectionId?: undefined;
            requestType?: undefined;
            summary?: undefined;
            description?: undefined;
            itemIds?: undefined;
            scheduledDate?: undefined;
            assignee?: undefined;
            priority?: undefined;
            requestId?: undefined;
            status?: undefined;
            comments?: undefined;
            options?: undefined;
            name?: undefined;
            locationId?: undefined;
            ruHeight?: undefined;
            ratedPowerKw?: undefined;
            rowPosition?: undefined;
            type?: undefined;
            parentId?: undefined;
            code?: undefined;
            address?: undefined;
            city?: undefined;
            state?: undefined;
            country?: undefined;
            templateType?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId: {
                type: string;
                description: string;
            };
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeName: {
                type: string;
                description: string;
            };
            accountNumber: {
                type: string;
                description: string;
            };
            aliases: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            notes: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            makeId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            searchString: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            model: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            class: {
                type: string;
                description: string;
            };
            subclass: {
                type: string;
                description: string;
            };
            mounting: {
                type: string;
                enum: string[];
                description: string;
            };
            formFactor: {
                type: string;
                enum: string[];
                description: string;
            };
            ruHeight: {
                type: string;
                description: string;
            };
            dimHeight: {
                type: string;
                description: string;
            };
            dimWidth: {
                type: string;
                description: string;
            };
            dimDepth: {
                type: string;
                description: string;
            };
            weight: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            model: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
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
            makeId?: undefined;
            makeName?: undefined;
            accountNumber?: undefined;
            aliases?: undefined;
            notes?: undefined;
            updates?: undefined;
            searchString?: undefined;
            model?: undefined;
            make?: undefined;
            class?: undefined;
            subclass?: undefined;
            mounting?: undefined;
            formFactor?: undefined;
            ruHeight?: undefined;
            dimHeight?: undefined;
            dimWidth?: undefined;
            dimDepth?: undefined;
            weight?: undefined;
            modelId?: undefined;
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
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId?: undefined;
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
            updates?: undefined;
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
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId: {
                type: string;
                description: string;
            };
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portName: {
                type: string;
                description: string;
            };
            portSubclass: {
                type: string;
                description: string;
            };
            connector: {
                type: string;
                description: string;
            };
            mediaType: {
                type: string;
                description: string;
            };
            protocol: {
                type: string;
                description: string;
            };
            dataRate: {
                type: string;
                description: string;
            };
            portId?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            itemId: {
                type: string;
                description: string;
            };
            itemName: {
                type: string;
                description: string;
            };
            portId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            portName?: undefined;
            portSubclass?: undefined;
            connector?: undefined;
            mediaType?: undefined;
            protocol?: undefined;
            dataRate?: undefined;
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
            nodeFields: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            itemId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            portId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            portId: {
                type: string;
                description: string;
            };
            readings: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            itemIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            locationName: {
                type: string;
                description: string;
            };
            locationIds: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            minAvailableRUs: {
                type: string;
                description: string;
            };
            minAvailablePowerKw: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
            type?: undefined;
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
                description: string;
            };
            ruNeeded: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            locationId: {
                type: string;
                description: string;
            };
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
            name?: undefined;
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
            subLocationId: {
                type: string;
                description: string;
            };
            locationId?: undefined;
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            name?: undefined;
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
            name: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            type: {
                type: string;
                description: string;
            };
            nodeFields?: undefined;
            itemId?: undefined;
            portId?: undefined;
            readings?: undefined;
            itemIds?: undefined;
            locationName?: undefined;
            locationIds?: undefined;
            minAvailableRUs?: undefined;
            minAvailablePowerKw?: undefined;
            cabinetId?: undefined;
            ruNeeded?: undefined;
            subLocationId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketId: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketDesc: {
                type: string;
                description: string;
            };
            summary: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            priority: {
                type: string;
                description: string;
            };
            severity: {
                type: string;
                description: string;
            };
            ticketPurpose: {
                type: string;
                description: string;
            };
            ticketType: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            assignedTo: {
                type: string;
                description: string;
            };
            ticketComments: {
                type: string;
                description: string;
            };
            ticketId?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            ticketId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            entityType?: undefined;
            entityId?: undefined;
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
            ticketId?: undefined;
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            entityType?: undefined;
            entityId?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            entityType: {
                type: string;
                description: string;
            };
            ticketId: {
                type: string;
                description: string;
            };
            entityId: {
                type: string;
                description: string;
            };
            ticketDesc?: undefined;
            summary?: undefined;
            description?: undefined;
            priority?: undefined;
            severity?: undefined;
            ticketPurpose?: undefined;
            ticketType?: undefined;
            location?: undefined;
            assignedTo?: undefined;
            ticketComments?: undefined;
            updates?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            projectId: {
                type: string;
                description: string;
            };
            projectName: {
                type: string;
                description: string;
            };
            projectNumber?: undefined;
            location?: undefined;
            description?: undefined;
            status?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            projectManager?: undefined;
            updates?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            projectName: {
                type: string;
                description: string;
            };
            projectNumber: {
                type: string;
                description: string;
            };
            location: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                description: string;
            };
            startDate: {
                type: string;
                description: string;
            };
            endDate: {
                type: string;
                description: string;
            };
            projectManager: {
                type: string;
                description: string;
            };
            projectId?: undefined;
            updates?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            projectId: {
                type: string;
                description: string;
            };
            projectName: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            projectNumber?: undefined;
            location?: undefined;
            description?: undefined;
            status?: undefined;
            startDate?: undefined;
            endDate?: undefined;
            projectManager?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            className: {
                type: string;
                description: string;
            };
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            modelName: {
                type: string;
                description: string;
            };
            make: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
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
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partModelId: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            quantity: {
                type: string;
                description: string;
            };
            serialNumber: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            updates?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            activity?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            partId: {
                type: string;
                description: string;
            };
            activity: {
                type: string;
                enum: string[];
                description: string;
            };
            quantity: {
                type: string;
                description: string;
            };
            locationId: {
                type: string;
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partModelId?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            assignmentType?: undefined;
            assignments?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            assignmentType: {
                type: string;
                enum: string[];
                description: string;
            };
            assignments: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            className?: undefined;
            modelId?: undefined;
            modelName?: undefined;
            make?: undefined;
            filters?: undefined;
            pageNumber?: undefined;
            pageSize?: undefined;
            partId?: undefined;
            partModelId?: undefined;
            locationId?: undefined;
            quantity?: undefined;
            serialNumber?: undefined;
            updates?: undefined;
            activity?: undefined;
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
} | {
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
} | {
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
} | {
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
            id?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tagGroupId: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tagId: {
                type: string;
                description: string;
            };
            taggable_type: {
                type: string;
                description: string;
            };
            taggable_id: {
                type: string;
                description: string;
            };
            id?: undefined;
            name?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
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
        };
        required: string[];
    };
} | {
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
} | undefined;
export declare function listTools(): {
    name: string;
    description: string;
}[];
//# sourceMappingURL=registry.d.ts.map