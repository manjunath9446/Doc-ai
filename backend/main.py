
import os
import io
import json
import pytesseract
from dotenv import load_dotenv
from PIL import Image
from pdf2image import convert_from_bytes
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

load_dotenv()
app = FastAPI(
    title="Advanced Document AI Tool",
    description="Upload a document, get structured JSON, and chat with it."
)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)




GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY environment variable not set.")
client = Groq(api_key=GROQ_API_KEY)

class ChatRequest(BaseModel):
    question: str
    context: str  


if os.name == 'nt':
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


def _perform_ocr_on_image(image_bytes: bytes, lang: str) -> str:
    """
    Performs OCR on a single image provided as bytes, with language support.
    
    Args:
        image_bytes: The byte content of the image file (PNG, JPG, etc.).
        lang: The 3-letter language code for Tesseract (e.g., 'eng', 'deu').
    
    Returns:
        The extracted raw text as a string.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image, lang=lang)
        return text
    except Exception as e:
        if "Failed loading language" in str(e):
            raise HTTPException(
                status_code=400, 
                detail=f"OCR language pack for '{lang}' not found. Please install the Tesseract language pack (e.g., 'tesseract-ocr-{lang}' on Linux)."
            )
        print(f"Error during OCR: {e}")
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {e}")

def _structure_text_with_groq_general(text: str) -> dict:
    """
    Uses Groq to structure text into a general-purpose JSON.
    This is now for general documents, not just invoices.

    Args:
        text: The raw text extracted from the document.

    Returns:
        A dictionary containing the structured data.
    """
    if not text or not text.strip():
        return {}  

    system_prompt = (
        "You are an expert data structuring API. Your job is to analyze raw text and convert it "
        "into a generic, structured JSON format. Do not invent information. The final output must "
        "be ONLY the JSON object. Do not add explanations or markdown formatting."
    )
    
    human_prompt = f"""
    Please analyze the following text and structure it into a general-purpose JSON object.
    Identify a potential 'title', a brief 'summary', break down the main content into 'paragraphs' 
    (an array of strings), and extract any clear 'key_value_pairs' you find into an object.
    If a section is not found, use null or an empty array/object.

    TEXT TO ANALYZE:
    ---
    {text}
    ---
    """
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": human_prompt},
            ],
            model="llama3-8b-8192",
            temperature=0.1,
            response_format={"type": "json_object"},
        )
        return json.loads(chat_completion.choices[0].message.content)
    except Exception as e:
        print(f"Error during Groq structuring: {e}")
        raise HTTPException(status_code=500, detail=f"AI structuring failed: {e}")



@app.post("/parse-document/")
async def parse_document_endpoint(
    file: UploadFile = File(...),
    language: str = Form("eng")  
):
    """
    Handles document uploads, performs OCR in the specified language,
    and returns general-purpose structured JSON and the raw text for the chatbot.
    """
    contents = await file.read()
    filename = file.filename
    file_extension = filename.split('.')[-1].lower() if '.' in filename else ''

    raw_text = ""
    if file_extension in ["jpg", "jpeg", "png"]:
        raw_text = _perform_ocr_on_image(contents, lang=language)
    elif file_extension == "pdf":
        poppler_path = r"E:\poppler\bin" if os.name == 'nt' else None # Path for Windows
        try:
            images = convert_from_bytes(contents, poppler_path=poppler_path)
            text_parts = []
            for image in images:
                with io.BytesIO() as img_byte_stream:
                    image.save(img_byte_stream, format='PNG')
                    text_parts.append(_perform_ocr_on_image(img_byte_stream.getvalue(), lang=language))
            raw_text = "\n\n--- Page Break ---\n\n".join(text_parts)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to process PDF file: {e}")
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: '{file_extension}'. Please use JPG, PNG, or PDF."
        )
    
    structured_data = _structure_text_with_groq_general(raw_text)
    
    return {
        "filename": filename,
        "language_used": language,
        "raw_text": raw_text,  
        "structured_data": structured_data
    }

@app.post("/chat")
async def chat_with_document(request: ChatRequest):
    """
    Receives a question and the document's text (context),
    and returns an AI-generated answer based ONLY on the provided context.
    """
    system_prompt = (
        "You are a helpful Q&A assistant. Your task is to answer the user's question based "
        "**strictly and only** on the provided document text. If the answer is not in the text, "
        "you must respond with 'The answer could not be found in the provided document.' "
        "Do not use any external knowledge or make assumptions."
    )
    
    human_prompt = f"""
    DOCUMENT TEXT:
    ---
    {request.context}
    ---
    
    Based on the document text above, please answer the following question:
    {request.question}
    """
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": human_prompt},
            ],
            model="llama3-8b-8192",
            temperature=0.2, 
        )
        return {"answer": chat_completion.choices[0].message.content}
    except Exception as e:
        print(f"Error during Groq chat completion: {e}")
        raise HTTPException(status_code=500, detail=f"AI chat completion failed: {e}")

# --- NEW, CORRECTED CODE ---
@app.get("/")
def read_root():
    """
    A simple health check endpoint to confirm the API is running.
    """
    return {"message": "DocAI Backend API is running successfully."}