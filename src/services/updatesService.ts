import { SheetService } from "@/lib/sheet-service";
import { SHEET_TAB_IDS } from "@/lib/google-sheets";
import { getCachedData } from "@/lib/cache-wrapper";

export interface UpdateItem {
    id: string;
    content: string;
    date: string;
    type: string; // Urgent, General, Info, Holiday
    link: string;
    showOnHomepage: boolean;
}

async function fetchUpdatesFromGoogleSheets(): Promise<UpdateItem[]> {
    try {
        // Header: ["Id", "Content", "Date", "Type", "Link", "Status", "ShowOnHomepage", "CreatedAt"]
        const rows = await SheetService.getRows(SHEET_TAB_IDS.UPDATES, 'A:G');

        const items = rows.map((row) => ({
            id: row[0],
            content: row[1],
            date: row[2],
            type: row[3],
            link: row[4],
            status: row[5],
            showOnHomepage: row[6] === 'Yes' || row[6] === 'TRUE'
        }));

        return items
            .filter(item => item.id && item.id !== 'Id' && item.status === 'Active')
            .reverse();
    } catch (error) {
        console.error("Service Updates Fetch Error:", error);
        return [];
    }
}

export async function getUpdatesService(): Promise<UpdateItem[]> {
    return getCachedData("updates_data", fetchUpdatesFromGoogleSheets, 30); // Shorter cache for updates
}

export async function addUpdate(data: Omit<UpdateItem, 'id'>): Promise<string> {
    try {
        const id = Date.now().toString();
        const row = [
            id,
            data.content,
            data.date,
            data.type,
            data.link,
            'Active',
            data.showOnHomepage ? 'Yes' : 'No',
            new Date().toISOString()
        ];
        await SheetService.appendRow(SHEET_TAB_IDS.UPDATES, row);
        return id;
    } catch (error) {
        console.error("addUpdate failed:", error);
        throw error;
    }
}
