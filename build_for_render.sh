#!/bin/bash
set -e

echo "Starting MentorView build process for Render.com deployment..."

# This script is designed to run in the Render build environment
# It assumes you're in the project root directory

# Step 1: Install Node.js if not available (Render may have it already)
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -sL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Step 2: Build the Angular frontend
echo "Building Angular frontend..."
cd MentorView-ui
npm install
npm run build -- --configuration production
cd ..

# Step 3: Ensure static folder exists in Flask backend
echo "Preparing Flask static folder..."
mkdir -p src/backend/static

# Step 4: Copy Angular build output to Flask static folder
echo "Copying Angular build to Flask static folder..."
cp -r MentorView-ui/dist/mentor-view-ui/browser/* src/backend/static/

echo "Build complete! The application is ready for Render.com deployment."
echo "The Flask backend will serve the Angular frontend from the static folder."
