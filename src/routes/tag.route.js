import { Router } from "express";
import { activateTag, createTags, getTag, listAllInactiveTags } from "../controllers/tag.controller.js";

const tagRouter = Router()

tagRouter.post('/', createTags)
tagRouter.get('/', listAllInactiveTags)
tagRouter.patch('/', activateTag)
tagRouter.get('/:id', getTag)

export { tagRouter }