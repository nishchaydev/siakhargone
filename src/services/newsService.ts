import { SheetService } from "@/lib/sheet-service";
import { SHEET_TAB_IDS } from "@/lib/google-sheets";
import { getCachedData } from "@/lib/cache-wrapper";

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
}

async function fetchNewsFromGoogleSheets(): Promise<NewsItem[]> {
    try {
        // Fetch columns A to G
        const rows = await SheetService.getRows(SHEET_TAB_IDS.NEWS, 'A:G');

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
        return [];
    }
}

export async function getNewsService(): Promise<NewsItem[]> {
    return getCachedData("news_data", fetchNewsFromGoogleSheets, 10 * 1000);
}

export async function addNewsService(item: { title: string, description: string, date: string, imageUrl: string }) {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    // Col structure: Id, Title, Date, Description, ImageUrl, Status, CreatedAt
    const values = [id, item.title, item.date, item.description, item.imageUrl, "Active", createdAt];

    await SheetService.appendRow(SHEET_TAB_IDS.NEWS, values);
    return true;
}

export async function updateNewsService(item: { id: string, title: string, description: string, date: string, imageUrl: string }) {
    // Update cols B, C, D, E (Title, Date, Description, ImageUrl)
    const values = [item.title, item.date, item.description, item.imageUrl];
    await SheetService.updateRowById(SHEET_TAB_IDS.NEWS, item.id, values);
    return true;
}

export async function deleteNewsService(id: string) {
    await SheetService.deleteRowById(SHEET_TAB_IDS.NEWS, id);
    return true;
}
