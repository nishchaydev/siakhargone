// Cloudinary Metadata Interface
export interface CloudinaryMeta {
    width: number;
    height: number;
    format: string;
    resource_type: string;
    public_id: string;
    secure_url: string;
    created_at?: string;
    bytes?: number;
}

export interface StrapiImage {
    data: {
        attributes: {
            url: string;
            alternativeText?: string;
            width: number;
            height: number;
        };
    } | null;
}

export interface StrapiResponse<T> {
    data: {
        id: number;
        attributes: T;
    };
    meta: CloudinaryMeta;
}

export interface StrapiArrayResponse<T> {
    data: {
        id: number;
        attributes: T;
    }[];
    meta: CloudinaryMeta;
}

export interface CMSImage {
    id: number;
    imageUrl: string;
    meta: CloudinaryMeta;
}

export interface CMSGalleryImage {
    id: number;
    imageUrl: string;
    meta: CloudinaryMeta;
}

export interface ComponentStats {
    id: number;
    label: string;
    value: string;
}

export interface ComponentBentoTile {
    id: number;
    title: string;
    subtitle: string;
    media: StrapiImage;
}

// Content Types
export interface Homepage {
    heroTitle: string;
    heroSubtitleHindi: string;
    heroDescription: string;
    heroVideo: StrapiImage;
    stats: ComponentStats[];
    bentoTiles: ComponentBentoTile[];
}

export interface AboutPage {
    heading: string;
    description: string; // rich text
    mainImage: StrapiImage;
}

export interface VisionMission {
    vision: string;
    mission: string;
}

export interface Message {
    name: string;
    designation: string;
    photo: StrapiImage;
    messageText: string;
}

export interface AcademicStage {
    stageName: 'Pre-Primary' | 'Primary' | 'Secondary';
    description: string;
    image: StrapiImage;
}

export interface Album {
    albumName: string;
    description: string;
    coverPhoto: StrapiImage;
    photos: {
        data: {
            attributes: {
                url: string;
            };
        }[];
    };
}

export interface Certificate {
    title: string;
    pdfFile: {
        data: {
            attributes: {
                url: string;
            };
        };
    };
}

export interface DownloadItem {
    title: string;
    file: {
        data: {
            attributes: {
                url: string;
            };
        };
    };
}
