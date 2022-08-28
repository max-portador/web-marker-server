import {Request as RequestType} from "express";

export type RequestsWithQuery<T> = RequestType<{}, {}, {}, T>
export type RequestWithQueryId = RequestsWithQuery<{id: number}>
export type RequestDevices = RequestsWithQuery<DeviceQuery>

export type RequestWithParams = RequestType<{id: number},{}, {}, {}>

export type RequestsWithBody<T> = RequestType<{}, {}, T, {}>
export type RequestCreateByName = RequestsWithBody<{name: string}>
export type RequestCreateUser = RequestsWithBody<UserBody>

export type RequestCreateDevice = RequestsWithBody<DeviceBody>

type DeviceQuery = {
    typeId?: number,
    brandId?: number,
    limit?: number,
    page?: number
}

type DeviceBody = {
    name: string,
    price: number
    brandId: number,
    typeId: number,
    info: string,
}

type UserBody = {
    email: string,
    password: string,
    role: string
}