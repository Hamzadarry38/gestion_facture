$appDataPath = $env:APPDATA
Write-Host "APPDATA: $appDataPath"
Write-Host ""

$multiDbPath = Join-Path $appDataPath "Gestion des Factures" "multi.db"
Write-Host "Checking: $multiDbPath"
Write-Host "Exists: $(Test-Path $multiDbPath)"
Write-Host ""

if (Test-Path "$appDataPath\Gestion des Factures") {
    Write-Host "Files in Gestion des Factures:"
    Get-ChildItem -Path "$appDataPath\Gestion des Factures" -Force
}
