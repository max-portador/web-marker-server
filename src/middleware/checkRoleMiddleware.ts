import {NextFunction, Request as RequestType, Response as ResponseType} from "express";
import * as jwt from 'jsonwebtoken'
import {JwtPayload, ROLES} from "../types";



export default function(role: ROLES){
    return function (req: RequestType, res: ResponseType, next: NextFunction){
        if (req.method === 'OPTIONS'){
            next()
        }
        try{
            const token = req?.headers?.authorization!.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: 'Пользователь нe авторизован'})
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
            if (decoded.role !== role){
                return res.status(403).json({message: 'Нет доступа'})
            }
            //@ts-ignore
            req['user'] = decoded
            next()
        }
        catch (e) {
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }
}