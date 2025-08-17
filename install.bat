@echo off
echo 🚀 Setting up Learn Gujarati App...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Check if Expo CLI is installed
expo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing Expo CLI...
    npm install -g @expo/cli
)

echo 📦 Installing dependencies...
npm install

echo ✅ Installation complete!
echo.
echo 🎯 To start the app, run:
echo    npm start
echo.
echo 📱 To run on specific platforms:
echo    npm run ios     # For iOS
echo    npm run android # For Android
echo    npm run web     # For Web
echo.
echo 🎓 Happy Learning! શુભ શીખવા!
pause 