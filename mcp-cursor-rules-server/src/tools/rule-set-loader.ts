import { RULE_SET_CONFIGS } from '../types/rules.js';
import type { RuleSetId } from '../types/context.js';

export interface RuleSetLoadResult {
  ruleSetId: RuleSetId;
  name: string;
  description: string;
  components: string[];
  priority: number;
  isLoaded: boolean;
  message: string;
}

export class RuleSetLoader {
  /**
   * Load a specific rule set
   */
  static load(ruleSetId: RuleSetId): RuleSetLoadResult {
    const config = RULE_SET_CONFIGS[ruleSetId];
    
    if (!config) {
      return {
        ruleSetId,
        name: 'Unknown',
        description: 'Rule set not found',
        components: [],
        priority: 99,
        isLoaded: false,
        message: `Rule set ${ruleSetId} does not exist`,
      };
    }
    
    return {
      ruleSetId: config.id,
      name: config.name,
      description: config.description,
      components: config.components,
      priority: config.priority,
      isLoaded: true,
      message: `Successfully loaded ${config.name} rule set with ${config.components.length} components`,
    };
  }
  
  /**
   * Load rule set automatically based on context
   */
  static loadAuto(context: {
    complexity?: string;
    userIntent?: string;
    projectType?: string;
    fileSizeStatus?: string;
  }): RuleSetLoadResult {
    // Priority order matching context detection logic
    if (context.fileSizeStatus === 'violation') {
      return this.load('SET_005');
    }
    
    if (context.projectType === 'debugging') {
      return this.load('SET_004');
    }
    
    if (context.userIntent === 'learning' && context.complexity === 'complex') {
      return this.load('SET_003');
    }
    
    if (context.complexity === 'complex') {
      return this.load('SET_002');
    }
    
    // Default to simple task
    return this.load('SET_001');
  }
  
  /**
   * Get all available rule sets
   */
  static listAll(): Array<{
    id: RuleSetId;
    name: string;
    description: string;
    components: string[];
    priority: number;
  }> {
    return Object.values(RULE_SET_CONFIGS).map(config => ({
      id: config.id,
      name: config.name,
      description: config.description,
      components: config.components,
      priority: config.priority,
    }));
  }
  
  /**
   * Get component list for a rule set
   */
  static getComponents(ruleSetId: RuleSetId): string[] {
    const config = RULE_SET_CONFIGS[ruleSetId];
    return config ? config.components : [];
  }
}

