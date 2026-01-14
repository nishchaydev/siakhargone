
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
        const res = await fetch("/api/admin/news", { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}

export async function getCMSNotices(): Promise<CMSNoticeItem[]> {
    try {
        const res = await fetch("/api/admin/notices", { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Failed to fetch notices:", error);
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
        const res = await fetch("/api/admin/careers", { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Failed to fetch careers:", error);
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
        const res = await fetch("/api/admin/gallery", { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Failed to fetch gallery:", error);
        return [];
    }
}
