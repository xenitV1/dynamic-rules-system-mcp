export type RuleSetId = 'SET_001' | 'SET_002' | 'SET_003' | 'SET_004' | 'SET_005';

export interface RuleSetDefinition {
  id: RuleSetId;
  components: string[];
  description: string;
}

export const RULE_SETS: RuleSetDefinition[] = [
  { id: 'SET_001', components: ['language-rules', 'file-size-enforcement', 'clean-code-standards', 'simple-task-handling'], description: 'Simple task' },
  { id: 'SET_002', components: ['language-rules', 'file-size-enforcement', 'clean-code-standards', 'complex-project-management', 'codebase-analysis', 'mcp-tool-usage'], description: 'Complex project' },
  { id: 'SET_003', components: ['language-rules', 'educational-approach', 'clean-code-standards'], description: 'Educational mode' },
  { id: 'SET_004', components: ['language-rules', 'file-size-enforcement', 'emergency-protocols', 'clean-code-standards'], description: 'Emergency' },
  { id: 'SET_005', components: ['language-rules', 'file-size-enforcement', 'codebase-analysis'], description: 'File size violation' },
];


