/**
 * Thin wrapper around node-cache that respects the global cache config.
 *
 * Each API client gets its own ResponseCache instance so cache keys are
 * namespaced by service and TTL can be tuned independently in the future.
 */
export declare class ResponseCache {
    private readonly cache;
    private readonly prefix;
    constructor(namespace: string);
    /** Build a deterministic cache key from path + params. */
    private key;
    /** Return cached value or `undefined` on miss. */
    get<T>(path: string, params?: Record<string, unknown>): T | undefined;
    /** Store a value. */
    set<T>(path: string, params: Record<string, unknown> | undefined, value: T): void;
    /** Flush all entries for this namespace. */
    flush(): void;
}
//# sourceMappingURL=response-cache.d.ts.map