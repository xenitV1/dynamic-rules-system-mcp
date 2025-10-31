import { RuleSetId } from './context';

export type RulePriority = 0 | 1 | 2 | 3 | 4 | 5;

export interface Rule {
  name: string;
  description: string;
  priority: RulePriority;
  enforcement?: {
    required?: boolean;
    autoExecute?: boolean;
    blockOnFailure?: boolean;
  };
  checks?: RuleCheck[];
}

export interface RuleCheck {
  name: string;
  type: 'file-size' | 'import-cleanup' | 'dead-code' | 'single-responsibility' | 'minimal-implementation';
  condition: string;
  action: 'remove' | 'refactor' | 'warn' | 'block';
}

export interface ComponentRule extends Rule {
  componentType: 'core' | 'protocol' | 'specialized' | 'task-handling';
  filePath?: string;
}

export interface RuleSetConfiguration {
  id: RuleSetId;
  name: string;
  description: string;
  components: string[];
  priority: RulePriority;
  triggerConditions?: {
    projectType?: string[];
    complexity?: string[];
    userIntent?: string[];
    fileSizeStatus?: string[];
  };
}

export const RULE_SET_CONFIGS: Record<RuleSetId, RuleSetConfiguration> = {
  SET_001: {
    id: 'SET_001',
    name: 'Basit Görev',
    description: 'Tek dosya, basit değişiklik',
    components: ['language-rules', 'file-size-enforcement', 'clean-code-standards', 'simple-task-handling'],
    priority: 4,
    triggerConditions: {
      complexity: ['simple'],
    },
  },
  SET_002: {
    id: 'SET_002',
    name: 'Karmaşık Proje',
    description: 'Çoklu dosya, yeni özellik',
    components: [
      'language-rules',
      'file-size-enforcement',
      'clean-code-standards',
      'complex-project-management',
      'codebase-analysis',
      'mcp-tool-usage',
    ],
    priority: 3,
    triggerConditions: {
      complexity: ['complex'],
    },
  },
  SET_003: {
    id: 'SET_003',
    name: 'Öğretim Modu',
    description: 'Kullanıcı öğrenmeye odaklanmış',
    components: ['language-rules', 'educational-approach', 'clean-code-standards'],
    priority: 2,
    triggerConditions: {
      userIntent: ['learning'],
      complexity: ['complex'],
    },
  },
  SET_004: {
    id: 'SET_004',
    name: 'Acil Durum',
    description: 'Kritik hata düzeltme',
    components: ['language-rules', 'file-size-enforcement', 'emergency-protocols', 'clean-code-standards'],
    priority: 1,
    triggerConditions: {
      projectType: ['debugging'],
    },
  },
  SET_005: {
    id: 'SET_005',
    name: 'Boyut İhlali',
    description: '700+ satır tespit edildi',
    components: ['language-rules', 'file-size-enforcement', 'codebase-analysis'],
    priority: 0,
    triggerConditions: {
      fileSizeStatus: ['violation'],
    },
  },
};

