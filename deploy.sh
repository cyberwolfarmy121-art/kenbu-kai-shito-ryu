#!/bin/bash

# Ken Bu Kai Shito Ryu - GitHub Pages Deployment Script

echo "Configuring Git..."
git config --global user.email "your-email@gmail.com"
git config --global user.name "Your Name"

echo "Adding remote origin..."
# Replace with your GitHub repository URL
git remote add origin https://github.com/cyberwolfarmy121-art/kenbu-kai-shito-ryu.git

echo "Adding files and committing..."
git add .
git commit -m "Initial commit: Ken Bu Kai Shito Ryu Karate Teaching Website"

echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "=================================="
echo "Deployment Complete!"
echo "=================================="
echo ""
echo "Next steps to enable GitHub Pages:"
echo "1. Go to https://github.com/cyberwolfarmy121-art/kenbu-kai-shito-ryu"
echo "2. Click Settings → Pages"
echo "3. Under 'Source', select 'main' branch"
echo "4. Click Save"
echo ""
echo "Your site will be live at:"
echo "https://cyberwolfarmy121-art.github.io/kenbu-kai-shito-ryu/"
