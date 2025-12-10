
const fs = require('fs');
const path = require('path');

// Function to slugify a path segment (matching the PowerShell logic)
function slugify(name) {
    const ext = path.extname(name);
    const baseName = path.basename(name, ext);
    let slug = baseName.toLowerCase();
    slug = slug.replace(/&/g, ''); // Remove &
    slug = slug.replace(/[ \(\)]+/g, '-'); // Replace spaces and parens with hyphen
    slug = slug.replace(/-+/g, '-'); // Collapse hyphens
    slug = slug.replace(/^-|-$/g, ''); // Trim hyphens
    return slug + ext.toLowerCase();
}

function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.js'))) {
            updateFile(fullPath);
        }
    });
}

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Update paths
    // Regex matches common variations of the path, capturing the part after "Photo For Uploads"
    const pathRegex = /(\/siakhargone-content\/)(?:Album|album)\/(?:Photo%20For%20Uploads|Photo For Uploads|photo-for-uploads)\/([^"'\n]+)/gi;

    content = content.replace(pathRegex, (match, prefix, restPath) => {
        // Decode URI component just in case
        try {
            restPath = decodeURIComponent(restPath);
        } catch (e) { }

        // Split by / and slugify each part
        const parts = restPath.split('/');
        const slugifiedParts = parts.map(p => slugify(p));

        const newPath = '/siakhargone-content/album/photo-for-uploads/' + slugifiedParts.join('/');
        console.log(`[Path Update] ${match} -> ${newPath}`);
        return newPath;
    });

    // 2. Add unoptimized to <Image> components
    // This is a naive regex approach but sufficient for typical usage
    const imageRegex = /<Image\s+([^>]*?)>/g;
    content = content.replace(imageRegex, (match, props) => {
        if (!props.includes('unoptimized')) {
            console.log(`[Add Unoptimized] Adding prop to Image in ${path.basename(filePath)}`);
            return `<Image ${props} unoptimized>`;
        }
        return match;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

// Start processing from src
const rootDir = "n:\\PROGRAMS\\GIT and GITHUB\\github Desktop\\siakhargone\\src";
console.log(`Scanning ${rootDir}...`);
processDirectory(rootDir);
console.log("Done.");
