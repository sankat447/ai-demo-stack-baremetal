import { z } from 'zod';
export declare const listDatacentersSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const listPDUsSchema: z.ZodObject<{
    datacenterId: z.ZodOptional<z.ZodNumber>;
    cabinetId: z.ZodOptional<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    cabinetId?: number | undefined;
    datacenterId?: number | undefined;
}, {
    pageSize?: number | undefined;
    cabinetId?: number | undefined;
    datacenterId?: number | undefined;
}>;
export declare const getPDUSchema: z.ZodObject<{
    pduId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pduId: number;
}, {
    pduId: number;
}>;
export declare const getPDUReadingsSchema: z.ZodObject<{
    pduId: z.ZodNumber;
    includeOutlets: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    pduId: number;
    includeOutlets: boolean;
}, {
    pduId: number;
    includeOutlets?: boolean | undefined;
}>;
export declare const listSensorsSchema: z.ZodObject<{
    sensorType: z.ZodOptional<z.ZodEnum<["temperature", "humidity", "airflow", "pressure"]>>;
    cabinetId: z.ZodOptional<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    cabinetId?: number | undefined;
    sensorType?: "temperature" | "humidity" | "airflow" | "pressure" | undefined;
}, {
    pageSize?: number | undefined;
    cabinetId?: number | undefined;
    sensorType?: "temperature" | "humidity" | "airflow" | "pressure" | undefined;
}>;
export declare const getSensorReadingsSchema: z.ZodObject<{
    sensorId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    sensorId: number;
}, {
    sensorId: number;
}>;
export declare const getPUESchema: z.ZodObject<{
    datacenterId: z.ZodOptional<z.ZodNumber>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    resolution: z.ZodDefault<z.ZodEnum<["hourly", "daily", "weekly", "monthly"]>>;
}, "strip", z.ZodTypeAny, {
    resolution: "hourly" | "daily" | "weekly" | "monthly";
    datacenterId?: number | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}, {
    datacenterId?: number | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    resolution?: "hourly" | "daily" | "weekly" | "monthly" | undefined;
}>;
export declare const listAlertsSchema: z.ZodObject<{
    severity: z.ZodOptional<z.ZodEnum<["critical", "warning", "info"]>>;
    type: z.ZodOptional<z.ZodEnum<["power", "environmental", "device", "connectivity"]>>;
    acknowledged: z.ZodOptional<z.ZodBoolean>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    type?: "power" | "environmental" | "device" | "connectivity" | undefined;
    severity?: "info" | "critical" | "warning" | undefined;
    acknowledged?: boolean | undefined;
}, {
    type?: "power" | "environmental" | "device" | "connectivity" | undefined;
    limit?: number | undefined;
    severity?: "info" | "critical" | "warning" | undefined;
    acknowledged?: boolean | undefined;
}>;
export declare const listITDevicesSchema: z.ZodObject<{
    cabinetId: z.ZodOptional<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pageSize: number;
    cabinetId?: number | undefined;
}, {
    pageSize?: number | undefined;
    cabinetId?: number | undefined;
}>;
export declare const getOutletReadingsSchema: z.ZodObject<{
    pduId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pduId: number;
}, {
    pduId: number;
}>;
//# sourceMappingURL=schemas.d.ts.map