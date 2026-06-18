/**
 * Custom error hierarchy for the MCP server.
 *
 * Every error carries a machine-readable `code` that maps to a JSON-RPC
 * error code so transport layers can serialise it consistently.
 */
// ---------------------------------------------------------------------------
// Base
// ---------------------------------------------------------------------------
export class McpServerError extends Error {
    /** JSON-RPC error code (-32000 … -32099 are server-defined) */
    code;
    /** Optional upstream details for logging (never leaked to clients) */
    cause;
    constructor(message, code = -32000, cause) {
        super(message);
        this.name = 'McpServerError';
        this.code = code;
        this.cause = cause;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
// ---------------------------------------------------------------------------
// Specific errors
// ---------------------------------------------------------------------------
/** The requested tool name does not exist in the registry. */
export class ToolNotFoundError extends McpServerError {
    constructor(toolName) {
        super(`Unknown tool: ${toolName}`, -32601);
        this.name = 'ToolNotFoundError';
    }
}
/** Input validation failed (bad arguments from the caller). */
export class ValidationError extends McpServerError {
    constructor(message, cause) {
        super(message, -32602, cause);
        this.name = 'ValidationError';
    }
}
/** Upstream Sunbird API returned an error or timed out. */
export class SunbirdApiError extends McpServerError {
    statusCode;
    constructor(message, statusCode, cause) {
        super(message, -32000, cause);
        this.name = 'SunbirdApiError';
        this.statusCode = statusCode;
    }
}
/** Authentication / authorisation failure against Sunbird. */
export class AuthenticationError extends SunbirdApiError {
    constructor(message = 'Authentication failed', cause) {
        super(message, 401, cause);
        this.name = 'AuthenticationError';
    }
}
/** Rate-limited by Sunbird. */
export class RateLimitError extends SunbirdApiError {
    constructor(message = 'Rate limited by Sunbird API', cause) {
        super(message, 429, cause);
        this.name = 'RateLimitError';
    }
}
//# sourceMappingURL=mcp-errors.js.map