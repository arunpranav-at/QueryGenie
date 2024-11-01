from fastapi import APIRouter
from .Handlers.BotHandler import BotHandler
from .Handlers.FetchHandler import FetchHandler

router = APIRouter()

router.post("/")(BotHandler)
router.post("/chat_data")(FetchHandler)