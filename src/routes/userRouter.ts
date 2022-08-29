import {Application} from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const Router = require('express')
const router: Application = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router