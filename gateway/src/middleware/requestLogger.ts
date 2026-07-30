import {Request, Response, NextFunction} from "express";
import { timeStamp } from "node:console";
import { logger } from "../logger";
export function requestLogger(req:Request, res:Response, next:NextFunction){
    const start = Date.now();
    res.on("finish",()=>{
        const duration = Date.now() - start;
        logger.info("Incoming Request", {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration,
    });
    });
    next();
}