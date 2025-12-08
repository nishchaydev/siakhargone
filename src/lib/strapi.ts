export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchStrapi(endpoint: string, cacheConfig?: RequestCache) {
    try {
        const res = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*`, {
            cache: cacheConfig || "no-store",
        });

        if (!res.ok) {
            console.error(`Error fetching Strapi data for ${endpoint}:`, res.status, res.statusText);
            return null;
        }

        const json = await res.json();
        return json;
    } catch (error) {
        console.error(`Network error fetching Strapi data for ${endpoint}:`, error);
        return null;
    }
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }
    return `${STRAPI_URL}${url}`;
}
