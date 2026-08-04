import { beforeAll, beforeEach, afterAll, describe, expect, it } from "vitest";

import { redisService } from "../../src/redis/redis.service";
import { RedisBucketRepository } from "../../src/rate-limiter/repository/RedisBucketRepository";

describe("RedisBucketRepository", () => {

    const repository = new RedisBucketRepository();

    beforeAll(async () => {
        await redisService.connect();
    });

    beforeEach(async () => {
        await redisService.client.flushDb();
    });

    afterAll(async () => {
        await redisService.disconnect();
    });

    it("should create a bucket and consume one token", async () => {

        const result = await repository.execute(
            "rate-limit:test-user",
            5,
            1,
            60
        );

        expect(result.allowed).toBe(true);

        expect(result.remaining).toBe(4);

        expect(result.retryAfter).toBe(0);

        const bucket = await redisService.client.hGetAll(
            "rate-limit:test-user"
        );

        expect(bucket.tokens).toBeDefined();

        expect(bucket.lastRefill).toBeDefined();

    });

});