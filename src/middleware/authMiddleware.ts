import {NextFunction, Request as RequestType, Response as ResponseType} from "express";
import * as jwt from 'jsonwebtoken'


export default function (req: RequestType, res: ResponseType, next: NextFunction){
    if (req.method === 'OPTIONS'){
        next()
    }
    try{
        const authHeader = req?.headers?.authorization
        if (!authHeader){
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const token = authHeader!.split(' ')[1]
        if (!token) {
            res.status(401).json({message: 'Пользователь нe авторизован'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        //@ts-ignore
        req['user'] = decoded
        next()
    }
    catch (e) {
        res.status(401).json({message: 'Пользователь нк авторизован'})
    }
}