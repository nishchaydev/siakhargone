
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
}

export async function deleteNoticeService(id: string) {
    if (!id) throw new Error("Missing ID");
    await deleteRowById(SHEET_TAB_IDS.NOTICES || 'Notices', id);
    return true;
}
