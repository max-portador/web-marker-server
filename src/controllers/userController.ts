import {NextFunction, Request as RequestType, Response as ResponseType} from "express";
import {RequestUserCheck} from "../types";
import ApiError from "../error/ApiError";

class UserController {
    async registration(req: RequestType, res: ResponseType) {

    };

    async login(req: RequestType, res: ResponseType) {

    };

    async check(req: RequestUserCheck, res: ResponseType, next: NextFunction) {
            const {id} = req.query
            if (!id){
                return next(ApiError.badRequest('Не передан querry-параметр id'))
            }

            res.json({id})
    };
}

export default new UserController()