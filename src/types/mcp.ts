import { z } from 'zod';

export interface MCPToolInput {
  tool: string;
  arguments?: Record<string, unknown>;
}

export interface MCPToolOutput {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface MCPPrompt {
  name: string;
  description: string;
  arguments?: Array<{
    name: string;
    description?: string;
    required?: boolean;
  }>;
}

export interface MCPCapabilities {
  tools?: boolean | { listChanged?: boolean };
  resources?: boolean | { subscribe?: boolean; listChanged?: boolean };
  prompts?: boolean | { listChanged?: boolean };
  logging?: Record<string, unknown>;
  experimental?: Record<string, unknown>;
}

export interface MCPGatekeeperConfig {
  enabled: boolean;
  priority: number;
  autoload: boolean;
  blockOnFailure: boolean;
  fallbackMode?: 'safe' | 'none';
}

export const MCPServerInfoSchema = z.object({
  name: z.string(),
  version: z.string(),
  protocolVersion: z.string().optional(),
  capabilities: z.record(z.unknown()).optional(),
});

export type MCPServerInfo = z.infer<typeof MCPServerInfoSchema>;

