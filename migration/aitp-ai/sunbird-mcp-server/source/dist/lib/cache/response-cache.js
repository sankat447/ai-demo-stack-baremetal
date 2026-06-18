/**
 * Thin wrapper around node-cache that respects the global cache config.
 *
 * Each API client gets its own ResponseCache instance so cache keys are
 * namespaced by service and TTL can be tuned independently in the future.
 */
import NodeCache from 'node-cache';
import { config } from '../../config/index.js';
import { logger } from '../logger.js';
export class ResponseCache {
    cache;
    prefix;
    constructor(namespace) {
        this.prefix = namespace;
        this.cache = new NodeCache({
            stdTTL: config.cache.ttlSeconds,
            checkperiod: config.cache.ttlSeconds * 0.2,
            useClones: false,
        });
    }
    /** Build a deterministic cache key from path + params. */
    key(path, params) {
        return `${this.prefix}:${path}:${JSON.stringify(params ?? {})}`;
    }
    /** Return cached value or `undefined` on miss. */
    get(path, params) {
        if (!config.cache.enabled)
            return undefined;
        const k = this.key(path, params);
        const hit = this.cache.get(k);
        if (hit !== undefined) {
            logger.debug({ cacheKey: k }, 'Cache hit');
        }
        return hit;
    }
    /** Store a value. */
    set(path, params, value) {
        if (!config.cache.enabled)
            return;
        this.cache.set(this.key(path, params), value);
    }
    /** Flush all entries for this namespace. */
    flush() {
        this.cache.flushAll();
        logger.info({ namespace: this.prefix }, 'Cache flushed');
    }
}
//# sourceMappingURL=response-cache.js.map