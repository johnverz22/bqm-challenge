#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please download it from https://nodejs.org/"
    exit 1
fi

# Run npm install
echo "Installing dependencies..."
npm install

# Run the Node.js application
echo "Starting the application..."
node .

# Wait a moment for the server to start (adjust the delay as needed)
sleep 5

# Open the first Chrome window
open -a "Google Chrome" "http://localhost:3000/control"

# Open the second Chrome window
open -a "Google Chrome" "http://localhost:3000/"

echo "Deployment complete."
