import { describe, it, expect } from 'vitest';
import { FileSizeChecker } from '../../src/tools/file-size-check.js';

describe('FileSizeChecker', () => {
  it('reports safe for small content', () => {
    const content = Array.from({ length: 10 }, () => 'a').join('\n');
    const res = FileSizeChecker.check({ fileContent: content, warningLimit: 700, hardLimit: 1000 });
    expect(res.lineCount).toBe(10);
  });
});


