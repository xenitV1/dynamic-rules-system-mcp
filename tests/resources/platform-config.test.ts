import { describe, it, expect } from 'vitest';
import { defaultPlatformConfig } from '../../src/resources/platform-config.js';

describe('platform-config', () => {
  it('has windows default and cursor editor', () => {
    expect(defaultPlatformConfig.platform).toBe('windows');
    expect(defaultPlatformConfig.editors).toContain('cursor');
  });
});


