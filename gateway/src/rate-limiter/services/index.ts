// services/index.ts (or at the bottom of RateLimitService.ts)
import { RedisBucketRepository } from "../repository/RedisBucketRepository";
import { TokenBucket } from "../algorithms/TokenBucket";
import { RateLimiterService } from "./RateLimitService";

// 1. Instantiate the repository
const redisRepository = new RedisBucketRepository();

// 2. Instantiate the algorithm, injecting the repository
const tokenBucketAlgorithm = new TokenBucket(redisRepository);

// 3. Instantiate the service, injecting the algorithm
export const rateLimiterService = new RateLimiterService(tokenBucketAlgorithm);