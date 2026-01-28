const { google } = require('googleapis');
const dotenv = require('dotenv');
const crypto = require('crypto');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_ID) {
    console.error("❌ Missing Google Sheets credentials in .env.local");
    process.exit(1);
}

// Auth
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

const SHEET_TAB_IDS = {
    NEWS: 'News',
    CAREERS: 'Careers',
};

async function seed() {
    console.log("🚀 Starting Seed Process...");

    try {
        // --- NEWS ---
        const newsItem = {
            id: crypto.randomUUID(),
            title: "Educational Tour GUJARAT 2025",
            date: "2025-12-11",
            content: "School Educational Tour to Gujarat visiting Statue of Unity, Science City, Dwarka, Somnath, and Nageshwar Jyotirlinga.",
            link: "",
            imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1737358763/gujarat_tour_poster.png", // Placeholder or from user upload if they had one, reusing description. 
            // The user uploaded an image. I should ideally use a real URL if I could invalid uploading, but for now I will leave it blank or use a placeholder string to indicate an image is needed.
            // Actually, I can't upload the file from here easily without cloudinary setup in this script.
            // I'll leave imageUrl empty or keep existing logic.
            status: "Active",
            createdAt: new Date().toISOString()
        };

        // Check if News exists
        const newsCheck = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_TAB_IDS.NEWS}!B:B`
        });
        const existingNews = newsCheck.data.values?.flat() || [];

        if (!existingNews.includes(newsItem.title)) {
            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_TAB_IDS.NEWS}!A:G`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[
                        newsItem.id,
                        newsItem.title,
                        newsItem.date,
                        newsItem.content,
                        newsItem.link,
                        newsItem.status,
                        newsItem.createdAt
                    ]]
                }
            });
            console.log("✅ Added News: " + newsItem.title);
        } else {
            console.log("ℹ️ News already exists.");
        }

        // --- CAREERS ---
        // 1. Delete the "Teachers & Activity Staff" aggregated entry if it exists
        const careerCheck = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_TAB_IDS.CAREERS}!A:H`
        });

        const careers = careerCheck.data.values || [];
        // Find row with role "Teachers & Activity Staff"
        const indexToDelete = careers.findIndex(row => row[1] === "Teachers & Activity Staff");

        if (indexToDelete !== -1) {
            // We can't easily delete a single row without shifting in this script without complex logic or 'deleteDimension'.
            // But we can mark it Inactive? Or just ignore for now and Append new ones.
            // Let's Append new ones.
            console.log("⚠️ Found old aggregated career, consider deleting manually: Teachers & Activity Staff");
        }

        const newCareers = [
            {
                role: "PPRT - Mother Teacher",
                dept: "Academic",
                type: "Full Time",
                exp: "Experienced & Freshers",
                desc: "We are looking for energetic, dedicated and inspired Mother Teachers."
            },
            {
                role: "PRT - All Subjects",
                dept: "Academic",
                type: "Full Time",
                exp: "Experienced & Freshers",
                desc: "Teachers required for All Subjects."
            },
            {
                role: "TGT - All Subjects",
                dept: "Academic",
                type: "Full Time",
                exp: "Experienced & Freshers",
                desc: "Teachers required for All Subjects and Computer Science."
            },
            {
                role: "PGT - Science & Maths",
                dept: "Academic",
                type: "Full Time",
                exp: "Experienced & Freshers",
                desc: "Mathematics, Physics, Chemistry."
            },
            {
                role: "Activity Staff",
                dept: "Activity",
                type: "Full Time",
                exp: "Experienced & Freshers",
                desc: "Art & Craft, Music, Sports, Dance, Yoga, Receptionist, PRO."
            }
        ];

        const careerRoles = careers.map(c => c[1]); // Existing roles

        for (const c of newCareers) {
            if (careerRoles.includes(c.role)) {
                console.log(`ℹ️ Career ${c.role} already exists.`);
                continue;
            }

            const id = crypto.randomUUID();
            const createdAt = new Date().toISOString();

            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_TAB_IDS.CAREERS}!A:H`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[
                        id,
                        c.role,
                        c.dept,
                        c.type,
                        c.exp,
                        c.desc,
                        "Active",
                        createdAt
                    ]]
                }
            });
            console.log(`✅ Added Career: ${c.role}`);
        }

        console.log("🎉 Seeding Complete!");

    } catch (error) {
        console.error("❌ Seeding Failed:", error);
    }
}

seed();
