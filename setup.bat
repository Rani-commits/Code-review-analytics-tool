@echo off
setlocal
echo ==========================================
echo      Automated Code Review System Setup
echo ==========================================

:: Define executables
set PYTHON_CMD=python
if exist "C:\Python311\python.exe" set PYTHON_CMD="C:\Python311\python.exe"

set NPM_CMD=npm
if exist "C:\Program Files\nodejs\npm.cmd" set NPM_CMD="C:\Program Files\nodejs\npm.cmd"

echo.
echo [1/4] Checking prerequisites...
echo Using Python: %PYTHON_CMD%
echo Using NPM: %NPM_CMD%

:: Check if they actually run
%PYTHON_CMD% --version >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not working.
    exit /b 1
)

:: Skipping npm check strictly to allow partial progress, but it should work.

echo [OK] Prerequisites detected.

echo.
echo [2/4] Setting up Backend...
cd backend
if not exist venv (
    echo Creating virtual environment...
    %PYTHON_CMD% -m venv venv
)
echo Activating virtual environment...
call venv\Scripts\activate
echo Installing backend dependencies...
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies.
    exit /b 1
)
cd ..

echo.
echo [3/4] Setting up Frontend...
cd frontend
echo Installing frontend dependencies...
call %NPM_CMD% install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies.
    exit /b 1
)
cd ..

echo.
echo [4/4] Setup Complete!
echo You can now run the system using 'run.bat'.
pause
