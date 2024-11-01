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

# from models.tables import get_table
# table = get_table("cc813bcb-152a-42e9-bb39-77d32aa43d31")
# print(table)
# (UUID('cc813bcb-152a-42e9-bb39-77d32aa43d31'), datetime.datetime(2024, 11, 1, 9, 7, 57, 572762, tzinfo=datetime.timezone.utc),
#  'emp_table', ['id', 'name'], ['int', 'string'], ['primaryKey(id)'], UUID('30e516ad-ac9e-4a01-af25-a9d520b5d5dc'))

print("server running at 8000")