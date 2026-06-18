/**
 * Structured application configuration derived from validated environment
 * variables.  Import `config` anywhere you need typed, validated settings.
 *
 * Example:
 *   import { config } from '@/config/index.js';
 *   console.log(config.server.port);
 */
export declare const config: {
    /** Runtime environment */
    readonly nodeEnv: "development" | "production" | "test";
    readonly isDev: boolean;
    readonly isProd: boolean;
    readonly isTest: boolean;
    /** MCP / HTTP server settings */
    readonly server: {
        readonly name: string;
        readonly version: string;
        readonly port: number;
        readonly host: string;
    };
    /** Sunbird DCIM connection */
    readonly sunbird: {
        readonly baseUrl: string;
        readonly dctrackBaseUrl: string;
        readonly poweriqBaseUrl: string;
        readonly username: string;
        readonly password: string;
        readonly timeout: number;
        readonly rejectUnauthorized: boolean;
    };
    /** Response cache */
    readonly cache: {
        readonly enabled: boolean;
        readonly ttlSeconds: number;
    };
    /** Logging */
    readonly logging: {
        readonly level: "debug" | "info" | "warn" | "error";
    };
};
export type AppConfig = typeof config;
//# sourceMappingURL=index.d.ts.map