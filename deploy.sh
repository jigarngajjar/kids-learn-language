#!/bin/bash

# Deploy Learn Gujarati App to S3
# Make sure to configure AWS CLI first: aws configure

BUCKET_NAME="kids-learn-language"
REGION="us-east-1"

echo "🚀 Starting deployment to S3..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

# Create S3 bucket if it doesn't exist
echo "📦 Creating S3 bucket if it doesn't exist..."
aws --profile personal s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "Bucket already exists"

# Enable static website hosting
echo "🌐 Enabling static website hosting..."
aws --profile personal  s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Create bucket policy for public read access
echo "🔓 Setting up bucket policy..."
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws --profile personal  s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Try to build the app
echo "🔨 Building the app..."
if npx expo export --platform web; then
    echo "✅ Build successful"
    BUILD_DIR="dist"
else
    echo "⚠️  Expo build failed, creating simple web build..."
    
    # Create simple web build
    mkdir -p web-build
    cp -r src web-build/ 2>/dev/null || echo "No src directory"
    cp App.js web-build/ 2>/dev/null || echo "No App.js"
    cp package.json web-build/ 2>/dev/null || echo "No package.json"
    cp app.json web-build/ 2>/dev/null || echo "No app.json"
    
    # Create simple index.html
    cat > web-build/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn Gujarati</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            line-height: 1.6;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ગુજરાતી શીખો</h1>
        <h2>Learn Gujarati</h2>
        <p>Your Gujarati learning app is being deployed to AWS S3.</p>
        <p>This is a placeholder page while the full app is being built.</p>
        
        <div class="features">
            <div class="feature">
                <h3>📚 Alphabet</h3>
                <p>Learn Gujarati vowels and consonants</p>
            </div>
            <div class="feature">
                <h3>🔢 Numbers</h3>
                <p>Master Gujarati numbers 1-100</p>
            </div>
            <div class="feature">
                <h3>📖 Words</h3>
                <p>Build your Gujarati vocabulary</p>
            </div>
            <div class="feature">
                <h3>📝 Barakhadi</h3>
                <p>Learn syllable combinations</p>
            </div>
        </div>
    </div>
</body>
</html>
EOF
    
    BUILD_DIR="web-build"
fi

# Upload files to S3
echo "📤 Uploading files to S3..."
aws --profile personal  s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete

# Get the website URL
WEBSITE_URL=$(aws --profile personal s3api get-bucket-website --bucket $BUCKET_NAME --query 'WebsiteEndpoint' --output text)

echo "✅ Deployment complete!"
echo "🌐 Your website is available at:"
echo "   http://$WEBSITE_URL"
echo ""
echo "📋 Next steps:"
echo "   1. Test the website at the URL above"
echo "   2. Consider setting up CloudFront for better performance"
echo "   3. Configure a custom domain if needed"
echo "   4. Set up automated deployments with GitHub Actions"

# Clean up
rm -f bucket-policy.json
