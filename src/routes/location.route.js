import { Router } from "express";
import authMid from "../middlewares/auth.js";
import { addLocation, listLocations } from "../controllers/location.controller.js";

const locationRouter = Router()
locationRouter.use(authMid)

locationRouter.get('/', listLocations)
locationRouter.post('/:perId', addLocation)

export { locationRouter }