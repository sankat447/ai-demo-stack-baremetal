/**
 * Domain operations that combine dcTrack + Power IQ data.
 *
 * Pure business logic lives here, decoupled from MCP tool plumbing.
 */
import { z } from 'zod';
import * as schemas from './schemas.js';
export declare function getRackSummary(args: {
    cabinetId?: number;
    cabinetName?: string;
}): Promise<{
    cabinet: {
        id: number;
        name: any;
        location: any;
        ruHeight: any;
    };
    capacity: {
        space: {
            total: any;
            used: any;
            available: number;
            utilizationPercent: number;
        };
        power: {
            ratedKw: any;
            currentKw: number;
            availableKw: number;
            utilizationPercent: number | null;
        };
    };
    items: {
        id: number;
        name: string;
        class: string;
        uPosition: number | undefined;
        ruHeight: number | undefined;
        status: string | undefined;
    }[];
    power: {
        pdus: {
            id: number;
            name: string;
            activePowerW: number | undefined;
            voltage: number | undefined;
            current: number | undefined;
            powerFactor: number | undefined;
        }[];
        totalKw: number;
    };
    thermal: {
        averageTemperature: number | null;
        temperatureSensors: import("../../types/poweriq.types.js").PowerIQSensorReading[];
        humiditySensors: import("../../types/poweriq.types.js").PowerIQSensorReading[];
    };
    timestamp: string;
}>;
export declare function findCapacity(params: z.infer<typeof schemas.findCapacitySchema>): Promise<{
    requirements: {
        requiredU: number;
        requiredPowerKw: number;
        contiguous: boolean;
    };
    matchingCabinets: any[];
    totalMatches: number;
    timestamp: string;
}>;
export declare function getHealthStatus(params: z.infer<typeof schemas.getHealthStatusSchema>): Promise<any>;
export declare function identifyGhostServers(params: z.infer<typeof schemas.identifyGhostServersSchema>): Promise<{
    threshold: number;
    totalDevicesChecked: number;
    ghostServersFound: number;
    estimatedWastedPowerKw: number;
    ghostServers: any[];
    timestamp: string;
}>;
export declare function getPowerChain(params: z.infer<typeof schemas.getPowerChainSchema>): Promise<{
    device: {
        id: number;
        name: string;
        location: string | undefined;
        cabinet: string | undefined;
    };
    connections: {
        connectionId: number;
        sourceItem: string | undefined;
        sourcePort: string | undefined;
        destItem: string | undefined;
        destPort: string | undefined;
    }[];
    timestamp: string;
}>;
export declare function thermalAnalysis(params: z.infer<typeof schemas.thermalAnalysisSchema>): Promise<any>;
//# sourceMappingURL=operations.d.ts.map