from pydantic import BaseModel

class PromptRequest(BaseModel):
    user_input: str
