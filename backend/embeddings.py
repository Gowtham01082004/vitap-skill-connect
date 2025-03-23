# embeddings.py
import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

def get_embedding_model():
    """Initializes the Gemini Embeddings model."""
    api_key = os.getenv("GEMINI_API_KEY")
    return GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)

# TEST EMBEDDINGS
if __name__ == "__main__":
    model = get_embedding_model()
    sample_text = ["Hello world"]
    embeddings = model.embed_documents(sample_text)
    print(embeddings)  # Should print a list of embedding vectors
