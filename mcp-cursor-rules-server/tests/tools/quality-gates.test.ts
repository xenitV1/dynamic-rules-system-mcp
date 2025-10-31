import { describe, it, expect } from 'vitest';
import { QualityGatesManager } from '../../src/tools/quality-gates.js';

describe('QualityGatesManager', () => {
  it('runs pre stage without throwing', () => {
    const res = QualityGatesManager.run('pre', {});
    expect(res).toBeTruthy();
  });
});


