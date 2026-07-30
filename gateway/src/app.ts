import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
// import {productProxy, userProxy} from "./proxy/proxy";
import { services } from "./config/service";
import { createServiceProxy } from "./proxy/createProxy";
import { requestIdMiddleware } from "./middleware/requestId";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import healthRouter from "./routes/health";
const app = express();
app.use(healthRouter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestIdMiddleware);
app.use(requestLogger);
app.use(morgan("dev"));
services.forEach((service)=>{
    app.use(service.route,createServiceProxy(service.target));
})
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Production API Gateway"
    });
});
app.use(errorHandler);
export default app;