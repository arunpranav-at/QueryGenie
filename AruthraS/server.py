from fastapi import FastAPI
from routers.sampleRouter.router import router as testRouter
from routers.BotRouter.router import router as botRouter

app = FastAPI()

app.include_router(testRouter)
app.include_router(botRouter)

print("server running at 8000")