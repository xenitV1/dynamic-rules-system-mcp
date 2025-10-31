export type SupportedLanguage = 'tr' | 'en' | 'de' | 'fr';
export type CommunicationTone = 'realistic' | 'optimistic' | 'neutral';
export type Platform = 'windows' | 'mac' | 'linux';
export type Editor = 'cursor' | 'cline' | 'windsurf' | 'continue';

export interface UserPreferences {
  language: {
    userCommunication: SupportedLanguage;
    codeAndTech: 'en';
  };
  communication: {
    tone: CommunicationTone;
    principle: string;
  };
  fileSizeLimit: {
    warning: number;
    hard: number;
  };
  safeMode: {
    enabled: boolean;
    behaviors: string[];
  };
  platform: {
    detected: Platform;
    checkGitHub: boolean;
  };
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: {
    userCommunication: 'tr',
    codeAndTech: 'en',
  },
  communication: {
    tone: 'realistic',
    principle: `⚠️ Kullanıcı ile GERÇEKÇİ konuşulacak. 
❌ ASLA iyimser olunmayacak!
✓ Riskler açıkça belirtilecek
✓ Sorunlar net ifade edilecek
✓ Gerçekçi beklentiler sunulacak`,
  },
  fileSizeLimit: {
    warning: 700,
    hard: 1000,
  },
  safeMode: {
    enabled: true,
    behaviors: [
      'no_github_push_without_consent',
      'no_file_growth_beyond_700_lines',
      'remove_unused_imports_and_dead_code',
    ],
  },
  platform: {
    detected: 'windows',
    checkGitHub: true,
  },
};

