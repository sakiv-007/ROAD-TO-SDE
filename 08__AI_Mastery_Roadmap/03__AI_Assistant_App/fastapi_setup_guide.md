# 🧠 AI Assistant App - FastAPI Setup Guide

This guide will help you set up your FastAPI backend for the AI Assistant App step by step. Save and refer to it whenever needed.

---

## 📁 Project Structure

```
03__AI_Assistant_App/
├── ai-env/                     # Virtual Environment (not tracked by Git)
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI entry point
│   ├── routes/
│   │   ├── __init__.py
│   │   └── assistant.py        # API route for assistant
│   └── services/
│       ├── __init__.py
│       └── assistant.py        # Logic for response generation
├── .gitignore
├── requirements.txt
└── README.md
```

---

## ✅ Initial Setup Instructions

### 1. **Create a virtual environment**

```bash
python -m venv ai-env
```

### 2. **Activate the virtual environment**

- **Windows CMD:**
  ```bash
  ai-env\Scripts\activate
  ```
- **PowerShell:**
  ```powershell
  .\ai-env\Scripts\Activate.ps1
  ```
- **macOS/Linux:**
  ```bash
  source ai-env/bin/activate
  ```

### 3. **Install required libraries**

```bash
pip install fastapi uvicorn
```

### 4. **Freeze dependencies**

```bash
pip freeze > requirements.txt
```

---

## 🧱 Code Setup

### 1. `main.py`

```python
from fastapi import FastAPI
from app.routes.assistant import router as assistant_router

app = FastAPI()

app.include_router(assistant_router, prefix="/api/assistant")
```

### 2. `routes/assistant.py`

```python
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.assistant import generate_response

router = APIRouter()

class Prompt(BaseModel):
    user_input: str

@router.post("/prompt")
def process_prompt(prompt: Prompt):
    result = generate_response(prompt.user_input)
    return {"user_input": prompt.user_input, "response": result}
```

### 3. `services/assistant.py`

```python
def generate_response(user_input: str) -> str:
    return f"You said: {user_input} (This is a dummy response)"
```

---

## ▶️ Running the Server

Make sure you're inside your virtual environment, then run:

```bash
uvicorn app.main:app --reload
```

You should see output like:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

---

## 📬 How to Use the API (Swagger UI)

1. Open your browser and go to:

   ```
   http://127.0.0.1:8000/docs
   ```

2. Click on `POST /api/assistant/prompt` → click "Try it out"

3. Enter this JSON:

```json
{
  "user_input": "What's the weather today?"
}
```

4. Click "Execute"

5. You’ll see a response like:

```json
{
  "user_input": "What's the weather today?",
  "response": "You said: What's the weather today? (This is a dummy response)"
}
```

---

## ✅ .gitignore (Important)

Add this file to avoid tracking unnecessary files:

```
ai-env/
__pycache__/
*.pyc
.env
```

---

## 🔁 Reminder

- Always activate your virtual environment before running anything
- Use `uvicorn app.main:app --reload` to run the server
- Test your API at `http://127.0.0.1:8000/docs`

---

✅ Now you're all set up to build and extend your AI Assistant backend! Let’s move forward!

