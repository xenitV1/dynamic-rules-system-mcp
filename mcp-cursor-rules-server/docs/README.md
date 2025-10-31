# MCP Cursor Rules Server

Global, configurable MCP server with gatekeeper, user preferences, quality gates, and multi‑platform support (Cursor, Cline, Windsurf, Continue).

## Features
- Gatekeeper (priority 100) with file size + clean code + quality gates
- User preferences (language, tone, limits, safe mode)
- Tools, Resources and Prompt-fallback tools
- Examples for 4 editors

## Quick Start
```bash
mcp-cursor-rules-server
```

Add to your editor (see `examples/`): Cursor, Cline, Windsurf, Continue.
Installers:
- Windows: https://raw.githubusercontent.com/xenitV1/cursor-dynamic-rules-system-mcp/main/mcp-cursor-rules-server/scripts/install.ps1
- Mac/Linux: https://raw.githubusercontent.com/xenitV1/cursor-dynamic-rules-system-mcp/main/mcp-cursor-rules-server/scripts/install.sh

## Configure
```bash
npx mcp-cursor-rules-server config show
npx mcp-cursor-rules-server config set fileSizeLimit.warning 800
npx mcp-cursor-rules-server config reset
```

## Docs
- INSTALLATION.md
- CONFIGURATION.md
- GATEKEEPER.md
- MIGRATION.md
- TOOLS.md
