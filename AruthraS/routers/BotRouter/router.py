from fastapi import APIRouter
from .Handlers.BotHandler import BotHandler

router = APIRouter()

router.post("/")(BotHandler)