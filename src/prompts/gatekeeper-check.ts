import { GatekeeperValidator } from '../gatekeeper/validator.js';
import { UserPreferencesManager } from '../resources/user-preferences.js';

export async function handleGatekeeperCheck(args: { userQuery: string; context: unknown }) {
  const validation = await GatekeeperValidator.validateMandatory();
  const prefs = await UserPreferencesManager.load();

  if (!validation.passed) {
    return {
      blocked: true,
      message: prefs.language.userCommunication === 'tr'
        ? '🛑 İŞLEM DURDURULDU\n❌ Sebep: Kurallar eksik/yüklenmedi.'
        : 'Request blocked: mandatory rules not satisfied.'
    };
  }

  return { blocked: false };
}


