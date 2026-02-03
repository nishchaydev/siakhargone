import { getGoogleSheetsInstance, SHEET_TAB_IDS, deleteRowById } from "@/lib/google-sheets";

export interface EventItem {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    imageUrl: string; // "image" in component, "imageUrl" here for consistency
}

import { getCachedData } from "@/lib/cache-wrapper";

async function fetchEventsFromGoogleSheets(): Promise<EventItem[]> {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            console.error("Configuration Error: Missing Sheet ID");
            return [];
        }

        // Schema: Id, Title, Date, Time, Location, Description, ImageUrl, CreatedAt
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            // Simplify range to 'A:H' to avoid "Unable to parse range" if strict A2 usage is problematic for the API in some contexts
            range: `${SHEET_TAB_IDS.EVENTS || 'Events'}!A:H`,
        });

        const rows = response.data.values || [];
        const events = rows.map((row) => ({
            id: row[0],
            title: row[1],
            date: row[2],
            time: row[3],
            location: row[4],
            description: row[5],
            imageUrl: row[6],
        }));

        // Sort by date? or Reverse?
        return events.reverse();
    } catch (error: any) {
        console.error("Service Events Fetch Error:", error.message);

        // Debugging: List available sheets if the specific sheet fetch fails
        try {
            const sheets = await getGoogleSheetsInstance();
            const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
            if (spreadsheetId) {
                const metadata = await sheets.spreadsheets.get({ spreadsheetId });
                const sheetTitles = metadata.data.sheets?.map(s => s.properties?.title) || [];
                console.error(`FAILED to find sheet 'Events'. Available sheets are: ${sheetTitles.join(", ")}`);
            }
        } catch (metaError) {
            console.error("Could not fetch spreadsheet metadata for debugging.", metaError);
        }

        return []; // Return empty array to prevent app crash
    }
}

export async function getEventsService(): Promise<EventItem[]> {
    return getCachedData("events_data", fetchEventsFromGoogleSheets, 3600 * 1000); // 1 hour
}

export async function addEventService(item: { title: string, date: string, time: string, location: string, description: string, imageUrl: string }) {
    const sheets = await getGoogleSheetsInstance();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error("Missing ID");

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_TAB_IDS.EVENTS || 'Events'}!A:H`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[id, item.title, item.date, item.time, item.location, item.description, item.imageUrl, createdAt]],
        },
    });
    return true;
}

export async function deleteEventService(id: string) {
    if (!id) throw new Error("Missing ID");
    await deleteRowById(SHEET_TAB_IDS.EVENTS || 'Events', id);
    return true;
}
