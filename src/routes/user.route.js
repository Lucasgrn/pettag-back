import { Router } from "express";
import authMid from "../middlewares/auth.js";
import { getSelfInfo } from "../controllers/user.controller.js";
const userRouter = Router()
userRouter.use(authMid)

userRouter.get('/', getSelfInfo)

export { userRouter }