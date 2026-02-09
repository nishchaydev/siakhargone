import { google } from 'googleapis';
import { SHEET_TAB_IDS } from './google-sheets'; // Import constants from existing file

export type FixReport = {
    fixed: string[];
    missing: string[];
    errors: string[];
};

export async function verifyAndFixSheets(): Promise<FixReport> {
    const report: FixReport = { fixed: [], missing: [], errors: [] };

    if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        report.errors.push("Missing Google Credentials");
        return report;
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

    try {
        // 1. Get current sheets
        const metadata = await sheets.spreadsheets.get({ spreadsheetId });
        const currentSheetTitles = metadata.data.sheets?.map(s => s.properties?.title) || [];

        // 2. Define required schema
        // Defined as [SheetName, HeaderRow[]]
        const requiredSheets: [string, string[]][] = [
            [SHEET_TAB_IDS.NEWS, ['id', 'title', 'date', 'description', 'image', 'link', 'is_visible']],
            [SHEET_TAB_IDS.EVENTS, ['id', 'title', 'start_date', 'end_date', 'description', 'image', 'location', 'is_visible']],
            [SHEET_TAB_IDS.NOTICES, ['id', 'title', 'date', 'pdf_link', 'is_visible']],
            [SHEET_TAB_IDS.GALLERY, ['id', 'title', 'category', 'image_url', 'date', 'description']],
            [SHEET_TAB_IDS.CAREERS, ['id', 'position', 'experience', 'qualification', 'description', 'is_active']],
            [SHEET_TAB_IDS.APPLICATIONS, ['id', 'job_id', 'applicant_name', 'email', 'phone', 'resume_link', 'date']],
            [SHEET_TAB_IDS.ENQUIRIES, ['id', 'name', 'email', 'phone', 'subject', 'message', 'date', 'status']],
            [SHEET_TAB_IDS.ADMISSIONS, ['id', 'student_name', 'grade', 'parent_phone', 'status', 'date']],
        ];

        // 3. Check and Create
        const requests: any[] = [];

        for (const [sheetName, headers] of requiredSheets) {
            if (!currentSheetTitles.includes(sheetName)) {
                // Create missing sheet
                report.missing.push(`Sheet: ${sheetName}`);

                const addSheetRequest = {
                    addSheet: {
                        properties: { title: sheetName }
                    }
                };

                // We need to execute addSheet immediately to get the sheetId? 
                // Actually batchUpdate can handle it, but appending data to a new sheet in the same batch is tricky if we don't know the ID?
                // Standard Sheets API allows addressing by title for values.append, but for formatting/headers we might need IDs.
                // Simplest approach: Create sheet, then append headers.

                try {
                    await sheets.spreadsheets.batchUpdate({
                        spreadsheetId,
                        requestBody: { requests: [addSheetRequest] }
                    });

                    // Now add headers
                    await sheets.spreadsheets.values.append({
                        spreadsheetId,
                        range: `${sheetName}!A1`,
                        valueInputOption: 'USER_ENTERED',
                        requestBody: { values: [headers] }
                    });

                    report.fixed.push(`Created Sheet: ${sheetName} with headers`);
                } catch (err: any) {
                    report.errors.push(`Failed to create ${sheetName}: ${err.message}`);
                }
            } else {
                // Sheet exists, check headers (optional, for now just ensuring existence)
                // We could check if A1 matches 'id', but let's be non-destructive and safe.
            }
        }

    } catch (error: any) {
        report.errors.push(`General Error: ${error.message}`);
    }

    return report;
}
