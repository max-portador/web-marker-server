import {Application} from "express";
import typeController from "../controllers/typeController";

const Router = require('express')
const router: Application = new Router()

router.post('/', typeController.create)
router.get('/', typeController.getAll)

export default router