import { RateLimitResult } from "../models/RateLimitResult";

export interface BucketRepository {
    execute(
        key: string,
        capacity: number,
        refillRate: number,
        ttl: number
    ): Promise<RateLimitResult>;

}