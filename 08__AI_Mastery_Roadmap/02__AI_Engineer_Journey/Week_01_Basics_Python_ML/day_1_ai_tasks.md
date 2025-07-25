# Day 1: Kickoff — Setup + Core Python + AI Assistant Boilerplate

> **Total Time**: \~6 hours\
> **Objective**: Set up the full development environment, brush up on Python, and initialize the AI Assistant app structure.

---

## 🚀 Task A: AI/ML Learning Track (Python Foundations) — \~3 Hours

### ✅ 1. Python Core Concepts Refresher (2 Hours)

- Variables, Data Types, Type Casting
- Conditionals, Loops
- Functions (with `*args`, `**kwargs`)
- Exception Handling
- List/Dict/Set/Tuple comprehensions
- Lambda, Map, Filter, Reduce

#### Mini Task:

Write a script that:

- Takes a sentence from the user
- Cleans it (removes punctuation, lowercases it)
- Returns a word frequency dictionary

---

### ✅ 2. Python for Data Science (1 Hour)

- Numpy: arrays, broadcasting, indexing
- Pandas: DataFrames, filtering, grouping, merging

#### Mini Task:

- Load a CSV (use a sample dummy dataset)
- Print:
  - First 5 rows
  - Columns with null values
  - Grouped summary by a column

#### Suggested Learning Resources:

- [W3Schools Python Refresher](https://www.w3schools.com/python/)
- [Kaggle Python Course](https://www.kaggle.com/learn/python)

---

## 🧠 Task B: AI Assistant App Track — \~3 Hours

### ✅ 1. Project Directory & Git Setup (30 min)

- Create a new directory:
  ```bash
  mkdir ai-assistant-app && cd ai-assistant-app
  git init
  ```
- Create `.gitignore` file with:
  ```
  __pycache__/
  ai-env/
  *.pyc
  .env
  ```

---

### ✅ 2. App Boilerplate with FastAPI + Gradio + Streamlit (2 Hours)

#### Install Required Libraries:

```bash
pip install fastapi gradio streamlit uvicorn
```

#### Create Folder Structure:

```
ai-assistant-app/
├── main.py
├── assistant/
│   ├── __init__.py
│   └── core.py
└── interfaces/
    ├── gradio_ui.py
    └── streamlit_ui.py
```

#### `main.py` Basic Code:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/ask")
def read_root():
    return {"message": "Assistant is online!"}
```

#### Run Server:

```bash
uvicorn main:app --reload
```

---

### ✅ 3. Version Control (30 min)

- First commit:
  ```bash
  git add .
  git commit -m "Day 1: Initial setup for AI assistant app"
  ```
- Optional: Create GitHub repo and push changes

---

## 🧹 Bonus (Optional)

### Setup Jupyter and VS Code Environment (1 Hour)

- Install Jupyter in `ai-env`:

```bash
pip install ipykernel
python -m ipykernel install --user --name=ai-env
```

---

## 📝 End of Day 1 Deliverables:

- Python refresher + data science practice scripts
- AI assistant folder structure created
- `main.py` runs successfully with FastAPI
- `.gitignore` working (ai-env not tracked)
- First commit pushed to GitHub ✅

