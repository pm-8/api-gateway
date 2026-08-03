import { RateLimitResult } from "../models/RateLimitResult";
export interface RateLimitAlgorithm{
    allow(key:string) : Promise<RateLimitResult>;
}