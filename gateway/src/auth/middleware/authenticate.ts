import { Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwt.service";

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader =
        req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {

        return res.status(401).json({
            success: false,
            message: "Missing Bearer Token"
        });

    }

    const token =
        authHeader.substring(7);

    try {

        req.user =
            jwtService.verify(token);

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

}