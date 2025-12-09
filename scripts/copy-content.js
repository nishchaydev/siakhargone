const fs = require('fs-extra');
const path = require('path');

async function copyContent() {
    const SRC = path.join(process.cwd(), 'siakhargone-content');
    const DEST = path.join(process.cwd(), 'public', 'siakhargone-content');

    if (!fs.existsSync(SRC)) {
        console.error('Source folder not found:', SRC);
        // Ensure this directory exists so build doesn't crash on reading empty dir
        await fs.ensureDir(SRC);
        console.log("Created empty source dir to prevent crash.");
    }

    try {
        // remove old dest to avoid stale files
        await fs.remove(DEST);
        // Copy recursively
        await fs.copy(SRC, DEST, {
            overwrite: true,
            errorOnExist: false,
            dereference: true,
        });
        console.log('Copied content to public/siakhargone-content');
    } catch (err) {
        console.error('Error copying content:', err);
        process.exit(1);
    }
}


copyContent().catch(err => {
    console.error(err);
    process.exit(1);
});
