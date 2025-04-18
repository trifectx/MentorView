#!/bin/bash
# Comprehensive build script for MentorView on Render.com
set -e

echo "==== MentorView Build Script ===="
echo "Running in directory: $(pwd)"
echo "Listing directory contents:"
ls -la

# Install Node.js if not already available
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
    apt-get install -y nodejs
    echo "Node.js installed: $(node -v)"
    echo "NPM installed: $(npm -v)"
fi

# Change to UI directory and build Angular app
echo "==== Building Angular frontend ===="
cd MentorView-ui
echo "Installing npm packages..."
npm install
echo "Building Angular application..."
npm run build
cd ..

# Ensure backend static directory exists
echo "==== Setting up Flask static directory ====" 
mkdir -p src/backend/static
echo "Copying Angular build to Flask static folder..."

# List the dist directory to see what we have
echo "Listing Angular dist directory contents:"
find MentorView-ui/dist -type d

# Try the standard Angular output path
if [ -d "MentorView-ui/dist/mentor-view-ui/browser" ]; then
    echo "Found standard Angular output path"
    cp -r MentorView-ui/dist/mentor-view-ui/browser/* src/backend/static/
# Try alternate path without browser subfolder (Angular 12+)
elif [ -d "MentorView-ui/dist/mentor-view-ui" ]; then
    echo "Found alternate Angular output path"
    cp -r MentorView-ui/dist/mentor-view-ui/* src/backend/static/
# Try browser output directly (Angular 9+)
elif [ -d "MentorView-ui/dist/browser" ]; then
    echo "Found browser output folder"
    cp -r MentorView-ui/dist/browser/* src/backend/static/
# Just check if anything is in dist
elif [ "$(ls -A MentorView-ui/dist)" ]; then
    echo "Found content in dist folder, copying everything"
    cp -r MentorView-ui/dist/* src/backend/static/
else
    echo "WARNING: No Angular build output found! Using placeholder page instead."    
fi

# Create a simple test file to verify static serving
echo "Creating test file to verify static serving..."
echo "<html><body><h1>MentorView Static Test</h1><p>If you see this page, static file serving is working!</p><p>$(date)</p></body></html>" > src/backend/static/test.html

# Install Python requirements
echo "==== Installing Python dependencies ===="
pip install -r requirements.txt

# Display final structure
echo "==== Final static directory structure ===="
find src/backend/static -type f | sort

echo "==== Build completed successfully ===="
