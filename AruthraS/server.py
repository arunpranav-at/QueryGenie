from fastapi import FastAPI
# from routers.sampleRouter.router import router as testRouter
from routers.BotRouter.router import router as botRouter
from routers.AuthRouter.router import router as authRouter

app = FastAPI()

# app.include_router(testRouter)
app.include_router(botRouter,prefix="/bot")
app.include_router(authRouter, prefix="/auth")

print("server running at 8000")