
import { unstable_cache, revalidateTag } from "next/cache";

const DEFAULT_TTL = 3600 * 1000; // 1 hour in ms

export async function getCachedData<T>(key: string, fetchFn: () => Promise<T>, ttl: number = DEFAULT_TTL): Promise<T> {
    // If TTL is >= 10000, assume it was specified in milliseconds and convert to seconds.
    // Otherwise (e.g. 60, 30), assume it was already specified in seconds.
    const revalidateSeconds = ttl >= 10000 ? Math.round(ttl / 1000) : ttl;

    const cachedFn = unstable_cache(
        async () => fetchFn(),
        [key],
        {
            revalidate: revalidateSeconds,
            tags: [key]
        }
    );

    return cachedFn();
}

export async function invalidateCache(key: string): Promise<boolean> {
    try {
        revalidateTag(key);
        return true;
    } catch (error) {
        console.error(`[Cache] Invalidation failed for tag: ${key}`, error);
        return false;
    }
}
