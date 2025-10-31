import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function fileExists(rel: string) {
  try {
    const p = path.join(process.cwd(), rel);
    await readFile(p, 'utf-8');
    return true;
  } catch {
    return false;
  }
}

describe('examples presence', () => {
  it('cursor example exists', async () => {
    expect(await fileExists('examples/cursor/settings.json')).toBe(true);
  });
  it('cline example exists', async () => {
    expect(await fileExists('examples/cline/settings.json')).toBe(true);
  });
  it('windsurf example exists', async () => {
    expect(await fileExists('examples/windsurf/settings.json')).toBe(true);
  });
  it('continue example exists', async () => {
    expect(await fileExists('examples/continue/config.json')).toBe(true);
  });
});


