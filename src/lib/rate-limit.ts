
interface RateLimitConfig {
    uniqueTokenPerInterval: number; // Max unique users per interval
    interval: number; // Interval in ms
}

// NOTE: This is an in-memory rate limiter. 
// In a serverless environment (like Vercel), this is "best-effort" per instance.
// It will not share state across multiple lambdas/regions.
// For strict global limiting, use Redis (Upstash/KV).
export class RateLimiter {
    private config: RateLimitConfig;
    private tokens: Map<string, number[]>;

    constructor(config: RateLimitConfig) {
        this.config = config;
        this.tokens = new Map();
    }

    check(limit: number, token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const now = Date.now();
            const windowStart = now - this.config.interval;

            const timestamps = this.tokens.get(token) || [];
            const validTimestamps = timestamps.filter((timestamp) => timestamp > windowStart);

            if (validTimestamps.length >= limit) {
                return reject();
            }

            validTimestamps.push(now);
            this.tokens.set(token, validTimestamps);

            // Cleanup map if too large (simple LRU-like safety)
            if (this.tokens.size > this.config.uniqueTokenPerInterval) {
                // delete first key found - rough cleanup
                const firstKey = this.tokens.keys().next().value;
                if (firstKey) this.tokens.delete(firstKey);
            }

            resolve();
        });
    }
}

// Global instance (singleton-like for serverless re-use where possible)
export const limiter = new RateLimiter({
    uniqueTokenPerInterval: 500,
    interval: 60000, // 1 minute
});
