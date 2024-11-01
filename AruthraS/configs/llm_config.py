from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv("AZURE_OPENAI_KEY")
endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")

api_version = {
    "gpt-35-turbo": "2024-05-01-preview",
    "gpt-4": "2024-02-15-preview"
}

def get_api_version(model_name):
    return api_version[model_name]