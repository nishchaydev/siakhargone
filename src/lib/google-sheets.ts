
import { google } from 'googleapis';

export async function getGoogleSheetsInstance() {
    if (
        !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
        !process.env.GOOGLE_PRIVATE_KEY
    ) {
        console.error("⚠️ Missing Google Service Account credentials.");
        throw new Error('Missing Google Service Account credentials');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ],
    });

    return google.sheets({ version: 'v4', auth });
}

export async function getGoogleDriveInstance() {
    if (
        !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
        !process.env.GOOGLE_PRIVATE_KEY
    ) {
        throw new Error('Missing Google Service Account credentials');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ],
    });

    return google.drive({ version: 'v3', auth });
}

export const SHEET_TAB_IDS = {
    NOTICES: 'Notices',
    NEWS: 'News',
    CAREERS: 'Careers',
    GALLERY: 'Gallery',
    APPLICATIONS: 'Applications',
    // Ideally we should purely rely on the script ensuring tabs exist, but here we define the constant for usage. 
    // Wait, the API uses string ranges like 'News!A1:D', so we just need to know the TITLE. 
    // The previous code in route.ts used SHEET_TAB_IDS.CAREERS which was a string 'Careers' in previous edits? 
    // Let's check the file content of google-sheets.ts first to be consistent. 
    // Actually, I'll VIEW the file first to be safe.
    TRANSFER_CERTIFICATES: 'TransferCertificates',
    ENQUIRIES: 'Enquiries',
    ADMISSIONS: 'Admissions',
    EVENTS: 'Events',
};

export async function deleteRowById(sheetName: string, id: string, columnIndex: number = 0) {
    const sheets = await getGoogleSheetsInstance();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadsheetId) throw new Error("Missing Google Sheet ID");

    // 1. Find the row index
    // We fetch A:A to find the ID. 
    // Note: This relies on ID being in the first column (index 0) by default, or specified index.
    // Use the column letter based on index? For simple case, let's assume A:A if index is 0.
    // If index > 0, we can fetch the specific column.

    // Convert column index to letter (0 -> A, 1 -> B). Simple implementation for A-Z.
    const columnLetter = String.fromCharCode(65 + columnIndex);

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!${columnLetter}:${columnLetter}`,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === id); // row[0] because we only fetched one column

    if (rowIndex === -1) {
        throw new Error("Item not found");
    }

    // 2. Get Sheet Grid ID (required for deleteDimension)
    const sheetMetadata = await sheets.spreadsheets.get({
        spreadsheetId,
    });

    const sheet = sheetMetadata.data.sheets?.find(s => s.properties?.title === sheetName);
    if (!sheet || typeof sheet.properties?.sheetId === 'undefined') {
        throw new Error(`Sheet ${sheetName} not found`);
    }

    const sheetId = sheet.properties.sheetId;

    // 3. Delete the row
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId: sheetId,
                            dimension: "ROWS",
                            startIndex: rowIndex,
                            endIndex: rowIndex + 1,
                        },
                    },
                },
            ],
        },
    });
}
