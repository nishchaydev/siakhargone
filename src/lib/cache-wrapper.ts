
interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

const cache: Record<string, CacheEntry<any>> = {};
const DEFAULT_TTL = 3600 * 1000; // 1 hour

export async function getCachedData<T>(key: string, fetchFn: () => Promise<T>, ttl: number = DEFAULT_TTL): Promise<T> {
    const now = Date.now();
    const cached = cache[key];

    if (cached && cached.expiresAt > now) {
        console.log(`[Cache] HIT for ${key}`);
        return cached.data;
    }

    console.log(`[Cache] MISS for ${key}`);
    try {
        const data = await fetchFn();
        cache[key] = { data, expiresAt: now + ttl };
        return data;
    } catch (error) {
        console.error(`[Cache] Fetch failed for ${key}`, error);
        if (cached) {
            console.warn(`[Cache] Returning Stale Data for ${key}`);
            return cached.data; // Return stale if possible
        }
        throw error; // Propagate error if no cache
    }
}
