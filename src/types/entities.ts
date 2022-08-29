import {ROLES} from "./roles";

export interface IDeviceInfo {
    title: string,
    description: string
}

export interface IUser {
    id: number,
    password: string,
    email: string,
    role: string
}

export interface JwtPayload {
    email: string,
    password: string,
    role: ROLES,
    id: number
}