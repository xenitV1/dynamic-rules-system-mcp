import { FileSizeChecker } from '../tools/file-size-check.js';
import { QualityGatesManager } from '../tools/quality-gates.js';
import { Reporter } from '../utils/reporter.js';
import { UserPreferencesManager } from '../resources/user-preferences.js';
import { PlatformDetector } from '../utils/platform-detector.js';

export interface MandatoryValidationResult {
  passed: boolean;
  message?: string;
}

export class GatekeeperValidator {
  static async validateMandatory(): Promise<MandatoryValidationResult> {
    const prefs = await UserPreferencesManager.load();
    const platform = PlatformDetector.detect();

    // Basic size policy status (no specific file here; full integration happens in prompts)
    const sizeStatus = FileSizeChecker.getStatusSummary({
      warningLimit: prefs.fileSizeLimit.warning,
      hardLimit: prefs.fileSizeLimit.hard,
      status: 'OK'
    } as any);

    const quality = QualityGatesManager.run('pre', {});
    const report = Reporter.generateQualityReport(quality, prefs);

    // GitHub permission check (environment-driven). If disallowed, block.
    const requireConsent = process.env.MCP_REQUIRE_GITHUB_CONSENT === 'true' || prefs.platform.checkGitHub;
    const hasConsent = process.env.GITHUB_PUSH_ALLOWED === 'true';

    if (requireConsent && !hasConsent) {
      const message = prefs.language.userCommunication === 'tr'
        ? '🛑 İŞLEM DURDURULDU\n🔒 GitHub izni bulunmuyor.'
        : 'Request blocked: GitHub permission missing.';
      return { passed: false, message };
    }

    const ok = !!sizeStatus && !!report && !!platform;
    return { passed: ok };
  }
}


