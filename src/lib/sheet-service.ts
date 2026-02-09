import { google } from 'googleapis';
import { unstable_cache } from 'next/cache';

// Re-use auth logic from the original file (or we could import it if we refactor)
// For now, duplicating the auth setup to keep this file self-contained and safe
// until we fully migrate.

const getAuth = () => {
    if (
        !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
        !process.env.GOOGLE_PRIVATE_KEY
    ) {
        throw new Error('Missing Google Service Account credentials');
    }

    return new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ],
    });
};

export class SheetService {
    private static spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    /**
     * Fetch rows from a specific sheet tab with caching.
     * Cache invalidates every 60 seconds or can be manually revalidated with tags.
     */
    static async getRows(sheetName: string, range: string = 'A:Z') {
        if (!this.spreadsheetId) throw new Error("Missing Google Sheet ID");

        const fetchRows = async () => {
            const auth = getAuth();
            const sheets = google.sheets({ version: 'v4', auth });

            try {
                const response = await sheets.spreadsheets.values.get({
                    spreadsheetId: this.spreadsheetId!,
                    range: `${sheetName}!${range}`,
                });
                return response.data.values || [];
            } catch (error) {
                console.error(`Error fetching rows from ${sheetName}:`, error);
                return [];
            }
        };

        // Use Next.js unstable_cache for caching
        // Tag: `sheet-${sheetName}` allows us to revalidate specific sheets later
        return unstable_cache(
            fetchRows,
            [`sheet-${sheetName}`],
            { revalidate: 60, tags: [`sheet-${sheetName}`] }
        )();
    }

    /**
     * Append a row to the sheet (No Caching - Direct Write)
     */
    static async appendRow(sheetName: string, values: string[]) {
        if (!this.spreadsheetId) throw new Error("Missing Google Sheet ID");

        const auth = getAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: `${sheetName}!A:A`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [values],
            },
        });
    }

    /**
     * Delete a row by ID (assumed to be in the first column)
     */
    static async deleteRowById(sheetName: string, id: string) {
        if (!this.spreadsheetId) throw new Error("Missing Google Sheet ID");

        const auth = getAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // 1. Get all data to find the row index (We can't use cache here, need fresh data)
        // fetching just column A to save bandwidth
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: `${sheetName}!A:A`,
        });

        const rows = response.data.values || [];
        const rowIndex = rows.findIndex((row) => row[0] === id);

        if (rowIndex === -1) {
            throw new Error("Item not found");
        }

        // 2. Get Sheet ID to perform deleteDimension
        const sheetMetadata = await sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId,
        });
        const sheet = sheetMetadata.data.sheets?.find(s => s.properties?.title === sheetName);

        if (!sheet || typeof sheet.properties?.sheetId === 'undefined') {
            throw new Error(`Sheet ${sheetName} not found`);
        }

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            requestBody: {
                requests: [{
                    deleteDimension: {
                        range: {
                            sheetId: sheet.properties?.sheetId,
                            dimension: "ROWS",
                            startIndex: rowIndex,
                            endIndex: rowIndex + 1,
                        },
                    },
                }],
            },
        });
    }
    /**
     * Update a row by ID (assumed to be in the first column)
     * @param sheetName The name of the sheet tab
     * @param id The ID to find
     * @param values The new values for the row (excluding ID if you want to keep it, but usually the whole row)
     *               Note: logic below assumes values[0] is NOT the ID, but the columns AFTER ID.
     *               Adjust based on your usage.
     *               Standardizing: We will find row by ID (Col A), then update Col B onwards.
     */
    static async updateRowById(sheetName: string, id: string, values: string[]) {
        if (!this.spreadsheetId) throw new Error("Missing Google Sheet ID");

        const auth = getAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // 1. Find Row Index
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: `${sheetName}!A:A`,
        });

        const rows = response.data.values || [];
        const rowIndex = rows.findIndex((row) => row[0] === id);

        if (rowIndex === -1) {
            throw new Error("Item not found");
        }

        const sheetRowNumber = rowIndex + 1;

        // 2. Update Row (Column B onwards)
        // Adjust range end column based on values length. B is index 1.
        // If values has 3 items, we update B, C, D.
        const endColChar = String.fromCharCode(66 + values.length - 1); // 66 is 'B'

        await sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: `${sheetName}!B${sheetRowNumber}:${endColChar}${sheetRowNumber}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [values],
            },
        });
    }
}
