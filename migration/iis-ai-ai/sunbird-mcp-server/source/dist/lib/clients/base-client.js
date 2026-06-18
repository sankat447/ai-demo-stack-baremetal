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
import axios from 'axios';
import https from 'https';
import { config } from '../../config/index.js';
import { logger } from '../logger.js';
import { ResponseCache } from '../cache/index.js';
import { AuthenticationError, RateLimitError, SunbirdApiError } from '../errors/index.js';
export class BaseClient {
    http;
    cache;
    serviceName;
    constructor(serviceName, basePath = '', baseUrlOverride) {
        this.serviceName = serviceName;
        this.cache = new ResponseCache(serviceName);
        const httpsAgent = new https.Agent({
            rejectUnauthorized: config.sunbird.rejectUnauthorized,
        });
        const baseUrl = baseUrlOverride ?? config.sunbird.baseUrl;
        this.http = axios.create({
            baseURL: `${baseUrl}${basePath}`,
            timeout: config.sunbird.timeout,
            httpsAgent,
            auth: {
                username: config.sunbird.username,
                password: config.sunbird.password,
            },
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        this.registerInterceptors();
    }
    // -----------------------------------------------------------------------
    // Interceptors
    // -----------------------------------------------------------------------
    registerInterceptors() {
        // Request logging
        this.http.interceptors.request.use((req) => {
            logger.debug({ service: this.serviceName, method: req.method?.toUpperCase(), url: req.url }, 'API request');
            return req;
        }, (err) => {
            logger.error({ service: this.serviceName, error: err }, 'Request error');
            return Promise.reject(err);
        });
        // Response logging + error classification
        this.http.interceptors.response.use((res) => {
            logger.debug({ service: this.serviceName, status: res.status, url: res.config.url }, 'API response');
            return res;
        }, (error) => {
            const status = error.response?.status;
            const url = error.config?.url ?? 'unknown';
            if (status === 401) {
                return Promise.reject(new AuthenticationError(`Auth failed for ${this.serviceName}: ${url}`, error));
            }
            if (status === 429) {
                return Promise.reject(new RateLimitError(undefined, error));
            }
            if (status && status >= 500) {
                return Promise.reject(new SunbirdApiError(`Server error from ${this.serviceName}: ${url}`, status, error));
            }
            const responseBody = error.response?.data;
            const detail = responseBody ? ` — ${JSON.stringify(responseBody).slice(0, 500)}` : '';
            return Promise.reject(new SunbirdApiError(`API error from ${this.serviceName}: ${error.message}${detail}`, status, error));
        });
    }
    // -----------------------------------------------------------------------
    // HTTP helpers
    // -----------------------------------------------------------------------
    async get(path, params, useCache = true) {
        if (useCache) {
            const cached = this.cache.get(path, params);
            if (cached !== undefined)
                return cached;
        }
        const { data } = await this.http.get(path, { params });
        if (useCache) {
            this.cache.set(path, params, data);
        }
        return data;
    }
    async post(path, body) {
        const { data } = await this.http.post(path, body);
        return data;
    }
    async put(path, body) {
        const { data } = await this.http.put(path, body);
        return data;
    }
    async del(path) {
        const { data } = await this.http.delete(path);
        return data;
    }
    // -----------------------------------------------------------------------
    // Utilities
    // -----------------------------------------------------------------------
    /** Flush the response cache for this client. */
    clearCache() {
        this.cache.flush();
    }
}
//# sourceMappingURL=base-client.js.map