#!/bin/bash

# FeiertagsAPI - Quick Deployment Script

echo "🚀 FeiertagsAPI Deployment Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the feiertage-api directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create a new GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: feiertage-api"
echo "   - Make it Public or Private"
echo "   - DO NOT initialize with README (we already have one)"
echo "   - Click 'Create repository'"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR-USERNAME/feiertage-api.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   npx vercel"
echo "   (Follow the prompts and link your GitHub repository)"
echo ""
echo "4. Your API will be live at:"
echo "   https://feiertage-api.vercel.app"
echo ""
echo "💰 To enable payments:"
echo "   - Create Stripe account at https://stripe.com"
echo "   - Add Stripe keys to Vercel Environment Variables"
echo "   - See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Happy launching!"
