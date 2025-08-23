@echo off
echo Creating .env file...

if exist ".env" (
    echo .env file already exists!
    echo.
    echo Current contents:
    type .env
    echo.
    echo Do you want to overwrite it? (y/n)
    set /p choice=
    if /i "%choice%"=="y" (
        echo Overwriting .env file...
    ) else (
        echo Keeping existing .env file.
        pause
        exit /b
    )
)

echo PORT=3001 > .env
echo NODE_ENV=development >> .env
echo. >> .env
echo # MongoDB Connection >> .env
echo MONGODB_URI=mongodb://localhost:27017/eventify >> .env
echo. >> .env
echo # JWT Configuration >> .env
echo JWT_SECRET=eventify_jwt_secret_key_2024_very_secure_and_long_key_here >> .env
echo JWT_EXPIRE=7d >> .env
echo. >> .env
echo # CORS Configuration >> .env
echo FRONTEND_URL=http://localhost:3000 >> .env

echo.
echo ✅ .env file created successfully!
echo.
echo Contents:
type .env
echo.
echo 🚀 Now you can start the server with: npm run dev
pause
