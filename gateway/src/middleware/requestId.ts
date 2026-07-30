import {Request, Response, NextFunction} from "express";
import {v4 as uuid} from "uuid";
declare global{
    namespace Express{
        interface Request{
            requestId:string;
        }
    }
}
export function requestIdMiddleware(req:Request, res:Response, next:NextFunction){
    const id = uuid();
    req.requestId = id;
    res.setHeader("X-Request-Id",id);
    next();
}