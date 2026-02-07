
// Helper to fetch data from our internal CMS APIs

export interface CMSNewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
}

export interface CMSNoticeItem {
    id: number;
    text: string;
    link: string;
    date: string;
    isImportant: boolean;
}

// Helper to get base URL (Relative for Client, Absolute for Server)
const getBaseUrl = () => {
    if (typeof window !== 'undefined') return ''; // Browser: use relative path
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    return 'http://localhost:3000'; // Server fallback
};

export async function getCMSNews(): Promise<CMSNewsItem[]> {
    try {
        const res = await fetch(`${getBaseUrl()}/api/admin/news`, { next: { revalidate: 10 } });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: unknown) {
        const err = error as { cause?: { code?: string } };
        if (err.cause?.code === 'ENOTFOUND' || err.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS News Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch news:", error instanceof Error ? error.message : 'Unknown error');
        }
        return [];
    }
}

export async function getCMSNotices(): Promise<CMSNoticeItem[]> {
    try {
        const res = await fetch(`${getBaseUrl()}/api/admin/notices`, { next: { revalidate: 10 } });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: unknown) {
        const err = error as { cause?: { code?: string } };
        if (err.cause?.code === 'ENOTFOUND' || err.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS Notices Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch notices:", error instanceof Error ? error.message : 'Unknown error');
        }
        return [];
    }
}

export interface CMSCareerItem {
    id: number;
    role: string;
    department?: string;
    type?: string;
    experience: string;
    description: string;
    isActive: boolean;
}

export async function getCMSCareers(): Promise<CMSCareerItem[]> {
    try {
        const res = await fetch(`${getBaseUrl()}/api/admin/careers`, { next: { revalidate: 10 } });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: unknown) {
        const err = error as { cause?: { code?: string } };
        if (err.cause?.code === 'ENOTFOUND' || err.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS Careers Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch careers:", error instanceof Error ? error.message : 'Unknown error');
        }
        return [];
    }
}


export interface CMSGalleryItem {
    id: number;
    imageId: string;
    category: string;
    alt: string;
}

export async function getCMSGallery(): Promise<CMSGalleryItem[]> {
    try {
        const res = await fetch(`${getBaseUrl()}/api/admin/gallery`, { next: { revalidate: 10 } });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: unknown) {
        const err = error as { cause?: { code?: string } };
        if (err.cause?.code === 'ENOTFOUND' || err.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS Gallery Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch gallery:", error instanceof Error ? error.message : 'Unknown error');
        }
        return [];
    }
}


