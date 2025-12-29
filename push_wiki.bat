@echo off
color 0A
cls
echo ========================================================
echo        🚀 PUBLISHING WIKI PAGES (Rani-commits) 🚀
echo ========================================================
echo.
echo [INFO] Wiki Repo: https://github.com/Rani-commits/Code-review-analytics-tool.wiki.git
echo.

set "GIT_HOME=%~dp0tools\git\cmd"
set "PATH=%GIT_HOME%;%PATH%"

git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [ERROR] Git not found. Please ensure the 'tools' folder exists.
    pause
    exit /b
)

set "WIKI_DIR=%~dp0wiki_repo"
if not exist "%WIKI_DIR%" (
    echo [ACTION] Cloning wiki repository...
    git clone https://github.com/Rani-commits/Code-review-analytics-tool.wiki.git "%WIKI_DIR%"
)

echo [ACTION] Copying docs to wiki...
copy /Y "%~dp0docs\*.md" "%WIKI_DIR%" >nul

cd /D "%WIKI_DIR%"
git add .
git commit -m "Update wiki: Overview, Architecture, Flowcharts, Setup, Security, API"
git push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo      ✅ SUCCESS! WIKI UPDATED SUCCESSFULLY ✅
    echo ========================================================
    echo.
) else (
    color 0C
    echo.
    echo ========================================================
    echo      ❌ ERROR: WIKI UPDATE FAILED ❌
    echo ========================================================
    echo.
    echo Possible reasons:
    echo 1. Not authenticated to GitHub.
    echo 2. Wiki repository permissions.
    echo 3. Network issues.
)

pause

