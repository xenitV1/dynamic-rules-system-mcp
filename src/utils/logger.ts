export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private level: LogLevel;
  
  constructor(level: LogLevel = 'info') {
    this.level = level;
  }
  
  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.error('[DEBUG]', message, ...args);
    }
  }
  
  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.error('[INFO]', message, ...args);
    }
  }
  
  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.error('[WARN]', message, ...args);
    }
  }
  
  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error('[ERROR]', message, ...args);
    }
  }
  
  private shouldLog(logLevel: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(logLevel) >= levels.indexOf(this.level);
  }
}

export const logger = new Logger(process.env.MCP_LOG_LEVEL as LogLevel || 'info');

