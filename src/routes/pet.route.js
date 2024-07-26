import { Router } from "express";
import { deletePet, editPet, getPet, listPets, petRegister } from "../controllers/pet.controller.js";
import authMid from "../middlewares/auth.js";

const petRouter = Router()
petRouter.use(authMid)


petRouter.post('/', petRegister)
petRouter.get('/', listPets)
petRouter.patch('/', editPet)
petRouter.get('/:token', getPet)
petRouter.delete('/:token', deletePet)

export { petRouter }