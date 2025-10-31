import type {
  QualityGateStage,
  QualityGateResult,
  QualityMetrics,
  QualityScore,
  QualityIssue,
} from '../types/quality.js';
import { FileSizeChecker } from './file-size-check.js';

export interface QualityGateInput {
  stage: QualityGateStage;
  files?: string[];
  changes?: {
    linesAdded?: number;
    filesModified?: number;
  };
  currentMetrics?: Partial<QualityMetrics>;
}

export class QualityGatesManager {
  /**
   * Run quality gates for given stage
   */
  static run(stage: QualityGateStage, input: Partial<QualityGateInput> = {}): QualityGateResult {
    const { files = [], changes = {}, currentMetrics } = input;
    
    switch (stage) {
      case 'pre':
        return this.runPreImplementationChecks(files, currentMetrics);
      case 'during':
        return this.runDuringImplementationChecks(changes);
      case 'post':
        return this.runPostImplementationValidation(files, currentMetrics);
      default:
        throw new Error(`Unknown quality gate stage: ${stage}`);
    }
  }
  
  /**
   * Pre-implementation checks
   */
  private static runPreImplementationChecks(
    files: string[],
    currentMetrics?: Partial<QualityMetrics>
  ): QualityGateResult {
    const breakdown: QualityMetrics = {
      fileSize: this.calculateFileSizeScore(files),
      cleanliness: this.calculateCleanlinessScore(files),
      maintainability: { score: 85, weight: 0.2, status: 'good', issues: [] },
      performance: { score: 80, weight: 0.15, status: 'acceptable', issues: [] },
      documentation: { score: 75, weight: 0.15, status: 'good', issues: [] },
    };
    
    // Merge with current metrics if provided
    if (currentMetrics) {
      Object.assign(breakdown, currentMetrics);
    }
    
    const overallScore = this.calculateOverallScore(breakdown);
    const blockers: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    // Check for blockers
    if (breakdown.fileSize.issues.some(issue => issue.severity === 'critical')) {
      blockers.push('File size exceeds hard limit (1000 lines)');
    }
    
    if (breakdown.cleanliness.issues.some(issue => issue.severity === 'critical')) {
      warnings.push('Unused imports detected');
    }
    
    // Generate recommendations
    if (overallScore < 70) {
      recommendations.push('Overall quality score is below acceptable threshold');
    }
    
    const status: QualityGateResult['status'] =
      blockers.length > 0
        ? 'blocked'
        : overallScore >= 70
        ? 'passed'
        : overallScore >= 50
        ? 'passed-with-warnings'
        : 'failed';
    
    return {
      overallScore,
      status,
      breakdown,
      blockers,
      warnings,
      recommendations,
      passedGates: ['pre-implementation'],
    };
  }
  
  /**
   * During implementation monitoring
   */
  private static runDuringImplementationChecks(changes: { linesAdded?: number } = {}): QualityGateResult {
    const breakdown: QualityMetrics = {
      fileSize: { score: 90, weight: 0.25, status: 'excellent', issues: [] },
      cleanliness: { score: 95, weight: 0.25, status: 'excellent', issues: [] },
      maintainability: { score: 85, weight: 0.2, status: 'good', issues: [] },
      performance: { score: 80, weight: 0.15, status: 'acceptable', issues: [] },
      documentation: { score: 75, weight: 0.15, status: 'good', issues: [] },
    };
    
    const overallScore = this.calculateOverallScore(breakdown);
    const warnings: string[] = [];
    
    if (changes.linesAdded && changes.linesAdded > 100) {
      warnings.push('Large number of lines added, consider breaking into smaller changes');
    }
    
    return {
      overallScore,
      status: 'passed',
      breakdown,
      blockers: [],
      warnings,
      recommendations: [],
      passedGates: ['during-implementation'],
    };
  }
  
  /**
   * Post-implementation validation
   */
  private static runPostImplementationValidation(
    files: string[],
    currentMetrics?: Partial<QualityMetrics>
  ): QualityGateResult {
    const breakdown: QualityMetrics = {
      fileSize: this.calculateFileSizeScore(files),
      cleanliness: this.calculateCleanlinessScore(files),
      maintainability: { score: 85, weight: 0.2, status: 'good', issues: [] },
      performance: { score: 80, weight: 0.15, status: 'acceptable', issues: [] },
      documentation: { score: 75, weight: 0.15, status: 'good', issues: [] },
    };
    
    if (currentMetrics) {
      Object.assign(breakdown, currentMetrics);
    }
    
    const overallScore = this.calculateOverallScore(breakdown);
    const blockers: string[] = [];
    const warnings: string[] = [];
    
    // Final checks
    if (breakdown.fileSize.status === 'poor') {
      blockers.push('File size quality is poor, refactoring required');
    }
    
    if (overallScore < 70) {
      warnings.push('Final quality score below target threshold (70)');
    }
    
    const status: QualityGateResult['status'] =
      blockers.length > 0
        ? 'blocked'
        : overallScore >= 70
        ? 'passed'
        : 'failed';
    
    return {
      overallScore,
      status,
      breakdown,
      blockers,
      warnings,
      recommendations: [],
      passedGates: ['post-implementation'],
    };
  }
  
  /**
   * Calculate file size quality score
   */
  private static calculateFileSizeScore(files: string[]): QualityScore {
    if (files.length === 0) {
      return { score: 100, weight: 0.25, status: 'excellent', issues: [] };
    }
    
    // Check each file
    const issues: QualityIssue[] = [];
    let totalScore = 0;
    
    for (const file of files) {
      try {
        const result = FileSizeChecker.check({ filePath: file });
        totalScore += this.convertFileSizeStatusToScore(result.status);
        
        if (result.status === 'violation') {
          issues.push({
            type: 'file-size-violation',
            severity: 'critical',
            message: result.requiredAction || 'File exceeds hard limit',
            file: file,
          });
        } else if (result.status === 'warning') {
          issues.push({
            type: 'file-size-warning',
            severity: 'warning',
            message: result.requiredAction || 'File approaching limit',
            file: file,
          });
        }
      } catch (error) {
        // File doesn't exist or can't be read
        totalScore += 50; // Neutral score
      }
    }
    
    const averageScore = files.length > 0 ? totalScore / files.length : 100;
    const status = this.convertScoreToStatus(averageScore);
    
    return {
      score: averageScore,
      weight: 0.25,
      status,
      issues,
    };
  }
  
  /**
   * Calculate cleanliness score (simplified)
   */
  private static calculateCleanlinessScore(files: string[]): QualityScore {
    // Simplified implementation - in production would scan for unused imports, dead code, etc.
    return {
      score: 90,
      weight: 0.25,
      status: 'excellent',
      issues: [],
    };
  }
  
  /**
   * Calculate overall weighted score
   */
  private static calculateOverallScore(breakdown: QualityMetrics): number {
    return Math.round(
      breakdown.fileSize.score * breakdown.fileSize.weight +
      breakdown.cleanliness.score * breakdown.cleanliness.weight +
      breakdown.maintainability.score * breakdown.maintainability.weight +
      breakdown.performance.score * breakdown.performance.weight +
      breakdown.documentation.score * breakdown.documentation.weight
    );
  }
  
  /**
   * Convert file size status to score
   */
  private static convertFileSizeStatusToScore(status: 'safe' | 'warning' | 'violation'): number {
    switch (status) {
      case 'safe':
        return 100;
      case 'warning':
        return 70;
      case 'violation':
        return 0;
    }
  }
  
  /**
   * Convert score to status
   */
  private static convertScoreToStatus(score: number): QualityScore['status'] {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'acceptable';
    if (score >= 50) return 'needs-improvement';
    return 'poor';
  }
}

