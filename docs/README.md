# MCP Cursor Rules Server

Global, configurable MCP server with gatekeeper, user preferences, quality gates, and multi‑platform support (Cursor, Cline, Windsurf, Continue).

## Features
- Gatekeeper (priority 100) with file size + clean code + quality gates
- User preferences (language, tone, limits, safe mode)
- Tools, Resources and Prompt-fallback tools
- Examples for 4 editors

## Quick Start
```bash
dynamic-rules-system-mcp
```

Add to your editor (see `examples/`): Cursor, Cline, Windsurf, Continue.
Installers:
- Windows: https://raw.githubusercontent.com/xenitV1/dynamic-rules-system-mcp/main/scripts/install.ps1
- Mac/Linux: https://raw.githubusercontent.com/xenitV1/dynamic-rules-system-mcp/main/scripts/install.sh

## Configure
```bash
npx dynamic-rules-system-mcp config show
npx dynamic-rules-system-mcp config set fileSizeLimit.warning 800
npx dynamic-rules-system-mcp config reset
```

## Docs
- INSTALLATION.md
- CONFIGURATION.md
- GATEKEEPER.md
- MIGRATION.md
- TOOLS.md
