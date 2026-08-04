import { Request, Response, NextFunction } from "express";

import {
    activeRequests,
    httpRequestDuration,
    httpRequestsTotal
} from "./metrics";

export function prometheusMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    activeRequests.inc();

    const endTimer =
        httpRequestDuration.startTimer();

    res.on("finish", () => {

        activeRequests.dec();

        httpRequestsTotal.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode
        });

        endTimer({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode
        });

    });

    next();

}