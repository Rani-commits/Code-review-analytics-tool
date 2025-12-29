# Fix Environment Script
$ErrorActionPreference = "Stop"

# 1. Setup Node.js Path
$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    Write-Host "Node.js found at $nodePath. Adding to current session PATH." -ForegroundColor Green
    $env:PATH = "$nodePath;$env:PATH"
} else {
    Write-Host "Node.js not found at default location." -ForegroundColor Red
}

# 2. Check Python
$pythonPath = "C:\Python311"
$pythonExe = "$pythonPath\python.exe"

if (-not (Test-Path $pythonExe)) {
    Write-Host "Python not found at $pythonPath. Installing..." -ForegroundColor Yellow
    
    $installerPath = "$PSScriptRoot\installers\python_installer.exe"
    $url = "https://www.python.org/ftp/python/3.11.7/python-3.11.7-amd64.exe"
    
    if (-not (Test-Path $installerPath)) {
        Write-Host "Downloading Python installer..."
        New-Item -ItemType Directory -Force -Path "$PSScriptRoot\installers" | Out-Null
        Invoke-WebRequest -Uri $url -OutFile $installerPath
    }
    
    Write-Host "Installing Python to $pythonPath..."
    # Install to specific target directory
    Start-Process -FilePath $installerPath -ArgumentList "/passive TargetDir=$pythonPath InstallAllUsers=1 PrependPath=1" -Wait
}

if (Test-Path $pythonExe) {
    Write-Host "Python found. Adding to current session PATH." -ForegroundColor Green
    $env:PATH = "$pythonPath;$pythonPath\Scripts;$env:PATH"
} else {
    Write-Host "Failed to install Python." -ForegroundColor Red
    Exit 1
}

# 3. Verify
Write-Host "Verifying versions..."
node --version
& $pythonExe --version

# 4. Run Setup
Write-Host "Running Project Setup..."
Set-Location "$PSScriptRoot"
./setup.bat
