import { describe, it, expect } from 'vitest';
import { UserPreferencesManager } from '../../src/resources/user-preferences.js';

describe('UserPreferencesManager', () => {
  it('loads defaults when no file exists', async () => {
    // Ensure fresh state
    UserPreferencesManager.clearCache();
    const prefs = await UserPreferencesManager.load();
    expect(prefs.language.codeAndTech).toBe('en');
  });

  it('saves and reloads preferences', async () => {
    const initial = await UserPreferencesManager.load();
    const modified = { ...initial, communication: { ...initial.communication, tone: 'neutral' } } as any;
    await UserPreferencesManager.save(modified);
    UserPreferencesManager.clearCache();
    const reloaded = await UserPreferencesManager.load();
    expect(reloaded.communication.tone).toBe('neutral');
  });

  it('resets to defaults', async () => {
    await UserPreferencesManager.resetToDefaults();
    UserPreferencesManager.clearCache();
    const prefs = await UserPreferencesManager.load();
    expect(prefs.fileSizeLimit.warning).toBeGreaterThan(0);
  });
});


