#!/bin/bash

# Add Homebrew Ruby to PATH
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# Sass/Jekyll theme SCSS requires UTF-8 (avoids "Invalid US-ASCII character" errors)
export LANG="${LANG:-en_US.UTF-8}"
export LC_ALL="${LC_ALL:-en_US.UTF-8}"

# Kill any existing Jekyll processes
echo "Checking for existing Jekyll processes..."
lsof -ti:4000 | xargs kill -9 2>/dev/null || true

echo "Starting Jekyll development server (without LiveReload)..."
bundle exec jekyll serve 