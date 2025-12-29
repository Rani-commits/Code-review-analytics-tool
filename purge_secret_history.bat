@echo off
setlocal
color 0C
echo ========================================================
echo      🔒 PURGING LEAKED SECRETS FROM GIT HISTORY
echo ========================================================
echo.
echo [INFO] This will rewrite commit history and force-push.
echo [INFO] Target secret: Google API Key
echo.

set "GIT_HOME=%~dp0tools\git\cmd"
set "PATH=%GIT_HOME%;%PATH%"

git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Git not available. Ensure tools\\git exists.
  pause
  exit /b 1
)

:: Ensure Python is available for git-filter-repo
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Python is required for git-filter-repo.
  echo        Please install Python 3.11+ and re-run.
  pause
  exit /b 1
)

echo [ACTION] Installing git-filter-repo...
python -m pip install --user git-filter-repo

:: Create replace-text mapping
set "MAP=%TEMP%\replace-secret.txt"
> "%MAP%" (
  echo REDACTED==>REDACTED
)

echo [ACTION] Rewriting repository history to remove leaked key...
git filter-repo --replace-text "%MAP%"

if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] git filter-repo failed.
  del "%MAP%" >nul 2>&1
  pause
  exit /b 1
)

del "%MAP%" >nul 2>&1

echo [ACTION] Force pushing cleaned history to origin/main...
git push --force origin main

if %ERRORLEVEL% EQU 0 (
  color 0A
  echo.
  echo ========================================================
  echo      ✅ SUCCESS! HISTORY CLEANED AND PUSHED
  echo ========================================================
) else (
  echo.
  echo ========================================================
  echo      ❌ ERROR: FORCE PUSH FAILED
  echo ========================================================
  echo Please ensure you are authenticated and have push rights.
)

pause
endlocal

