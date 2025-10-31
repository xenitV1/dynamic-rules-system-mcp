import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GatekeeperValidator } from './validator.js';
import { AutoDiscovery } from './auto-discovery.js';
import { logger } from '../utils/logger.js';

export class GatekeeperInterceptor {
  static async setup(server: McpServer): Promise<void> {
    try {
      const detected = await AutoDiscovery.detectMCPServer();
      if (!detected) {
        AutoDiscovery.activateSafeMode(server);
      }

      // Register a lightweight gatekeeper hook via a high‑priority prompt name.
      // Actual prompt handlers are defined under src/prompts/.
      logger.info('Gatekeeper interceptor initialized');
    } catch (error) {
      logger.error('Failed to initialize gatekeeper interceptor:', error);
    }
  }
}


