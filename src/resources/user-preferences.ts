import { readFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { UserPreferences } from '../types/preferences.js';
import { DEFAULT_USER_PREFERENCES, getConfigPath } from '../config/defaults.js';
import { logger } from '../utils/logger.js';

export class UserPreferencesManager {
  private static cachedPreferences: UserPreferences | null = null;
  
  /**
   * Load user preferences from file or return defaults
   */
  static async load(): Promise<UserPreferences> {
    // Return cached if available
    if (this.cachedPreferences) {
      return this.cachedPreferences;
    }
    
    try {
      const configPath = getConfigPath();
      const data = await readFile(configPath, 'utf-8');
      const preferences = JSON.parse(data) as UserPreferences;
      
      // Merge with defaults to handle missing fields
      this.cachedPreferences = {
        ...DEFAULT_USER_PREFERENCES,
        ...preferences,
      };
      
      logger.debug('Loaded user preferences from file');
      return this.cachedPreferences;
    } catch (error) {
      // File doesn't exist or error reading - return defaults
      logger.debug('Using default user preferences');
      this.cachedPreferences = DEFAULT_USER_PREFERENCES;
      return this.cachedPreferences;
    }
  }
  
  /**
   * Save user preferences to file
   */
  static async save(preferences: UserPreferences): Promise<void> {
    try {
      const configPath = getConfigPath();
      const configDir = path.dirname(configPath);
      
      // Ensure directory exists
      await mkdir(configDir, { recursive: true });
      
      // Write preferences
      await writeFile(configPath, JSON.stringify(preferences, null, 2), 'utf-8');
      
      // Update cache
      this.cachedPreferences = preferences;
      
      logger.info('User preferences saved successfully');
    } catch (error) {
      logger.error('Failed to save user preferences:', error);
      throw new Error(`Failed to save preferences: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Get current preferences (may be cached)
   */
  static get(): UserPreferences {
    return this.cachedPreferences || DEFAULT_USER_PREFERENCES;
  }
  
  /**
   * Clear cache (force reload on next access)
   */
  static clearCache(): void {
    this.cachedPreferences = null;
  }

  /**
   * Reset preferences file to defaults
   */
  static async resetToDefaults(): Promise<void> {
    await this.save(DEFAULT_USER_PREFERENCES);
  }
}

