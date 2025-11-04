# PowerShell Script for Publishing Updates
# Update Publishing Script

param(
    [Parameter(Mandatory=$false)]
    [string]$NewVersion,
    
    [Parameter(Mandatory=$false)]
    [switch]$GitHub,
    
    [Parameter(Mandatory=$false)]
    [switch]$Help
)

# Colors for output
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

function Show-Help {
    Write-Host "==================================================" -ForegroundColor $InfoColor
    Write-Host "  Update Publishing Script" -ForegroundColor $InfoColor
    Write-Host "==================================================" -ForegroundColor $InfoColor
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor $SuccessColor
    Write-Host "  .\publish-update.ps1 -NewVersion <version> [-GitHub]"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $SuccessColor
    Write-Host "  .\publish-update.ps1 -NewVersion 1.0.1"
    Write-Host "  .\publish-update.ps1 -NewVersion 1.0.1 -GitHub"
    Write-Host ""
    Write-Host "Options:" -ForegroundColor $SuccessColor
    Write-Host "  -NewVersion  : New version number (e.g., 1.0.1)"
    Write-Host "  -GitHub      : Publish to GitHub Releases"
    Write-Host "  -Help        : Show this help"
    Write-Host ""
    exit
}

if ($Help) {
    Show-Help
}

# Get current version from package.json
function Get-CurrentVersion {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    return $packageJson.version
}

# Update version in package.json
function Update-Version {
    param([string]$Version)
    
    $packageJson = Get-Content "package.json" -Raw
    $packageJson = $packageJson -replace '"version":\s*"[^"]*"', "`"version`": `"$Version`""
    $packageJson | Set-Content "package.json" -Encoding UTF8
}

# Validate version format
function Test-VersionFormat {
    param([string]$Version)
    
    return $Version -match '^\d+\.\d+\.\d+$'
}

# Main script
Write-Host ""
Write-Host "==================================================" -ForegroundColor $InfoColor
Write-Host "  Update Publishing System" -ForegroundColor $InfoColor
Write-Host "==================================================" -ForegroundColor $InfoColor
Write-Host ""

# Get current version
$currentVersion = Get-CurrentVersion
Write-Host "Current Version: " -NoNewline -ForegroundColor $InfoColor
Write-Host $currentVersion -ForegroundColor $SuccessColor

# Get new version
if (-not $NewVersion) {
    Write-Host ""
    $NewVersion = Read-Host "Enter new version number (e.g., 1.0.1)"
}

# Validate version format
if (-not (Test-VersionFormat $NewVersion)) {
    Write-Host ""
    Write-Host "Error: Invalid version format!" -ForegroundColor $ErrorColor
    Write-Host "Format should be: X.Y.Z (e.g., 1.0.1)" -ForegroundColor $WarningColor
    exit 1
}

# Check if new version is greater than current
$currentParts = $currentVersion.Split('.')
$newParts = $NewVersion.Split('.')

$isGreater = $false
for ($i = 0; $i -lt 3; $i++) {
    if ([int]$newParts[$i] -gt [int]$currentParts[$i]) {
        $isGreater = $true
        break
    }
    elseif ([int]$newParts[$i] -lt [int]$currentParts[$i]) {
        break
    }
}

if (-not $isGreater) {
    Write-Host ""
    Write-Host "Warning: New version is not greater than current!" -ForegroundColor $WarningColor
    $continue = Read-Host "Continue? (y/n)"
    if ($continue -ne 'y') {
        Write-Host "Cancelled" -ForegroundColor $WarningColor
        exit 0
    }
}

Write-Host ""
Write-Host "New Version: " -NoNewline -ForegroundColor $InfoColor
Write-Host $NewVersion -ForegroundColor $SuccessColor

# Confirm
Write-Host ""
$confirm = Read-Host "Continue? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "Cancelled" -ForegroundColor $WarningColor
    exit 0
}

Write-Host ""
Write-Host "Updating..." -ForegroundColor $InfoColor

# Update version
try {
    Update-Version -Version $NewVersion
    Write-Host "Version updated successfully" -ForegroundColor $SuccessColor
}
catch {
    Write-Host "Error updating version: $_" -ForegroundColor $ErrorColor
    exit 1
}

# Build
Write-Host ""
Write-Host "Building..." -ForegroundColor $InfoColor
Write-Host ""

try {
    if ($GitHub) {
        Write-Host "Publishing to GitHub Releases..." -ForegroundColor $InfoColor
        npm run build:win -- --publish always
    }
    else {
        npm run build:win
    }
    
    Write-Host ""
    Write-Host "Build completed successfully!" -ForegroundColor $SuccessColor
}
catch {
    Write-Host ""
    Write-Host "Build error: $_" -ForegroundColor $ErrorColor
    exit 1
}

# Summary
Write-Host ""
Write-Host "==================================================" -ForegroundColor $InfoColor
Write-Host "  Completed Successfully!" -ForegroundColor $SuccessColor
Write-Host "==================================================" -ForegroundColor $InfoColor
Write-Host ""
Write-Host "Version: $currentVersion -> $NewVersion" -ForegroundColor $InfoColor
Write-Host "Files in: .\dist\" -ForegroundColor $InfoColor
Write-Host ""

if (-not $GitHub) {
    Write-Host "Next Step:" -ForegroundColor $WarningColor
    Write-Host "   Upload these files to your server:" -ForegroundColor $WarningColor
    Write-Host "   - Gestion-des-Factures-Setup-$NewVersion.exe" -ForegroundColor $InfoColor
    Write-Host "   - latest.yml" -ForegroundColor $InfoColor
    Write-Host ""
}
else {
    Write-Host "Published to GitHub Releases" -ForegroundColor $SuccessColor
    Write-Host ""
}

Write-Host "Users will receive the update automatically!" -ForegroundColor $SuccessColor
Write-Host ""
