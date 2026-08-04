import {Request, Response, NextFunction} from "express";
import { timeStamp } from "node:console";
import { logger } from "../logger";
import { publishGatewayEvent } from "../kafka/publisher";
export function requestLogger(req:Request, res:Response, next:NextFunction){
    const start = Date.now();
    res.on("finish",async ()=>{
        const duration = Date.now() - start;
        logger.info("Incoming Request", {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration,
    });
    await publishGatewayEvent({

    requestId: req.requestId,

    userId: req.user?.userId,

    role: req.user?.role,

    method: req.method,

    path: req.originalUrl,

    status: res.statusCode,

    duration,

    ip: req.ip,

    userAgent: req.get("User-Agent"),

    timestamp: new Date().toISOString()

});
    });
    next();
}