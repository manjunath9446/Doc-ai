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
#!/usr/bin/env bash
# exit on error
set -o errexit

# --- START: System Dependency Installation ---
echo "--- Installing system dependencies (Tesseract, Poppler, and language packs) ---"
apt-get update
apt-get install -y tesseract-ocr \
                   tesseract-ocr-eng \
                   tesseract-ocr-hin \
                   tesseract-ocr-kan \
                   tesseract-ocr-deu \
                   tesseract-ocr-fra \
                   tesseract-ocr-spa \
                   libleptonica-dev \
                   poppler-utils
# Clean up apt cache to save space
rm -rf /var/lib/apt/lists/*
# --- END: System Dependency Installation ---

# -- Backend Python Package Installation --
echo "--- Installing backend Python dependencies ---"
pip install -r backend/requirements.txt

# -- Frontend Installation & Build --
echo "--- Installing frontend dependencies and building... ---"
cd frontend
npm install
npm run build
cd ..