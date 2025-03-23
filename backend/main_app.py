import streamlit as st
import json
import os
from dotenv import load_dotenv
from json_processor import process_json
from vector_store import init_vector_store, add_json_to_vector, retrieve_json_from_vector
from embeddings import get_embedding_model
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

# Initialize LLM
def get_gemini_llm():
    api_key = os.getenv("GEMINI_API_KEY")
    return ChatGoogleGenerativeAI(model="gemini-2.0-flash", api_key=api_key)

# Streamlit UI Setup
st.set_page_config(page_title="Chat with College Data 📄🤖", layout="wide")
st.title("Chat with College Data 📚💬")

# Session ID Management
if "session_id" not in st.session_state:
    st.session_state.session_id = "json_chat_session"

if "messages" not in st.session_state:
    st.session_state.messages = []  # Stores entire conversation history

if "last_query_type" not in st.session_state:
    st.session_state.last_query_type = None  # To track last question type (faculty/fees)

session_id = st.session_state.session_id
embedding_model = get_embedding_model()

# Separate vector stores for different data types
faculty_vector_store = init_vector_store(session_id + "_faculty", embedding_model)
fees_vector_store = init_vector_store(session_id + "_fees", embedding_model)

# Initialize LLM before handling user queries
llm = get_gemini_llm()

# Automatically Load JSON Files (No Upload Required)
def load_json_file(file_path, vector_store, data_label):
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            json_data = json.load(file)

        st.success(f"✅ Loaded `{file_path}` file for {data_label}!")

        processed_data = process_json(json_data)
        add_json_to_vector(session_id + f"_{data_label}", processed_data)

        return json_data
    else:
        st.error(f"❌ `{file_path}` not found! Please check the project folder.")
        return None

# Load both JSON files automatically
faculty_json = load_json_file("sample.json", faculty_vector_store, "faculty")
fees_json = load_json_file("fees.json", fees_vector_store, "fees")

# Ensure data is loaded before proceeding
if faculty_json is None or fees_json is None:
    st.error("🚨 Required JSON files are missing. Please check the project directory.")
    st.stop()  # Stop execution if files are missing

# Chat Interface
st.subheader("Ask about Faculty or College Fees 📩")

# Display chat history (Persisting conversation context)
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# User Input Field
user_input = st.chat_input("Ask me anything about faculty or college fees...")

if user_input:  # ✅ Fix: Prevent processing when user_input is None
    st.session_state.messages.append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    # Retrieve previous conversation history for context
    past_conversations = "\n".join([f"{m['role']}: {m['content']}" for m in st.session_state.messages])

    # ✅ New Greeting Handling
    greetings = ["hi", "hello", "hey", "good morning", "good evening", "what's up"]
    if user_input.lower().strip() in greetings:
        response = "Hello! 😊 How can I help you today? You can ask about faculty details or college fees."
        st.session_state.messages.append({"role": "assistant", "content": response})
        with st.chat_message("assistant"):
            st.markdown(response)
        st.stop()  # Stop further processing after greeting response

    # ✅ Fix: Indentation corrected, ensuring this block runs only when `user_input` is valid
    if any(keyword in user_input.lower() for keyword in ["fee", "tuition", "cost", "hostel"]):
        data_type = "fees"
        context = retrieve_json_from_vector(session_id + "_fees", user_input)
        st.session_state.last_query_type = "fees"  # Remember last question type

    elif any(keyword in user_input.lower() for keyword in ["faculty", "professor", "teacher", "department", "office", "cabin"]):
        data_type = "faculty"
        context = retrieve_json_from_vector(session_id + "_faculty", user_input)
        st.session_state.last_query_type = "faculty"

    else:
        # ✅ NEW: Use LLM for General Queries if no faculty/fee context found
        data_type = "general"
        context = "This is a general knowledge question."

    # Generate response from LLM with chat history for better context
    system_prompt = f"""
    You are an AI that answers college-related queries and general knowledge questions.

    You have access to:
    - Faculty Details (`sample.json`): Contains faculty members, departments, subjects, and contact information.
    - Fee Structure (`fees.json`): Contains tuition fees, hostel fees, and other charges.
    - General Knowledge: If the user's query is not about faculty or fees, answer using general AI knowledge.

    Conversation History:
    {past_conversations}

    - Extract information based on the user's question.
    - If asking about faculty, return all relevant details.
    - If asking about fees, return relevant fee details.
    - If asking a general question, provide an AI-generated answer based on common knowledge.

    User Question: {user_input}
    Context from {data_type} data: {context}
    """

    response = llm.invoke(system_prompt)

    # ✅ Fix: Ensure correct access to response content
    st.session_state.messages.append({"role": "assistant", "content": response.content})
    with st.chat_message("assistant"):
        st.markdown(response.content)
