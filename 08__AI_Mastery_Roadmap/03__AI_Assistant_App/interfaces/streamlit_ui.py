import streamlit as st
from assistant.core import dummy_response

st.title("AI Assistant (Streamlit)")

user_input = st.text_input("Say something to the assistant:")

if user_input:
    response = dummy_response(user_input)
    st.write("Assistant:", response)
