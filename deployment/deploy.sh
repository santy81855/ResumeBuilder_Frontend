#!/bin/bash

# move to the root of the project directory
cd ..

# Pull the latest changes from the main branch
git pull origin main

# Install dependencies
npm install

# Build the Next.js app
npm run build

# Restart the Node.js app using pm2
sudo pm2 restart ai-resume