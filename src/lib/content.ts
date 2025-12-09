import fs from 'fs/promises';
import path from 'path';
import mammoth from 'mammoth';

// Base path for reading content (server-side)
const CONTENT_DIR = path.join(process.cwd(), 'siakhargone-content');

// Helper to get public URL for images/files
function getPublicUrl(filePath: string) {
    // Normalize path separators to forward slashes for URLs
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

export async function getImagesFromFolder(subDir: string): Promise<string[]> {
    try {
        const dirPath = path.join(CONTENT_DIR, subDir);
        // Check if dir exists first
        try {
            await fs.access(dirPath);
        } catch {
            return [];
        }

        const files = await fs.readdir(dirPath);
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

        return imageFiles.map(file => getPublicUrl(path.join(dirPath, file)));
    } catch (error) {
        console.error(`Error reading images from ${subDir}:`, error);
        return [];
    }
}

export async function getPdfFiles(subDir: string): Promise<{ title: string; url: string }[]> {
    try {
        const dirPath = path.join(CONTENT_DIR, subDir);
        // Check if dir exists first
        try {
            await fs.access(dirPath);
        } catch {
            return [];
        }

        const files = await fs.readdir(dirPath);
        // Recursively check subfolders if needed? User said /certificates/*/*.pdf 
        // Let's implement simple recursive or specific logic based on folder structure.
        // For now, let's just read flat if possible, or handle one level depth.

        // User said: /certificates/*/*.pdf OR /certificates/*.pdf
        // Let's get all PDFs in top level and one level down.

        const entries = await fs.readdir(dirPath, { withFileTypes: true });

        let pdfs: { title: string; url: string }[] = [];

        for (const entry of entries) {
            if (entry.isFile() && entry.name.endsWith('.pdf')) {
                pdfs.push({
                    title: entry.name.replace('.pdf', ''),
                    url: getPublicUrl(path.join(dirPath, entry.name))
                });
            } else if (entry.isDirectory()) {
                // Check subfolder
                const subFiles = await fs.readdir(path.join(dirPath, entry.name));
                const subPdfs = subFiles.filter(f => f.endsWith('.pdf'));
                subPdfs.forEach(f => {
                    pdfs.push({
                        title: f.replace('.pdf', ''), // Or use folder name as category?
                        url: getPublicUrl(path.join(dirPath, entry.name, f))
                    });
                });
            }
        }
        return pdfs;
    } catch (error) {
        console.error(`Error reading PDFs from ${subDir}:`, error);
        return [];
    }
}

// Helper to read simple text file
export async function getTextFile(subDir: string, filename: string): Promise<string> {
    try {
        const filePath = path.join(CONTENT_DIR, subDir, filename);
        return await fs.readFile(filePath, 'utf-8');
    } catch {
        return "";
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

// Special case for Academic Stages where each folder is a stage
export async function getAcademicStages() {
    const dirPath = path.join(CONTENT_DIR, 'academic-stages');
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        const stages = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                // Read text from docx inside
                const stagePath = path.join('academic-stages', entry.name);
                const description = await getTextFromDocx(stagePath);

                // Get images
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

// Special case for Album folders
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
                            id: img, // use url as id
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
