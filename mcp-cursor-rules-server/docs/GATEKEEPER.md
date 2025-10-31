# Gatekeeper

Priority 100 kontrol zinciri:
1. Auto-discovery
2. User preferences load
3. Platform detection (Windows/Mac/Linux)
4. Context detection
5. Rule set selection (dynamic)
6. Mandatory validation (file size, clean code, quality, language)
7. GitHub permission check
8. Proceed or block (safe mode fallback)

Implementation entry points:
- `src/gatekeeper/interceptor.ts`
- `src/gatekeeper/validator.ts`
- `src/gatekeeper/auto-discovery.ts`
- Prompts/tools: `prompt_gatekeeper_check`, `prompt_pre_request_analysis`, `prompt_safe_mode_fallback`
