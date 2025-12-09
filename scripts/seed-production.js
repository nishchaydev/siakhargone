
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const axios = require('axios');
const FormData = require('form-data');
const glob = require('glob');
require('dotenv').config({ path: '.env.production' });

// CONFIGURATION
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://sia-cms-production.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const CONTENT_DIR = path.join(__dirname, '..', 'siakhargone-content');

if (!API_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN is missing in .env.production');
    process.exit(1);
}

const api = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
});

// UTILS
const toPosix = (p) => p.split(path.sep).join('/');

async function uploadFile(filePath, ref = null, refId = null, field = null) {
    try {
        if (!fs.existsSync(filePath)) return null;

        const stats = fs.statSync(filePath);
        const form = new FormData();
        form.append('files', fs.createReadStream(filePath), path.basename(filePath));
        if (ref) form.append('ref', ref);
        if (refId) form.append('refId', refId);
        if (field) form.append('field', field);

        const res = await api.post('/upload', form, {
            headers: { ...form.getHeaders() },
        });
        console.log(`✅ Uploaded: ${path.basename(filePath)} (ID: ${res.data[0].id})`);
        return res.data[0].id; // Return ID of first file
    } catch (error) {
        console.error(`❌ Upload failed for ${filePath}:`, error.response?.data?.error || error.message);
        return null;
    }
}

async function extractDocx(filePath) {
    if (!fs.existsSync(filePath)) return '';
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value.trim();
}

async function extractDocxToHtml(filePath) {
    if (!fs.existsSync(filePath)) return '';
    const result = await mammoth.convertToHtml({ path: filePath });
    return result.value;
}

async function updateSingleType(collection, data) {
    try {
        await api.put(`/${collection}`, { data });
        console.log(`✅ Updated Single Type: ${collection}`);
    } catch (error) {
        console.error(`❌ Failed to update ${collection}:`, error.response?.data?.error || error.message);
    }
}

async function createEntry(collection, data) {
    try {
        const res = await api.post(`/${collection}`, { data });
        console.log(`✅ Created Entry in: ${collection} (ID: ${res.data.data.id})`);
        return res.data.data.id;
    } catch (error) {
        console.error(`❌ Failed to create entry in ${collection}:`, error.response?.data?.error || error.message);
        return null; // Return null on failure
    }
}

// MAIN SEEDING FUNCTION
async function seed() {
    console.log('🚀 Starting Seeding Process (Fixed)...');

    // 1️⃣ ABOUT PAGE
    console.log('\n--- Processing ABOUT PAGE ---');
    const aboutDoc = path.join(CONTENT_DIR, 'about', 'About SIA.docx');
    if (fs.existsSync(aboutDoc)) {
        const aboutText = await extractDocx(aboutDoc);
        const aboutHtml = await extractDocxToHtml(aboutDoc);
        await updateSingleType('about', {
            main_title: "About Sanskar International Academy",
            main_subtitle: "Excellence in Education",
            main_description: aboutHtml || aboutText,
        });
    } else {
        console.warn(`⚠️ File not found: ${aboutDoc}`);
    }

    // 2️⃣ VISION & MISSION
    console.log('\n--- Processing VISION & MISSION ---');
    // Note: User says "Principal's Message.docx" in "vision-mission" folder but listing showed txt files.
    // I will check if docx exists, otherwise use txt.
    // Wait, previous file listing for `vision-mission` showed TXT files only. 
    // And `principal-message` folder has `Principal's Message.docx` but small size?
    // Let's look for "Principal's Message.docx" in `principal-message` folder as fallback source.
    let vmDoc = path.join(CONTENT_DIR, 'vision-mission', "Principal's Message.docx");
    if (!fs.existsSync(vmDoc)) {
        vmDoc = path.join(CONTENT_DIR, 'principal-message', "Principal's Message.docx");
    }

    if (fs.existsSync(vmDoc)) {
        const vmText = await extractDocx(vmDoc);
        await updateSingleType('vision-mission', {
            visionTitle: "Our Vision",
            visionText: vmText.substring(0, 500) + "...",
            mottoTitle: "Service, Compassion, Humanity",
            mottoText: "Our guiding principles.",
            missionTitle: "Our Mission",
            missionText: vmText,
        });
    }

    // 3️⃣ PRINCIPAL MESSAGE (Single Type)
    console.log('\n--- Processing PRINCIPAL MESSAGE ---');
    const pDoc = path.join(CONTENT_DIR, 'principal-message', "Principal's Message.docx");
    if (fs.existsSync(pDoc)) {
        const pText = await extractDocxToHtml(pDoc);
        // Single Type: PUT /api/principal-message
        await updateSingleType('principal-message', {
            name: "Principal – Sanskar International Academy",
            role: "Principal",
            message: pText
        });
    }

    // 4️⃣ DIRECTOR MESSAGE (Single Type)
    console.log('\n--- Processing DIRECTOR MESSAGE ---');
    const dDoc = path.join(CONTENT_DIR, 'director-message', "Director's Message.docx");
    if (fs.existsSync(dDoc)) {
        const dText = await extractDocxToHtml(dDoc);
        // Single Type: PUT /api/director-message
        await updateSingleType('director-message', {
            name: "Director – Sanskar International Academy",
            role: "Director",
            message: dText
        });
    }

    // 5️⃣ ACADEMIC STAGES
    console.log('\n--- Processing ACADEMIC STAGES ---');
    const academicPattern = toPosix(path.join(CONTENT_DIR, 'academic-stages', '**/*.docx'));
    const academicFiles = glob.sync(academicPattern);
    console.log(`Found ${academicFiles.length} academic files.`);

    for (const f of academicFiles) {
        const title = path.basename(f, '.docx');
        const desc = await extractDocxToHtml(f);
        await createEntry('academic-stages', {
            title: title,
            description: desc
        });
    }

    // 6️⃣ PHOTO GALLERY (ALBUMS)
    console.log('\n--- Processing ALBUMS ---');
    // The structure is albums/Photo For Uploads/[AlbumName]
    const albumPattern = toPosix(path.join(CONTENT_DIR, 'albums/Photo For Uploads/*/'));
    console.log(`Searching for albums with pattern: ${albumPattern}`);
    const albumDirs = glob.sync(albumPattern);
    console.log(`Found ${albumDirs.length} album directories.`);

    for (const dir of albumDirs) {
        // glob returns full path with / at end usually
        const albumName = path.basename(dir.slice(0, -1)); // remove trailing slash if any for basename
        console.log(`Creating Album: ${albumName}`);

        const photoPattern = toPosix(path.join(dir, '*.*'));
        const photos = glob.sync(photoPattern).filter(p => !p.endsWith('.db')); // ignore Thumbs.db

        if (photos.length === 0) {
            console.log(`No photos found in ${albumName}, skipping.`);
            continue;
        }

        const photoIds = [];
        let coverId = null;

        // Limit photos to 20 for seeding performance if huge, or do all? User said "ALL images". OK.
        for (const [idx, photo] of photos.entries()) {
            const id = await uploadFile(photo);
            if (id) {
                photoIds.push(id);
                if (idx === 0) coverId = id;
            }
        }

        if (photoIds.length > 0) {
            await createEntry('albums', {
                albumName: albumName,
                description: `Photos from ${albumName}`,
                coverPhoto: coverId,
                photos: photoIds
            });
        }
    }

    // 7️⃣ CERTIFICATES
    console.log('\n--- Processing CERTIFICATES ---');
    const certPattern = toPosix(path.join(CONTENT_DIR, 'certificates', '**/*.pdf'));
    const certFiles = glob.sync(certPattern);
    console.log(`Found ${certFiles.length} certificates.`);

    for (const f of certFiles) {
        const title = path.basename(f, '.pdf');
        const id = await uploadFile(f);
        if (id) {
            await createEntry('certificates', {
                title: title,
                pdfFile: id
            });
        }
    }

    // 8️⃣ DOWNLOADS
    console.log('\n--- Processing DOWNLOADS ---');
    const dlPattern = toPosix(path.join(CONTENT_DIR, 'downloads', '*.*'));
    const dlFiles = glob.sync(dlPattern);
    console.log(`Found ${dlFiles.length} download files.`);

    for (const f of dlFiles) {
        const title = path.basename(f);
        const id = await uploadFile(f);
        if (id) {
            await createEntry('download-items', {
                title: title,
                file: id
            });
        }
    }

    // 9️⃣ COMMITTEE
    console.log('\n--- Processing COMMITTEE ---');
    const commPattern = toPosix(path.join(CONTENT_DIR, 'School Managing Committee', '*.docx'));
    const commFiles = glob.sync(commPattern);
    if (commFiles.length > 0) {
        const f = commFiles[0];
        const id = await uploadFile(f);
        if (id) {
            await createEntry('school-managing-committees', {
                title: "School Managing Committee 2024–2025",
                file: id
            });
        }
    }

    // 🔟 HOMEPAGE
    console.log('\n--- Processing HOMEPAGE ---');
    await updateSingleType('homepage', {
        heroTitle: "Sanskar International Academy, Khargone",
        heroSubtitleHindi: "Service | Compassion | Humanity",
        heroDescription: "Nurturing tomorrow's leaders through a blend of tradition and innovation.",
        stats: [
            { label: "Students", value: "500+", prefix: "", suffix: "+" },
            { label: "Teachers", value: "40+", prefix: "", suffix: "+" },
            { label: "Years of Excellence", value: "10+", prefix: "", suffix: "+" },
        ]
    });

    // 11️⃣ FEE STRUCTURE
    console.log('\n--- Processing FEE STRUCTURE ---');
    await updateSingleType('fee-structure', {
        title: "Fee Structure 2024-2025",
        description: "<p>Please contact the school office for the detailed fee structure.</p>"
    });

    // 12️⃣ EVENTS
    console.log('\n--- Processing EVENTS ---');
    // Create a dummy event if none exist
    await createEntry('events', {
        title: "Annual Sports Day",
        description: "<p>Join us for our annual sports meet celebrating athleticism and teamwork.</p>",
        date: new Date().toISOString(),
        location: "School Playground",
        slug: "annual-sports-day"
    });

    console.log('\n🎉 SEEDING COMPLETE!');
}

seed();
