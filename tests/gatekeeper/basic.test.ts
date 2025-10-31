import { describe, it, expect } from 'vitest';
import { handleSafeModeFallback } from '../../src/prompts/safe-mode-fallback.js';
import { handlePreRequestAnalysis } from '../../src/prompts/pre-request-analysis.js';

describe('gatekeeper prompts', () => {
  it('safe mode returns behaviors', () => {
    const res = handleSafeModeFallback();
    expect(res.safeMode).toBe(true);
    expect(Array.isArray(res.behaviors)).toBe(true);
  });

  it('pre-request analysis yields context object', () => {
    const res = handlePreRequestAnalysis({ userQuery: 'Test', context: {} });
    expect(res).toBeTruthy();
  });
});


