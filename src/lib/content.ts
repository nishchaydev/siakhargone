import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const ROOT = process.cwd();
const PUBLIC_BASE = '/siakhargone-content';

// safe helpers
function safeJoin(...parts: string[]) {
    return path.join(...parts);
}

export async function readDocxAsText(relPath: string): Promise<string | null> {
    try {
        const full = safeJoin(ROOT, relPath);
        if (!fs.existsSync(full)) return null;
        const buffer = fs.readFileSync(full);
        const result = await mammoth.convertToHtml({ buffer });
        return (result && result.value) ? String(result.value).trim() : null;
    } catch (e) {
        console.error('readDocxAsText error', relPath, e);
        return null;
    }
}

export function listFolders(relDir: string) {
    const dir = safeJoin(ROOT, relDir);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);
}

// Recursive list files helper
function listFilesRecursive(dir: string, exts: string[], fileList: any[] = [], originalBase: string) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            listFilesRecursive(fullPath, exts, fileList, originalBase);
        } else {
            if (exts.includes(path.extname(file.name).toLowerCase())) {
                // Calculate relative path from ROOT to create public URL
                const relativeToRoot = path.relative(path.join(ROOT, 'siakhargone-content'), fullPath);
                // Windows fix
                const urlPath = relativeToRoot.replace(/\\/g, '/');

                fileList.push({
                    name: file.name,
                    url: `${PUBLIC_BASE}/${urlPath}`
                });
            }
        }
    }
    return fileList;
}

export function listFiles(relDir: string, exts = ['.jpg', '.jpeg', '.png', '.pdf', '.docx'], recursive = false) {
    const dir = safeJoin(ROOT, relDir);
    if (!fs.existsSync(dir)) return [];

    if (recursive) {
        return listFilesRecursive(dir, exts, [], relDir);
    }

    return fs.readdirSync(dir)
        .filter(f => exts.includes(path.extname(f).toLowerCase()))
        .map(f => ({
            name: f,
            url: `${PUBLIC_BASE}/${path.posix.join(relDir.replace('siakhargone-content', '').replace(/\\/g, '/'), f).replace(/^\//, '')}`
        }));
}

// helpers for common structures
export async function loadAcademicStages() {
    const base = 'siakhargone-content/academic-stages';
    const folders = listFolders(base);
    const stages = [];
    for (const folder of folders) {
        const folderRel = `${base}/${folder}`;
        const textFile = fs.readdirSync(path.join(ROOT, folderRel)).find(f => f.endsWith('.docx'));
        const description = textFile ? await readDocxAsText(`${folderRel}/${textFile}`) : null;
        const images = listFiles(folderRel, ['.jpg', '.jpeg', '.png']);

        stages.push({
            slug: folder.replace(/\s+/g, '-').toLowerCase(),
            title: folder,
            description,
            images: images.map(i => i.url)
        });
    }
    return stages;
}

export async function loadAlbums() {
    const base = 'siakhargone-content/albums';
    const albums = [];
    const folders = listFolders(base);
    for (const folder of folders) {
        const folderRel = `${base}/${folder}`;
        // Recursive load for albums to catch nested folders
        const images = listFiles(folderRel, ['.jpg', '.jpeg', '.png'], true);
        const cover = images.length ? images[0].url : null;
        albums.push({
            albumName: folder,
            coverPhoto: cover,
            photos: images.map(i => i.url)
        });
    }
    return albums;
}

export function loadCertificates() {
    const base = 'siakhargone-content/certificates';
    const folders = listFolders(base);
    const certs = [];
    for (const folder of folders) {
        const folderRel = `${base}/${folder}`;
        const pdf = listFiles(folderRel, ['.pdf'])[0];
        if (pdf) certs.push({ title: folder, fileUrl: pdf.url });
    }
    return certs;
}

export function loadDownloads() {
    const base = 'siakhargone-content/downloads';
    let items = listFiles(base, ['.pdf', '.docx', '.jpg', '.png']);

    const folders = listFolders(base);
    for (const folder of folders) {
        const folderRel = `${base}/${folder}`;
        const subItems = listFiles(folderRel, ['.pdf', '.docx', '.jpg', '.png']);
        if (subItems.length > 0) {
            items.push({
                name: folder,
                url: subItems[0].url
            });
        }
    }

    return items.map(i => ({
        title: i.name.replace(/\.[^/.]+$/, "").replace(/-/g, ' '),
        fileUrl: i.url
    }));
}

export async function loadCommittee() {
    const base = 'siakhargone-content/School Managing committee';
    const files = listFiles(base, ['.docx']);
    const docx = files[0]?.name;
    const content = docx ? await readDocxAsText(`${base}/${docx}`) : null;

    const documents = listFiles(base, ['.pdf']).map(f => ({
        title: f.name.replace('.pdf', ''),
        fileUrl: f.url
    }));

    return { content, documents };
}

export async function loadAboutData() {
    const base = 'siakhargone-content/about';
    const files = listFiles(base, ['.docx']);
    const docx = files[0]?.name;
    const content = docx ? await readDocxAsText(`${base}/${docx}`) : null;
    const images = listFiles(base, ['.jpg', '.png', '.jpeg']);
    return {
        content,
        schoolImage: images[0] ? { src: images[0].url, alt: "School Image" } : null
    };
}

export async function loadMessage(folderName: string) {
    const base = `siakhargone-content/${folderName}`;
    const files = listFiles(base, ['.docx']);
    const result = {
        message: "",
        image: null as string | null,
        name: "Name Not Found",
        role: "Role Not Found"
    };

    if (files.length > 0 || listFolders(base).length === 0) {
        if (!fs.existsSync(path.join(ROOT, base))) return result;
    }

    const docx = files[0]?.name;
    const content = docx ? await readDocxAsText(`${base}/${docx}`) : null;
    const images = listFiles(base, ['.jpg', '.png', '.jpeg']);

    result.message = content || "";
    result.image = images[0]?.url || null;

    try {
        const namePath = path.join(ROOT, base, 'name.txt');
        if (fs.existsSync(namePath)) result.name = fs.readFileSync(namePath, 'utf-8').trim();

        const rolePath = path.join(ROOT, base, 'role.txt');
        if (fs.existsSync(rolePath)) result.role = fs.readFileSync(rolePath, 'utf-8').trim();
    } catch { }

    return result;
}

export async function loadHomeFacilities() {
    const base = 'siakhargone-content/home-facilities';
    const images = listFiles(base, ['.jpg', '.jpeg', '.png'], false);

    const descriptions: Record<string, string> = {
        "smart classrooms": "Tech-enabled learning spaces.",
        "sports complex": "Professional tracks & courts.",
        "science labs": "State-of-the-art equipment.",
        "library": "A hub of knowledge.",
        "computer lab": "Advanced computing resources.",
        "auditorium": "Space for events and gatherings."
    };

    return images.map(img => {
        const name = img.name.replace(/\.[^/.]+$/, "").replace(/-/g, ' ').toLowerCase();
        const title = name.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        return {
            title,
            description: descriptions[name] || "World-class facility.",
            image: img.url
        };
    });
}
