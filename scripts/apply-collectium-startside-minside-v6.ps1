<#
COLLECTIUM FILE HEADER

Overskrift:
apply-collectium-startside-minside-v6.ps1

Definering / formal:
Installerer startside/min-side v6-filer i et lokalt Next.js-prosjekt med backup av eksisterende filer.

Bruksomrade:
Kjores fra prosjektroten etter at pakken er pakket ut.

Endringsregel:
Eksisterende filer sikkerhetskopieres til _backup-startside-minside-v6-<timestamp> for overskriving.
#>

$ErrorActionPreference = "Stop"

$Root = Get-Location
$SourceRoot = Split-Path -Parent $PSScriptRoot
$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$BackupRoot = Join-Path $Root "_backup-startside-minside-v6-$Stamp"

$Files = @(
  "app/startside/page.tsx",
  "app/min-side/page.tsx",
  "components/collectium/layout/CollectiumAppShellV6.tsx",
  "components/collectium/layout/CollectiumAppShellV6.module.css",
  "components/collectium/startside/CollectiumStartsideV6.tsx",
  "components/collectium/startside/CollectiumStartsideV6.module.css",
  "components/collectium/minside/CollectiumMinsideV6.tsx",
  "components/collectium/minside/CollectiumMinsideV6.module.css",
  "docs/README-startside-minside-v6.md"
)

New-Item -ItemType Directory -Path $BackupRoot -Force | Out-Null

foreach ($File in $Files) {
  $Source = Join-Path $SourceRoot $File
  $Target = Join-Path $Root $File

  if (!(Test-Path $Source)) {
    throw "Mangler kildefil: $Source"
  }

  if (Test-Path $Target) {
    $BackupTarget = Join-Path $BackupRoot $File
    New-Item -ItemType Directory -Path (Split-Path -Parent $BackupTarget) -Force | Out-Null
    Copy-Item $Target $BackupTarget -Force
  }

  New-Item -ItemType Directory -Path (Split-Path -Parent $Target) -Force | Out-Null
  Copy-Item $Source $Target -Force
}

Write-Host "Collectium startside/min-side v6 er kopiert." -ForegroundColor Green
Write-Host "Backupmappe: $BackupRoot"
Write-Host "Kjor: npm run build"
