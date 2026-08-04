import jwt from "jsonwebtoken";
import { config } from "../../config/env";
export interface JwtPayload {
    userId: string;
    role: string;
    email: string;
}
class JwtService {
    verify(token: string): JwtPayload {
        return jwt.verify(
            token,
            config.JWT_SECRET,
            {
                issuer: config.JWT_ISSUER
            }
        ) as JwtPayload;

    }
}
export const jwtService = new JwtService();