from fastapi import APIRouter
from app.schemas.prompt import PromptRequest
from app.services.assistant import generate_response

router = APIRouter()

@router.post("/prompt")
def handle_prompt(prompt: PromptRequest):
    return generate_response(prompt)
