from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.sampleRouter.router import router as testRouter
from routers.BotRouter.router import router as botRouter
from routers.AuthRouter.router import router as authRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    # allow_credentials=True 
)

app.include_router(testRouter)
app.include_router(botRouter,prefix="/bot")
app.include_router(authRouter, prefix="/auth")

from models.sessions import get_session_DT
from routers.BotRouter.DTconverter import convert_to_ist
ret = str(get_session_DT("e4dfd362-24d8-41c9-8413-659fdeff6077"))
print(ret)
out = str(convert_to_ist(ret))
print(out[:19])


print("server running at 8000")