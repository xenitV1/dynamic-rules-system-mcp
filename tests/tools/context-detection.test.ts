import { describe, it, expect } from 'vitest';
import { ContextDetector } from '../../src/tools/context-detection.js';

describe('ContextDetector', () => {
  it('analyzes simple implementation intent', () => {
    const res = ContextDetector.analyze({ userQuery: 'Add a React component', targetFiles: [] });
    expect(res).toBeTruthy();
  });
});


