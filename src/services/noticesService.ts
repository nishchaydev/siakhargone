
import { getGoogleSheetsInstance, SHEET_TAB_IDS, deleteRowById } from "@/lib/google-sheets";
import { getCachedData } from "@/lib/cache-wrapper";

export interface NoticeItem {
    id: string;
    title: string;
    date: string;
    pdfUrl: string; // URL to the PDF/Document
    important: boolean;
}

async function fetchNoticesFromGoogleSheets(): Promise<NoticeItem[]> {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            console.error("Configuration Error: Missing Sheet ID");
            return [];
        }

        // Schema: Id, Title, Date, PdfUrl, Important (TRUE/FALSE)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES || 'Notices'}!A:E`,
        });

        const rows = response.data.values || [];
        // Skip header if needed, but usually we handle empty/header check in map
        const notices = rows.map((row) => ({
            id: row[0],
            title: row[1],
            date: row[2],
            pdfUrl: row[3],
            important: row[4]?.toLowerCase() === 'true',
        }));

        // Filter out empty rows or headers if they don't have an ID
        return notices.filter(n => n.id && n.date).reverse();
    } catch (error: any) {
        console.error("Service Notices Fetch Error:", error.message);
        return [];
    }
}

export async function getNoticesService(): Promise<NoticeItem[]> {
    return getCachedData("notices_data", fetchNoticesFromGoogleSheets, 10 * 1000); // 10 seconds
}

export async function addNoticeService(item: { title: string, date: string, pdfUrl: string, important: boolean }) {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) throw new Error("Missing ID");

        const id = crypto.randomUUID();

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES || 'Notices'}!A:E`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[id, item.title, item.date, item.pdfUrl, item.important ? "TRUE" : "FALSE"]],
            },
        });
        return true;
    } catch (error) {
        console.error("addNoticeService failed:", error);
        throw error;
    }
}

export async function updateNoticeService(item: { id: string, title: string, date: string, pdfUrl: string, important: boolean }) {
    try {
        // 1. Fetch all to find index (Not optimized, but consistent with current simple implementation)
        // Ideally we'd use a lookup map if we had one, but for now we follow the pattern
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) throw new Error("Missing ID");

        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES || 'Notices'}!A:A`,
        });

        const rows = readRes.data.values || [];
        const rowIndex = rows.findIndex((row: any[]) => row[0] === item.id);

        if (rowIndex === -1) {
            throw new Error(`Notice with ID ${item.id} not found`);
        }

        const sheetRowNumber = rowIndex + 1;

        // 2. Update columns B, C, D, E (Title, Date, PdfUrl, Important)
        // B=Title, C=Date, D=PdfUrl, E=Important
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES || 'Notices'}!B${sheetRowNumber}:E${sheetRowNumber}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[item.title, item.date, item.pdfUrl, item.important ? "TRUE" : "FALSE"]],
            },
        });
        return true;
    } catch (error) {
        console.error("updateNoticeService failed:", error);
        throw error;
    }
}

export async function deleteNoticeService(id: string) {
    try {
        if (!id) throw new Error("Missing ID");
        await deleteRowById(SHEET_TAB_IDS.NOTICES || 'Notices', id);
        return true;
    } catch (error) {
        console.error("deleteNoticeService failed:", error);
        throw error;
    }
}
