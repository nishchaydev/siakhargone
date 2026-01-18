
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

export async function getCMSNews(): Promise<CMSNewsItem[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/news`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: any) {
        if (error.cause?.code === 'ENOTFOUND' || error.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS News Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch news:", error);
        }
        return [];
    }
}

export async function getCMSNotices(): Promise<CMSNoticeItem[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/notices`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: any) {
        if (error.cause?.code === 'ENOTFOUND' || error.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS Notices Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch notices:", error);
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/careers`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: any) {
        if (error.cause?.code === 'ENOTFOUND' || error.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS Careers Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch careers:", error);
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/gallery`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: any) {
        if (error.cause?.code === 'ENOTFOUND' || error.cause?.code === 'ECONNREFUSED') {
            console.warn("⚠️ CMS Gallery Fetch Failed: Network Error (Offline?)");
        } else {
            console.error("Failed to fetch gallery:", error);
        }
        return [];
    }
}

export interface SiteAsset {
    id: string;
    section: string;
    key: string;
    imageUrl: string;
    altText: string;
}

export async function getSiteAssets(): Promise<SiteAsset[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/site-assets`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: any) {
        console.warn("⚠️ Site Assets Fetch Failed:", error.message);
        return [];
    }
}

export interface CMSAchiever {
    id: string;
    name: string;
    class: string;
    achievement: string;
    category: string;
    imageUrl: string;
    priority: number;
}

export async function getCMSAchievers(): Promise<CMSAchiever[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/achievers`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error: any) {
        console.warn("⚠️ CMS Achievers Fetch Failed:", error.message);
        return [];
    }
}
