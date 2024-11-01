from pydantic import BaseModel
from models.users import add_user, get_user_email

class RequestBody(BaseModel):
    email: str
    password: str

def SignUpHandler():
    return {"message": "Sign Up Handler"}