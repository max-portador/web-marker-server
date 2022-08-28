import {NextFunction, Request as RequestType, Response as ResponseType} from "express";
export default function (req: RequestType, res: ResponseType, next: NextFunction){
    if (req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).json({message: 'Пользователь нк авторизован'})
        }
    }
    catch (e) {
        res.status(401).json({message: 'Пользователь нк авторизован'})
    }
}