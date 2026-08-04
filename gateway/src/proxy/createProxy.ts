import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";

export function createServiceProxy(target: string) {

    return createProxyMiddleware({

        target,

        changeOrigin: true,

        proxyTimeout: 5000,

        timeout: 5000,

        on: {

            proxyReq(proxyReq, req) {

                const request = req as Request;

                if (request.user) {

                    proxyReq.setHeader(
                        "X-User-Id",
                        request.user.userId
                    );

                    proxyReq.setHeader(
                        "X-User-Role",
                        request.user.role
                    );

                    proxyReq.setHeader(
                        "X-User-Email",
                        request.user.email
                    );

                }

                const requestId = request.header("X-Request-Id");

                if (requestId) {

                    proxyReq.setHeader(
                        "X-Request-Id",
                        requestId
                    );

                }

            },

            error(err, req, res) {

                const response = res as Response;

                console.error(err);

                if (!response.headersSent) {

                    response.writeHead(502, {
                        "Content-Type": "application/json"
                    });

                }

                response.end(
                    JSON.stringify({
                        success: false,
                        message: "Backend service unavailable"
                    })
                );

            }

        }

    });

}