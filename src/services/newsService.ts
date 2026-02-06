import { getGoogleSheetsInstance, SHEET_TAB_IDS, deleteRowById } from "@/lib/google-sheets";

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
}

import { getCachedData } from "@/lib/cache-wrapper";

async function fetchNewsFromGoogleSheets(): Promise<NewsItem[]> {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            console.error("Configuration Error: Missing Sheet ID");
            return [];
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NEWS}!A2:G`, // Id, Title, Date, Content, Link, Status, CreatedAt
        });

        const rows = response.data.values || [];
        const news = rows.map((row) => ({
            id: row[0],
            title: row[1],
            date: row[2],
            description: row[3],
            imageUrl: row[4],
        }));

        // Filter out empty rows and header rows
        return news.filter(n => n.id && n.id !== 'Id' && n.id !== 'id').reverse();
    } catch (error) {
        console.error("Service News Fetch Error:", error);
        throw error; // Throw to let cache handle stale data logic
    }
}

export async function getNewsService(): Promise<NewsItem[]> {
    return getCachedData("news_data", fetchNewsFromGoogleSheets, 10 * 1000); // 10 seconds 
}

export async function addNewsService(item: { title: string, description: string, date: string, imageUrl: string }) {
    const sheets = await getGoogleSheetsInstance();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error("Missing ID");

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.NEWS}!A:G`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[id, item.title, item.date, item.description, item.imageUrl, "Active", createdAt]],
        },
    });
    return true;
}

export async function updateNewsService(item: { id: string, title: string, description: string, date: string, imageUrl: string }) {
    const sheets = await getGoogleSheetsInstance();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error("Missing ID");

    // 1. Find the Row Index by ID (UUID)
    const readRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.NEWS}!A:A`,
    });

    const rows = readRes.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === item.id);

    if (rowIndex === -1) throw new Error("News item not found");

    const sheetRowNumber = rowIndex + 1;

    // 2. Update the row
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.NEWS}!B${sheetRowNumber}:E${sheetRowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[item.title, item.date, item.description, item.imageUrl]],
        },
    });
    return true;
}

export async function deleteNewsService(id: string) {
    if (!id) throw new Error("Missing ID");
    await deleteRowById(SHEET_TAB_IDS.NEWS, id);
    return true;
}
