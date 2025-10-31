import { describe, it, expect } from 'vitest';
import { RULE_SETS } from '../../src/resources/rule-sets.js';

describe('RULE_SETS', () => {
  it('contains SET_001..SET_005', () => {
    const ids = RULE_SETS.map(r => r.id);
    expect(ids).toContain('SET_001');
    expect(ids).toContain('SET_005');
  });
});


