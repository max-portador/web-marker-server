import {IDeviceInfo, RequestCreateDevice, RequestDevices, RequestWithParams} from "../types";
import {NextFunction, Response as ResponseType} from "express";
import * as path from 'path'
import * as uuid from 'uuid'
import ApiError from "../error/ApiError";

const {Device, DeviceInfo} = require("../model/models");

class DeviceController{
    async create(req: RequestCreateDevice, res: ResponseType, next: NextFunction){
        try {
            let { name, price, brandId, typeId, info } = req.body

            // @ts-ignore
            const { img } = req.files
            const filename = uuid.v4() + '.jpg'

            // @ts-ignore
            img.mv(path.resolve(__dirname, '..', 'static', filename))
            const device = await Device.create({name, price, brandId, typeId, img: filename })

            if (info){
                    let parsedInfo = JSON.parse(info) as IDeviceInfo[]

                    parsedInfo.forEach(i => {
                        DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: device.id
                        })
                    })
            }

            res.json(device)
        }
        catch (e) {
            (e instanceof Error) && next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req: RequestDevices, res: ResponseType){
        let {typeId, brandId, limit, page} = req.query

        limit = limit || 9
        page = page || 1
        const offset = page * limit - limit

        let devices
        if (!typeId && !brandId) {
            devices = await Device.findAndCountAll({limit, offset})
        }

        if (typeId && !brandId) {
            devices = await Device.findAndCountAll({where: { typeId }, limit, offset } )
        }

        if (!typeId && brandId) {
            devices = await Device.findAndCountAll({where: { brandId }, limit, offset})
        }

        if (typeId && brandId) {
            devices = await Device.findAndCountAll({where: { typeId, brandId }, limit, offset})
        }


        return res.json(devices)
    }

    async getOneById(req: RequestWithParams, res: ResponseType){
        const {id} = req.params
        let device = { id }
        device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

export default new DeviceController()