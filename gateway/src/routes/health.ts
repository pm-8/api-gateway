import {Router} from "express";
const router = Router();
router.get("/health",(_,res)=>{
    res.status(200).json({
        success: true,
        service: "api-gateway",
        status: "UP",
        timestamp: new Date().toISOString(),
    })
});
export default router;