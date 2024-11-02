from pydantic import BaseModel

from fastapi import Response, HTTPException, status

from models.users import add_user, get_user_email
from ..password import hash_password

class RequestBody(BaseModel):
    email: str
    password: str


def SignUpHandler(data: RequestBody, response: Response):
    email = data.email
    password = data.password
    try:
        user = get_user_email(email)
        if user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
        hashed_password = hash_password(password)
        add_user(email, hashed_password)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail= str(e))
    return {"message": "User created successfully", "pass": hashed_password}
