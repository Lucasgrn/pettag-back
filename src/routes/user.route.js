import { Router } from "express";
import authMid from "../middlewares/auth.js";
import { editUser, getSelfInfo } from "../controllers/user.controller.js";
const userRouter = Router()
userRouter.use(authMid)

userRouter.get('/', getSelfInfo)
userRouter.patch('/', editUser)

export { userRouter }