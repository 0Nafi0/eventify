@echo off
echo 🚀 Starting Eventify Backend Server...
echo.

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo 📝 Creating .env file...
    call create-env.bat
    echo.
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    echo.
)

REM Check port availability
echo 🔍 Checking port availability...
node check-ports.js
echo.

REM Start the server
echo 🚀 Starting server...
npm run dev

pause
