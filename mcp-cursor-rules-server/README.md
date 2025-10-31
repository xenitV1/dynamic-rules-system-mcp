# MCP Cursor Rules Server

Global MCP server with gatekeeper, configurable preferences, and multi-platform support (Cursor, Cline, Windsurf, Continue). Provides Turkish/English communication, quality gates, and auto-discovery.

## Features

- **Gatekeeper System**: Priority 100 auto-execution for request validation
- **Configurable Preferences**: Language, tone, file size limits
- **Multi-Platform Support**: Cursor, Cline, Windsurf, Continue
- **Quality Gates**: Pre/during/post implementation checks
- **Context Detection**: Automatic rule set selection
- **Turkish/English**: Flexible communication patterns

## Installation

```bash
npm install -g mcp-cursor-rules-server
```

## Quick Start

### Cursor

Add to your `settings.json`:

```json
{
  "mcpServers": {
    "cursor-rules": {
      "command": "npx",
      "args": ["mcp-cursor-rules-server"],
      "priority": 100
    }
  }
}
```

### Cline

Add to your `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "cursor-rules": {
        "command": "npx",
        "args": ["mcp-cursor-rules-server"],
        "priority": 100
      }
    }
  }
}
```

## Configuration

Configure user preferences:

```bash
npx mcp-cursor-rules-server config
```

Available settings:
- Language (Turkish, English, German, French)
- Communication tone (Realistic, Optimistic, Neutral)
- File size limits (warning: 700, hard: 1000)
- Safe mode behaviors

## Documentation

- [INSTALLATION.md](docs/INSTALLATION.md) - Per-platform setup
- [CONFIGURATION.md](docs/CONFIGURATION.md) - User preferences
- [GATEKEEPER.md](docs/GATEKEEPER.md) - Gatekeeper system
- [MIGRATION.md](docs/MIGRATION.md) - User rules → MCP

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT

## Author

Mehmet (Xenit) - https://x.com/xenit_v0

