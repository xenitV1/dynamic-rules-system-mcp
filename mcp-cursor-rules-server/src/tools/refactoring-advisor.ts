export interface RefactoringStrategy {
  name: string;
  description: string;
  estimatedEffort: 'low' | 'medium' | 'high';
  applicableLines: number; // Approximate lines that can be extracted
  newFiles?: string[];
  dependencies?: string[];
}

export interface RefactoringRecommendation {
  filePath: string;
  currentSize: number;
  targetSize: number;
  strategies: RefactoringStrategy[];
  recommendedStrategy: string;
  estimatedSavings: number;
  message: string;
}

export interface RefactoringInput {
  filePath: string;
  currentSize: number;
  violations?: string[];
}

export class RefactoringAdvisor {
  /**
   * Generate refactoring recommendations for oversized file
   */
  static recommend(input: RefactoringInput): RefactoringRecommendation {
    const { filePath, currentSize, violations = [] } = input;
    
    // Target size is 70% of hard limit (700 lines)
    const targetSize = 500;
    const targetReduction = currentSize - targetSize;
    
    // Generate all applicable strategies
    const strategies = this.generateStrategies(filePath, currentSize);
    
    // Determine recommended strategy
    const recommendedStrategy = this.selectRecommendedStrategy(strategies, targetReduction);
    
    // Calculate estimated savings
    const estimatedSavings = this.calculateEstimatedSavings(strategies, recommendedStrategy);
    
    // Generate message
    const message = this.generateMessage(currentSize, targetSize, strategies, recommendedStrategy);
    
    return {
      filePath,
      currentSize,
      targetSize,
      strategies,
      recommendedStrategy,
      estimatedSavings,
      message,
    };
  }
  
  /**
   * Generate all applicable refactoring strategies
   */
  private static generateStrategies(filePath: string, currentSize: number): RefactoringStrategy[] {
    const strategies: RefactoringStrategy[] = [];
    
    // 1. Component splitting
    strategies.push({
      name: 'component-splitting',
      description: 'Split large component into smaller, focused components',
      estimatedEffort: 'medium',
      applicableLines: Math.floor(currentSize * 0.4),
      newFiles: [`${this.getBaseName(filePath)}Components.ts`],
    });
    
    // 2. Utility extraction
    strategies.push({
      name: 'utility-extraction',
      description: 'Extract utility functions into separate module',
      estimatedEffort: 'low',
      applicableLines: Math.floor(currentSize * 0.2),
      newFiles: [`${this.getBaseName(filePath)}Utils.ts`],
    });
    
    // 3. Hook extraction
    strategies.push({
      name: 'hook-extraction',
      description: 'Extract custom hooks and business logic',
      estimatedEffort: 'medium',
      applicableLines: Math.floor(currentSize * 0.3),
      newFiles: [`use${this.getBaseName(filePath)}Hook.ts`],
    });
    
    // 4. Service separation
    strategies.push({
      name: 'service-separation',
      description: 'Separate API calls and data fetching into service layer',
      estimatedEffort: 'medium',
      applicableLines: Math.floor(currentSize * 0.25),
      newFiles: [`${this.getBaseName(filePath)}Service.ts`],
    });
    
    // 5. Type definition extraction
    strategies.push({
      name: 'type-extraction',
      description: 'Move type definitions to separate types file',
      estimatedEffort: 'low',
      applicableLines: Math.floor(currentSize * 0.1),
      newFiles: [`${this.getBaseName(filePath)}Types.ts`],
    });
    
    // 6. Constants extraction
    strategies.push({
      name: 'constants-extraction',
      description: 'Extract constants and configuration',
      estimatedEffort: 'low',
      applicableLines: Math.floor(currentSize * 0.05),
      newFiles: [`${this.getBaseName(filePath)}Constants.ts`],
    });
    
    return strategies.filter(s => s.applicableLines > 0);
  }
  
  /**
   * Select recommended strategy based on target reduction
   */
  private static selectRecommendedStrategy(
    strategies: RefactoringStrategy[],
    targetReduction: number
  ): string {
    if (strategies.length === 0) {
      return 'manual-refactoring';
    }
    
    // Sort by applicable lines descending
    const sorted = [...strategies].sort((a, b) => b.applicableLines - a.applicableLines);
    
    // Find strategy that can achieve target reduction
    let cumulative = 0;
    for (const strategy of sorted) {
      cumulative += strategy.applicableLines;
      if (cumulative >= targetReduction * 0.9) {
        return strategy.name;
      }
    }
    
    // If single strategy isn't enough, recommend combination
    return 'combined-strategy';
  }
  
  /**
   * Calculate estimated line savings
   */
  private static calculateEstimatedSavings(
    strategies: RefactoringStrategy[],
    recommended: string
  ): number {
    if (recommended === 'combined-strategy') {
      // Return sum of top 3 strategies
      const sorted = [...strategies].sort((a, b) => b.applicableLines - a.applicableLines);
      return sorted.slice(0, 3).reduce((sum, s) => sum + s.applicableLines, 0);
    }
    
    const strategy = strategies.find(s => s.name === recommended);
    return strategy ? strategy.applicableLines : 0;
  }
  
  /**
   * Generate recommendation message
   */
  private static generateMessage(
    currentSize: number,
    targetSize: number,
    strategies: RefactoringStrategy[],
    recommended: string
  ): string {
    let message = `Refactoring Recommendation:\n`;
    message += `Current: ${currentSize} lines | Target: ${targetSize} lines\n`;
    message += `Reduction needed: ${currentSize - targetSize} lines\n\n`;
    
    if (recommended === 'combined-strategy') {
      message += `Recommended: Apply multiple strategies\n`;
      message += `Top strategies:\n`;
      const top3 = [...strategies].sort((a, b) => b.applicableLines - a.applicableLines).slice(0, 3);
      top3.forEach((s, i) => {
        message += `  ${i + 1}. ${s.name}: ~${s.applicableLines} lines (${s.estimatedEffort} effort)\n`;
      });
    } else if (recommended === 'manual-refactoring') {
      message += `Recommended: Manual refactoring required\n`;
      message += `Consider architecture-level changes\n`;
    } else {
      const strategy = strategies.find(s => s.name === recommended);
      if (strategy) {
        message += `Recommended Strategy: ${strategy.name}\n`;
        message += `Description: ${strategy.description}\n`;
        message += `Estimated savings: ~${strategy.applicableLines} lines\n`;
        message += `Effort: ${strategy.estimatedEffort}\n`;
      }
    }
    
    return message;
  }
  
  /**
   * Get base name from file path
   */
  private static getBaseName(filePath: string): string {
    const parts = filePath.split(/[/\\]/);
    const filename = parts[parts.length - 1];
    return filename.replace(/\.(ts|tsx|js|jsx)$/, '');
  }
}

