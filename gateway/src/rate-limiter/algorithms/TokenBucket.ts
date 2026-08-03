// TokenBucket.ts
import { RateLimitResult } from "../models/RateLimitResult";
import { BucketRepository } from "../repository/BucketRepository";
import { RateLimitAlgorithm } from "./RateLimitAlgorithm";
import { RATE_LIMIT } from "../config"; // Import config

export class TokenBucket implements RateLimitAlgorithm {
    constructor(private repository: BucketRepository) {}

    async allow(key: string): Promise<RateLimitResult> {
        // Execute the repository with values from your config
        return this.repository.execute(
            key,
            RATE_LIMIT.capacity,
            RATE_LIMIT.refillRate,
            RATE_LIMIT.ttlSeconds
        );
    }
}