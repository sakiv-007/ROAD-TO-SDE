from app.schemas.prompt import PromptRequest

def generate_response(prompt: PromptRequest):
    user_input = prompt.user_input
    # Placeholder response for now
    return {
        "user_input": user_input,
        "response": f"You said: {user_input} (This is a dummy response)"
    }
