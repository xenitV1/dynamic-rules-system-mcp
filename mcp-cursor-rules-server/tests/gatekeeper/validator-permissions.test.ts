import { describe, it, expect } from 'vitest';
import { GatekeeperValidator } from '../../src/gatekeeper/validator.js';

describe('GatekeeperValidator permissions', () => {
  it('blocks when consent is required and not granted', async () => {
    const prevRequire = process.env.MCP_REQUIRE_GITHUB_CONSENT;
    const prevAllowed = process.env.GITHUB_PUSH_ALLOWED;
    process.env.MCP_REQUIRE_GITHUB_CONSENT = 'true';
    process.env.GITHUB_PUSH_ALLOWED = 'false';

    const res = await GatekeeperValidator.validateMandatory();

    process.env.MCP_REQUIRE_GITHUB_CONSENT = prevRequire;
    process.env.GITHUB_PUSH_ALLOWED = prevAllowed;
    expect(res.passed).toBe(false);
  });
});


