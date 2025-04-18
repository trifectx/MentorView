#!/bin/bash
set -e

echo "Starting MentorView deployment build process..."

# Navigate to project root
cd "$(dirname "$0")"

# Step 1: Build the Angular frontend
echo "Building Angular frontend..."
cd MentorView-ui
npm install
npm run build -- --configuration production
cd ..

# Step 2: Ensure static folder exists in Flask backend
echo "Preparing Flask static folder..."
mkdir -p src/backend/static

# Step 3: Copy Angular build output to Flask static folder
echo "Copying Angular build to Flask static folder..."
cp -R MentorView-ui/dist/mentor-view-ui/browser/* src/backend/static/

echo "Build complete! The application is ready for deployment."
echo "The Flask backend will serve the Angular frontend from the static folder."
