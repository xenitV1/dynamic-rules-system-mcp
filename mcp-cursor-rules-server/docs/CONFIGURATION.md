# Configuration

- Show current config:

```bash
npx mcp-cursor-rules-server config show
```

- Set a value (dotted path):

```bash
npx mcp-cursor-rules-server config set language.userCommunication tr
npx mcp-cursor-rules-server config set fileSizeLimit.warning 800
```

- Reset to defaults:

```bash
npx mcp-cursor-rules-server config reset
```

- Config file location:
  - Windows: %APPDATA%/mcp-cursor-rules/config.json
  - Mac/Linux: ~/.config/mcp-cursor-rules/config.json
