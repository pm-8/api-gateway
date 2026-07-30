import {Request, Response, NextFunction} from "express";
import { logger } from "../logger";
export function errorHandler(err : Error, req: Request, res: Response, next : NextFunction){
    // logger.error(err);
    logger.error("Proxy Failure",{
        error : err.message
    })
    res.status(500).json({
        success:false,
        requestId : req.requestId,
        message: "Internal Server Error",
    });
}