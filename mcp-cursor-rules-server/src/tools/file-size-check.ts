import type { FileSizeCheckResult } from '../types/quality.js';

export interface FileSizeCheckInput {
  filePath?: string;
  fileContent?: string;
  warningLimit?: number;
  hardLimit?: number;
}

export class FileSizeChecker {
  /**
   * Checks file size against limits
   */
  static check(input: FileSizeCheckInput): FileSizeCheckResult {
    const { filePath, fileContent, warningLimit = 700, hardLimit = 1000 } = input;
    
    if (!fileContent && !filePath) {
      throw new Error('Either filePath or fileContent must be provided');
    }
    
    // Count lines
    let lineCount: number;
    if (fileContent) {
      lineCount = this.countLines(fileContent);
    } else if (filePath) {
      lineCount = this.countLinesFromFile(filePath);
    } else {
      lineCount = 0;
    }
    
    // Determine status
    let status: 'safe' | 'warning' | 'violation';
    let requiredAction: string | undefined;
    
    if (lineCount >= hardLimit) {
      status = 'violation';
      requiredAction = `MANDATORY REFACTORING: File exceeds hard limit of ${hardLimit} lines. Cannot add new code without refactoring.`;
    } else if (lineCount >= warningLimit) {
      status = 'warning';
      requiredAction = `Warning: File approaching limit (${lineCount}/${hardLimit}). Consider refactoring soon.`;
    } else {
      status = 'safe';
    }
    
    return {
      filePath: filePath || 'memory',
      lineCount,
      status,
      requiredAction,
    };
  }
  
  /**
   * Count lines in content string
   */
  private static countLines(content: string): number {
    if (!content) {
      return 0;
    }
    
    // Split by newlines and filter empty if needed
    const lines = content.split(/\r?\n/);
    return lines.length;
  }
  
  /**
   * Count lines from file system
   */
  private static countLinesFromFile(filePath: string): number {
    try {
      const fs = require('fs');
      const content = fs.readFileSync(filePath, 'utf-8');
      return this.countLines(content);
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Get file size status summary
   */
  static getStatusSummary(result: FileSizeCheckResult): string {
    const { filePath, lineCount, status, requiredAction } = result;
    
    let summary = `File: ${filePath}\n`;
    summary += `Lines: ${lineCount}\n`;
    summary += `Status: ${status.toUpperCase()}\n`;
    
    if (requiredAction) {
      summary += `Action: ${requiredAction}\n`;
    }
    
    return summary;
  }
}

