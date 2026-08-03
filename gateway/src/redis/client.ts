import {createClient} from "redis";
import {config} from "../config/env";
import { logger } from "../logger";

export const redisClient = createClient({
    url: config.REDIS_URL,
});

redisClient.on("connect",() => {
    logger.info("Establishing connection with Redis!!");
});
redisClient.on("ready",()=>{
    logger.info("Connected to the redis!");
});
redisClient.on("reconnecting",()=>{
    logger.warn("Reconnecting to Redis");
})
redisClient.on("error",(err)=>{
    logger.error("Redis Error",{
        error: err.message,
    });
});
redisClient.on("end",()=>{
    logger.warn("Redis Connection Closed!");
});