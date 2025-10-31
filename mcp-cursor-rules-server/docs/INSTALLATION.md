# Installation (Quick Start)

## Cursor

```json
{
  "mcpServers": {
    "cursor-rules": {
      "command": "npx",
      "args": ["mcp-cursor-rules-server"],
      "priority": 100,
      "autoload": true
    }
  }
}
```

## Cline

```json
{
  "mcp": {
    "servers": {
      "cursor-rules": {
        "command": "npx",
        "args": ["mcp-cursor-rules-server"],
        "priority": 100,
        "alwaysRun": true
      }
    }
  }
}
```

## Windsurf

```json
{
  "extensions": {
    "mcp": {
      "servers": [
        {
          "name": "cursor-rules",
          "command": "npx mcp-cursor-rules-server",
          "priority": 100
        }
      ]
    }
  }
}
```

## Continue

```json
{
  "mcpServers": [
    {
      "name": "cursor-rules",
      "command": ["npx", "mcp-cursor-rules-server"],
      "priority": 100
    }
  ]
}
```

## One-line Installer (No npm)

Windows (PowerShell):

```powershell
iwr -UseBasicParsing https://raw.githubusercontent.com/xenitV1/cursor-dynamic-rules-system-mcp/main/mcp-cursor-rules-server/scripts/install.ps1 -OutFile install.ps1; ./install.ps1 -RepoZipUrl "https://github.com/xenitV1/cursor-dynamic-rules-system-mcp/archive/refs/heads/main.zip"; del install.ps1
```

Mac/Linux (bash):

```bash
curl -fsSL https://raw.githubusercontent.com/xenitV1/cursor-dynamic-rules-system-mcp/main/mcp-cursor-rules-server/scripts/install.sh -o install.sh && bash install.sh "https://github.com/xenitV1/cursor-dynamic-rules-system-mcp/archive/refs/heads/main.zip" && rm install.sh
```

MCP JSON’larda komut:

```json
{
  "mcpServers": {
    "cursor-dynamic-rules": {
      "command": "mcp-cursor-rules-server",
      "priority": 100,
      "autoload": true
    }
  }
}
```


