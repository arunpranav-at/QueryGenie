from fastapi import APIRouter
from .Handlers.SignUpHandler import SignUpHandler
from .Handlers.LoginHandler import LoginHandler

router = APIRouter()

router.post("/signup")(SignUpHandler)
router.post("/login")(LoginHandler)