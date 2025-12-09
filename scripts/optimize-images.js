
const sharp = require('sharp');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

// Configuration
const SOURCE_DIR = 'public/siakhargone-content'; // Raw content is now in public
const DEST_DIR = 'public/siakhargone-content';
const MAX_WIDTH = 1920;
const QUALITY = 75;

async function optimizeImages() {
    console.log(`🚀 Starting Image Optimization...`);
    console.log(`📂 Source: ${SOURCE_DIR}`);
    console.log(`📂 Destination: ${DEST_DIR}`);

    // Ensure source exists
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`❌ Source directory "${SOURCE_DIR}" not found! Please move your raw images there.`);
        process.exit(1);
    }

    // Find all images
    const files = glob.sync(`${SOURCE_DIR}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`);
    console.log(`🔍 Found ${files.length} images.`);

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
        // Calculate relative path to mirror structure
        const relPath = path.relative(SOURCE_DIR, file);
        const destPath = path.join(DEST_DIR, relPath);

        // Change extension to .webp ? User said "Convert all images to WebP".
        // But paths in DB/static-data might point with .JPG extension?
        // User said: "Output into: /public/siakhargone-content".
        // Use said: "Convert all images to WebP".
        // IMPACT: If I change extension to .webp, I MUST update `static-data.ts` paths too.
        // User didn't ask to update paths in static-data.ts, only "Remove all old broken image paths... Verify... all images must link correctly".
        // To be safe and compatible with existing static-data keys (which use .JPG), I might need to KEEP the extension or update the data.
        // HOWEVER, "Convert to WebP" implies .webp extension.
        // Let's stick to .webp and we will have to update static-data.ts later or assume user wants that.
        // WAIT, "Preserve folder structure."
        // Let's output as .webp and also maybe keep original name? No, webp usually implies .webp extension.
        // Strategy: Output as .webp. I'll need to update static-data.ts to replace .JPG with .webp later? 
        // Or, I can check if Next.js handles this? No.
        // Better: For now, I will modify the extension in destination.

        const destPathWebP = destPath.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/, '.webp');
        const destDir = path.dirname(destPathWebP);

        await fs.ensureDir(destDir);

        // Check if exists
        if (fs.existsSync(destPathWebP)) {
            // console.log(`⏩ Skipping: ${relPath}`);
            skippedCount++;
            const stats = fs.statSync(destPathWebP);
            totalOptimizedSize += stats.size;
            // Add original size for stats?
            const origStats = fs.statSync(file);
            totalOriginalSize += origStats.size;
            continue;
        }

        try {
            const imageBuffer = await fs.readFile(file);
            const originalSize = imageBuffer.length;
            totalOriginalSize += originalSize;

            await sharp(imageBuffer)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(destPathWebP);

            const optimizedStats = fs.statSync(destPathWebP);
            totalOptimizedSize += optimizedStats.size;
            processedCount++;

            console.log(`✅ Optimized: ${relPath} (${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(optimizedStats.size / 1024 / 1024).toFixed(2)} MB)`);

        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err);
        }
    }

    console.log(`\n🎉 Optimization Complete!`);
    console.log(`📄 Processed: ${processedCount}`);
    console.log(`⏩ Skipped: ${skippedCount}`);
    console.log(`💾 Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Optimized Size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Savings: ${(100 - (totalOptimizedSize / totalOriginalSize * 100)).toFixed(2)}%`);

    // SKIP Copy non-image files if Source == Dest (In-place mode)
    if (SOURCE_DIR !== DEST_DIR) {
        console.log(`\n📦 Copying other assets (PDFs)...`);
        const otherFiles = glob.sync(`${SOURCE_DIR}/**/*.*`, { ignore: `${SOURCE_DIR}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}` });
        for (const file of otherFiles) {
            const relPath = path.relative(SOURCE_DIR, file);
            const destPath = path.join(DEST_DIR, relPath);
            await fs.copy(file, destPath, { overwrite: false });
        }
    } else {
        console.log(`\n📦 Skipping copy (Source = Destination). Assets are already present.`);
    }
}

optimizeImages();
