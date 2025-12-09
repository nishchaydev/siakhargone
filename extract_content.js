
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const files = [
    'public/siakhargone-content/Principal\'s Message.docx',
    'public/siakhargone-content/about/About SIA.docx',
    'public/siakhargone-content/academic-stages/Academics Word/Academics.docx',
    'public/siakhargone-content/director-message/Director\'s Message.docx',
    'public/siakhargone-content/School Managing committee/SCHOOL MANAGING COMMITTEE 2024-25.docx',
];

// Add vision/mission txt files
const txtFiles = [
    'public/siakhargone-content/vision-mission/mission-text.txt',
    'public/siakhargone-content/vision-mission/mission-title.txt',
    'public/siakhargone-content/vision-mission/motto-text.txt',
    'public/siakhargone-content/vision-mission/motto-title.txt',
    'public/siakhargone-content/vision-mission/vision-text.txt',
    'public/siakhargone-content/vision-mission/vision-title.txt'
];

async function run() {
    const results = {};
    for (const f of files) {
        if (fs.existsSync(f)) {
            try {
                const buffer = fs.readFileSync(f);
                const res = await mammoth.convertToHtml({ buffer });
                results[f] = res.value;
            } catch (e) {
                console.error("Error reading " + f, e);
                results[f] = "";
            }
        } else {
            results[f] = "";
        }
    }

    for (const f of txtFiles) {
        if (fs.existsSync(f)) {
            results[f] = fs.readFileSync(f, 'utf-8');
        } else {
            results[f] = "";
        }
    }

    fs.writeFileSync('extracted_content.json', JSON.stringify(results, null, 2));
}

run();
