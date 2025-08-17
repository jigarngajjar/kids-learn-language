# Deploy Learn Gujarati App to AWS S3 Static Website

## Prerequisites
- AWS CLI installed and configured
- AWS S3 bucket created
- AWS CloudFront distribution (optional, for CDN)

## Step 1: Build the Web Version

### Option A: Using Expo Build (Recommended)
```bash
# Install dependencies if needed
npm install

# Build for web
npx expo export --platform web
```

### Option B: Using Development Build
```bash
# Start development server and build
npx expo start --web --no-dev --minify
```

### Option C: Manual Build (if above fails)
```bash
# Create a simple web build
mkdir -p web-build
cp -r src web-build/
cp App.js web-build/
cp package.json web-build/
cp app.json web-build/

# Create index.html
cat > web-build/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn Gujarati</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
        #root { width: 100%; height: 100vh; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="App.js"></script>
</body>
</html>
EOF
```

## Step 2: Create S3 Bucket

```bash
# Create S3 bucket (replace with your bucket name)
aws s3 mb s3://learn-gujarati-app

# Enable static website hosting
aws s3 website s3://learn-gujarati-app --index-document index.html --error-document index.html
```

## Step 3: Configure S3 Bucket Policy

Create a file named `bucket-policy.json`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::learn-gujarati-app/*"
        }
    ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy --bucket learn-gujarati-app --policy file://bucket-policy.json
```

## Step 4: Upload Files to S3

```bash
# Upload the web build files
aws s3 sync web-build/ s3://learn-gujarati-app --delete

# Or if using expo export
aws s3 sync dist/ s3://learn-gujarati-app --delete
```

## Step 5: Access Your Website

Your website will be available at:
```
http://learn-gujarati-app.s3-website-[region].amazonaws.com
```

## Step 6: Custom Domain (Optional)

### Using Route 53
1. Create a hosted zone for your domain
2. Create an A record pointing to your S3 bucket
3. Configure SSL certificate in ACM

### Using CloudFront (Recommended for Production)
```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
    --distribution-config file://cloudfront-config.json
```

## Step 7: Automated Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash

# Build the app
echo "Building the app..."
npx expo export --platform web

# Sync to S3
echo "Uploading to S3..."
aws s3 sync dist/ s3://learn-gujarati-app --delete

# Invalidate CloudFront cache (if using CloudFront)
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Troubleshooting

### If build fails due to assets:
1. Replace corrupted assets with placeholder images
2. Or remove asset references from app.json

### If S3 upload fails:
1. Check AWS credentials: `aws configure`
2. Verify bucket permissions
3. Check file paths

### If website doesn't load:
1. Verify bucket policy is correct
2. Check if static website hosting is enabled
3. Ensure index.html is in the root

## Alternative: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build for web
      run: npx expo export --platform web
    
    - name: Deploy to S3
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Sync to S3
      run: aws s3 sync dist/ s3://learn-gujarati-app --delete
```

## Cost Optimization

- Use S3 Intelligent Tiering for cost savings
- Enable CloudFront caching to reduce S3 requests
- Set up lifecycle policies for old versions
- Monitor usage with AWS Cost Explorer

## Security Best Practices

- Enable S3 bucket versioning
- Set up CloudTrail for audit logs
- Use IAM roles instead of access keys
- Enable S3 bucket encryption
- Set up WAF rules if needed
