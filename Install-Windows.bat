@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

:: Check if Node.js is installed
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please download it from https://nodejs.org/
    pause
    exit /b
)

:: Run npm install
echo Installing dependencies...
npm install

:: Run the Node.js application
echo Starting the application...
start "" "node" .

:: Wait a moment for the server to start (adjust the delay as needed)
timeout /t 5 >nul

:: Open the first Chrome window
start chrome "http://localhost:3000/control"

:: Open the second Chrome window in fullscreen mode
start chrome --new-window "http://localhost:3000/"

echo Deployment complete.
pause
