import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { GatekeeperInterceptor } from './gatekeeper/interceptor.js';
import { logger } from './utils/logger.js';

export async function createAndStartServer(): Promise<void> {
  const server = new McpServer({ name: 'cursor-rules-server', version: '1.0.0' });

  await GatekeeperInterceptor.setup(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info('Server created and connected (server.ts)');
}


