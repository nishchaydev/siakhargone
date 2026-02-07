
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SRC_DIR = 'src';
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dkits80xk/image/upload/';

// Load the mapping
const mappingRaw = fs.readFileSync('rename-mapping.json', 'utf8');
const mapping = JSON.parse(mappingRaw);

// Build a reverse mapping: Lowercase(OldFilename) -> NewFilename
// keys in mapping are like "/siakhargone-content/.../DSC_2323.webp"
// values are like "/siakhargone-content/.../annual-function-3.webp"

const filenameMap = {};

Object.keys(mapping).forEach(oldPath => {
    const oldFilename = path.basename(oldPath);
    const newPath = mapping[oldPath];
    const newFilename = path.basename(newPath);

    // Map lowercase old filename to new filename
    filenameMap[oldFilename.toLowerCase()] = newFilename;
});

// Also add a self-mapping for new filenames just in case
Object.values(mapping).forEach(newPath => {
    const newFilename = path.basename(newPath);
    filenameMap[newFilename.toLowerCase()] = newFilename;
});


function fixCloudinaryPaths() {
    console.log('Starting Cloudinary Path Fix...');
    const sourceFiles = glob.sync(`${SRC_DIR}/**/*.{ts,tsx,json}`);
    let fixedFiles = 0;

    sourceFiles.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Find all Cloudinary URLs
        // Regex: https://res.cloudinary.com/dkits80xk/image/upload/([^"'\s)]+)
        const CLOUDINARY_REGEX = /https:\/\/res\.cloudinary\.com\/dkits80xk\/image\/upload\/([^"'\s)]+)/g;

        content = content.replace(CLOUDINARY_REGEX, (match, currentFilename) => {
            // currentFilename might be "dsc_2323.webp" (lowercase) or "DSC_2323.webp"
            // check if it exists in our map
            const lowerCurrent = currentFilename.toLowerCase();

            if (filenameMap[lowerCurrent]) {
                const intendedFilename = filenameMap[lowerCurrent];
                if (intendedFilename !== currentFilename) {
                    console.log(`Fixing: ${currentFilename} -> ${intendedFilename} in ${path.basename(filePath)}`);
                    return `${CLOUDINARY_BASE_URL}${intendedFilename}`;
                }
            } else {
                console.warn(`Warning: Unknown filename in code: ${currentFilename} in ${path.basename(filePath)}`);
            }
            return match;
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
            fixedFiles++;
        }
    });

    console.log(`Fix Complete. Updated ${fixedFiles} files.`);
}

fixCloudinaryPaths();
