#!/bin/sh
set -e

# Check if node_modules exists and has content
if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already installed, skipping..."
fi

# Start the dev server
exec npm run dev -- --host 0.0.0.0 --port 5173


