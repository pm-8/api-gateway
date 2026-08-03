import { RateLimitAlgorithm } from "../algorithms/RateLimitAlgorithm";
import { RateLimitResult } from "../models/RateLimitResult";

export class RateLimiterService {

    constructor(
        private readonly algorithm: RateLimitAlgorithm
    ) {}

    async allow(key: string): Promise<RateLimitResult> {
        return this.algorithm.allow(key);
    }
}