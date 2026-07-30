import { createProxyMiddleware } from "http-proxy-middleware";
import {Request, Response, NextFunction} from "express";
export function createServiceProxy(target: string) {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        // logger:console,
        proxyTimeout:5000,
        timeout:5000,
        on:{
            error(err,req,res){
                const response = res as Response;
                console.error(err);
                if(!response.headersSent){
                    response.writeHead(502,{
                        "Content-Type":"application/json",
                    });
                }
                response.end(
                    JSON.stringify({
                        success:false,
                        message:"Backend service unavailable",
                    })
                )
            }
        }
    });
}