**Day 0: Setup Instructions and File Structure Overview**

---

### ✅ Objectives Completed:
- Created the project directory structure for both AI Engineer Journey and AI Assistant App.
- Installed required Python dependencies using virtual environment.
- Set up the development environment.

---

### 🔧 Step-by-Step Setup Instructions

#### 1. **Create Main Project Folder**
```bash
mkdir AI_Mastery_Roadmap
cd AI_Mastery_Roadmap
```

#### 2. **Create Python Virtual Environment**
```bash
python -m venv ai-env
```

#### 3. **Activate the Virtual Environment**
- **Windows**
```bash
ai-env\Scripts\activate
```
- **Linux/macOS**
```bash
source ai-env/bin/activate
```

#### 4. **Install Required Libraries**
```bash
pip install numpy pandas matplotlib seaborn scikit-learn jupyter notebook
pip install tensorflow keras torch torchvision torchaudio
pip install openai langchain transformers
pip install flask fastapi uvicorn
pip install gradio streamlit
```

> ✅ If you're using Python 3.13 and faced issues with TensorFlow, downgrade to Python 3.10. For example, download and install Python 3.10.13.

#### 5. **Create requirements.txt**
```bash
pip freeze > requirements.txt
```

#### 6. **Add .gitignore File**
```
ai-env/
__pycache__/
.env
```

---

### 📁 Final File Structure (with AI Assistant & AI Learning Journey)

```
AI_Mastery_Roadmap/
│
├── ai-env/                                # Virtual environment (not pushed to GitHub)
│
├── requirements.txt
├── README.md
│
├── AI_Engineer_Journey/                  # ML learning roadmap
│   ├── Day_0_Setup/
│   ├── Week_01_Python_ML_Intro/
│   ├── Week_02_Supervised_Learning/
│   ├── Week_03_Unsupervised_Learning/
│   ├── Week_04_NLP/
│   ├── Week_05_DL_CV/
│   ├── Week_06_LLMs_and_Transformers/
│   ├── Week_07_RAG_and_Chatbots/
│   └── Resources/
│
├── AI_Assistant_App/
│   ├── backend/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── utils/
│   │   └── requirements.txt
│   │
│   ├── ai/
│   │   ├── nlp/
│   │   ├── llm/
│   │   ├── rag/
│   │   └── voice/
│   │
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── tests/
│   │   ├── backend/
│   │   └── ai/
│   └── .env
│
└── .gitignore
```

---

### 📌 Notes:
- Virtual environment is isolated and will keep all dependencies project-specific.
- `.gitignore` ensures sensitive and unnecessary files are not pushed to version control.
- You now have a scalable foundation for both ML learning and app development.





