import { SheetService } from "@/lib/sheet-service";
import { SHEET_TAB_IDS } from "@/lib/google-sheets";
import { getCachedData } from "@/lib/cache-wrapper";

export interface ResultItem {
    id: string;
    title: string;
    examName: string;
    date: string;
    description: string;
    link: string;
    type: string; // Topper, General, HalfYearly
    topperName?: string;
    topperMarks?: string;
    mediaCoverage?: boolean;
}

async function fetchResultsFromGoogleSheets(): Promise<ResultItem[]> {
    try {
        // Header: ["Id", "Title", "ExamName", "Date", "Description", "Link", "Type", "TopperName", "TopperMarks", "Status", "CreatedAt", "MediaCoverage"]
        const rows = await SheetService.getRows(SHEET_TAB_IDS.RESULTS, 'A:L');

        const items = rows.map((row) => ({
            id: row[0],
            title: row[1],
            examName: row[2],
            date: row[3],
            description: row[4],
            link: row[5],
            type: row[6],
            topperName: row[7],
            topperMarks: row[8],
            status: row[9],
            mediaCoverage: row[11] === 'Yes'
        }));

        return items
            .filter(item => item.id && item.id !== 'Id' && item.status === 'Active')
            .reverse();
    } catch (error) {
        console.error("Service Results Fetch Error:", error);
        return [];
    }
}

export async function getResultsService(): Promise<ResultItem[]> {
    return getCachedData("results_data", fetchResultsFromGoogleSheets, 60);
}

export async function addResult(data: Omit<ResultItem, 'id'>): Promise<string> {
    try {
        const id = Date.now().toString();
        const row = [
            id,
            data.title,
            data.examName,
            data.date,
            data.description,
            data.link,
            data.type,
            data.topperName || '',
            data.topperMarks || '',
            'Active',
            new Date().toISOString(),
            data.mediaCoverage ? 'Yes' : 'No'
        ];
        await SheetService.appendRow(SHEET_TAB_IDS.RESULTS, row);
        return id;
    } catch (error) {
        console.error("addResult failed:", error);
        throw error;
    }
}
