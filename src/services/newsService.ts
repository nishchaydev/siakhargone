import { SheetService } from "@/lib/sheet-service";
import { SHEET_TAB_IDS } from "@/lib/google-sheets";
import { getCachedData } from "@/lib/cache-wrapper";

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
}

async function fetchNewsFromGoogleSheets(): Promise<NewsItem[]> {
    try {
        // Fetch columns A to H (Index 0 to 7)
        // A: Id, B: Title, C: Date, D: Description, E: ImageUrl, F: Status, G: CreatedAt, H: IsFeatured
        const rows = await SheetService.getRows(SHEET_TAB_IDS.NEWS, 'A:H');

        const news = rows.map((row) => ({
            id: row[0],
            title: row[1],
            date: row[2],
            description: row[3],
            imageUrl: row[4],
            isFeatured: row[7] === 'TRUE' || row[7] === undefined || row[7] === '' // Default to TRUE if empty logic
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

export async function addNewsService(item: { title: string, description: string, date: string, imageUrl: string, isFeatured: boolean }) {
    try {
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        // Col structure: Id, Title, Date, Description, ImageUrl, Status, CreatedAt, IsFeatured
        const values = [id, item.title, item.date, item.description, item.imageUrl, "Active", createdAt, item.isFeatured ? 'TRUE' : 'FALSE'];

        await SheetService.appendRow(SHEET_TAB_IDS.NEWS, values);
        return true;
    } catch (error) {
        console.error("addNewsService failed:", error);
        throw error;
    }
}

export async function updateNewsService(item: { id: string, title: string, description: string, date: string, imageUrl: string, isFeatured: boolean }) {
    try {
        // 1. Fetch current data to preserve CreatedAt (and ensure existence)
        const rows = await SheetService.getRows(SHEET_TAB_IDS.NEWS, 'A:H');
        const existingRow = rows.find(r => r[0] === item.id);

        if (!existingRow) {
            throw new Error(`News item with ID ${item.id} not found`);
        }

        const createdAt = existingRow[6] || new Date().toISOString(); // Preserve CreatedAt or default
        const currentStatus = existingRow[5] || "Active"; // Preserve Status or default to Active

        // 2. Prepare values for Cols B -> H (Index 1 -> 7)
        // Structure: [Title, Date, Description, ImageUrl, Status, CreatedAt, IsFeatured]
        const values = [
            item.title,
            item.date,
            item.description,
            item.imageUrl,
            currentStatus,
            createdAt,
            item.isFeatured ? 'TRUE' : 'FALSE'
        ];

        await SheetService.updateRowById(SHEET_TAB_IDS.NEWS, item.id, values);
        return true;
    } catch (error) {
        console.error("Update News Error:", error);
        throw error;
    }
}

export async function deleteNewsService(id: string) {
    await SheetService.deleteRowById(SHEET_TAB_IDS.NEWS, id);
    return true;
}
