# PowerShell script for Windows users
Write-Host "Starting MentorView deployment build process..." -ForegroundColor Cyan

# Navigate to project root
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Step 1: Build the Angular frontend
Write-Host "Building Angular frontend..." -ForegroundColor Green
Set-Location .\MentorView-ui
npm install
npm run build -- --configuration production
Set-Location ..

# Step 2: Ensure static folder exists in Flask backend
Write-Host "Preparing Flask static folder..." -ForegroundColor Green
if (-not (Test-Path ".\src\backend\static")) {
    New-Item -Path ".\src\backend\static" -ItemType Directory
}

# Step 3: Copy Angular build output to Flask static folder
Write-Host "Copying Angular build to Flask static folder..." -ForegroundColor Green
Copy-Item -Path ".\MentorView-ui\dist\mentor-view-ui\browser\*" -Destination ".\src\backend\static\" -Recurse -Force

Write-Host "Build complete! The application is ready for deployment." -ForegroundColor Cyan
Write-Host "The Flask backend will serve the Angular frontend from the static folder." -ForegroundColor Cyan
