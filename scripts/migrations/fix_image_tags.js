
const fs = require('fs');
const path = require('path');

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

    // Fix: <Image ... / unoptimized> -> <Image ... unoptimized />
    // Also handle cases where / was missing or multiple spaces
    const brokenTagRegex = /<Image\s+([^>]*?)\s*\/\s*unoptimized\s*>/g; // Matches <Image ... / unoptimized>

    content = content.replace(brokenTagRegex, (match, props) => {
        console.log(`[Fix Tag] Correcting Image tag in ${path.basename(filePath)}`);
        // Remove trailing slash from props if present
        let cleanProps = props.trim();
        if (cleanProps.endsWith('/')) {
            cleanProps = cleanProps.slice(0, -1).trim();
        }
        return `<Image ${cleanProps} unoptimized />`;
    });

    // Also fix cases where it might have been <Image ... unoptimized> (missing closing />)
    // The previous script returned `<Image ${props} unoptimized>` which replaced the WHOLE tag.
    // If original was `<Image ... />`, props included `/`.
    // If original was `<Image ... >...</Image>` (not self closing), props didn't have `/`.
    // My previous script added ` unoptimized>` at the end.

    // Let's generalise: find <Image ... unoptimized> that doesn't end with />
    const unclosedRegex = /<Image\s+([^>]*?)\s+unoptimized\s*>/g;
    content = content.replace(unclosedRegex, (match, props) => {
        // If it's not already self-closing (checked by regex looking for just >)
        // But wait, my previous script output `<Image ... / unoptimized>` which matches the first regex above.
        // What if it output `<Image ... unoptimized>` (no slash)?
        // Then it's an open tag. usage of Image is usually self closing.
        // Let's assume self-closing for now.
        return match; // Skip this for now, focus on the known breakage
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
    }
}

// Start processing from src
const rootDir = "n:\\PROGRAMS\\GIT and GITHUB\\github Desktop\\siakhargone\\src";
console.log(`Scanning ${rootDir}...`);
processDirectory(rootDir);
console.log("Done.");
