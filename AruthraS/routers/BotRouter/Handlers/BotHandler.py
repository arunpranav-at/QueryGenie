from pydantic import BaseModel
from uuid import UUID

from fastapi import Response, HTTPException, status
import psycopg
from psycopg_pool import AsyncConnectionPool

from langchain_openai import AzureChatOpenAI
from langchain_community.callbacks import get_openai_callback
from langchain.memory import PostgresChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.messages import HumanMessage, AIMessage

from configs.llm_config import key, endpoint, get_api_version
from configs.postgres_config import db_URI, table_name

from ..prompt import history_prompt, no_history_prompt

from models.message_store import get_id, update_ai_data, update_user_data
from models.sessions import get_session_id

class TableStruct(BaseModel):
    column: list[str]
    type: list[str]
    constraints: list[str]

class RequestBody(BaseModel):
    prompt: str
    user_id: UUID
    session_id: UUID | bool
    structure: TableStruct
    history: bool
    model: str

async def BotHandler(data:RequestBody, response:Response):
    user_input = data.prompt
    user_id = data.user_id
    structure = dict(data.structure)
    history = data.history
    model = data.model
    session_id = data.session_id
    try:
        if not session_id:
            session_id = get_session_id(user_id)
        session_id = str(session_id)
        api_version = get_api_version(model)
        llm = AzureChatOpenAI(
            openai_api_key=key,
            azure_endpoint=endpoint,
            azure_deployment=model,
            api_version=api_version,
            temperature=0,
            max_tokens=200,
            timeout=None,
            max_retries=2,
        )
        # pool = AsyncConnectionPool(conninfo=db_URI)
        # conn = pool.connection()
        # print("Connected to database")

        def get_session_history():
            return PostgresChatMessageHistory(
                session_id=session_id,
                connection_string=db_URI
            )
        chat_history = get_session_history()
        if(history):
            
            chain = history_prompt | llm
            app = RunnableWithMessageHistory(
                chain,
                lambda: chat_history,
                input_messages_key="input",
                history_messages_key="history",
            )
            input_msg = [HumanMessage(user_input)]
            config = {"configurable": {"session_id": session_id}}
            with get_openai_callback() as cb:
                output = app.invoke(
                    {"input": input_msg, "structure": structure}, config)
                ret = output.content
                cost = cb.total_cost
                input_token = cb.prompt_tokens
                response_token = cb.completion_tokens
        else:
            input_msg = [HumanMessage(user_input)]
            formatted_prompt = no_history_prompt.format(structure=structure,input=input_msg)
            with get_openai_callback() as cb:
                output = llm.invoke(formatted_prompt)
                ret = output.content
                chat_history.add_user_message(user_input)
                chat_history.add_ai_message(ret)
                cost = cb.total_cost
                input_token = cb.prompt_tokens
                response_token = cb.completion_tokens
        print(ret)
        # print(cb)
        # print(cb.total_cost)
        # print(cb.total_tokens)
        # print(cb.prompt_tokens)
        # print(cb.completion_tokens)
        [ai_data_id,user_data_id] = get_id(session_id)
        ai_data_id = ai_data_id[0]
        user_data_id = user_data_id[0]
        # [(146,), (145,)]
        # print(ai_data_id,user_data_id)
        update_ai_data(ai_data_id,response_token,cost)
        update_user_data(user_data_id,input_token)
    except KeyError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail= "Invalid model name")
    # except Exception as e:
    #     print(e)
    #     # conn.close()
    #     raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail= str(e))
    # conn.close()
    return {"response":ret, "cost":cost, "input_token":input_token, "response_token":response_token, "session_id":session_id} 