import { SheetService } from "@/lib/sheet-service";
import { SHEET_TAB_IDS } from "@/lib/google-sheets";
import { getCachedData } from "@/lib/cache-wrapper";

export interface AchievementItem {
    id: string;
    title: string;
    studentName: string;
    class: string;
    date: string;
    description: string;
    imageUrl: string;
    priority: string; // "1", "2", "3"
    category: string;
    mediaCoverage?: boolean;
}

async function fetchAchievementsFromGoogleSheets(): Promise<AchievementItem[]> {
    try {
        // Fetch columns A to L (Id to MediaCoverage)
        // Header: ["Id", "Title", "StudentName", "Class", "Date", "Description", "ImageUrl", "Priority", "Category", "Status", "CreatedAt", "MediaCoverage"]
        const rows = await SheetService.getRows(SHEET_TAB_IDS.ACHIEVEMENTS, 'A:L');

        const items = rows.map((row) => ({
            id: row[0],
            title: row[1],
            studentName: row[2],
            class: row[3],
            date: row[4],
            description: row[5],
            imageUrl: row[6],
            priority: row[7],
            category: row[8],
            status: row[9],
            mediaCoverage: row[11] === 'Yes'
        }));

        return items
            .filter(item => item.id && item.id !== 'Id' && item.status === 'Active')
            .reverse(); // Newest first
    } catch (error) {
        console.error("Service Achievements Fetch Error:", error);
        return [];
    }
}

export async function getAchievementsService(): Promise<AchievementItem[]> {
    return getCachedData("achievements_data", fetchAchievementsFromGoogleSheets, 60);
}

export async function addAchievement(data: Omit<AchievementItem, 'id'>): Promise<string> {
    const id = Date.now().toString();
    const row = [
        id,
        data.title,
        data.studentName,
        data.class,
        data.date,
        data.description,
        data.imageUrl,
        data.priority,
        data.category,
        'Active',
        new Date().toISOString(),
        data.mediaCoverage ? 'Yes' : 'No'
    ];
    await SheetService.appendRow(SHEET_TAB_IDS.ACHIEVEMENTS, row);
    return id;
}
