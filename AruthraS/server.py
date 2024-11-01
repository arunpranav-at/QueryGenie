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

print("server running at 8000")