import fs from 'fs/promises';
import path from 'path';
import mammoth from 'mammoth';

const CONTENT_DIR = path.join(process.cwd(), 'siakhargone-content');

function getPublicUrl(filePath: string) {
    const relativePath = path.relative(CONTENT_DIR, filePath).split(path.sep).join('/');
    return `/siakhargone-content/${relativePath}`;
}

export async function getTextFromDocx(subDir: string): Promise<string> {
    try {
        const dirPath = path.join(CONTENT_DIR, subDir);
        const files = await fs.readdir(dirPath);
        const docxFile = files.find(f => f.endsWith('.docx'));

        if (!docxFile) return "";

        const buffer = await fs.readFile(path.join(dirPath, docxFile));
        const result = await mammoth.convertToHtml({ buffer });
        return result.value;
    } catch (error) {
        console.error(`Error reading docx from ${subDir}:`, error);
        return "";
    }
}

export async function getTextFile(subDir: string, filename: string): Promise<string> {
    try {
        const filePath = path.join(CONTENT_DIR, subDir, filename);
        return await fs.readFile(filePath, 'utf-8');
    } catch {
        return "";
    }
}

export async function getImagesFromFolder(subDir: string): Promise<string[]> {
    try {
        const dirPath = path.join(CONTENT_DIR, subDir);
        try { await fs.access(dirPath); } catch { return []; }

        const files = await fs.readdir(dirPath);
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

        return imageFiles.map(file => getPublicUrl(path.join(dirPath, file)));
    } catch (error) {
        console.error(`Error reading images from ${subDir}:`, error);
        return [];
    }
}

export async function getAboutPageData() {
    const aboutText = await getTextFromDocx('about');
    const images = await getImagesFromFolder('about');
    const schoolImage = images.length > 0 ? { src: images[0], alt: "School Image" } : null;

    return {
        mainDescription: aboutText,
        schoolImage
    };
}

export async function getMessageData(folder: string) {
    const message = await getTextFromDocx(folder);
    const images = await getImagesFromFolder(folder);
    const name = await getTextFile(folder, 'name.txt');
    const role = await getTextFile(folder, 'role.txt');

    return {
        name: name.trim() || "Name Not Found",
        role: role.trim() || "Role Not Found",
        message,
        image: images.length > 0 ? images[0] : null
    };
}

export async function getAcademicStages() {
    const dirPath = path.join(CONTENT_DIR, 'academic-stages');
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        const stages = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const stagePath = path.join('academic-stages', entry.name);
                const description = await getTextFromDocx(stagePath);
                const images = await getImagesFromFolder(stagePath);

                stages.push({
                    title: entry.name,
                    description,
                    images
                });
            }
        }
        return stages;
    } catch (e) {
        console.error("Error reading academic stages:", e);
        return [];
    }
}

export async function getAlbums() {
    const dirPath = path.join(CONTENT_DIR, 'albums');
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        const albums = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const albumPath = path.join('albums', entry.name);
                const images = await getImagesFromFolder(albumPath);
                if (images.length > 0) {
                    albums.push({
                        title: entry.name,
                        coverImage: images[0],
                        images: images.map(img => ({
                            id: img,
                            imageUrl: img,
                            description: entry.name
                        }))
                    });
                }
            }
        }
        return albums;
    } catch (e) {
        console.error("Error reading albums", e);
        return [];
    }
}

export async function getCertificates() {
    const dirPath = path.join(CONTENT_DIR, 'certificates');
    try {
        try { await fs.access(dirPath); } catch { return []; }
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        const certificates = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const fullSubPath = path.join(dirPath, entry.name);
                const subFiles = await fs.readdir(fullSubPath);
                const pdfFile = subFiles.find(f => f.toLowerCase().endsWith('.pdf'));
                if (pdfFile) {
                    certificates.push({
                        title: entry.name,
                        pdfUrl: getPublicUrl(path.join(fullSubPath, pdfFile))
                    });
                }
            }
        }
        return certificates;
    } catch (e) { return []; }
}

export async function getDownloads() {
    const dirPath = path.join(CONTENT_DIR, 'downloads');
    try {
        try { await fs.access(dirPath); } catch { return []; }
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        const downloads = [];

        for (const entry of entries) {
            if (entry.isDirectory()) { // Assuming downloads are in folders or strict check? 
                // User prompt: "siakhargone-content/downloads/*" -> file or folder?
                // Let's assume files directly OR folders. 
                // If entry is file:
                // Wait, `withFileTypes: true` -> entry.isFile()
                // But previously I assumed folders. Let's support both properly.

                // If it is a folder, look inside.
                const subPath = path.join(dirPath, entry.name);
                const subFiles = await fs.readdir(subPath);
                const mainFile = subFiles.find(f => /\.(pdf|docx|jpg|png|jpeg)$/i.test(f));

                let title = entry.name;
                // check for title.txt
                const titleFile = subFiles.find(f => f === 'title.txt');
                if (titleFile) {
                    title = await fs.readFile(path.join(subPath, 'title.txt'), 'utf-8');
                }

                if (mainFile) {
                    downloads.push({
                        title: title.trim(),
                        fileUrl: getPublicUrl(path.join(subPath, mainFile))
                    });
                }
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (['.pdf', '.docx', '.jpg', '.png', '.jpeg'].includes(ext)) {
                    downloads.push({
                        title: entry.name.replace(ext, '').replace(/-/g, ' '),
                        fileUrl: getPublicUrl(path.join(dirPath, entry.name))
                    });
                }
            }
        }
        return downloads;
    } catch (e) { return []; }
}

export async function getCommitteeData() {
    const dirPath = path.join(CONTENT_DIR, 'School Managing committee');
    try {
        try { await fs.access(dirPath); } catch { return { content: "", documents: [] }; }

        const files = await fs.readdir(dirPath);
        const docxFile = files.find(f => f.endsWith('.docx'));

        let content = "";
        if (docxFile) {
            const buffer = await fs.readFile(path.join(dirPath, docxFile));
            const result = await mammoth.convertToHtml({ buffer });
            content = result.value;
        }

        const pdfs = files.filter(f => f.endsWith('.pdf')).map(f => ({
            title: f.replace('.pdf', ''),
            url: getPublicUrl(path.join(dirPath, f))
        }));

        return { content, documents: pdfs };
    } catch (e) { return { content: "", documents: [] }; }
}
