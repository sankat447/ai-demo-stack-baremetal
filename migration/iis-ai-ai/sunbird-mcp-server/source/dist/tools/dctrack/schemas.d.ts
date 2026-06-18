/**
 * Zod validation schemas for dcTrack read tools.
 */
import { z } from 'zod';
export declare const listLocationsSchema: z.ZodObject<{
    parentId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<["Site", "Building", "Floor", "Room", "Aisle", "Row"]>>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    type?: "Site" | "Building" | "Floor" | "Room" | "Aisle" | "Row" | undefined;
    parentId?: number | undefined;
}, {
    type?: "Site" | "Building" | "Floor" | "Room" | "Aisle" | "Row" | undefined;
    parentId?: number | undefined;
    pageSize?: number | undefined;
}>;
export declare const getLocationSchema: z.ZodObject<{
    locationId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    locationId: number;
}, {
    locationId: number;
}>;
export declare const listCabinetsSchema: z.ZodObject<{
    location: z.ZodOptional<z.ZodString>;
    locationId: z.ZodOptional<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    location?: string | undefined;
    locationId?: number | undefined;
}, {
    pageSize?: number | undefined;
    location?: string | undefined;
    locationId?: number | undefined;
}>;
export declare const getCabinetSchema: z.ZodObject<{
    cabinetId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    cabinetId: number;
}, {
    cabinetId: number;
}>;
export declare const getCabinetItemsSchema: z.ZodObject<{
    cabinetId: z.ZodOptional<z.ZodNumber>;
    cabinetName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}>;
export declare const getCabinetUMapSchema: z.ZodObject<{
    cabinetId: z.ZodOptional<z.ZodNumber>;
    cabinetName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}>;
export declare const getCabinetCapacitySchema: z.ZodObject<{
    cabinetId: z.ZodOptional<z.ZodNumber>;
    cabinetName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}>;
export declare const listCabinetsWithCapacitySchema: z.ZodObject<{
    location: z.ZodOptional<z.ZodString>;
    locationId: z.ZodOptional<z.ZodNumber>;
    minAvailableRu: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    location?: string | undefined;
    locationId?: number | undefined;
    minAvailableRu?: number | undefined;
}, {
    location?: string | undefined;
    locationId?: number | undefined;
    minAvailableRu?: number | undefined;
}>;
export declare const searchItemsSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    class: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    locationId: z.ZodOptional<z.ZodNumber>;
    cabinetId: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["Installed", "Planned", "PoweredOff", "Storage", "Archived"]>>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    status?: "Installed" | "Planned" | "PoweredOff" | "Storage" | "Archived" | undefined;
    location?: string | undefined;
    locationId?: number | undefined;
    query?: string | undefined;
    class?: string | undefined;
    name?: string | undefined;
    cabinetId?: number | undefined;
}, {
    status?: "Installed" | "Planned" | "PoweredOff" | "Storage" | "Archived" | undefined;
    pageSize?: number | undefined;
    location?: string | undefined;
    locationId?: number | undefined;
    query?: string | undefined;
    class?: string | undefined;
    name?: string | undefined;
    cabinetId?: number | undefined;
}>;
export declare const getItemSchema: z.ZodObject<{
    itemId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    itemId: number;
}, {
    itemId: number;
}>;
export declare const listConnectionsSchema: z.ZodObject<{
    itemId: z.ZodOptional<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    itemId?: number | undefined;
}, {
    pageSize?: number | undefined;
    itemId?: number | undefined;
}>;
export declare const getConnectionSchema: z.ZodObject<{
    connectionId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    connectionId: number;
}, {
    connectionId: number;
}>;
export declare const listModelsSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    class: z.ZodOptional<z.ZodString>;
    make: z.ZodOptional<z.ZodString>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    query?: string | undefined;
    class?: string | undefined;
    make?: string | undefined;
}, {
    pageSize?: number | undefined;
    query?: string | undefined;
    class?: string | undefined;
    make?: string | undefined;
}>;
export declare const getModelSchema: z.ZodObject<{
    modelId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    modelId: number;
}, {
    modelId: number;
}>;
//# sourceMappingURL=schemas.d.ts.map