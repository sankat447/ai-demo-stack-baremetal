/**
 * Zod validation schemas for dcTrack WRITE tools.
 */
import { z } from 'zod';
export declare const createItemSchema: z.ZodObject<{
    tiName: z.ZodString;
    tiClass: z.ZodString;
    cmbLocation: z.ZodOptional<z.ZodString>;
    locationName: z.ZodOptional<z.ZodString>;
    cabinetId: z.ZodOptional<z.ZodNumber>;
    cabinetName: z.ZodOptional<z.ZodString>;
    make: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    tiUPosition: z.ZodOptional<z.ZodNumber>;
    tiMounting: z.ZodOptional<z.ZodString>;
    radioRailsUsed: z.ZodOptional<z.ZodEnum<["Front", "Rear", "Both"]>>;
    radioDepthPosition: z.ZodOptional<z.ZodEnum<["Front", "Back"]>>;
    modelId: z.ZodOptional<z.ZodNumber>;
    tiSerialNumber: z.ZodOptional<z.ZodString>;
    tiAssetTag: z.ZodOptional<z.ZodString>;
    cmbStatus: z.ZodOptional<z.ZodEnum<["Planned", "Installed", "PoweredOff", "Storage", "Archived"]>>;
    customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    tiClass: string;
    tiName: string;
    cmbLocation?: string | undefined;
    cmbStatus?: "Installed" | "Planned" | "PoweredOff" | "Storage" | "Archived" | undefined;
    tiSerialNumber?: string | undefined;
    model?: string | undefined;
    make?: string | undefined;
    tiUPosition?: number | undefined;
    tiMounting?: string | undefined;
    radioRailsUsed?: "Both" | "Front" | "Rear" | undefined;
    radioDepthPosition?: "Front" | "Back" | undefined;
    tiAssetTag?: string | undefined;
    locationName?: string | undefined;
    modelId?: number | undefined;
    customFields?: Record<string, any> | undefined;
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}, {
    tiClass: string;
    tiName: string;
    cmbLocation?: string | undefined;
    cmbStatus?: "Installed" | "Planned" | "PoweredOff" | "Storage" | "Archived" | undefined;
    tiSerialNumber?: string | undefined;
    model?: string | undefined;
    make?: string | undefined;
    tiUPosition?: number | undefined;
    tiMounting?: string | undefined;
    radioRailsUsed?: "Both" | "Front" | "Rear" | undefined;
    radioDepthPosition?: "Front" | "Back" | undefined;
    tiAssetTag?: string | undefined;
    locationName?: string | undefined;
    modelId?: number | undefined;
    customFields?: Record<string, any> | undefined;
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}>;
export declare const updateItemSchema: z.ZodObject<{
    itemId: z.ZodOptional<z.ZodNumber>;
    itemName: z.ZodOptional<z.ZodString>;
    updates: z.ZodObject<{
        tiName: z.ZodOptional<z.ZodString>;
        cmbStatus: z.ZodOptional<z.ZodString>;
        tiSerialNumber: z.ZodOptional<z.ZodString>;
        tiAssetTag: z.ZodOptional<z.ZodString>;
        cabinetId: z.ZodOptional<z.ZodNumber>;
        tiUPosition: z.ZodOptional<z.ZodNumber>;
        cmbRowLabel: z.ZodOptional<z.ZodString>;
        cmbRowPosition: z.ZodOptional<z.ZodNumber>;
        customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        tiName: z.ZodOptional<z.ZodString>;
        cmbStatus: z.ZodOptional<z.ZodString>;
        tiSerialNumber: z.ZodOptional<z.ZodString>;
        tiAssetTag: z.ZodOptional<z.ZodString>;
        cabinetId: z.ZodOptional<z.ZodNumber>;
        tiUPosition: z.ZodOptional<z.ZodNumber>;
        cmbRowLabel: z.ZodOptional<z.ZodString>;
        cmbRowPosition: z.ZodOptional<z.ZodNumber>;
        customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        tiName: z.ZodOptional<z.ZodString>;
        cmbStatus: z.ZodOptional<z.ZodString>;
        tiSerialNumber: z.ZodOptional<z.ZodString>;
        tiAssetTag: z.ZodOptional<z.ZodString>;
        cabinetId: z.ZodOptional<z.ZodNumber>;
        tiUPosition: z.ZodOptional<z.ZodNumber>;
        cmbRowLabel: z.ZodOptional<z.ZodString>;
        cmbRowPosition: z.ZodOptional<z.ZodNumber>;
        customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    updates: {
        tiName?: string | undefined;
        cmbStatus?: string | undefined;
        tiSerialNumber?: string | undefined;
        tiUPosition?: number | undefined;
        tiAssetTag?: string | undefined;
        customFields?: Record<string, any> | undefined;
        cmbRowPosition?: number | undefined;
        cabinetId?: number | undefined;
        cmbRowLabel?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    itemId?: number | undefined;
    itemName?: string | undefined;
}, {
    updates: {
        tiName?: string | undefined;
        cmbStatus?: string | undefined;
        tiSerialNumber?: string | undefined;
        tiUPosition?: number | undefined;
        tiAssetTag?: string | undefined;
        customFields?: Record<string, any> | undefined;
        cmbRowPosition?: number | undefined;
        cabinetId?: number | undefined;
        cmbRowLabel?: string | undefined;
    } & {
        [k: string]: unknown;
    };
    itemId?: number | undefined;
    itemName?: string | undefined;
}>;
export declare const moveItemSchema: z.ZodObject<{
    itemId: z.ZodOptional<z.ZodNumber>;
    itemName: z.ZodOptional<z.ZodString>;
    targetCabinetId: z.ZodOptional<z.ZodNumber>;
    targetCabinetName: z.ZodOptional<z.ZodString>;
    targetUPosition: z.ZodNumber;
    targetMounting: z.ZodOptional<z.ZodEnum<["Front", "Rear", "ZeroU"]>>;
}, "strip", z.ZodTypeAny, {
    targetUPosition: number;
    itemId?: number | undefined;
    itemName?: string | undefined;
    targetCabinetId?: number | undefined;
    targetCabinetName?: string | undefined;
    targetMounting?: "Front" | "Rear" | "ZeroU" | undefined;
}, {
    targetUPosition: number;
    itemId?: number | undefined;
    itemName?: string | undefined;
    targetCabinetId?: number | undefined;
    targetCabinetName?: string | undefined;
    targetMounting?: "Front" | "Rear" | "ZeroU" | undefined;
}>;
export declare const deleteItemSchema: z.ZodObject<{
    itemId: z.ZodOptional<z.ZodNumber>;
    itemName: z.ZodOptional<z.ZodString>;
    force: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    force: boolean;
    itemId?: number | undefined;
    itemName?: string | undefined;
}, {
    itemId?: number | undefined;
    itemName?: string | undefined;
    force?: boolean | undefined;
}>;
export declare const createConnectionSchema: z.ZodObject<{
    sourceItemId: z.ZodOptional<z.ZodNumber>;
    sourceItemName: z.ZodOptional<z.ZodString>;
    sourcePortId: z.ZodOptional<z.ZodNumber>;
    sourcePortName: z.ZodOptional<z.ZodString>;
    destItemId: z.ZodOptional<z.ZodNumber>;
    destItemName: z.ZodOptional<z.ZodString>;
    destPortId: z.ZodOptional<z.ZodNumber>;
    destPortName: z.ZodOptional<z.ZodString>;
    cableId: z.ZodOptional<z.ZodString>;
    connectionType: z.ZodOptional<z.ZodEnum<["Power", "Network", "Fiber", "Serial", "KVM"]>>;
}, "strip", z.ZodTypeAny, {
    sourceItemId?: number | undefined;
    sourceItemName?: string | undefined;
    sourcePortId?: number | undefined;
    sourcePortName?: string | undefined;
    destItemId?: number | undefined;
    destItemName?: string | undefined;
    destPortId?: number | undefined;
    destPortName?: string | undefined;
    cableId?: string | undefined;
    connectionType?: "Power" | "Network" | "Fiber" | "Serial" | "KVM" | undefined;
}, {
    sourceItemId?: number | undefined;
    sourceItemName?: string | undefined;
    sourcePortId?: number | undefined;
    sourcePortName?: string | undefined;
    destItemId?: number | undefined;
    destItemName?: string | undefined;
    destPortId?: number | undefined;
    destPortName?: string | undefined;
    cableId?: string | undefined;
    connectionType?: "Power" | "Network" | "Fiber" | "Serial" | "KVM" | undefined;
}>;
export declare const deleteConnectionSchema: z.ZodObject<{
    connectionId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    connectionId: number;
}, {
    connectionId: number;
}>;
export declare const createChangeRequestSchema: z.ZodObject<{
    requestType: z.ZodDefault<z.ZodOptional<z.ZodEnum<["Install", "Move", "Decommission", "PowerOn", "PowerOff", "Other"]>>>;
    summary: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    itemIds: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    itemName: z.ZodOptional<z.ZodString>;
    scheduledDate: z.ZodOptional<z.ZodString>;
    assignee: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<["Low", "Medium", "High", "Critical"]>>;
}, "strip", z.ZodTypeAny, {
    requestType: "Install" | "Move" | "Decommission" | "PowerOn" | "PowerOff" | "Other";
    summary: string;
    itemName?: string | undefined;
    priority?: "Low" | "Medium" | "High" | "Critical" | undefined;
    description?: string | undefined;
    itemIds?: number[] | undefined;
    scheduledDate?: string | undefined;
    assignee?: string | undefined;
}, {
    summary: string;
    requestType?: "Install" | "Move" | "Decommission" | "PowerOn" | "PowerOff" | "Other" | undefined;
    itemName?: string | undefined;
    priority?: "Low" | "Medium" | "High" | "Critical" | undefined;
    description?: string | undefined;
    itemIds?: number[] | undefined;
    scheduledDate?: string | undefined;
    assignee?: string | undefined;
}>;
export declare const updateChangeRequestSchema: z.ZodObject<{
    requestId: z.ZodNumber;
    status: z.ZodOptional<z.ZodEnum<["Draft", "Submitted", "Approved", "InProgress", "Completed", "Cancelled"]>>;
    comments: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    requestId: number;
    status?: "Completed" | "Cancelled" | "Draft" | "Submitted" | "Approved" | "InProgress" | undefined;
    comments?: string | undefined;
}, {
    requestId: number;
    status?: "Completed" | "Cancelled" | "Draft" | "Submitted" | "Approved" | "InProgress" | undefined;
    comments?: string | undefined;
}>;
export declare const bulkImportSchema: z.ZodObject<{
    importType: z.ZodEnum<["items", "connections", "models"]>;
    data: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">;
    options: z.ZodOptional<z.ZodObject<{
        updateExisting: z.ZodDefault<z.ZodBoolean>;
        validateOnly: z.ZodDefault<z.ZodBoolean>;
        templateId: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        updateExisting: boolean;
        validateOnly: boolean;
        templateId?: number | undefined;
    }, {
        templateId?: number | undefined;
        updateExisting?: boolean | undefined;
        validateOnly?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, any>[];
    importType: "items" | "connections" | "models";
    options?: {
        updateExisting: boolean;
        validateOnly: boolean;
        templateId?: number | undefined;
    } | undefined;
}, {
    data: Record<string, any>[];
    importType: "items" | "connections" | "models";
    options?: {
        templateId?: number | undefined;
        updateExisting?: boolean | undefined;
        validateOnly?: boolean | undefined;
    } | undefined;
}>;
export declare const bulkUpdateSchema: z.ZodObject<{
    itemIds: z.ZodArray<z.ZodNumber, "many">;
    updates: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    updates: Record<string, any>;
    itemIds: number[];
}, {
    updates: Record<string, any>;
    itemIds: number[];
}>;
export declare const createCabinetSchema: z.ZodObject<{
    name: z.ZodString;
    locationId: z.ZodOptional<z.ZodNumber>;
    locationName: z.ZodOptional<z.ZodString>;
    make: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    modelId: z.ZodOptional<z.ZodNumber>;
    ruHeight: z.ZodDefault<z.ZodNumber>;
    ratedPowerKw: z.ZodOptional<z.ZodNumber>;
    rowPosition: z.ZodOptional<z.ZodNumber>;
    customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodString;
    locationId: z.ZodOptional<z.ZodNumber>;
    locationName: z.ZodOptional<z.ZodString>;
    make: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    modelId: z.ZodOptional<z.ZodNumber>;
    ruHeight: z.ZodDefault<z.ZodNumber>;
    ratedPowerKw: z.ZodOptional<z.ZodNumber>;
    rowPosition: z.ZodOptional<z.ZodNumber>;
    customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodString;
    locationId: z.ZodOptional<z.ZodNumber>;
    locationName: z.ZodOptional<z.ZodString>;
    make: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    modelId: z.ZodOptional<z.ZodNumber>;
    ruHeight: z.ZodDefault<z.ZodNumber>;
    ratedPowerKw: z.ZodOptional<z.ZodNumber>;
    rowPosition: z.ZodOptional<z.ZodNumber>;
    customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const createLocationSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["Site", "Building", "Floor", "Room", "Aisle", "Row"]>;
    parentId: z.ZodOptional<z.ZodNumber>;
    code: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    customFields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    type: "Site" | "Building" | "Floor" | "Room" | "Aisle" | "Row";
    name: string;
    code?: string | undefined;
    parentId?: number | undefined;
    customFields?: Record<string, any> | undefined;
    address?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
}, {
    type: "Site" | "Building" | "Floor" | "Room" | "Aisle" | "Row";
    name: string;
    code?: string | undefined;
    parentId?: number | undefined;
    customFields?: Record<string, any> | undefined;
    address?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
}>;
//# sourceMappingURL=write-schemas.d.ts.map