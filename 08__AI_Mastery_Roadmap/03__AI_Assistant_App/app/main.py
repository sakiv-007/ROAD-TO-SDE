from fastapi import FastAPI
from app.routes.assistant import router as assistant_router

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI Assistant Backend is Live!"}

# Register assistant route
app.include_router(assistant_router, prefix="/api/assistant")
