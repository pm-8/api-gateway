import dotenv from "dotenv";
import {z} from "zod";
dotenv.config();
const envSchema = z.object({
    NODE_ENV: z.enum(["development","production","test"]),
    PORT: z.coerce.number().int().positive(),
    USER_SERVICE_URL : z.string().url(),
    PRODUCT_SERVICE_URL: z.string().url(),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string(),
    KAFKA_BROKERS: z.string(),
    JWT_SECRET: z.string().min(32,"JWT_SECRET should be at least 32 characters"),
    JWT_EXPIRES_IN: z.string(),
    JWT_ISSUER: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
});
const parsed = envSchema.safeParse(process.env);
if(!parsed.success){
    console.error("Invalid environment configuration");
    console.table(parsed.error.flatten().fieldErrors);
    process.exit(1);
}
export const config = parsed.data;