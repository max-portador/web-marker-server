import {Application} from "express";
import brandController from "../controllers/brandController";

const Router = require('express')
const router: Application = new Router()

router.post('/', brandController.create)
router.get('/', brandController.getAll)

export default router