from fastapi import FastAPI
# from routers.sampleRouter.router import router as testRouter
from routers.BotRouter.router import router as botRouter
from routers.AuthRouter.router import router as authRouter

app = FastAPI()

# app.include_router(testRouter)
app.include_router(botRouter)
app.include_router(authRouter, prefix="/auth")

# from models.users import get_user_email, add_user
# user = get_user_email("aruthras06@gmail.com")
# user = add_user("dude@gmail.com","123456789045yfg")
# print(user)

print("server running at 8000")