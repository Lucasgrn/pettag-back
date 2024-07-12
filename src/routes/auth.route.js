import { Router } from "express";
import { login, registerUser } from "../controllers/user.controller.js";

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', login)

export { authRouter }