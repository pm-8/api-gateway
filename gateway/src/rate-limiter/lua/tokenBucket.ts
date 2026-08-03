export const TOKEN_BUCKET_SCRIPT = `
-- ==========================================================
-- Token Bucket Rate Limiter
--
-- KEYS[1] : Bucket key
--
-- ARGV[1] : Capacity
-- ARGV[2] : Refill rate (tokens/second)
-- ARGV[3] : Current timestamp (seconds)
-- ARGV[4] : TTL (seconds)
-- ==========================================================

local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local ttl = tonumber(ARGV[4])

--------------------------------------------------------------
-- Read bucket
--------------------------------------------------------------

local bucket = redis.call("HMGET", key, "tokens", "lastRefill")

local tokens = tonumber(bucket[1])
local lastRefill = tonumber(bucket[2])

--------------------------------------------------------------
-- First request
--------------------------------------------------------------

if not tokens or not lastRefill then

    tokens = capacity
    lastRefill = now

end

--------------------------------------------------------------
-- Refill tokens
--------------------------------------------------------------

local elapsed = now - lastRefill

if elapsed > 0 then

    tokens = math.min(
        capacity,
        tokens + (elapsed * refillRate)
    )

end

--------------------------------------------------------------
-- Consume one token
--------------------------------------------------------------

if tokens >= 1 then

    tokens = tokens - 1

    redis.call(
        "HSET",
        key,
        "tokens",
        tokens,
        "lastRefill",
        now
    )

    redis.call(
        "EXPIRE",
        key,
        ttl
    )

    return {
        1,
        tokens,
        0
    }

end

--------------------------------------------------------------
-- Not enough tokens
--------------------------------------------------------------

local retryAfter = math.ceil(
    (1 - tokens) / refillRate
)
return {
    0,
    tokens,
    retryAfter
}
`;