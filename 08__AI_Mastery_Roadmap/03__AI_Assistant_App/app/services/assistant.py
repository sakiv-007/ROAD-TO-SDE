from datetime import datetime

def generate_response(user_input: str) -> str:
    user_input = user_input.lower()

    # Greeting response
    if any(greet in user_input for greet in ["hello", "hi", "hey", "namaste"]):
        return "Hello! How can I help you today?"

    # Time response
    elif "time" in user_input:
        current_time = datetime.now().strftime("%I:%M %p")
        return f"The current time is {current_time}."

    # Date response
    elif "date" in user_input:
        current_date = datetime.now().strftime("%A, %d %B %Y")
        return f"Today is {current_date}."

    # Weather (placeholder)
    elif "weather" in user_input:
        return "I'm not connected to real-time weather APIs yet, but I can add that soon!"

    # Thanks
    elif "thank" in user_input:
        return "You're welcome! 😊"

    # Default fallback
    else:
        return "I'm still learning! Can you please rephrase or ask something else?"
