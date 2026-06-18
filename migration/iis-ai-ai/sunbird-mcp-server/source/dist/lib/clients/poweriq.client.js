/**
 * Power IQ REST API client.
 *
 * Encapsulates every Power IQ v2 API call used by the MCP tools.
 * Real-time readings bypass the cache (useCache = false).
 */
import { BaseClient } from './base-client.js';
import { config } from '../../config/index.js';
import { logger } from '../logger.js';
export class PowerIQClient extends BaseClient {
    constructor() {
        super('poweriq', '/api/v2', config.sunbird.poweriqBaseUrl);
    }
    // =======================================================================
    // DATA CENTERS
    // =======================================================================
    async listDataCenters() {
        const res = await this.get('/data_centers');
        return res.data_centers ?? res.data ?? [];
    }
    // =======================================================================
    // PDUs
    // =======================================================================
    async listPDUs(params) {
        const res = await this.get('/pdus', params);
        return res.pdus ?? res.data ?? [];
    }
    async getPDU(pduId) {
        const res = await this.get(`/pdus/${pduId}`);
        return res.pdu ?? res;
    }
    async getPDUReadings(pduId) {
        // PDU readings are embedded in the PDU object — fetch the PDU and extract reading
        const pdu = await this.getPDU(pduId);
        if (!pdu)
            return null;
        return pdu.reading ?? null;
    }
    async getOutletReadings(pduId) {
        // Get outlets for this PDU first, then extract readings from each
        const res = await this.get(`/pdus/${pduId}/outlets`);
        const outlets = res.outlets ?? [];
        return outlets.map((o) => ({
            outletId: o.id,
            name: o.name ?? o.label,
            reading: o.reading ?? null,
        }));
    }
    // =======================================================================
    // SENSORS
    // =======================================================================
    async listSensors(params) {
        const res = await this.get('/sensors', params);
        return res.sensors ?? res.data ?? [];
    }
    async getSensorReadings(sensorId) {
        const res = await this.get(`/sensors/${sensorId}/readings`, {}, false);
        return res.sensor_reading ?? res.reading ?? res;
    }
    /** Convenience: get temperature + humidity readings for a single cabinet. */
    async getCabinetSensorReadings(cabinetId) {
        const sensors = await this.listSensors({ cabinetId });
        const temperature = [];
        const humidity = [];
        for (const sensor of sensors) {
            const reading = await this.getSensorReadings(sensor.id);
            if (!reading)
                continue;
            if (sensor.sensorType === 'temperature')
                temperature.push(reading);
            else if (sensor.sensorType === 'humidity')
                humidity.push(reading);
        }
        return { temperature, humidity };
    }
    // =======================================================================
    // PUE
    // =======================================================================
    async getPUE(params) {
        // Use /pue_calculations endpoint (no /pue endpoint exists)
        const res = await this.get('/pue_calculations', params, false);
        if (res.pue_calculation) {
            const calc = res.pue_calculation;
            return [
                {
                    pue: calc.pue ?? calc.current_pue ?? 0,
                    itPowerKw: calc.it_power_kw ?? calc.it_power ?? 0,
                    facilityPowerKw: calc.facility_power_kw ?? calc.total_power ?? 0,
                    readingTime: calc.reading_time ?? new Date().toISOString(),
                },
            ];
        }
        if (res.pue_calculations) {
            return res.pue_calculations.map((calc) => ({
                pue: calc.pue ?? calc.current_pue ?? 0,
                itPowerKw: calc.it_power_kw ?? calc.it_power ?? 0,
                facilityPowerKw: calc.facility_power_kw ?? calc.total_power ?? 0,
                readingTime: calc.reading_time ?? new Date().toISOString(),
            }));
        }
        return Array.isArray(res) ? res : [];
    }
    // =======================================================================
    // ALERTS
    // =======================================================================
    async listAlerts(params) {
        // No /alerts endpoint — use /events which tracks all alerts/events
        const queryParams = { limit: params?.limit ?? 1000 };
        if (params?.severity)
            queryParams['severity_eq'] = params.severity;
        if (params?.type)
            queryParams['event_type_eq'] = params.type;
        const res = await this.get('/events', queryParams, false);
        return res.events ?? res.data ?? [];
    }
    // =======================================================================
    // IT DEVICES
    // =======================================================================
    async listITDevices(params) {
        // No /it_devices endpoint — use /devices which lists all managed devices
        const queryParams = {};
        if (params?.cabinetId)
            queryParams['parent_id_eq'] = params.cabinetId;
        if (params?.pageSize)
            queryParams['limit'] = params.pageSize;
        const res = await this.get('/devices', queryParams);
        return res.devices ?? res.data ?? [];
    }
    // =======================================================================
    // DATA CENTER CRUD
    // =======================================================================
    async getDataCenter(id) {
        const res = await this.get(`/data_centers/${id}`);
        return res.data_center ?? res;
    }
    async createDataCenter(dc) {
        const res = await this.post('/data_centers', { data_center: dc });
        logger.info({ name: dc.name }, 'Data center created');
        return res.data_center ?? res;
    }
    async updateDataCenter(id, updates) {
        const res = await this.put(`/data_centers/${id}`, { data_center: updates });
        logger.info({ id }, 'Data center updated');
        return res.data_center ?? res;
    }
    async deleteDataCenter(id) {
        await this.del(`/data_centers/${id}`);
        logger.info({ id }, 'Data center deleted');
        return { success: true, message: `Data center ${id} deleted` };
    }
    // =======================================================================
    // HIERARCHY NAVIGATION
    // =======================================================================
    async listFloors(params) {
        const res = await this.get('/floors', params);
        return res.floors ?? [];
    }
    async listRooms(params) {
        const res = await this.get('/rooms', params);
        return res.rooms ?? [];
    }
    async listRacks(params) {
        const res = await this.get('/racks', params);
        return res.racks ?? [];
    }
    async getRack(id) {
        const res = await this.get(`/racks/${id}`);
        return res.rack ?? res;
    }
    async getChildren(resourceType, id) {
        const res = await this.get(`/${resourceType}/${id}/children`);
        return res.children ?? res[resourceType] ?? [];
    }
    async getDescendants(resourceType, id, types) {
        const params = {};
        if (types)
            params['types[]'] = types;
        const res = await this.get(`/${resourceType}/${id}/descendants`, params);
        return res.descendants ?? [];
    }
    async moveResource(resourceType, id, targetType, targetId) {
        const res = await this.put(`/${resourceType}/${id}/move_to`, { [targetType]: { id: targetId } });
        logger.info({ resourceType, id, targetType, targetId }, 'Resource moved');
        return res;
    }
    async getExecutiveSummary(resourceType, id) {
        const res = await this.get(`/${resourceType}/${id}/executive_summary`, undefined, false);
        return res;
    }
    async getLatestReading(resourceType, id, type) {
        const params = {};
        if (type)
            params.type = type;
        const res = await this.get(`/${resourceType}/${id}/latest_reading`, params, false);
        return res;
    }
    // =======================================================================
    // PDU WRITE OPERATIONS
    // =======================================================================
    async createPDU(pdu) {
        const res = await this.post('/pdus', { pdu });
        logger.info({ ip: pdu.ip_address }, 'PDU created');
        return res.pdu ?? res;
    }
    async updatePDU(id, updates) {
        const res = await this.put(`/pdus/${id}`, { pdu: updates });
        logger.info({ id }, 'PDU updated');
        return res.pdu ?? res;
    }
    async deletePDU(id) {
        await this.del(`/pdus/${id}`);
        logger.info({ id }, 'PDU deleted');
        return { success: true, message: `PDU ${id} deleted` };
    }
    async rescanPDU(id) {
        const res = await this.put(`/pdus/${id}/rescan`, {});
        logger.info({ id }, 'PDU rescan triggered');
        return res;
    }
    async batchCreatePDUs(pdus) {
        const res = await this.post('/pdus/create_batch', { pdus });
        logger.info({ count: pdus.length }, 'Batch PDU creation submitted');
        return res;
    }
    async batchDeletePDUs(pduIds) {
        const res = await this.del('/pdus/destroy_batch');
        // Need to pass body with delete - use post with method override or http directly
        const { data } = await this.http.delete('/pdus/destroy_batch', { data: { pdus: pduIds } });
        logger.info({ count: pduIds.length }, 'Batch PDU deletion submitted');
        return data;
    }
    // =======================================================================
    // INLETS
    // =======================================================================
    async listInlets(params) {
        const res = await this.get('/inlets', params);
        return res.inlets ?? [];
    }
    async getInlet(id) {
        const res = await this.get(`/inlets/${id}`);
        return res.inlet ?? res;
    }
    async getInletReadings(inletId) {
        const res = await this.get(`/inlets/${inletId}/readings`, undefined, false);
        return res.readings ?? [];
    }
    // =======================================================================
    // CIRCUITS
    // =======================================================================
    async listCircuits(params) {
        const res = await this.get('/circuits', params);
        return res.circuits ?? [];
    }
    async getCircuitReadings(circuitId) {
        const res = await this.get(`/circuits/${circuitId}/readings`, undefined, false);
        return res.readings ?? [];
    }
    // =======================================================================
    // READINGS (Generic)
    // =======================================================================
    async getResourceReadings(resourceType, id) {
        const res = await this.get(`/${resourceType}/${id}/readings`, undefined, false);
        return res.readings ?? [];
    }
    async getReadingsRollup(resourceType, id, interval) {
        const res = await this.get(`/${resourceType}/${id}/readings_rollups/${interval}`, undefined, false);
        return res.readings_rollups ?? res.readings ?? [];
    }
    async getRackReadings(rackId) {
        const res = await this.get(`/racks/${rackId}/readings`, undefined, false);
        return res.readings ?? [];
    }
    // =======================================================================
    // EVENTS
    // =======================================================================
    async listEvents(params) {
        const res = await this.get('/events', params, false);
        return res.events ?? [];
    }
    async getEvent(id) {
        const res = await this.get(`/events/${id}`);
        return res.event ?? res;
    }
    async clearEvent(id) {
        const res = await this.put(`/events/${id}/clear`, {});
        logger.info({ id }, 'Event cleared');
        return res;
    }
    async clearEventsBatch(eventIds) {
        const res = await this.put('/events/clear_batch', { events: eventIds });
        logger.info({ count: eventIds.length }, 'Events batch cleared');
        return res;
    }
    // =======================================================================
    // POWER CONTROL
    // =======================================================================
    async powerControlOutlets(outletIds, state) {
        const res = await this.post('/outlets/power_control', { state, outlets: outletIds });
        logger.info({ state, count: outletIds.length }, 'Outlet power control executed');
        return res;
    }
    async powerControlDevice(deviceId, state) {
        const res = await this.post(`/devices/${deviceId}/power_control`, { state });
        logger.info({ deviceId, state }, 'Device power control executed');
        return res;
    }
    async powerControlRack(rackId, state) {
        const res = await this.post(`/racks/${rackId}/power_control`, { state });
        logger.info({ rackId, state }, 'Rack power control executed');
        return res;
    }
    async powerControlRoom(roomId, state) {
        const res = await this.post(`/rooms/${roomId}/power_control`, { state });
        logger.info({ roomId, state }, 'Room power control executed');
        return res;
    }
    // =======================================================================
    // SYSTEM
    // =======================================================================
    async getSystemInfo() {
        const res = await this.get('/system_info');
        return res;
    }
    async listJobs(jobId) {
        if (jobId) {
            const res = await this.get(`/jobs/${jobId}`);
            return res.job ?? res;
        }
        const res = await this.get('/jobs');
        return res.jobs ?? [];
    }
    // =======================================================================
    // OUTLETS WRITE
    // =======================================================================
    async updateOutlet(id, updates) {
        const res = await this.put(`/outlets/${id}`, { outlet: updates });
        logger.info({ id }, 'Outlet updated');
        return res.outlet ?? res;
    }
    async renameOutletsBatch(outlets) {
        const res = await this.put('/outlets/rename_batch', { outlets });
        logger.info({ count: outlets.length }, 'Outlets batch renamed');
        return res;
    }
    // =======================================================================
    // ASSET STRIPS
    // =======================================================================
    async listAssetStrips(params) {
        const res = await this.get('/asset_strips', params);
        return res.asset_strips ?? [];
    }
    async getAssetStrip(id) {
        const res = await this.get(`/asset_strips/${id}`);
        return res.asset_strip ?? res;
    }
    async updateAssetStrip(id, updates) {
        const res = await this.put(`/asset_strips/${id}`, { asset_strip: updates });
        logger.info({ id }, 'Asset strip updated');
        return res.asset_strip ?? res;
    }
    async getAssetStripRackUnits(assetStripId) {
        const res = await this.get(`/asset_strips/${assetStripId}/rack_units`);
        return res.rack_units ?? [];
    }
    // =======================================================================
    // RACK UNITS
    // =======================================================================
    async listRackUnits(params) {
        const res = await this.get('/rack_units', params);
        return res.rack_units ?? [];
    }
    async getRackUnit(id) {
        const res = await this.get(`/rack_units/${id}`);
        return res.rack_unit ?? res;
    }
    async updateRackUnit(id, updates) {
        const res = await this.put(`/rack_units/${id}`, { rack_unit: updates });
        logger.info({ id }, 'Rack unit updated');
        return res.rack_unit ?? res;
    }
    async getRackUnitBladeSlots(rackUnitId) {
        const res = await this.get(`/rack_units/${rackUnitId}/blade_slots`);
        return res.blade_slots ?? [];
    }
    // =======================================================================
    // BLADE SLOTS
    // =======================================================================
    async listBladeSlots(params) {
        const res = await this.get('/blade_slots', params);
        return res.blade_slots ?? [];
    }
    async getBladeSlot(id) {
        const res = await this.get(`/blade_slots/${id}`);
        return res.blade_slot ?? res;
    }
    // =======================================================================
    // TAG GROUPS
    // =======================================================================
    async listTagGroups() {
        const res = await this.get('/tag_groups');
        return res.tag_groups ?? [];
    }
    async getTagGroup(id) {
        const res = await this.get(`/tag_groups/${id}`);
        return res.tag_group ?? res;
    }
    async createTagGroup(tagGroup) {
        const res = await this.post('/tag_groups', { tag_group: tagGroup });
        logger.info({ name: tagGroup.name }, 'Tag group created');
        return res.tag_group ?? res;
    }
    async updateTagGroup(id, updates) {
        const res = await this.put(`/tag_groups/${id}`, { tag_group: updates });
        logger.info({ id }, 'Tag group updated');
        return res.tag_group ?? res;
    }
    async deleteTagGroup(id) {
        await this.del(`/tag_groups/${id}`);
        logger.info({ id }, 'Tag group deleted');
        return { success: true, message: `Tag group ${id} deleted` };
    }
    // =======================================================================
    // TAGS
    // =======================================================================
    async listTags() {
        const res = await this.get('/tags');
        return res.tags ?? [];
    }
    async getTag(id) {
        const res = await this.get(`/tags/${id}`);
        return res.tag ?? res;
    }
    async createTag(tagGroupId, tag) {
        const res = await this.post(`/tag_groups/${tagGroupId}/tags`, { tag });
        logger.info({ name: tag.name }, 'Tag created');
        return res.tag ?? res;
    }
    async updateTag(id, updates) {
        const res = await this.put(`/tags/${id}`, { tag: updates });
        logger.info({ id }, 'Tag updated');
        return res.tag ?? res;
    }
    async deleteTag(id) {
        await this.del(`/tags/${id}`);
        logger.info({ id }, 'Tag deleted');
        return { success: true, message: `Tag ${id} deleted` };
    }
    async createTagEntry(tagId, entry) {
        const res = await this.post(`/tags/${tagId}/tag_entries`, { tag_entry: entry });
        logger.info({ tagId }, 'Tag entry created');
        return res.tag_entry ?? res;
    }
    async deleteTagEntry(id) {
        await this.del(`/tag_entries/${id}`);
        logger.info({ id }, 'Tag entry deleted');
        return { success: true, message: `Tag entry ${id} deleted` };
    }
    // =======================================================================
    // TRANSFER SWITCHES
    // =======================================================================
    async listTransferSwitches(params) {
        const res = await this.get('/transfer_switches', params);
        return res.transfer_switches ?? [];
    }
    async getTransferSwitch(id) {
        const res = await this.get(`/transfer_switches/${id}`);
        return res.transfer_switch ?? res;
    }
    async getTransferSwitchStates(id) {
        const res = await this.get(`/transfer_switches/${id}/transfer_switch_states`);
        return res.transfer_switch_states ?? [];
    }
    // =======================================================================
    // PANELS
    // =======================================================================
    async listPanels(params) {
        const res = await this.get('/panels', params);
        return res.panels ?? [];
    }
    async getPanel(id) {
        const res = await this.get(`/panels/${id}`);
        return res.panel ?? res;
    }
    async getPanelCircuits(panelId) {
        const res = await this.get(`/panels/${panelId}/circuits`);
        return res.circuits ?? [];
    }
    async getPanelInlets(panelId) {
        const res = await this.get(`/panels/${panelId}/inlets`);
        return res.inlets ?? [];
    }
    // =======================================================================
    // OUTLETS (extended for write)
    // =======================================================================
    async listOutlets(params) {
        const res = await this.get('/outlets', params);
        return res.outlets ?? [];
    }
    async getOutlet(id) {
        const res = await this.get(`/outlets/${id}`);
        return res.outlet ?? res;
    }
    // =======================================================================
    // FLOOR MAPS
    // =======================================================================
    async getFloorMapMappable() {
        const res = await this.get('/floor_maps/mappable');
        return res.mappable ?? res.data ?? [];
    }
    // =======================================================================
    // PUE CALCULATIONS
    // =======================================================================
    async getPUECalculations() {
        const res = await this.get('/pue_calculations');
        return res.pue_calculations ?? [];
    }
    // =======================================================================
    // INTEGRATION
    // =======================================================================
    async getIntegrationRegistration() {
        return this.get('/integration/registration');
    }
    async getIntegrationStatus() {
        return this.get('/integration/registration/status');
    }
    async listIntegrationEntities() {
        const res = await this.get('/integration/entities');
        return res.entities ?? [];
    }
    // =======================================================================
    // CONNECTION TEST
    // =======================================================================
    async testConnection() {
        try {
            await this.listDataCenters();
            return true;
        }
        catch {
            return false;
        }
    }
}
//# sourceMappingURL=poweriq.client.js.map