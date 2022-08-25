import {Request as RequestType} from "express";

export type RequestsWithParams<T> = RequestType<{}, {}, {}, T>
export type RequestUserCheck = RequestsWithParams<{id: number}>