const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const TARGET_DIR = 'public/siakhargone-content/Album/Photo For Uploads/Activities Photo';

async function fixFilenames() {
    console.log(`🔧 Fixing filenames in: ${TARGET_DIR}`);

    if (!fs.existsSync(TARGET_DIR)) {
        console.error(`❌ Directory not found!`);
        return;
    }

    const files = fs.readdirSync(TARGET_DIR);

    for (const file of files) {
        const oldPath = path.join(TARGET_DIR, file);

        // 1. Fix extension spaces (. jpg -> .jpg)
        let newName = file.replace(/\. jpg$/, '.jpg');

        // 2. Replace spaces with underscores
        newName = newName.replace(/\s+/g, '_');

        if (newName !== file) {
            const newPath = path.join(TARGET_DIR, newName);
            await fs.move(oldPath, newPath);
            console.log(`✅ Renamed: "${file}" -> "${newName}"`);
        }
    }
    console.log('🎉 Done!');
}

fixFilenames();
