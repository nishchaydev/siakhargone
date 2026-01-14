
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load env
try {
    const envPath = path.resolve(__dirname, '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, ...val] = line.split('=');
        if (key && val) process.env[key.trim()] = val.join('=').trim();
    });
} catch (e) {
    console.error("Could not read .env.local", e);
}

async function checkGallery() {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error("Missing Creds in env");
            return;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        console.log("Checking Sheet ID:", spreadsheetId);

        // Check Gallery Tab
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Gallery!A:C',
        });

        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.log("Sheet 'Gallery' is EMPTY (No rows returned).");
        } else {
            console.log(`Sheet 'Gallery' has ${rows.length} rows.`);
            if (rows.length > 0) console.log("Header/Row 1:", rows[0]);
            if (rows.length > 1) console.log("Last Row:", rows[rows.length - 1]);
        }

    } catch (e) {
        console.error("API Error:", e.message);
        if (e.response) {
            console.error("Error Status:", e.response.status);
            console.error("Error Data:", JSON.stringify(e.response.data, null, 2));
        }
    }
}

checkGallery();
