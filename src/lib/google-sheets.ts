
import { google } from 'googleapis';

export async function getGoogleSheetsInstance() {
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
        ],
    });

    return google.sheets({ version: 'v4', auth });
}

export const SHEET_TAB_IDS = {
    NOTICES: 'Notices',
    NEWS: 'News',
    CAREERS: 'Careers',
    GALLERY: 'Gallery',
};
