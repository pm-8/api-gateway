import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Production API Gateway"
    });
});
export default app;