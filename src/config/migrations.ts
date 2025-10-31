import { Preferences } from './schema.js';

export function migratePreferences(input: any): Preferences | null {
  try {
    // Minimal passthrough for now; future versions can transform.
    return input as Preferences;
  } catch {
    return null;
  }
}


