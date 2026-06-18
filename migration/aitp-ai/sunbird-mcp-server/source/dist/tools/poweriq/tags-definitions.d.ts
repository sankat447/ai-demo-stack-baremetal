export declare const poweriqTagsToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id?: undefined;
            name?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: never[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
            name?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            name: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            id: {
                type: string;
                description: string;
            };
            updates: {
                type: string;
                description: string;
            };
            name?: undefined;
            tagGroupId?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tagGroupId: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            id?: undefined;
            updates?: undefined;
            tagId?: undefined;
            taggable_type?: undefined;
            taggable_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            tagId: {
                type: string;
                description: string;
            };
            taggable_type: {
                type: string;
                description: string;
            };
            taggable_id: {
                type: string;
                description: string;
            };
            id?: undefined;
            name?: undefined;
            updates?: undefined;
            tagGroupId?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=tags-definitions.d.ts.map