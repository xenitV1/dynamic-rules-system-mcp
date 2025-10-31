import { z } from 'zod';

export const PreferencesSchema = z.object({
  language: z.object({
    userCommunication: z.enum(['tr', 'en', 'de', 'fr']),
    codeAndTech: z.literal('en')
  }),
  communication: z.object({
    tone: z.enum(['realistic', 'optimistic', 'neutral']),
    principle: z.string()
  }),
  fileSizeLimit: z.object({
    warning: z.number().min(1),
    hard: z.number().min(1)
  }),
  safeMode: z.object({
    enabled: z.boolean(),
    behaviors: z.array(z.string())
  }),
  platform: z.object({
    detected: z.enum(['windows', 'mac', 'linux']),
    checkGitHub: z.boolean()
  })
});

export type Preferences = z.infer<typeof PreferencesSchema>;


