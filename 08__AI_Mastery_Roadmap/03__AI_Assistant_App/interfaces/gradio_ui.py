import gradio as gr
from assistant.core import dummy_response

def respond(input_text):
    return dummy_response(input_text)

demo = gr.Interface(fn=respond, inputs="text", outputs="text")

if __name__ == "__main__":
    demo.launch()
