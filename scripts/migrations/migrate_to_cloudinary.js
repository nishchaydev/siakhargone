
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SRC_DIR = 'src';
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dkits80xk/image/upload/';
const LOCAL_PATH_REGEX = /["']\/siakhargone-content\/[^"']+\/([^/"]+\.(webp|png|jpg|jpeg))["']/gi;
// Also matches paths that might not be in quotes if passed as variables? 
// Primarily targeting string literals.
// Regex Explanation:
// ["'] : Start quote
// \/siakhargone-content\/ : The local path prefix
// [^"']+ : Match anything until the last slash (greedy)
// \/ : The last slash
// ([^/"]+\.(webp|png|jpg|jpeg)) : Capture group 1 - the filename with extension
// ["'] : End quote

// We need to be careful about replacing the quotes. The regex includes quotes to ensure we match string literals.
// But we want to preserve the quotes in the replacement.

function updateFiles() {
    console.log('Starting Cloudinary Migration...');
    const sourceFiles = glob.sync(`${SRC_DIR}/**/*.{ts,tsx,json}`);
    let changedFiles = 0;

    sourceFiles.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace method with callback
        content = content.replace(LOCAL_PATH_REGEX, (match, filename) => {
            // match is the full string including quotes: "/siakhargone-content/.../file.webp"
            // filename is capture group 1: file.webp
            const initialQuote = match[0];
            const finalQuote = match[match.length - 1];
            const newUrl = `${initialQuote}${CLOUDINARY_BASE_URL}${filename}${finalQuote}`;
            console.log(`Converting: ${filename} in ${path.basename(filePath)}`);
            return newUrl;
        });

        // Also handle the case where unoptimized might be missing on Image components?
        // The user said "Keep <Image /> but always add unoptimized"
        // Regex to find <Image ... > without unoptimized?
        // That is complex with regex. I provided a specific fix script for that before.
        // Let's stick to path replacement first.

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
            changedFiles++;
        }
    });

    console.log(`Migration Complete. Updated ${changedFiles} files.`);
}

updateFiles();
