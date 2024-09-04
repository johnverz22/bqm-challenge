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
call npm install

:: Check if npm install was successful
IF %ERRORLEVEL% NEQ 0 (
    echo npm install failed. Please check the error messages above.
    pause
    exit /b
)

:: Create the run.bat file
echo @echo off > run.bat
echo echo Starting the application... >> run.bat
echo start "" "node" . >> run.bat
echo start chrome "http://localhost:3000/control" >> run.bat
echo start chrome --new-window "http://localhost:3000/" >> run.bat
echo exit >> run.bat

:: Inform the user
echo Created run.bat to start the server and open the browser.

:: Delete unnecessary files
echo Deleting unnecessary files...
del Install-MacOS.sh
del .gitignore

:: Execute run.bat
echo Executing run.bat...
start "" run.bat

:: Delete the current batch file after executing run.bat
del "%~f0"

:: Close the current Command Prompt window
exit
