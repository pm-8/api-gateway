import { redisClient } from "./client";
class RedisService{
    async connect(){
        if(!redisClient.isOpen){
            await redisClient.connect();
        }
    }
    async disconnect(){
        if(redisClient.isOpen){
            await redisClient.quit();
        }
    }
    async ping(){
        return redisClient.ping();
    }
    get client(){
        return redisClient;
    }
}
export const redisService = new RedisService();
