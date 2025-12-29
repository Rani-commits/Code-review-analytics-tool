@echo off
setlocal
echo ==========================================
echo      Starting Code Review System
echo ==========================================

set PYTHON_CMD=python
if exist "C:\Python311\python.exe" set PYTHON_CMD="C:\Python311\python.exe"

set NPM_CMD=npm
if exist "C:\Program Files\nodejs\npm.cmd" set NPM_CMD="C:\Program Files\nodejs\npm.cmd"

:: Add Node to PATH just in case
if exist "C:\Program Files\nodejs" set PATH=C:\Program Files\nodejs;%PATH%

echo.
echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && %PYTHON_CMD% -m uvicorn app.main:app --reload"

echo.
echo [2/2] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && %NPM_CMD% run dev"

echo.
echo [INFO] Servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this launcher (servers will keep running).
pause
