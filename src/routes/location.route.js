import { Router } from "express";
import authMid from "../middlewares/auth.js";
import { addLocation, addUserLocation, editUserLocation, getUserLocation, listLocations } from "../controllers/location.controller.js";

const locationRouter = Router()
//locationRouter.use(authMid)

locationRouter.get('/', listLocations)
locationRouter.post('/pet/:petId', addLocation)
locationRouter.post('/user', addUserLocation)
locationRouter.get('/user', authMid, getUserLocation)
locationRouter.patch('/user', editUserLocation)

export { locationRouter }