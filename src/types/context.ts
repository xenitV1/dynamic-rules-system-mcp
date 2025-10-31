export type ProjectType = 'new' | 'existing' | 'debugging' | 'refactoring';
export type Complexity = 'simple' | 'moderate' | 'complex';
export type UserIntent = 'implementation' | 'learning' | 'fix' | 'optimize';
export type FileSizeStatus = 'safe' | 'approaching' | 'violation';

export interface ContextAnalysis {
  projectType: ProjectType;
  complexity: Complexity;
  userIntent: UserIntent;
  fileCount: number | 'few' | 'many';
  fileSizeStatus: FileSizeStatus;
  platform?: string;
  hasGitHubRepo?: boolean;
}

export interface ContextDetectionInput {
  userQuery: string;
  targetFiles?: string[];
  projectInfo?: {
    type?: ProjectType;
    language?: string;
    framework?: string;
  };
}

export interface ContextDetectionResult {
  selectedRuleSet: RuleSetId;
  loadedComponents: string[];
  recommendations: string[];
  contextAnalysis: ContextAnalysis;
}

export type RuleSetId = 'SET_001' | 'SET_002' | 'SET_003' | 'SET_004' | 'SET_005';

export enum RuleSetEnum {
  SIMPLE_TASK = 'SET_001',
  COMPLEX_PROJECT = 'SET_002',
  EDUCATION_MODE = 'SET_003',
  EMERGENCY = 'SET_004',
  SIZE_VIOLATION = 'SET_005',
}

export interface RuleSetMapping {
  'SET_001': string[]; // Basit Görev
  'SET_002': string[]; // Karmaşık Proje
  'SET_003': string[]; // Öğretim Modu
  'SET_004': string[]; // Acil Durum
  'SET_005': string[]; // Boyut İhlali
}

