#!/bin/bash

# Configuration
BUCKET_NAME="kids-learn-language"
REGION="us-east-1"

echo "🚀 Starting code update to S3 bucket..."

# Check if AWS CLI is configured
if ! aws --profile personal sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure --profile personal' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Check if bucket exists
if ! aws --profile personal s3 ls s3://$BUCKET_NAME &>/dev/null; then
    echo "❌ Bucket $BUCKET_NAME does not exist. Please run deploy.sh first to create the bucket."
    exit 1
fi

echo "✅ Bucket $BUCKET_NAME exists"

# Try to build the app
echo "🔨 Building the app..."
BUILD_DIR=""

if npx expo export --platform web; then
    echo "✅ Expo build successful"
    BUILD_DIR="dist"
elif [ -d "dist" ]; then
    echo "⚠️  Using existing dist folder"
    BUILD_DIR="dist"
else
    echo "❌ Build failed and no existing dist folder found"
    exit 1
fi

# Upload files to S3
echo "📤 Uploading files to S3..."
if aws --profile personal s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete; then
    echo "✅ Files uploaded successfully"
else
    echo "❌ Upload failed"
    exit 1
fi

# Get the website URL
WEBSITE_URL=$(aws --profile personal s3api get-bucket-website --bucket $BUCKET_NAME --query 'WebsiteEndpoint' --output text 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "🌐 Website URL: http://$WEBSITE_URL"
else
    echo "⚠️  Could not retrieve website URL"
fi

echo "✅ Code update complete!"
echo "📝 Note: This script only updates code. Use deploy.sh for initial setup."
