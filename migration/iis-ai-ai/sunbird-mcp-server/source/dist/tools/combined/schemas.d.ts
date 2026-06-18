import { z } from 'zod';
export declare const getRackSummarySchema: z.ZodEffects<z.ZodObject<{
    cabinetId: z.ZodOptional<z.ZodNumber>;
    cabinetName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}>, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}, {
    cabinetId?: number | undefined;
    cabinetName?: string | undefined;
}>;
export declare const findCapacitySchema: z.ZodObject<{
    requiredU: z.ZodNumber;
    requiredPowerKw: z.ZodNumber;
    requiredPorts: z.ZodOptional<z.ZodNumber>;
    locationId: z.ZodOptional<z.ZodNumber>;
    contiguous: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    requiredU: number;
    requiredPowerKw: number;
    contiguous: boolean;
    locationId?: number | undefined;
    requiredPorts?: number | undefined;
}, {
    requiredU: number;
    requiredPowerKw: number;
    locationId?: number | undefined;
    requiredPorts?: number | undefined;
    contiguous?: boolean | undefined;
}>;
export declare const getHealthStatusSchema: z.ZodObject<{
    locationId: z.ZodOptional<z.ZodNumber>;
    includeAlerts: z.ZodDefault<z.ZodBoolean>;
    includePUE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    includeAlerts: boolean;
    includePUE: boolean;
    locationId?: number | undefined;
}, {
    locationId?: number | undefined;
    includeAlerts?: boolean | undefined;
    includePUE?: boolean | undefined;
}>;
export declare const identifyGhostServersSchema: z.ZodObject<{
    locationId: z.ZodOptional<z.ZodNumber>;
    powerThresholdWatts: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    powerThresholdWatts: number;
    locationId?: number | undefined;
}, {
    locationId?: number | undefined;
    powerThresholdWatts?: number | undefined;
}>;
export declare const getPowerChainSchema: z.ZodObject<{
    itemId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    itemId: number;
}, {
    itemId: number;
}>;
export declare const thermalAnalysisSchema: z.ZodObject<{
    locationId: z.ZodOptional<z.ZodNumber>;
    cabinetId: z.ZodOptional<z.ZodNumber>;
    includeRecommendations: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    includeRecommendations: boolean;
    locationId?: number | undefined;
    cabinetId?: number | undefined;
}, {
    locationId?: number | undefined;
    cabinetId?: number | undefined;
    includeRecommendations?: boolean | undefined;
}>;
//# sourceMappingURL=schemas.d.ts.map