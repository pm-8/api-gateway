import dotenv from "dotenv";
import { config } from "./env";
dotenv.config();
export interface ServiceConfig{
    name:string;
    route:string;
    target:string;
}
export const services: ServiceConfig[] = [
    {
        name:"user-service",
        route: "/users",
        target: config.USER_SERVICE_URL,
    },
    {
        name:"product-service",
        route: "/products",
        target: config.PRODUCT_SERVICE_URL,
    },
];