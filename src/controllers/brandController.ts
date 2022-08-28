import {RequestCreateByName} from "../types";
import {Request as RequestType, Response as ResponseType} from "express";
import {Brand} from "../model/models";

class BrandController {
    async create(req: RequestCreateByName, res: ResponseType){
        const {name} = req.body
        const type = await Brand.create({name})
        return res.json(type)
    }

    async getAll(req: RequestType, res: ResponseType){
        const brands = await Brand.findAll()
        return res.json(brands)
    }


}

export default new BrandController()