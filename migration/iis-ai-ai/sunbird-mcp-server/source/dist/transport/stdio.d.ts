/**
 * MCP Stdio transport — used when the server is launched as a subprocess
 * by an MCP client (e.g., Claude Desktop, Cursor).
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
export declare function createMCPServer(): Server;
export declare function startStdioTransport(): Promise<void>;
//# sourceMappingURL=stdio.d.ts.map