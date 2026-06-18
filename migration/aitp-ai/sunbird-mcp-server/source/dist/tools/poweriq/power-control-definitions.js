export const poweriqPowerControlToolDefinitions = [
    {
        name: 'poweriq_power_control_outlets',
        description: 'Turn ON, OFF, or CYCLE specific outlets',
        inputSchema: {
            type: 'object',
            properties: {
                outletIds: { type: 'array', items: { type: 'number' }, description: 'List of outlet IDs' },
                state: { type: 'string', enum: ['ON', 'OFF', 'CYCLE'], description: 'Target power state' },
            },
            required: ['outletIds', 'state'],
        },
    },
    {
        name: 'poweriq_power_control_device',
        description: 'Turn ON, OFF, or CYCLE all outlets for a device',
        inputSchema: {
            type: 'object',
            properties: {
                deviceId: { type: 'number', description: 'Device ID' },
                state: { type: 'string', enum: ['ON', 'OFF', 'CYCLE'], description: 'Target power state' },
            },
            required: ['deviceId', 'state'],
        },
    },
    {
        name: 'poweriq_power_control_rack',
        description: 'Turn ON, OFF, or CYCLE all outlets in a rack',
        inputSchema: {
            type: 'object',
            properties: {
                rackId: { type: 'number', description: 'Rack ID' },
                state: { type: 'string', enum: ['ON', 'OFF', 'CYCLE'], description: 'Target power state' },
            },
            required: ['rackId', 'state'],
        },
    },
];
//# sourceMappingURL=power-control-definitions.js.map