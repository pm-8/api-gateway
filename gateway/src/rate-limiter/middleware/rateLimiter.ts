import { Request, Response, NextFunction } from "express";
// import { rateLimiterService } from ";
import {rateLimiterService} from "../services/index";
export async function rateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const clientIp =
            req.ip ||
            req.socket.remoteAddress ||
            "unknown";

        const key = `rate-limit:${clientIp}`;
        const result =
            await rateLimiterService.allow(key);
        res.setHeader(
            "X-RateLimit-Limit",
            "100"
        );

        res.setHeader(
            "X-RateLimit-Remaining",
            Math.floor(result.remaining)
        );

        if (!result.allowed) {

            res.setHeader(
                "Retry-After",
                result.retryAfter
            );

            return res.status(429).json({
                success: false,
                message: "Too Many Requests"
            });
        }

        next();

    } catch (error) {
        next(error);
    }
}