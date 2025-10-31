# Dynamic Rules System MCP

Global MCP server with gatekeeper, configurable preferences, and multi-platform support (Cursor, Cline, Windsurf, Continue). Provides Turkish/English communication, quality gates, and auto-discovery.

## Features

- **Gatekeeper System**: Priority 100 auto-execution for request validation
- **Configurable Preferences**: Language, tone, file size limits
- **Multi-Platform Support**: Cursor, Cline, Windsurf, Continue
- **Quality Gates**: Pre/during/post implementation checks
- **Context Detection**: Automatic rule set selection
- **Turkish/English**: Flexible communication patterns

## Installation

NPM yayın henüz mevcut değil. Aşağıdaki npm’siz kurulum yöntemlerinden birini kullanın.

### Option A — One-liner installer (GitHub raw)

Windows (PowerShell):

```powershell
iwr -UseBasicParsing https://raw.githubusercontent.com/xenitV1/dynamic-rules-system-mcp/main/scripts/install.ps1 -OutFile install.ps1; ./install.ps1 -RepoZipUrl "https://github.com/xenitV1/dynamic-rules-system-mcp/archive/refs/heads/main.zip"; del install.ps1
```

macOS/Linux (bash):

```bash
curl -fsSL https://raw.githubusercontent.com/xenitV1/dynamic-rules-system-mcp/main/scripts/install.sh -o install.sh && bash install.sh "https://github.com/xenitV1/dynamic-rules-system-mcp/archive/refs/heads/main.zip" && rm install.sh
```

Kurulumdan sonra komut:

```bash
dynamic-rules-system-mcp
```

Not: GitHub reposu boş veya CI artefaktları eksikse script kurulumunda hata alabilirsiniz. Bu durumda Option B’yi kullanın.

### Option B — Local dev install (no npm publish)

1) Depoyu klonlayın ve derleyin:

```bash
git clone https://github.com/xenitV1/dynamic-rules-system-mcp.git
cd dynamic-rules-system-mcp
npm install
npm run build
```

2) MCP istemcinizde komutu doğrudan Node ile çalıştırın (CLI dosya yolu):

Cursor `settings.json` örneği:

```json
{
  "mcpServers": {
    "cursor-rules": {
      "command": "node",
      "args": ["C:/dev/dynamic-rules-system-mcp/dist/cli.js"],
      "priority": 100
    }
  }
}
```

Windsurf/Continue/Cline için de benzer şekilde `command: "node"` ve `args: ["/absolute/path/to/dist/cli.js"]` kullanabilirsiniz.

## Quick Start

### Cursor

Add to your `settings.json`:

```json
{
  "mcpServers": {
    "cursor-rules": {
      "command": "dynamic-rules-system-mcp",
      "args": [],
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
        "command": "dynamic-rules-system-mcp",
        "args": [],
        "priority": 100
      }
    }
  }
}
```

## Configuration

Configure user preferences (choose one):

Installer shim:

```bash
dynamic-rules-system-mcp config
```

Local dev (no shim):

```bash
node /absolute/path/to/dynamic-rules-system-mcp/dist/cli.js config
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

