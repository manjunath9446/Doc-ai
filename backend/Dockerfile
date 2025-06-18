# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# --- System Dependency Installation ---
# Install Tesseract, Poppler, and language packs inside the container image
# This ensures they are available at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-hin \
    tesseract-ocr-kan \
    tesseract-ocr-deu \
    tesseract-ocr-fra \
    tesseract-ocr-spa \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# --- Python Package Installation ---
# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# --- Application Code ---
# Copy the rest of your application's code into the container
COPY . .

# --- Expose Port & Run Command ---
# Make port 80 available to the world outside this container
# Gunicorn will run on this port. Render maps its internal port to this.
EXPOSE 80

# Define the command to run your app using Gunicorn
# We use 0.0.0.0 to bind to all network interfaces inside the container.
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:80", "main:app"]