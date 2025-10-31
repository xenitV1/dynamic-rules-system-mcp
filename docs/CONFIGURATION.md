# Configuration

- Show current config:

```bash
npx dynamic-rules-system-mcp config show
```

- Set a value (dotted path):

```bash
npx dynamic-rules-system-mcp config set language.userCommunication tr
npx dynamic-rules-system-mcp config set fileSizeLimit.warning 800
```

- Reset to defaults:

```bash
npx dynamic-rules-system-mcp config reset
```

- Config file location:
  - Windows: %APPDATA%/mcp-cursor-rules/config.json
  - Mac/Linux: ~/.config/mcp-cursor-rules/config.json
