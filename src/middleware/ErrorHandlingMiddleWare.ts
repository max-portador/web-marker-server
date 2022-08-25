import {Request as RequestType, Response as ResponseType} from "express";
import ApiError from "../error/ApiError";

export default function (err: any, req: RequestType, res: ResponseType){
    if (err instanceof ApiError) {
       return res.status(err.status).json({message: err.message})
    }

    return err.status(500).json({message: 'Непредвиденная ошибка'})
}