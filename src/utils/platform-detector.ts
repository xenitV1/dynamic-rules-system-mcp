import { Platform } from '../types/preferences.js';

export class PlatformDetector {
  static detect(): Platform {
    const platform = process.platform;
    
    if (platform === 'win32') {
      return 'windows';
    } else if (platform === 'darwin') {
      return 'mac';
    } else if (platform === 'linux') {
      return 'linux';
    }
    
    // Default fallback
    return 'windows';
  }
  
  static getEditorFromEnv(): string | undefined {
    const editors = ['cursor', 'cline', 'windsurf', 'continue'];
    
    // Check environment variables
    for (const editor of editors) {
      if (process.env[editor.toUpperCase()] || process.env[`MCP_${editor.toUpperCase()}`]) {
        return editor;
      }
    }
    
    // Check command line arguments
    const args = process.argv.join(' ');
    for (const editor of editors) {
      if (args.includes(editor)) {
        return editor;
      }
    }
    
    return undefined;
  }
  
  static hasGitHubRepo(): boolean {
    // Check for .git directory
    const fs = require('fs');
    const path = require('path');
    
    try {
      const gitPath = path.join(process.cwd(), '.git');
      return fs.existsSync(gitPath);
    } catch {
      return false;
    }
  }
}

