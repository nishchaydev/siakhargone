
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ROOT_DIR = 'public/siakhargone-content/album/photo-for-uploads';
const SRC_DIR = 'src';

// correct mapping based on user request
const FOLDER_MAPPING = {
    'infrastructure-photos/class-room-photos': 'infrastructure-classroom',
    'infrastructure-photos/library-photos': 'infrastructure-library',
    'infrastructure-photos/building-photos': 'infrastructure-building',
    'infrastructure-photos/computer-lab-photo': 'infrastructure-computerlab',
    'infrastructure-photos/indore-games': 'infrastructure-indoregames',
    'lab/chemistry-lab': 'lab-chemistry',
    'lab/biology-lab': 'lab-biology',
    'lab/maths-lab': 'lab-math',
    'lab/physics-lab': 'lab-physics',
    'lab/computer-lab': 'lab-computer',
    'sports-achievements': 'sports-achievements',
    'annual-function': 'annual-function',
    'national-youth-day': 'national-youth-day',
    'rainy-day-plantation': 'rainy-day-plantation',
    'ptm': 'ptm',
    'session-start': 'session-start',
    'mix-photos': 'mix-photos',
    'district-level-taekwando-competition': 'taekwando',
    'holi-celebration': 'holi',
    // add bus/main roots if needed, but they are single files usually
};

// Store mapping: oldPathRelative -> newPathRelative
let pathMapping = {};

function processDirectory(dirRelative, prefix) {
    const fullDir = path.join(ROOT_DIR, dirRelative);
    if (!fs.existsSync(fullDir)) {
        console.warn(`Directory not found: ${fullDir}`);
        return;
    }

    const files = fs.readdirSync(fullDir).filter(f => f.match(/\.(webp|jpg|png|jpeg)$/i));
    // Sort files to ensure stable renaming (optional but good)
    files.sort();

    files.forEach((file, index) => {
        const oldPathFull = path.join(fullDir, file);
        const ext = path.extname(file).toLowerCase();

        // New name: prefix-number.webp
        // Ensure .webp extension for consistency if preferred, otherwise keep orig?
        // User examples show .webp.
        // If the file is not webp, acts as conversion request? No, assume keep ext or force webp?
        // User example: "lab-chemistry-1.webp".
        // current files are mostly .webp.
        const newName = `${prefix}-${index + 1}${ext}`;
        const newPathFull = path.join(fullDir, newName);

        if (oldPathFull !== newPathFull) {
            fs.renameSync(oldPathFull, newPathFull);
            console.log(`Renamed: ${file} -> ${newName}`);
        }

        // Mapping keys should be "rooted" strings used in code
        // e.g. "/siakhargone-content/album/photo-for-uploads/lab/chemistry-lab/chemistry-lab-1.webp"
        const oldCodePath = `/siakhargone-content/album/photo-for-uploads/${dirRelative}/${file}`.replace(/\\/g, '/');
        const newCodePath = `/siakhargone-content/album/photo-for-uploads/${dirRelative}/${newName}`.replace(/\\/g, '/');

        pathMapping[oldCodePath] = newCodePath;

        // Also handle potential case mismatches or partial paths if necessary? 
        // For now, strict mapping.
    });
}

// 1. Rename Phase
console.log('Starting Rename Phase...');
Object.keys(FOLDER_MAPPING).forEach(dir => {
    processDirectory(dir, FOLDER_MAPPING[dir]);
});

// 2. Code Update Phase
console.log('Starting Code Update Phase...');
console.log(`Found ${Object.keys(pathMapping).length} renames to apply.`);

const sourceFiles = glob.sync(`${SRC_DIR}/**/*.{ts,tsx,json}`);

sourceFiles.forEach(items => {
    const filePath = items;
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    Object.keys(pathMapping).forEach(oldP => {
        const newP = pathMapping[oldP];
        // naive string replacement
        // escape regex
        // we use split/join pattern to replace all occurrences
        if (content.indexOf(oldP) !== -1) {
            content = content.split(oldP).join(newP);
        }
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
});

// 3. Write mapping for verification
fs.writeFileSync('rename-mapping.json', JSON.stringify(pathMapping, null, 2));
console.log('Done.');
