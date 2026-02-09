import { SheetService } from "@/lib/sheet-service";
import { SHEET_TAB_IDS } from "@/lib/google-sheets";
import { getCachedData } from "@/lib/cache-wrapper";

export interface EventItem {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    imageUrl: string;
}

async function fetchEventsFromGoogleSheets(): Promise<EventItem[]> {
    try {
        const rows = await SheetService.getRows(SHEET_TAB_IDS.EVENTS || 'Events', 'A:H');

        const events = rows.map((row) => ({
            id: row[0],
            title: row[1],
            date: row[2],
            time: row[3],
            location: row[4],
            description: row[5],
            imageUrl: row[6],
        }));

        return events.reverse();
    } catch (error: any) {
        console.error("Service Events Fetch Error:", error.message || error);
        return [];
    }
}

export async function getEventsService(): Promise<EventItem[]> {
    return getCachedData("events_data", fetchEventsFromGoogleSheets, 10 * 1000);
}

export async function addEventService(item: { title: string, date: string, time: string, location: string, description: string, imageUrl: string }) {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    // Col structure: Id, Title, Date, Time, Location, Description, ImageUrl, CreatedAt
    const values = [id, item.title, item.date, item.time, item.location, item.description, item.imageUrl, createdAt];

    await SheetService.appendRow(SHEET_TAB_IDS.EVENTS || 'Events', values);
    return true;
}

export async function deleteEventService(id: string) {
    await SheetService.deleteRowById(SHEET_TAB_IDS.EVENTS || 'Events', id);
    return true;
}
