
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
};
