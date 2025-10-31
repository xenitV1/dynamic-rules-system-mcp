import { ContextDetector } from '../tools/context-detection.js';

export function handlePreRequestAnalysis(args: { userQuery: string; context?: any }) {
  return ContextDetector.analyze({
    userQuery: args.userQuery,
    targetFiles: args.context?.targetFiles || [],
    projectInfo: args.context?.projectInfo,
  });
}


