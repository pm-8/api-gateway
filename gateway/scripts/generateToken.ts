import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = jwt.sign(
    {
        userId: "1",
        role: "ADMIN",
        email: "admin@example.com"
    },
    process.env.JWT_SECRET!,
    {
        issuer: process.env.JWT_ISSUER!,
        expiresIn: "1h"
    }
);

console.log("\nGenerated JWT:\n");
console.log(token);