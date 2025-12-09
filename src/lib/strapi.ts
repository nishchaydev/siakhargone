export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchStrapi(path: string, params = "") {
    const url = `${STRAPI_URL}/api/${path}${params ? `?${params}` : ""}`;

    console.log(`fetching strapi: ${url}`);
    try {
        const res = await fetch(url, {
            cache: "no-store", // Force dynamic for now as requested
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Strapi Fetch Error (${res.status}): ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("FetchStrapi Error:", error);
        throw error;
    }
}

export async function fetchStrapiSafe(path: string, params = "") {
    try {
        return await fetchStrapi(path, params);
    } catch (error) {
        console.warn(`[SafeFetch] Failed to fetch ${path}, returning null.`, error);
        return null; // Return null instead of crashing
    }
}

export function getStrapiMedia(url: string | null | undefined) {
    if (!url) return null;

    // Return full URL if it's already an external link
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    // Otherwise prepend Strapi URL
    // Handle case where url might not start with /
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${STRAPI_URL}${cleanUrl}`;
}
