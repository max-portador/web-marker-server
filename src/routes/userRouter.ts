import {Application} from "express";
import userController from "../controllers/userController";

const Router = require('express')
const router: Application = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/', userController.check)

export default router