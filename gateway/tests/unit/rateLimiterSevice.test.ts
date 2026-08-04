import {describe, it, expect, vi} from "vitest";
// import {rateLimiterService} from "../../src/rate-limiter/services/index";
import {RateLimiterService} from "../../src/rate-limiter/services/RateLimitService";
import {RateLimitAlgorithm} from "../../src/rate-limiter/algorithms/RateLimitAlgorithm";
import {RateLimitResult} from "../../src/rate-limiter/models/RateLimitResult";
describe("RateLimiterService", () => {
    it("should delegate request to the configured algorithm", async ()=>{
        const expected: RateLimitResult = {
            allowed: true,
            remaining: 99,
            retryAfter: 0
        };
        const algorithm : RateLimitAlgorithm = {
            allow: vi.fn().mockResolvedValue(expected)
        };
        const service = new RateLimiterService(algorithm);
        const result = await service.allow("rate-limit:127.0.0.1");
        expect(algorithm.allow).toHaveBeenCalledOnce();
        expect(algorithm.allow).toHaveBeenCalledWith(
            "rate-limit:127.0.0.1"
        );
        expect(result).toEqual(expected);
    })
})