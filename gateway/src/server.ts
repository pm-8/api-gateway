import dotenv from "dotenv";
import {config} from "./config/env"
dotenv.config();
import app from "./app";
import { logger } from "./logger";
// const PORT = process.env.PORT || 3000;
const PORT = config.PORT;
app.listen(PORT, ()=>{
    logger.info(`Gateway running on port ${PORT}`);
})