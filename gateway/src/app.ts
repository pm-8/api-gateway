import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { services } from "./config/service";
import { createServiceProxy } from "./proxy/createProxy";
import { requestIdMiddleware } from "./middleware/requestId";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import healthRouter from "./routes/health";
import { rateLimiter } from "./rate-limiter/middleware/rateLimiter";
import { register } from "./metrics/metrics";
import { prometheusMiddleware } from "./metrics/prometheusMiddleware";
import { authenticate } from "./auth/middleware/authenticate";
import { authorize } from "./auth/middleware/authorize";
const app = express();
app.set("trust proxy", true);
app.use(healthRouter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestIdMiddleware);
app.use(requestLogger);
app.use(prometheusMiddleware);
app.use(morgan("dev"));
app.use(rateLimiter);

services.forEach((service)=>{
    app.use(service.route,authenticate,createServiceProxy(service.target));
})
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Production API Gateway"
    });
});
app.get("/metrics", async (_, res) => {

    res.setHeader(
        "Content-Type",
        register.contentType
    );

    res.end(
        await register.metrics()
    );

});
app.use(errorHandler);
export default app;