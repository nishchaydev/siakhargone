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
    status?: string;
}

export function normalizeAchievement(raw: any): AchievementItem {
    return {
        id: String(raw.id || raw[0] || ""),
        title: String(raw.title || raw[1] || ""),
        studentName: String(raw.studentName || raw[2] || ""),
        class: String(raw.class || raw[3] || ""),
        date: String(raw.date || raw[4] || ""),
        description: String(raw.description || raw[5] || ""),
        imageUrl: String(raw.imageUrl || raw[6] || ""),
        priority: String(raw.priority || raw[7] || "3"),
        category: String(raw.category || raw[8] || "General"),
        status: String(raw.status || raw[9] || "Active"),
        mediaCoverage: raw.mediaCoverage === true || raw[11] === 'Yes'
    };
}

async function fetchAchievementsFromGoogleSheets(): Promise<AchievementItem[]> {
    try {
        // Fetch columns A to L (Id to MediaCoverage)
        // Header: ["Id", "Title", "StudentName", "Class", "Date", "Description", "ImageUrl", "Priority", "Category", "Status", "CreatedAt", "MediaCoverage"]
        const rows = await SheetService.getRows(SHEET_TAB_IDS.ACHIEVEMENTS, 'A:L');

        const items = rows.map(normalizeAchievement);

        return items
            .filter(item => item.id && item.id !== 'Id' && (item.status === 'Active' || !item.status)) // Allow items if status is 'Active' or missing
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
