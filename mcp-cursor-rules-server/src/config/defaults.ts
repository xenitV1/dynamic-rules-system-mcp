import { DEFAULT_USER_PREFERENCES } from '../types/preferences.js';

export { DEFAULT_USER_PREFERENCES };

export const CONFIG_FILE_NAME = 'config.json';
export const CONFIG_DIR_NAME = 'mcp-cursor-rules';

export function getConfigPath(): string {
  const os = require('os');
  const path = require('path');
  
  let configDir: string;
  
  if (process.platform === 'win32') {
    configDir = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  } else {
    configDir = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config');
  }
  
  return path.join(configDir, CONFIG_DIR_NAME, CONFIG_FILE_NAME);
}

