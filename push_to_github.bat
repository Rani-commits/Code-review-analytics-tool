@echo off
color 0A
cls
echo ========================================================
echo        🚀 DEPLOYING TO GITHUB (Rani-commits) 🚀
echo ========================================================
echo.
echo [INFO] Repository: https://github.com/Rani-commits/Code-review-analytics-tool.git
echo [INFO] Branch: main
echo.

:: Set path to our portable git
set "GIT_HOME=%~dp0tools\git\cmd"
set "PATH=%GIT_HOME%;%PATH%"

:: Check if git works
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [ERROR] Git not found! Please make sure the 'tools' folder exists.
    pause
    exit /b
)

echo [ACTION] Preparing repository...
if not exist ".git" (
    git init
)

for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    git checkout -B main
)

for /f "tokens=*" %%i in ('git remote get-url origin 2^>nul') do set HAS_REMOTE=%%i
if "%HAS_REMOTE%"=="" (
    git remote add origin https://github.com/Rani-commits/Code-review-analytics-tool.git
) else (
    git remote set-url origin https://github.com/Rani-commits/Code-review-analytics-tool.git
)

echo [ACTION] Staging files...
git add .

for /f "tokens=*" %%i in ('git rev-parse --verify HEAD 2^>nul') do set HAS_COMMIT=%%i
if "%HAS_COMMIT%"=="" (
    git commit -m "Initial commit"
) else (
    git commit -m "Update project"
)

echo [ACTION] Pushing code...
echo.
echo --------------------------------------------------------
echo  PLEASE SIGN IN IF PROMPTED (Browser or Token)
echo --------------------------------------------------------
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo      ✅ SUCCESS! CODE UPLOADED SUCCESSFULLY ✅
    echo ========================================================
    echo.
    echo Check it here: https://github.com/Rani-commits/Code-review-analytics-tool
) else (
    color 0C
    echo.
    echo ========================================================
    echo      ❌ ERROR: UPLOAD FAILED ❌
    echo ========================================================
    echo.
    echo Possible reasons:
    echo 1. You are not signed in.
    echo 2. You don't have permission to write to this repository.
    echo 3. The repository doesn't exist yet (Create it on GitHub first!).
)

echo.
pause
