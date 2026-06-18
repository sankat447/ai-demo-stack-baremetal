/**
 * Base HTTP client for Sunbird DCIM APIs.
 *
 * Shared concerns:
 *   - Axios instance with basic auth + TLS settings
 *   - Request/response logging via interceptors
 *   - Per-service response caching
 *   - Generic GET / POST / PUT / DELETE helpers
 *
 * Concrete clients (DcTrackClient, PowerIQClient) extend this class and
 * add domain-specific methods.
 */
import { AxiosInstance } from 'axios';
import { ResponseCache } from '../cache/index.js';
export declare abstract class BaseClient {
    protected readonly http: AxiosInstance;
    protected readonly cache: ResponseCache;
    protected readonly serviceName: string;
    constructor(serviceName: string, basePath?: string, baseUrlOverride?: string);
    private registerInterceptors;
    protected get<T>(path: string, params?: Record<string, unknown>, useCache?: boolean): Promise<T>;
    protected post<T>(path: string, body?: unknown): Promise<T>;
    protected put<T>(path: string, body?: unknown): Promise<T>;
    protected del<T>(path: string): Promise<T>;
    /** Flush the response cache for this client. */
    clearCache(): void;
    /** Verify connectivity by making a lightweight request. */
    abstract testConnection(): Promise<boolean>;
}
//# sourceMappingURL=base-client.d.ts.map