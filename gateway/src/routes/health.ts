import { redisService } from "../redis/redis.service";
import { Router } from "express";
const router = Router();
router.get("/health", async (_, res) => {
    let redisStatus = "DOWN";
    try {
        await redisService.ping();
        redisStatus = "UP";
    } catch {}
    res.json({
        success: true,
        service: "api-gateway",
        status: "UP",
        dependencies: {
            redis: redisStatus,
        },
        timestamp: new Date().toISOString(),

    });

});
export default router;