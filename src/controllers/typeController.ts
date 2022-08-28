import {RequestCreateByName} from "../types";
import {Request as RequestType, Response as ResponseType} from "express";

import {Type} from '../model/models';


class TypeController{
    async create(req: RequestCreateByName, res: ResponseType){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req: RequestType, res: ResponseType){
        const types = await Type.findAll()
        return res.json(types)
    }
}


export default new TypeController()