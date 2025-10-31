#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { PreferencesSchema } from './config/schema.js';
import { ContextDetector } from './tools/context-detection.js';
import { FileSizeChecker } from './tools/file-size-check.js';
import { QualityGatesManager } from './tools/quality-gates.js';
import { RuleSetLoader } from './tools/rule-set-loader.js';
import { RefactoringAdvisor } from './tools/refactoring-advisor.js';
import { EducationalGuide } from './tools/educational-guide.js';
import { Reporter } from './utils/reporter.js';
import { UserPreferencesManager } from './resources/user-preferences.js';
import { logger } from './utils/logger.js';

async function main() {
  const args = process.argv.slice(2);
  
  if (args[0] === 'config') {
    const sub = args[1];
    if (sub === 'show') {
      const prefs = await UserPreferencesManager.load();
      // Turkish output for user communication
      // English keys for code/tech
      console.log(JSON.stringify(prefs, null, 2));
      process.exit(0);
    }
    if (sub === 'set') {
      const key = args[2];
      const value = args[3];
      if (!key || value === undefined) {
        console.error('Kullanım: dynamic-rules-system-mcp config set <key> <value>');
        process.exit(1);
      }
      const prefs = await UserPreferencesManager.load();
      const updated = { ...prefs } as any;
      // shallow dotted path setter
      const parts = key.split('.');
      let cursor: any = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        cursor[p] = cursor[p] ?? {};
        cursor = cursor[p];
      }
      try {
        // try to JSON parse primitives
        cursor[parts[parts.length - 1]] = JSON.parse(value);
      } catch {
        cursor[parts[parts.length - 1]] = value;
      }
      const parsed = PreferencesSchema.safeParse(updated);
      if (!parsed.success) {
        console.error('Geçersiz değer:', parsed.error.message);
        process.exit(1);
      }
      await UserPreferencesManager.save(parsed.data);
      console.log('✅ Ayar güncellendi');
      process.exit(0);
    }
    if (sub === 'reset') {
      await UserPreferencesManager.resetToDefaults();
      console.log('✅ Varsayılan ayarlara dönüldü');
      process.exit(0);
    }
    // default: interactive wizard placeholder
    console.log('Komutlar: show | set <key> <value> | reset');
    process.exit(0);
  }
  
  const server = new McpServer({
    name: 'dynamic-rules-system',
    version: '1.0.0'
  });
  
  // Register analyze_context tool
  server.tool(
    'analyze_context',
    'Analyzes user query and context to determine appropriate rule set',
    {
      userQuery: z.string().describe('The user\'s query or request'),
      targetFiles: z.array(z.string()).optional().describe('List of target files to be modified'),
      projectInfo: z.object({
        type: z.enum(['new', 'existing', 'debugging', 'refactoring']).optional(),
        language: z.string().optional(),
        framework: z.string().optional(),
      }).optional().describe('Additional project information'),
    },
    async ({ userQuery, targetFiles, projectInfo }) => {
      try {
        const result = ContextDetector.analyze({
          userQuery,
          targetFiles: targetFiles || [],
          projectInfo,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error('Error in analyze_context:', error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
  
  // Register check_file_size tool
  server.tool(
    'check_file_size',
    'Checks file size against 700/1000 line limits',
    {
      filePath: z.string().optional().describe('Path to file to check'),
      fileContent: z.string().optional().describe('File content as string'),
      warningLimit: z.number().optional().default(700).describe('Line count warning threshold'),
      hardLimit: z.number().optional().default(1000).describe('Hard line count limit'),
    },
    async ({ filePath, fileContent, warningLimit, hardLimit }) => {
      try {
        const result = FileSizeChecker.check({
          filePath,
          fileContent,
          warningLimit,
          hardLimit,
        });
        
        const summary = FileSizeChecker.getStatusSummary(result);
        
        return {
          content: [
            {
              type: 'text',
              text: summary + '\n\n' + JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error('Error in check_file_size:', error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
  
  // Register run_quality_gates tool
  server.tool(
    'run_quality_gates',
    'Runs quality gates for pre/during/post implementation stages',
    {
      stage: z.enum(['pre', 'during', 'post']).describe('Quality gate stage'),
      files: z.array(z.string()).optional().describe('List of files to check'),
      changes: z.object({
        linesAdded: z.number().optional(),
        filesModified: z.number().optional(),
      }).optional().describe('Information about changes made'),
    },
    async ({ stage, files, changes }) => {
      try {
        const result = QualityGatesManager.run(stage, { files, changes });
        const preferences = await UserPreferencesManager.load();
        const report = Reporter.generateQualityReport(result, preferences);
        
        return {
          content: [
            {
              type: 'text',
              text: report + '\n\n' + JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error('Error in run_quality_gates:', error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
  
  // Register load_rule_set tool
  server.tool(
    'load_rule_set',
    'Loads a specific rule set or automatically selects based on context',
    {
      ruleSetId: z.enum(['SET_001', 'SET_002', 'SET_003', 'SET_004', 'SET_005', 'auto']).optional().describe('Specific rule set ID or auto for automatic selection'),
      context: z.object({
        complexity: z.enum(['simple', 'moderate', 'complex']).optional(),
        userIntent: z.enum(['implementation', 'learning', 'fix', 'optimize']).optional(),
        projectType: z.enum(['new', 'existing', 'debugging', 'refactoring']).optional(),
        fileSizeStatus: z.enum(['safe', 'approaching', 'violation']).optional(),
      }).optional().describe('Context for automatic rule set selection'),
    },
    async ({ ruleSetId, context }) => {
      try {
        let result;
        
        if (!ruleSetId || ruleSetId === 'auto') {
          // Automatic selection based on context
          result = RuleSetLoader.loadAuto(context || {});
        } else {
          // Load specific rule set
          result = RuleSetLoader.load(ruleSetId);
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error('Error in load_rule_set:', error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
  
  // Register suggest_refactoring tool
  server.tool(
    'suggest_refactoring',
    'Suggests refactoring strategies for oversized files',
    {
      filePath: z.string().describe('Path to file needing refactoring'),
      currentSize: z.number().describe('Current line count'),
      violations: z.array(z.string()).optional().describe('List of quality violations'),
    },
    async ({ filePath, currentSize, violations }) => {
      try {
        const result = RefactoringAdvisor.recommend({
          filePath,
          currentSize,
          violations,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: result.message + '\n\n' + JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error('Error in suggest_refactoring:', error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
  
  // Register educational_guide tool
  server.tool(
    'educational_guide',
    'Provides educational guidance with Turkish explanations and English code examples',
    {
      topic: z.string().describe('Topic to learn about'),
      complexity: z.enum(['simple', 'moderate', 'complex']).describe('Complexity level'),
      language: z.enum(['tr', 'en']).optional().describe('Preferred language for explanations'),
    },
    async ({ topic, complexity, language }) => {
      try {
        const preferences = await UserPreferencesManager.load();
        const effectiveLanguage = language || preferences.language.userCommunication;
        
        const result = EducationalGuide.generate(
          { topic, complexity, language: effectiveLanguage },
          preferences
        );
        
        let formatted = `${result.explanation}\n\n`;
        formatted += `CODE EXAMPLE (English):\n\`\`\`${complexity === 'complex' ? 'typescript' : 'javascript'}\n${result.codeExample}\n\`\`\`\n\n`;
        
        formatted += 'STEP-BY-STEP:\n';
        result.stepByStep.forEach((step, i) => {
          formatted += `${i + 1}. ${step}\n`;
        });
        
        if (result.resources.length > 0) {
          formatted += '\nRESOURCES:\n';
          result.resources.forEach((resource, i) => {
            formatted += `${i + 1}. ${resource}\n`;
          });
        }
        
        if (result.relatedConcepts.length > 0) {
          formatted += '\nRELATED CONCEPTS: ' + result.relatedConcepts.join(', ');
        }
        
        return {
          content: [
            {
              type: 'text',
              text: formatted + '\n\n' + JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error('Error in educational_guide:', error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
  
  // Register user-preferences resource
  server.registerResource(
    'user-preferences',
    'config://user-preferences',
    {
      title: 'User Preferences',
      description: 'Current user preferences configuration (language, tone, limits, etc.)',
    },
    async () => {
      const preferences = await UserPreferencesManager.load();
      return {
        contents: [
          {
            uri: 'config://user-preferences',
            text: JSON.stringify(preferences, null, 2),
          },
        ],
      };
    }
  );
  
  // TODO: Register more tools, resources, prompts
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  logger.info('Dynamic Rules System MCP server started');
}

main().catch((error) => {
  logger.error('Fatal error:', error);
  process.exit(1);
});

