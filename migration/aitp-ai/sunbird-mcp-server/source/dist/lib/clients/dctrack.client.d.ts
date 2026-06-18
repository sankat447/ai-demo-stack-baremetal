/**
 * dcTrack REST API client.
 *
 * Encapsulates every dcTrack v2 API call used by the MCP tools.
 * Read operations are cached; write operations bypass the cache.
 */
import { BaseClient } from './base-client.js';
import type { DcTrackLocation, DcTrackCabinet, DcTrackItem, DcTrackCapacity, DcTrackConnection, DcTrackModel, DcTrackMake, DcTrackDataPort, DcTrackPowerPort, DcTrackActualReading, DcTrackSubLocation, DcTrackTicket, DcTrackProject, DcTrackPartClass, DcTrackPartModel, DcTrackPart, DcTrackCustomField, DcTrackWebhook, DcTrackRelationship, DcTrackPermission, DcTrackChart, DcTrackBreaker, DcTrackFloormapConfig } from '../../types/index.js';
export declare class DcTrackClient extends BaseClient {
    /** Pagination metadata from the last quicksearch call */
    private _lastSearchMeta;
    /** Get pagination metadata from the most recent quicksearch call */
    get lastSearchMeta(): {
        totalRows: number;
        pageNumber: number;
        pageSize: number;
    };
    /** Track pagination metadata from a quicksearch API response */
    private trackSearchMeta;
    constructor();
    listLocations(params?: {
        parentId?: number;
        type?: string;
        pageSize?: number;
        pageNumber?: number;
    }): Promise<DcTrackLocation[]>;
    getLocation(locationId: number): Promise<DcTrackLocation | null>;
    listCabinets(params?: {
        location?: string;
        locationId?: number;
        pageSize?: number;
        pageNumber?: number;
    }): Promise<DcTrackCabinet[]>;
    getCabinet(cabinetId: number): Promise<DcTrackCabinet | null>;
    getCabinetItems(cabinetId: number): Promise<DcTrackItem[]>;
    getCabinetCapacity(cabinetId: number): Promise<DcTrackCapacity | null>;
    getCabinetUMap(cabinetId: number): Promise<any>;
    searchItems(params: {
        query?: string;
        name?: string;
        class?: string;
        location?: string;
        locationId?: number;
        cabinetId?: number;
        status?: string;
        pageSize?: number;
        pageNumber?: number;
    }): Promise<DcTrackItem[]>;
    getItem(itemId: number): Promise<DcTrackItem | null>;
    listConnections(params?: {
        itemId?: number;
        pageSize?: number;
    }): Promise<DcTrackConnection[]>;
    getConnection(connectionId: number): Promise<DcTrackConnection | null>;
    listModels(params?: {
        class?: string;
        make?: string;
        query?: string;
        pageSize?: number;
    }): Promise<DcTrackModel[]>;
    getModel(modelId: number): Promise<DcTrackModel | null>;
    createItem(item: {
        tiName: string;
        tiClass: string;
        cmbLocation?: string;
        locationName?: string;
        cabinetId?: number;
        cabinetName?: string;
        make?: string;
        model?: string;
        tiUPosition?: number;
        tiMounting?: string;
        radioRailsUsed?: string;
        radioDepthPosition?: string;
        modelId?: number;
        tiSerialNumber?: string;
        tiAssetTag?: string;
        cmbStatus?: string;
        customFields?: Record<string, any>;
    }): Promise<DcTrackItem>;
    updateItem(itemId: number, updates: Record<string, any>): Promise<DcTrackItem>;
    moveItem(itemId: number, targetCabinet: number | string, targetUPosition: number, targetMounting?: string): Promise<DcTrackItem>;
    deleteItem(itemId: number, force?: boolean): Promise<{
        success: boolean;
        message: string;
    }>;
    createConnection(connection: {
        sourceItemId: number;
        sourcePortId?: number;
        sourcePortName?: string;
        destItemId: number;
        destPortId?: number;
        destPortName?: string;
        cableId?: string;
        connectionType?: string;
    }): Promise<DcTrackConnection>;
    deleteConnection(connectionId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    createChangeRequest(request: {
        requestType: string;
        summary: string;
        description?: string;
        itemIds?: number[];
        scheduledDate?: string;
        assignee?: string;
        priority?: string;
    }): Promise<any>;
    updateChangeRequest(requestId: number, updates: {
        status?: string;
        comments?: string;
    }): Promise<any>;
    bulkImport(importType: string, data: Record<string, any>[], options?: {
        updateExisting?: boolean;
        validateOnly?: boolean;
        templateId?: number;
    }): Promise<{
        success: boolean;
        imported: number;
        failed: number;
        errors: any[];
    }>;
    bulkUpdate(itemIds: number[], updates: Record<string, any>): Promise<{
        success: boolean;
        updated: number;
        failed: number;
        errors: any[];
    }>;
    createCabinet(cabinet: {
        name: string;
        locationId?: number;
        locationName?: string;
        make?: string;
        model?: string;
        modelId?: number;
        ruHeight?: number;
        ratedPowerKw?: number;
        rowPosition?: number;
        customFields?: Record<string, any>;
        [key: string]: any;
    }): Promise<DcTrackCabinet>;
    createLocation(location: {
        name: string;
        type: string;
        parentId?: number;
        code?: string;
        address?: string;
        city?: string;
        state?: string;
        country?: string;
        customFields?: Record<string, any>;
    }): Promise<DcTrackLocation>;
    listImportTemplates(templateType?: string): Promise<any[]>;
    getImportTemplate(templateId: number): Promise<any>;
    validateImportData(importType: string, data: Record<string, any>[], templateId?: number): Promise<{
        valid: boolean;
        errors: any[];
        warnings: any[];
    }>;
    listMakes(): Promise<DcTrackMake[]>;
    getMake(makeId: number): Promise<DcTrackMake | null>;
    createMake(make: {
        makeName: string;
        accountNumber?: string;
        aliases?: string[];
        notes?: string;
    }): Promise<DcTrackMake>;
    updateMake(makeId: number, updates: Record<string, any>): Promise<DcTrackMake>;
    deleteMake(makeId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    searchMakes(searchString: string): Promise<any[]>;
    createModel(model: Record<string, any>): Promise<DcTrackModel>;
    updateModel(modelId: number, model: Record<string, any>): Promise<DcTrackModel>;
    deleteModel(modelId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    searchModels(params: {
        columns?: Array<{
            name: string;
            filter?: Record<string, string>;
        }>;
        selectedColumns?: Array<{
            name: string;
        }>;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    listDataPorts(itemId: number): Promise<DcTrackDataPort[]>;
    getDataPort(itemId: number, portId: number): Promise<DcTrackDataPort | null>;
    createDataPort(itemId: number, port: Record<string, any>): Promise<DcTrackDataPort>;
    updateDataPort(itemId: number, portId: number, updates: Record<string, any>): Promise<DcTrackDataPort>;
    deleteDataPort(itemId: number, portId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    listPowerPorts(itemId: number): Promise<DcTrackPowerPort[]>;
    getPowerChainForLocation(locationId: number, nodeFields?: string[]): Promise<any>;
    getActualReadingsByItem(itemId: number): Promise<DcTrackActualReading[]>;
    getActualReadingsByPort(portId: number): Promise<DcTrackActualReading | null>;
    updateActualReadingsByPort(portId: number, readings: Record<string, any>): Promise<any>;
    getPowerSumBulk(itemIds: number[]): Promise<any>;
    findAvailableCabinets(params: {
        locationIds?: number[];
        locationName?: string;
        minAvailableRUs?: number;
        minAvailablePowerKw?: number;
    }): Promise<any[]>;
    findAvailableUPositions(params: {
        cabinetId: number;
        ruNeeded: number;
    }): Promise<any[]>;
    listSubLocations(locationId: number): Promise<DcTrackSubLocation[]>;
    getSubLocation(subLocationId: number): Promise<DcTrackSubLocation | null>;
    createSubLocation(subLocation: Record<string, any>): Promise<DcTrackSubLocation>;
    updateSubLocation(subLocationId: number, updates: Record<string, any>): Promise<DcTrackSubLocation>;
    deleteSubLocation(subLocationId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getTicket(ticketId: number): Promise<DcTrackTicket | null>;
    createTicket(ticket: Record<string, any>): Promise<DcTrackTicket>;
    updateTicket(ticketId: number, updates: Record<string, any>): Promise<DcTrackTicket>;
    deleteTicket(ticketId: number, proceedOnWarning?: boolean): Promise<{
        success: boolean;
        message: string;
    }>;
    searchTickets(params: {
        columns?: Array<{
            name: string;
            filter?: Record<string, string>;
        }>;
        selectedColumns?: Array<{
            name: string;
        }>;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    getTicketFieldList(): Promise<any[]>;
    bulkTickets(bodies: Record<string, any>[], method: string, proceedOnWarning?: boolean): Promise<any>;
    assignTicketEntity(entityType: string, ticketId: number, entityId: number): Promise<any>;
    unassignTicketEntity(entityType: string, ticketId: number, entityId: number): Promise<any>;
    getProject(projectId: number): Promise<DcTrackProject | null>;
    searchProjects(query?: string): Promise<any[]>;
    resolveProjectId(projectId?: number, projectName?: string): Promise<number>;
    createProject(project: Record<string, any>): Promise<DcTrackProject>;
    updateProject(projectId: number, updates: Record<string, any>): Promise<DcTrackProject>;
    deleteProject(projectId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    listPartClasses(): Promise<DcTrackPartClass[]>;
    createPartClass(partClass: Record<string, any>): Promise<DcTrackPartClass>;
    updatePartClass(partClassId: number, updates: Record<string, any>): Promise<DcTrackPartClass>;
    deletePartClass(partClassId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getPartModel(modelId: number): Promise<DcTrackPartModel | null>;
    createPartModel(model: Record<string, any>): Promise<DcTrackPartModel>;
    updatePartModel(modelId: number, updates: Record<string, any>): Promise<DcTrackPartModel>;
    deletePartModel(modelId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    searchPartModels(params: {
        columns?: any[];
        selectedColumns?: Array<{
            name: string;
        }>;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    getPart(partId: number): Promise<DcTrackPart | null>;
    createPart(part: Record<string, any>): Promise<DcTrackPart>;
    updatePart(partId: number, updates: Record<string, any>): Promise<DcTrackPart>;
    deletePart(partId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    searchParts(params: {
        columns?: any[];
        selectedColumns?: Array<{
            name: string;
        }>;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    adjustPartStock(partId: number, activity: string, quantity: number, locationId?: number): Promise<any>;
    assignParts(assignmentType: string, assignments: Record<string, any>[]): Promise<any>;
    listCustomFields(): Promise<DcTrackCustomField[]>;
    getCustomField(customFieldId: number): Promise<DcTrackCustomField | null>;
    createCustomField(field: Record<string, any>): Promise<DcTrackCustomField>;
    updateCustomField(customFieldId: number, updates: Record<string, any>): Promise<DcTrackCustomField>;
    deleteCustomField(customFieldId: number, proceedOnWarning?: boolean): Promise<{
        success: boolean;
        message: string;
    }>;
    searchAuditTrail(params: {
        columns?: any[];
        selectedColumns?: Array<{
            name: string;
        }>;
        pageNumber?: number;
        pageSize?: number;
    }): Promise<any>;
    getAuditTrailFieldList(): Promise<any[]>;
    listCharts(): Promise<DcTrackChart[]>;
    getChart(chartId: number): Promise<DcTrackChart | null>;
    getChartData(chartId: number, params?: Record<string, any>): Promise<any>;
    listBreakers(panelItemId: number): Promise<DcTrackBreaker[]>;
    getBreaker(panelItemId: number, breakerPortId: number): Promise<DcTrackBreaker | null>;
    createBreaker(panelItemId: number, breaker: Record<string, any>): Promise<DcTrackBreaker>;
    updateBreaker(panelItemId: number, breakerPortId: number, updates: Record<string, any>): Promise<DcTrackBreaker>;
    deleteBreaker(panelItemId: number, breakerPortId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getLookupList(listType: string, id?: number): Promise<any[]>;
    getPicklistOptions(listType: string): Promise<any[]>;
    updatePicklistOptions(listType: string, options: Record<string, any>): Promise<any>;
    getWebhookConfig(): Promise<DcTrackWebhook | null>;
    updateWebhookConfig(config: Record<string, any>): Promise<DcTrackWebhook>;
    deleteWebhookConfig(): Promise<{
        success: boolean;
        message: string;
    }>;
    getRelationship(id: number): Promise<DcTrackRelationship | null>;
    createRelationship(relationship: Record<string, any>): Promise<DcTrackRelationship>;
    searchRelationships(params: Record<string, any>): Promise<DcTrackRelationship[]>;
    getRelationshipsByEntity(entityType: string, entityId: number): Promise<DcTrackRelationship[]>;
    deleteRelationship(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    listPermissions(): Promise<DcTrackPermission[]>;
    getPermission(permissionId: number): Promise<DcTrackPermission | null>;
    createPermission(permission: Record<string, any>): Promise<DcTrackPermission>;
    updatePermission(permissionId: number, updates: Record<string, any>): Promise<DcTrackPermission>;
    deletePermission(permissionId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getFloormapConfig(locationId: number): Promise<DcTrackFloormapConfig | null>;
    getAllFloormapConfigs(): Promise<DcTrackFloormapConfig[]>;
    updateFloormapConfig(locationId: number, config: Record<string, any>): Promise<any>;
    getLocationFavorites(username: string, entityType: string): Promise<any[]>;
    assignLocationFavorites(username: string, favorites: Record<string, any>): Promise<any>;
    testConnection(): Promise<boolean>;
}
//# sourceMappingURL=dctrack.client.d.ts.map