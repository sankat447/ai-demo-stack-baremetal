/**
 * Power IQ REST API client.
 *
 * Encapsulates every Power IQ v2 API call used by the MCP tools.
 * Real-time readings bypass the cache (useCache = false).
 */
import { BaseClient } from './base-client.js';
import type { PowerIQDataCenter, PowerIQPDU, PowerIQPDUReading, PowerIQOutletReading, PowerIQSensor, PowerIQSensorReading, PowerIQPUE, PowerIQAlert, PowerIQITDevice, PowerIQFloor, PowerIQRoom, PowerIQRack, PowerIQInlet, PowerIQCircuit, PowerIQEvent, PowerIQJob, PowerIQReading, PowerIQSystemInfo, PowerIQAssetStrip, PowerIQRackUnit, PowerIQBladeSlot, PowerIQTagGroup, PowerIQTag, PowerIQTagEntry, PowerIQTransferSwitch, PowerIQOutlet, PowerIQPanel } from '../../types/index.js';
export declare class PowerIQClient extends BaseClient {
    constructor();
    listDataCenters(): Promise<PowerIQDataCenter[]>;
    listPDUs(params?: {
        datacenterId?: number;
        cabinetId?: number;
        pageSize?: number;
    }): Promise<PowerIQPDU[]>;
    getPDU(pduId: number): Promise<PowerIQPDU | null>;
    getPDUReadings(pduId: number): Promise<PowerIQPDUReading | null>;
    getOutletReadings(pduId: number): Promise<PowerIQOutletReading[]>;
    listSensors(params?: {
        sensorType?: string;
        cabinetId?: number;
        pageSize?: number;
    }): Promise<PowerIQSensor[]>;
    getSensorReadings(sensorId: number): Promise<PowerIQSensorReading | null>;
    /** Convenience: get temperature + humidity readings for a single cabinet. */
    getCabinetSensorReadings(cabinetId: number): Promise<{
        temperature: PowerIQSensorReading[];
        humidity: PowerIQSensorReading[];
    }>;
    getPUE(params?: {
        datacenterId?: number;
        startTime?: string;
        endTime?: string;
        resolution?: 'hourly' | 'daily' | 'weekly' | 'monthly';
    }): Promise<PowerIQPUE[]>;
    listAlerts(params?: {
        severity?: string;
        type?: string;
        acknowledged?: boolean;
        limit?: number;
    }): Promise<PowerIQAlert[]>;
    listITDevices(params?: {
        cabinetId?: number;
        pageSize?: number;
    }): Promise<PowerIQITDevice[]>;
    getDataCenter(id: number): Promise<PowerIQDataCenter | null>;
    createDataCenter(dc: Record<string, any>): Promise<PowerIQDataCenter>;
    updateDataCenter(id: number, updates: Record<string, any>): Promise<PowerIQDataCenter>;
    deleteDataCenter(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    listFloors(params?: Record<string, any>): Promise<PowerIQFloor[]>;
    listRooms(params?: Record<string, any>): Promise<PowerIQRoom[]>;
    listRacks(params?: Record<string, any>): Promise<PowerIQRack[]>;
    getRack(id: number): Promise<PowerIQRack | null>;
    getChildren(resourceType: string, id: number): Promise<any[]>;
    getDescendants(resourceType: string, id: number, types?: string[]): Promise<any[]>;
    moveResource(resourceType: string, id: number, targetType: string, targetId: number): Promise<any>;
    getExecutiveSummary(resourceType: string, id: number): Promise<any>;
    getLatestReading(resourceType: string, id: number, type?: string): Promise<any>;
    createPDU(pdu: Record<string, any>): Promise<PowerIQPDU>;
    updatePDU(id: number, updates: Record<string, any>): Promise<PowerIQPDU>;
    deletePDU(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    rescanPDU(id: number): Promise<any>;
    batchCreatePDUs(pdus: Record<string, any>[]): Promise<any>;
    batchDeletePDUs(pduIds: number[]): Promise<any>;
    listInlets(params?: Record<string, any>): Promise<PowerIQInlet[]>;
    getInlet(id: number): Promise<PowerIQInlet | null>;
    getInletReadings(inletId: number): Promise<PowerIQReading[]>;
    listCircuits(params?: Record<string, any>): Promise<PowerIQCircuit[]>;
    getCircuitReadings(circuitId: number): Promise<PowerIQReading[]>;
    getResourceReadings(resourceType: string, id: number): Promise<PowerIQReading[]>;
    getReadingsRollup(resourceType: string, id: number, interval: string): Promise<PowerIQReading[]>;
    getRackReadings(rackId: number): Promise<PowerIQReading[]>;
    listEvents(params?: Record<string, any>): Promise<PowerIQEvent[]>;
    getEvent(id: number): Promise<PowerIQEvent | null>;
    clearEvent(id: number): Promise<any>;
    clearEventsBatch(eventIds: number[]): Promise<any>;
    powerControlOutlets(outletIds: number[], state: string): Promise<any>;
    powerControlDevice(deviceId: number, state: string): Promise<any>;
    powerControlRack(rackId: number, state: string): Promise<any>;
    powerControlRoom(roomId: number, state: string): Promise<any>;
    getSystemInfo(): Promise<PowerIQSystemInfo>;
    listJobs(jobId?: number): Promise<PowerIQJob | PowerIQJob[]>;
    updateOutlet(id: number, updates: Record<string, any>): Promise<any>;
    renameOutletsBatch(outlets: Array<{
        id: number;
        name: string;
    }>): Promise<any>;
    listAssetStrips(params?: Record<string, any>): Promise<PowerIQAssetStrip[]>;
    getAssetStrip(id: number): Promise<PowerIQAssetStrip | null>;
    updateAssetStrip(id: number, updates: Record<string, any>): Promise<any>;
    getAssetStripRackUnits(assetStripId: number): Promise<PowerIQRackUnit[]>;
    listRackUnits(params?: Record<string, any>): Promise<PowerIQRackUnit[]>;
    getRackUnit(id: number): Promise<PowerIQRackUnit | null>;
    updateRackUnit(id: number, updates: Record<string, any>): Promise<any>;
    getRackUnitBladeSlots(rackUnitId: number): Promise<PowerIQBladeSlot[]>;
    listBladeSlots(params?: Record<string, any>): Promise<PowerIQBladeSlot[]>;
    getBladeSlot(id: number): Promise<PowerIQBladeSlot | null>;
    listTagGroups(): Promise<PowerIQTagGroup[]>;
    getTagGroup(id: number): Promise<PowerIQTagGroup | null>;
    createTagGroup(tagGroup: Record<string, any>): Promise<PowerIQTagGroup>;
    updateTagGroup(id: number, updates: Record<string, any>): Promise<PowerIQTagGroup>;
    deleteTagGroup(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    listTags(): Promise<PowerIQTag[]>;
    getTag(id: number): Promise<PowerIQTag | null>;
    createTag(tagGroupId: number, tag: Record<string, any>): Promise<PowerIQTag>;
    updateTag(id: number, updates: Record<string, any>): Promise<PowerIQTag>;
    deleteTag(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    createTagEntry(tagId: number, entry: Record<string, any>): Promise<PowerIQTagEntry>;
    deleteTagEntry(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    listTransferSwitches(params?: Record<string, any>): Promise<PowerIQTransferSwitch[]>;
    getTransferSwitch(id: number): Promise<PowerIQTransferSwitch | null>;
    getTransferSwitchStates(id: number): Promise<any[]>;
    listPanels(params?: Record<string, any>): Promise<PowerIQPanel[]>;
    getPanel(id: number): Promise<PowerIQPanel | null>;
    getPanelCircuits(panelId: number): Promise<any[]>;
    getPanelInlets(panelId: number): Promise<any[]>;
    listOutlets(params?: Record<string, any>): Promise<PowerIQOutlet[]>;
    getOutlet(id: number): Promise<PowerIQOutlet | null>;
    getFloorMapMappable(): Promise<any[]>;
    getPUECalculations(): Promise<any[]>;
    getIntegrationRegistration(): Promise<any>;
    getIntegrationStatus(): Promise<any>;
    listIntegrationEntities(): Promise<any[]>;
    testConnection(): Promise<boolean>;
}
//# sourceMappingURL=poweriq.client.d.ts.map