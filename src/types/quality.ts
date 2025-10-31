export type QualityGateStage = 'pre' | 'during' | 'post';

export interface QualityMetrics {
  fileSize: QualityScore;
  cleanliness: QualityScore;
  maintainability: QualityScore;
  performance: QualityScore;
  documentation: QualityScore;
}

export interface QualityScore {
  score: number; // 0-100
  weight: number; // 0-1
  status: 'excellent' | 'good' | 'acceptable' | 'needs-improvement' | 'poor';
  issues: QualityIssue[];
}

export interface QualityIssue {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  file?: string;
  line?: number;
  suggestion?: string;
}

export interface QualityGateResult {
  overallScore: number;
  status: 'passed' | 'passed-with-warnings' | 'failed' | 'blocked';
  breakdown: QualityMetrics;
  blockers: string[];
  warnings: string[];
  recommendations: string[];
  passedGates: string[];
}

export interface PreImplementationCheck {
  fileSizeCheck: FileSizeCheckResult;
  importAudit: ImportAuditResult;
  dependencyCheck: DependencyCheckResult;
  codebaseReadiness: CodebaseReadinessResult;
}

export interface FileSizeCheckResult {
  filePath: string;
  lineCount: number;
  status: 'safe' | 'warning' | 'violation';
  requiredAction?: string;
}

export interface ImportAuditResult {
  totalImports: number;
  unusedImports: string[];
  cleaned: boolean;
}

export interface DependencyCheckResult {
  conflicts: string[];
  outdated: string[];
  security: SecurityIssue[];
}

export interface SecurityIssue {
  package: string;
  vulnerability: string;
  severity: string;
}

export interface CodebaseReadinessResult {
  ready: boolean;
  issues: string[];
  recommendedActions: string[];
}

export interface DuringImplementationMonitoring {
  linesAdded: number;
  complexityIncrease: number;
  importChanges: number;
  codeSmells: string[];
  warnings: string[];
}

export interface PostImplementationValidation {
  codeQuality: QualityScore;
  performanceImpact: PerformanceImpact;
  maintainabilityScore: number;
  testCoverage?: number;
  documentationCompleteness?: number;
}

export interface PerformanceImpact {
  bundleSizeChange?: number;
  renderTimeChange?: number;
  memoryUsageChange?: number;
  networkRequestsChange?: number;
}

