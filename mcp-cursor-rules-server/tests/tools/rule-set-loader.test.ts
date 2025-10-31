import { describe, it, expect } from 'vitest';
import { RuleSetLoader } from '../../src/tools/rule-set-loader.js';

describe('RuleSetLoader', () => {
  it('loads specific rule set', () => {
    const res = RuleSetLoader.load('SET_001');
    expect(res.ruleSetId).toBe('SET_001');
  });

  it('auto selects rule set with empty context', () => {
    const res = RuleSetLoader.loadAuto({});
    expect(res).toBeTruthy();
  });
});


