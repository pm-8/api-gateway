import {describe, it, expect, vi} from "vitest";
import {TokenBucket} from "../../src/rate-limiter/algorithms/TokenBucket"
import { BucketRepository } from "../../src/rate-limiter/repository/BucketRepository";
import { RateLimitResult } from "../../src/rate-limiter/models/RateLimitResult";
import { RATE_LIMIT } from "../../src/rate-limiter/config";
describe("TokenBucket",()=>{
    it("should call repository with configured rate limit values", async () => {

        const expected: RateLimitResult = {
            allowed: true,
            remaining: 42,
            retryAfter: 0
        };

        const repository: BucketRepository = {
            execute: vi.fn().mockResolvedValue(expected)
        };

        const bucket = new TokenBucket(repository);

        const result = await bucket.allow("rate-limit:test-user");

        expect(repository.execute).toHaveBeenCalledOnce();

        expect(repository.execute).toHaveBeenCalledWith(
            "rate-limit:test-user",
            RATE_LIMIT.capacity,
            RATE_LIMIT.refillRate,
            RATE_LIMIT.ttlSeconds
        );

        expect(result).toEqual(expected);
    });
})
