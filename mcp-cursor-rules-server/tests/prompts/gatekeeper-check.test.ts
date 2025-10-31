import { describe, it, expect } from 'vitest';
import { handleGatekeeperCheck } from '../../src/prompts/gatekeeper-check.js';
import { handlePreRequestAnalysis } from '../../src/prompts/pre-request-analysis.js';
import { handleSafeModeFallback } from '../../src/prompts/safe-mode-fallback.js';

describe('prompts', () => {
  it('gatekeeper-check returns block=false by default (stub)', async () => {
    const res = await handleGatekeeperCheck({ userQuery: 'x', context: {} });
    expect(res.blocked).toBe(false);
  });

  it('pre-request-analysis returns an analysis object', () => {
    const res = handlePreRequestAnalysis({ userQuery: 'analyze this', context: {} });
    expect(res).toBeTruthy();
  });

  it('safe-mode-fallback returns safe mode behaviors', () => {
    const res = handleSafeModeFallback();
    expect(res.safeMode).toBe(true);
    expect(res.behaviors.length).toBeGreaterThan(0);
  });
});


