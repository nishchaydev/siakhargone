import {
    academicStages,
    albums,
    certificates,
    downloads,
    committeeContent,
    committeeDocuments,
    messages,
    aboutData,
    homeFacilities
} from './static-data';

// Stub for compatibility if anything imports it
export async function readDocxAsText(relPath: string): Promise<string | null> {
    return null;
}

export function listFolders(relDir: string) {
    return [];
}

export function listFiles(relDir: string, exts?: string[], recursive?: boolean) {
    return [];
}

// Rewritten accessors
export async function loadAcademicStages() {
    return academicStages;
}

export async function loadAlbums() {
    return albums;
}

export function loadCertificates() {
    return certificates;
}

export function loadDownloads() {
    return downloads;
}

export async function loadCommittee() {
    return { content: committeeContent, documents: committeeDocuments };
}

export async function loadAboutData() {
    return aboutData;
}

export async function loadMessage(folderName: string) {
    const key = folderName as keyof typeof messages;
    return messages[key] || {
        message: "Message not found.",
        image: null,
        name: "Name Not Found",
        role: "Role Not Found"
    };
}

export async function loadHomeFacilities() {
    return homeFacilities;
}

