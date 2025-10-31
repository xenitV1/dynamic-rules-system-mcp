#!/usr/bin/env bash
set -euo pipefail

REPO_ZIP_URL=${1:-"https://github.com/xenitV1/dynamic-rules-system-mcp/archive/refs/heads/main.zip"}
SUBDIR=${2:-"dynamic-rules-system-mcp"}
INSTALL_ROOT=${3:-"$HOME/.local/share/mcp-cursor-rules"}

echo "Installing MCP Cursor Rules Server..."
mkdir -p "$INSTALL_ROOT"
ZIP_PATH="$INSTALL_ROOT/repo.zip"
curl -L "$REPO_ZIP_URL" -o "$ZIP_PATH"
EXTRACT_PATH="$INSTALL_ROOT/repo"
rm -rf "$EXTRACT_PATH" || true
mkdir -p "$EXTRACT_PATH"
unzip -q "$ZIP_PATH" -d "$EXTRACT_PATH"
rm -f "$ZIP_PATH"
ROOT_DIR=$(find "$EXTRACT_PATH" -mindepth 1 -maxdepth 1 -type d | head -n1)
PKG_PATH="$ROOT_DIR/$SUBDIR"
if [ ! -d "$PKG_PATH" ]; then
  echo "Package subdir '$SUBDIR' not found in archive" >&2
  exit 1
fi
TARGET_PATH="$INSTALL_ROOT/mcp"
rm -rf "$TARGET_PATH" || true
cp -r "$PKG_PATH" "$TARGET_PATH"

BIN="$HOME/.local/bin"
mkdir -p "$BIN"
SHIM="$BIN/dynamic-rules-system-mcp"
cat > "$SHIM" <<'EOF'
#!/usr/bin/env bash
node "$HOME/.local/share/mcp-cursor-rules/mcp/dist/cli.js" "$@"
EOF
chmod +x "$SHIM"

echo "Ensure $BIN is on PATH. Then run: dynamic-rules-system-mcp"
