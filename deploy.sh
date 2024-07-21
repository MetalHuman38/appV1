#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Switching to brach test-deployment"
echo "Switching to branch test-deployment"
git fetch origin
git checkout test-deployment
git pull origin test-deployment

echo "Installing dependencies..."
npm install

echo "Restarting Nginx..."
ssh babsdevsys@metalbrain.net 'sudo systemctl restart nginx'

echo "Deploying files to server..."
# scp -r build/* bkalejaiye@metalbrain.net:/var/www/metalbrain.net/html/
scp -r /home/babsdevsys/appV-1/build/* /var/www/public_html/

echo "Done!"


