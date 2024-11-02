from dotenv import load_dotenv
import os

load_dotenv()

db_URI = os.getenv("DB_URI")
table_name = os.getenv("TABLE_NAME")
