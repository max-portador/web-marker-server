import {Application} from "express";
import deviceController from "../controllers/deviceController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";
import {ROLES} from "../types";


const Router = require('express')
const router: Application = new Router()

router.post('/', checkRoleMiddleware(ROLES.ADMIN) ,deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOneById)

export default router