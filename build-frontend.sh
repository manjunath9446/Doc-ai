#!/usr/bin/env bash
# exit on error
set -o errexit

echo "--- Navigating to frontend directory ---"
cd frontend

echo "--- Installing frontend dependencies ---"
npm install

echo "--- Building frontend ---"
npm run build