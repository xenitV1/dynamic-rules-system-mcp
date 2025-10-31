param(
  [string]$RepoZipUrl = "https://github.com/xenitV1/dynamic-rules-system-mcp/archive/refs/heads/main.zip",
  [string]$SubDir = "dynamic-rules-system-mcp",
  [string]$InstallRoot = "$env:APPDATA/mcp-cursor-rules"
)

$ErrorActionPreference = 'Stop'

Write-Host "Installing MCP Cursor Rules Server..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path $InstallRoot | Out-Null
$zipPath = Join-Path $InstallRoot 'repo.zip'
Invoke-WebRequest -UseBasicParsing -Uri $RepoZipUrl -OutFile $zipPath

$extractPath = Join-Path $InstallRoot 'repo'
if (Test-Path $extractPath) { Remove-Item -Recurse -Force $extractPath }
Expand-Archive -Path $zipPath -DestinationPath $extractPath
Remove-Item $zipPath -Force

# Find extracted folder
$root = Get-ChildItem $extractPath | Select-Object -First 1
$pkgPath = Join-Path $root.FullName $SubDir
if (-not (Test-Path $pkgPath)) {
  throw "Package subdir '$SubDir' not found in archive."
}

$targetPath = Join-Path $InstallRoot 'mcp'
if (Test-Path $targetPath) { Remove-Item -Recurse -Force $targetPath }
Copy-Item -Recurse -Force $pkgPath $targetPath

# Create bin shim
$bin = Join-Path $InstallRoot 'bin'
New-Item -ItemType Directory -Force -Path $bin | Out-Null
$shim = Join-Path $bin 'dynamic-rules-system-mcp.cmd'
@"
@echo off
node "%APPDATA%\mcp-cursor-rules\mcp\dist\cli.js" %*
"@ | Set-Content -Encoding ASCII $shim

$envPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($envPath -notlike "*${bin}*") {
  [Environment]::SetEnvironmentVariable('Path', "$envPath;$bin", 'User')
  Write-Host "Added $bin to PATH (User). Restart terminal to use 'dynamic-rules-system-mcp'." -ForegroundColor Yellow
}

Write-Host "Done. Try: dynamic-rules-system-mcp" -ForegroundColor Green
