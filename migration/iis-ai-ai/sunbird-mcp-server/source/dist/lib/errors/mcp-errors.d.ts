/**
 * Custom error hierarchy for the MCP server.
 *
 * Every error carries a machine-readable `code` that maps to a JSON-RPC
 * error code so transport layers can serialise it consistently.
 */
export declare class McpServerError extends Error {
    /** JSON-RPC error code (-32000 … -32099 are server-defined) */
    readonly code: number;
    /** Optional upstream details for logging (never leaked to clients) */
    readonly cause?: unknown;
    constructor(message: string, code?: number, cause?: unknown);
}
/** The requested tool name does not exist in the registry. */
export declare class ToolNotFoundError extends McpServerError {
    constructor(toolName: string);
}
/** Input validation failed (bad arguments from the caller). */
export declare class ValidationError extends McpServerError {
    constructor(message: string, cause?: unknown);
}
/** Upstream Sunbird API returned an error or timed out. */
export declare class SunbirdApiError extends McpServerError {
    readonly statusCode?: number;
    constructor(message: string, statusCode?: number, cause?: unknown);
}
/** Authentication / authorisation failure against Sunbird. */
export declare class AuthenticationError extends SunbirdApiError {
    constructor(message?: string, cause?: unknown);
}
/** Rate-limited by Sunbird. */
export declare class RateLimitError extends SunbirdApiError {
    constructor(message?: string, cause?: unknown);
}
//# sourceMappingURL=mcp-errors.d.ts.map