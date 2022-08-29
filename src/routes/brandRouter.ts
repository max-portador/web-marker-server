import {Application} from "express";
import brandController from "../controllers/brandController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";
import {ROLES} from "../types";

const Router = require('express')
const router: Application = new Router()

router.post('/', checkRoleMiddleware(ROLES.ADMIN) ,brandController.create)
router.get('/', brandController.getAll)

export default router