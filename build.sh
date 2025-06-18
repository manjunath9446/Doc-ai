#!/usr/bin/env bash
# exit on error
set -o errexit

# -- Backend Installation --
echo "--- Installing backend dependencies ---"
pip install -r backend/requirements.txt

# -- Frontend Installation & Build --
echo "--- Installing frontend dependencies and building... ---"
cd frontend
npm install
npm run build
cd .. 
# This script will finish, and Render will find the 'frontend/dist' folder