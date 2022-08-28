import {NextFunction, Request as RequestType, Response as ResponseType} from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {IUser, RequestCreateUser, RequestWithQueryId} from "../types";
import ApiError from "../error/ApiError";
import {User, Basket} from '../model/models'

const generateJwt = (id: number, email: string, role: string) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY!,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req: RequestCreateUser, res: ResponseType, next: NextFunction) {
        const {email, password, role} = req.body
        if (!email || !password) {
            //@ts-ignore
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate){
            //@ts-ignore
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({email, role, password: hashPassword}) as unknown as IUser
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, email, role)

        res.json({token})
    };

    async login(req: RequestCreateUser, res: ResponseType, next: NextFunction) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}}) as unknown as IUser
        if (!user){
            return next(ApiError.internal('Пользователь с таким аккаунтом не найден'))
        }

        let isValid = bcrypt.compareSync(password, user.password)
        if (!isValid){
            return next(ApiError.internal('Указан неправильный пароль, проверьте CapsLock и язык ввода'))
        }

        const token = generateJwt(user.id, email, user.role)

        res.json({token})
    };

    async check(req: RequestWithQueryId, res: ResponseType, next: NextFunction) {
            const {id} = req.query
            if (!id){
                return next(ApiError.badRequest('Не передан querry-параметр id'))
            }

            res.json({id})
    };
}

export default new UserController()

