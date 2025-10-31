export interface PlatformConfig {
  platform: 'windows' | 'mac' | 'linux';
  editors: Array<'cursor' | 'cline' | 'windsurf' | 'continue'>;
  env?: Record<string, string>;
}

export const defaultPlatformConfig: PlatformConfig = {
  platform: 'windows',
  editors: ['cursor'],
  env: {}
};


