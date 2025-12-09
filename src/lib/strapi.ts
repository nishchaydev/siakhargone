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
            // Log the error but don't crash the build if backend is down during build time (unless strictly required)
            // User requested: if (!res.ok) throw new Error(await res.text());
            // I will follow user request strictly.
            const errorText = await res.text();
            throw new Error(`Strapi Fetch Error (${res.status}): ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("FetchStrapi Error:", error);
        // Rethrow or return null depending on strictness. User seems strict about "STOP using mock data"
        throw error;
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

