/**
 * HTTP + SSE transport — used when the server runs as a standalone HTTP
 * service (e.g., behind a Kubernetes Service for n8n / LibreChat).
 */
export declare function createHTTPServer(): import("express-serve-static-core").Express;
export declare function startHTTPTransport(): Promise<void>;
//# sourceMappingURL=http.d.ts.map