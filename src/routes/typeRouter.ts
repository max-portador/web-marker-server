import {Application} from "express";
import typeController from "../controllers/typeController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";
import {ROLES} from "../types";

const Router = require('express')
const router: Application = new Router()

router.post('/', checkRoleMiddleware(ROLES.ADMIN) ,typeController.create)
router.get('/', typeController.getAll)

export default router