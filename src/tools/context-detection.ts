import type {
  ContextDetectionInput,
  ContextDetectionResult,
  ContextAnalysis,
  ProjectType,
  Complexity,
  UserIntent,
  FileSizeStatus,
  RuleSetId,
} from '../types/context.js';
import { RuleSetEnum } from '../types/context.js';
import { RULE_SET_CONFIGS } from '../types/rules.js';
import { PlatformDetector } from '../utils/platform-detector.js';

export class ContextDetector {
  /**
   * Analyzes user query and context to determine appropriate rule set
   */
  static analyze(input: ContextDetectionInput): ContextDetectionResult {
    // Analyze context
    const analysis = this.detectContext(input);
    
    // Select rule set
    const selectedRuleSet = this.selectRuleSet(analysis);
    
    // Get loaded components
    const loadedComponents = RULE_SET_CONFIGS[selectedRuleSet].components;
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(analysis, selectedRuleSet);
    
    return {
      selectedRuleSet,
      loadedComponents,
      recommendations,
      contextAnalysis: analysis,
    };
  }
  
  /**
   * Detects context from user input and project info
   */
  private static detectContext(input: ContextDetectionInput): ContextAnalysis {
    const userQuery = input.userQuery.toLowerCase();
    const targetFiles = input.targetFiles || [];
    const projectInfo = input.projectInfo || {};
    
    // Detect project type
    const projectType = this.detectProjectType(userQuery, projectInfo);
    
    // Detect complexity
    const complexity = this.detectComplexity(userQuery, targetFiles);
    
    // Detect user intent
    const userIntent = this.detectUserIntent(userQuery);
    
    // Detect file count
    const fileCount = this.detectFileCount(targetFiles);
    
    // Detect file size status (placeholder - will be enhanced)
    const fileSizeStatus: FileSizeStatus = 'safe';
    
    // Detect platform
    const platform = PlatformDetector.detect();
    const hasGitHubRepo = PlatformDetector.hasGitHubRepo();
    
    return {
      projectType,
      complexity,
      userIntent,
      fileCount,
      fileSizeStatus,
      platform,
      hasGitHubRepo,
    };
  }
  
  private static detectProjectType(
    userQuery: string,
    projectInfo: { type?: ProjectType; language?: string; framework?: string }
  ): ProjectType {
    if (projectInfo.type) {
      return projectInfo.type;
    }
    
    // Heuristic detection
    if (userQuery.includes('bug') || userQuery.includes('hata') || userQuery.includes('fix') || userQuery.includes('düzelt')) {
      return 'debugging';
    }
    
    if (userQuery.includes('refactor') || userQuery.includes('yeniden yapılandır')) {
      return 'refactoring';
    }
    
    if (userQuery.includes('new') || userQuery.includes('yeni')) {
      return 'new';
    }
    
    return 'existing';
  }
  
  private static detectComplexity(query: string, targetFiles: string[]): Complexity {
    // Simple heuristic based on keywords and file count
    const complexKeywords = [
      'architecture',
      'mimari',
      'multiple',
      'birkaç',
      'several',
      'complex',
      'karmaşık',
      'state management',
      'performance',
      'optimization',
      'optimizasyon',
    ];
    
    const simpleKeywords = [
      'simple',
      'basit',
      'quick',
      'hızlı',
      'easy',
      'kolay',
      'minor',
      'küçük',
      'add',
      'ekle',
    ];
    
    const hasComplexKeyword = complexKeywords.some(kw => query.includes(kw));
    const hasSimpleKeyword = simpleKeywords.some(kw => query.includes(kw));
    
    // File count indicator
    if (targetFiles.length > 2) {
      return 'complex';
    }
    
    if (hasComplexKeyword) {
      return 'complex';
    }
    
    if (hasSimpleKeyword) {
      return 'simple';
    }
    
    // Default to moderate
    return 'moderate';
  }
  
  private static detectUserIntent(query: string): UserIntent {
    if (query.includes('learn') || query.includes('öğren') || query.includes('explain') || query.includes('açıkla')) {
      return 'learning';
    }
    
    if (query.includes('optimize') || query.includes('optimiz') || query.includes('improve') || query.includes('iyileştir')) {
      return 'optimize';
    }
    
    if (query.includes('fix') || query.includes('düzelt') || query.includes('bug') || query.includes('hata')) {
      return 'fix';
    }
    
    return 'implementation';
  }
  
  private static detectFileCount(files: string[]): number | 'few' | 'many' {
    if (files.length === 0) {
      return 0;
    }
    
    if (files.length === 1) {
      return 1;
    }
    
    if (files.length <= 3) {
      return 'few';
    }
    
    return 'many';
  }
  
  /**
   * Selects appropriate rule set based on context analysis
   */
  private static selectRuleSet(analysis: ContextAnalysis): RuleSetId {
    // Priority: Size violation > Emergency > Complexity > Intent
    
    // 1. Check for size violation (highest priority)
    if (analysis.fileSizeStatus === 'violation') {
      return RuleSetEnum.SIZE_VIOLATION;
    }
    
    // 2. Check for emergency (debugging/refactoring)
    if (analysis.projectType === 'debugging') {
      return RuleSetEnum.EMERGENCY;
    }
    
    // 3. Check for educational mode
    if (analysis.userIntent === 'learning' && analysis.complexity === 'complex') {
      return RuleSetEnum.EDUCATION_MODE;
    }
    
    // 4. Check for complex project
    if (analysis.complexity === 'complex') {
      return RuleSetEnum.COMPLEX_PROJECT;
    }
    
    // 5. Default to simple task
    return RuleSetEnum.SIMPLE_TASK;
  }
  
  /**
   * Generates recommendations based on context
   */
  private static generateRecommendations(
    analysis: ContextAnalysis,
    ruleSet: RuleSetId
  ): string[] {
    const recommendations: string[] = [];
    
    // Add rule set specific recommendations
    switch (ruleSet) {
      case RuleSetEnum.SIMPLE_TASK:
        recommendations.push('Direct implementation without MCP tools for speed');
        break;
      case RuleSetEnum.COMPLEX_PROJECT:
        recommendations.push('Use MCP tools for architecture planning');
        recommendations.push('Perform detailed codebase analysis');
        break;
      case RuleSetEnum.EDUCATION_MODE:
        recommendations.push('Provide detailed Turkish explanations');
        recommendations.push('Include step-by-step code examples');
        break;
      case RuleSetEnum.EMERGENCY:
        recommendations.push('Minimal changes with strict validation');
        recommendations.push('Document emergency modifications');
        break;
      case RuleSetEnum.SIZE_VIOLATION:
        recommendations.push('Mandatory refactoring required');
        recommendations.push('Consider component extraction strategies');
        break;
    }
    
    // Add platform-specific recommendations
    if (analysis.platform) {
      recommendations.push(`Platform: ${analysis.platform}`);
    }
    
    // Add file size warnings
    if (analysis.fileSizeStatus === 'approaching') {
      recommendations.push('Warning: File size approaching limit, consider refactoring soon');
    }
    
    return recommendations;
  }
}

