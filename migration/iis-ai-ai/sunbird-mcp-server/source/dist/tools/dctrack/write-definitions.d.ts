/**
 * MCP tool definitions for dcTrack WRITE operations.
 */
export declare const dctrackWriteToolDefinitions: ({
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
})[];
//# sourceMappingURL=write-definitions.d.ts.map