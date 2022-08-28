import {Application} from "express";
import deviceController from "../controllers/deviceController";


const Router = require('express')
const router: Application = new Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOneById)

export default router