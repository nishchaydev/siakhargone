
const { google } = require('googleapis');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function getGoogleSheetsInstance() {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        throw new Error('Missing Google Service Account credentials');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
}

async function checkAchievements() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        const sheetName = 'Achievements';

        console.log(`Checking Spreadsheet: ${spreadsheetId}`);
        console.log(`Sheet Name: ${sheetName}`);

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A:L`,
        });

        const rows = response.data.values || [];
        console.log(`Total rows found (including header): ${rows.length}`);

        if (rows.length > 0) {
            console.log("Headers:", rows[0]);
            const dataRows = rows.slice(1);
            const activeRows = dataRows.filter(row => row[9] === 'Active');
            console.log(`Active rows count: ${activeRows.length}`);
            
            if (activeRows.length > 0) {
                console.log("First Active row sample:", activeRows[0]);
            } else {
                console.log("WARNING: No rows with status 'Active' found!");
                if (dataRows.length > 0) {
                    console.log("First data row status:", dataRows[0][9]);
                }
            }
        } else {
            console.log("ERROR: No data found in the 'Achievements' sheet!");
        }

    } catch (error) {
        console.error("Error checking achievements:", error.message);
    }
}

checkAchievements();
