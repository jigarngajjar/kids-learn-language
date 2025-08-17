#!/bin/bash

echo "🚀 Setting up Learn Gujarati App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

echo "📦 Installing dependencies..."
npm install

echo "✅ Installation complete!"
echo ""
echo "🎯 To start the app, run:"
echo "   npm start"
echo ""
echo "📱 To run on specific platforms:"
echo "   npm run ios     # For iOS"
echo "   npm run android # For Android"
echo "   npm run web     # For Web"
echo ""
echo "🎓 Happy Learning! શુભ શીખવા!" 