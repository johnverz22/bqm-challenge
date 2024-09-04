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

# Check if npm install was successful
if [ $? -ne 0 ]; then
    echo "npm install failed. Please check the error messages above."
    exit 1
fi


# Create the run.sh file
cat << 'EOF' > run.sh
#!/bin/bash

# Open the first Safari window
open -a "Safari" "http://localhost:3000/control"

# Open the second Safari window
open -a "Safari" "http://localhost:3000/"
EOF

# Make the run.sh file executable
chmod +x run.sh

# Execute the run.sh file
./run.sh

# Delete the current script
rm -- "$0"

# Exit the script
exit
