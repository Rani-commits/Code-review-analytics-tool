# PowerShell Script to Download and Install Prerequisites
$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Code Review System - Prerequisite Installer" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$downloadDir = "$PSScriptRoot\installers"
New-Item -ItemType Directory -Force -Path $downloadDir | Out-Null

# --- Node.js ---
$nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
$nodeInstaller = "$downloadDir\node_installer.msi"

if (-not (Get-Command "npm" -ErrorAction SilentlyContinue)) {
    Write-Host "`n[1/2] Node.js not found. Downloading..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller
    Write-Host "Installing Node.js... (Please follow the prompt)" -ForegroundColor Yellow
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$nodeInstaller`" /passive" -Wait
    Write-Host "Node.js installation completed." -ForegroundColor Green
} else {
    Write-Host "`n[1/2] Node.js is already installed." -ForegroundColor Green
}

# --- Python ---
$pythonUrl = "https://www.python.org/ftp/python/3.11.7/python-3.11.7-amd64.exe"
$pythonInstaller = "$downloadDir\python_installer.exe"

if (-not (Get-Command "python" -ErrorAction SilentlyContinue)) {
    Write-Host "`n[2/2] Python not found. Downloading..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $pythonUrl -OutFile $pythonInstaller
    Write-Host "Installing Python... (Please Check 'Add Python to PATH')" -ForegroundColor Yellow
    # Note: Cannot fully automate 'Add to PATH' without UI interaction in some versions, 
    # but /passive InstallAllUsers=1 PrependPath=1 tries to do it.
    Start-Process -FilePath $pythonInstaller -ArgumentList "/passive InstallAllUsers=1 PrependPath=1" -Wait
    Write-Host "Python installation completed." -ForegroundColor Green
} else {
    Write-Host "`n[2/2] Python is already installed." -ForegroundColor Green
}

Write-Host "`nAll prerequisites installed!" -ForegroundColor Cyan
Write-Host "Please RESTART your terminal/editor to refresh environment variables." -ForegroundColor Red
Write-Host "Then run 'setup.bat' to finish the project setup." -ForegroundColor Cyan
