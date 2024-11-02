from pydantic import BaseModel
from uuid import UUID

from fastapi import Response

from models.message_store import get_chat
from models.sessions import get_dbStructure

class RequestBody(BaseModel):
    session_id: UUID

def FetchHandler(data: RequestBody, response: Response):
    try:
        session_id = str(data.session_id)
        chat = get_chat(session_id)
        structure = get_dbStructure(session_id)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    return {"chat_data": chat, "dbStructure": structure}
