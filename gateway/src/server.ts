import dotenv from "dotenv";
import {config} from "./config/env"
dotenv.config();
import app from "./app";
import { logger } from "./logger";
import { redisService } from "./redis/redis.service";
import { connectKafka } from "./kafka/kafka.service";
const PORT = config.PORT;
async function start(){
    try{
        await redisService.connect();
        await connectKafka();
        app.listen(PORT, ()=>{
        logger.info(`Gateway running on port ${PORT}`);
    });
    }
    catch(error){
        logger.error("Failed to start the gateway",{
            error,
        });
        process.exit(1);
    }
}
start();
process.on("SIGINT", async () => {

    logger.info("Shutting down...");

    await redisService.disconnect();

    process.exit(0);

});

process.on("SIGTERM", async () => {

    logger.info("Shutting down...");

    await redisService.disconnect();

    process.exit(0);

});
// const PORT = process.env.PORT || 3000;
