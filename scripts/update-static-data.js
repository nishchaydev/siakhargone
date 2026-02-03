const fs = require('fs-extra');
const path = require('path');

const STATIC_DATA_PATH = 'src/lib/static-data.ts';

async function updateStaticData() {
    console.log(`🔧 Updating static-data.ts paths...`);

    let content = fs.readFileSync(STATIC_DATA_PATH, 'utf8');

    // Regex to find image paths: "/siakhargone-content/..."
    // Matches strings starting with /siakhargone-content/ and ending with .webp or .jpg or .png
    // We capture (path/to/folder/)(filename.ext)
    const regex = /(\/siakhargone-content\/[\w\s\-\&\.\(\)\/]+?\/)([^/"]+\.(?:webp|jpg|jpeg|png))/g;

    let updateCount = 0;

    const newContent = content.replace(regex, (match, dirPath, filename) => {
        // Sanitize filename exactly as fix-filenames.js did
        // 1. Fix extension spaces
        let newName = filename.replace(/\. jpg$/, '.jpg');
        // 2. Spaces -> _ and remove parens
        newName = newName.replace(/\s+/g, '_').replace(/[()]/g, '');

        if (newName !== filename) {
            updateCount++;
            // console.log(`   Ref: ${filename} -> ${newName}`);
            return `${dirPath}${newName}`;
        }
        return match;
    });

    if (updateCount > 0) {
        fs.writeFileSync(STATIC_DATA_PATH, newContent, 'utf8');
        console.log(`✅ Updated ${updateCount} paths in static-data.ts`);
    } else {
        console.log(`✨ No path updates needed.`);
    }
}

updateStaticData();
