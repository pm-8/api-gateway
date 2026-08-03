import { redisService } from "../../redis/redis.service";
import { BucketRepository } from "./BucketRepository";
import { RateLimitResult } from "../models/RateLimitResult";
import { TOKEN_BUCKET_SCRIPT } from "../lua/tokenBucket";
import { logger } from "../../logger";
export enum LuaResultIndex {
    ALLOWED = 0,
    REMAINING = 1,
    RETRY_AFTER = 2
}
export class RedisBucketRepository implements BucketRepository {
    private scriptSha: string | null = null;
    private async loadScript(){
        if(this.scriptSha) return;
        this.scriptSha = await redisService.client.scriptLoad(TOKEN_BUCKET_SCRIPT);
        logger.info("Loaded Lua script for Token Bucket", { sha: this.scriptSha });
    }
    //@ts-ignore
    async execute(
        key:string,
        capacity:number,
        refillRate:number,
        ttl:number
    ):Promise<RateLimitResult>{
        try {
            await this.loadScript();
            const rawResult = await redisService.client.evalSha(
                this.scriptSha!,
                {
                    keys:[key],
                    arguments:[
                        capacity.toString(),
                        refillRate.toString(),
                        (
                            Date.now()/1000
                        ).toString(),
                        ttl.toString()
                    ]
                }
            );
            const result = rawResult as number[];
            return {
                allowed:
                    result[
                        LuaResultIndex.ALLOWED
                    ] === 1,

                remaining:
                    result[
                        LuaResultIndex.REMAINING
                    ],

                retryAfter:
                    result[
                        LuaResultIndex.RETRY_AFTER
                    ]

            };
        }
        catch(error){

            logger.error(
                "Rate Limiter Redis Error",
                {
                    error
                }
            );

            throw error;

        }
    }
}