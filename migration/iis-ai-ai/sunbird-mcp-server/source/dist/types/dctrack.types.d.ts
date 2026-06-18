/**
 * dcTrack API domain types.
 *
 * All interfaces mirror the Sunbird dcTrack REST API v2 response shapes
 * so they can be used both as return types from the client and as
 * input/output types for MCP tool handlers.
 */
export interface DcTrackLocation {
    id: number;
    name: string;
    code?: string;
    type: string;
    parentId?: number;
    parentName?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
}
export interface DcTrackCabinet {
    id: number;
    name: string;
    locationId: number;
    locationName?: string;
    rowName?: string;
    ruHeight: number;
    usedRuCount?: number;
    availableRuCount?: number;
    ratedPowerKw?: number;
    status?: string;
}
export interface DcTrackItem {
    id: number;
    tiName: string;
    tiSerialNumber?: string;
    tiAssetTag?: string;
    tiClass: string;
    cmbLocation?: string;
    cmbCabinet?: string;
    cmbStatus?: string;
    tiUPosition?: number;
    tiMounting?: string;
    tiMake?: string;
    tiModel?: string;
    tiRuHeight?: number;
}
export interface DcTrackCapacity {
    cabinetId: number;
    totalRu: number;
    usedRu: number;
    availableRu: number;
    ratedPowerKw: number;
    actualPowerKw?: number;
    availablePowerKw?: number;
    spaceUtilizationPercent: number;
    powerUtilizationPercent?: number;
}
export interface DcTrackConnection {
    id: number;
    sourceItemId: number;
    sourceItemName?: string;
    sourcePortId?: number;
    sourcePortName?: string;
    destItemId: number;
    destItemName?: string;
    destPortId?: number;
    destPortName?: string;
    cableId?: string;
    connectionType?: string;
}
export interface DcTrackModel {
    id: number;
    modelName: string;
    make: string;
    ruHeight: number;
    class: string;
    ratedPowerWatts?: number;
    weight?: number;
}
export interface PaginationParams {
    pageSize?: number;
    pageNumber?: number;
}
export interface DcTrackMake {
    makeId: number;
    makeName: string;
    accountNumber?: string;
    technicalSupport?: string;
    aliases?: string[];
    notes?: string;
}
export interface DcTrackDataPort {
    portId: number;
    portName: string;
    portSubclass?: string;
    mediaType?: string;
    protocol?: string;
    dataRate?: string;
    connector?: string;
    index?: number;
    itemId?: number;
}
export interface DcTrackPowerPort {
    portId: number;
    portName: string;
    portSubclass?: string;
    connector?: string;
    phase?: string;
    volts?: string;
    ratedCapacityAmps?: number;
    index?: number;
    itemId?: number;
}
export interface DcTrackActualReading {
    portId: number;
    portName?: string;
    itemId?: number;
    itemName?: string;
    actualAmps?: number;
    actualVolts?: number;
    actualWatts?: number;
    actualPowerFactor?: number;
    readingTime?: string;
}
export interface DcTrackSubLocation {
    id: number;
    name: string;
    type?: string;
    typeCode?: number;
    parentId?: number;
    locationId?: number;
}
export interface DcTrackTicket {
    id: number;
    ticketNumber?: string;
    ticketDesc?: string;
    ticketStatus?: string;
    ticketAction?: string;
    ticketComments?: string;
    assignedTo?: string;
    createdBy?: string;
    createdDate?: string;
    lastUpdatedOn?: string;
}
export interface DcTrackProject {
    id: number;
    projectName?: string;
    projectNumber?: string;
    description?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    projectManager?: string;
}
export interface DcTrackPartClass {
    id: number;
    className?: string;
    description?: string;
}
export interface DcTrackPartModel {
    id: number;
    modelName?: string;
    make?: string;
    partClassId?: number;
    partClassName?: string;
    description?: string;
}
export interface DcTrackPart {
    id: number;
    partModelId?: number;
    partModelName?: string;
    locationId?: number;
    locationName?: string;
    quantity?: number;
    serialNumber?: string;
    status?: string;
}
export interface DcTrackCustomField {
    id: number;
    label?: string;
    fieldType?: string;
    appliedTo?: string;
    required?: boolean;
    options?: string[];
}
export interface DcTrackWebhook {
    url?: string;
    enabled?: boolean;
    events?: string[];
    secret?: string;
}
export interface DcTrackRelationship {
    id: number;
    entityType1?: string;
    entityId1?: number;
    entityType2?: string;
    entityId2?: number;
    relationshipType?: string;
}
export interface DcTrackPermission {
    id: number;
    entityType?: string;
    entityId?: number;
    role?: string;
    username?: string;
    accessLevel?: string;
}
export interface DcTrackAuditRecord {
    entityType?: string;
    entityId?: number;
    changeType?: string;
    changedBy?: string;
    changedOn?: string;
    fieldName?: string;
    oldValue?: string;
    newValue?: string;
}
export interface DcTrackChart {
    id: number;
    name?: string;
    description?: string;
    chartType?: string;
}
export interface DcTrackBreaker {
    breakerPortId: number;
    breakerName?: string;
    breakerStatus?: string;
    ratingAmps?: number;
    noOfPoles?: number;
    panelItemId?: number;
}
export interface DcTrackFloormapConfig {
    locationId: number;
    locationName?: string;
    floormapImage?: string;
    configuration?: Record<string, any>;
}
//# sourceMappingURL=dctrack.types.d.ts.map