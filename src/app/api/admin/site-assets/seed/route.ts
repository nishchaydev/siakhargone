
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { cloudinary } from "@/lib/cloudinary-images";

export const dynamic = 'force-dynamic';

// Define the mapping of keys we want to manage to their default values
const DEFAULT_ASSETS_MAP: Record<string, { section: string, url: string, alt: string }> = {
    // Hero
    "hero_slide_1": { section: "hero", url: cloudinary.infrastructure.building[0], alt: "School Building" },
    "hero_slide_2": { section: "hero", url: cloudinary.infrastructure.classrooms[0], alt: "Classroom" },
    "hero_slide_3": { section: "hero", url: cloudinary.rainyDay[2], alt: "Rainy Day Plantation" },
    "hero_slide_4": { section: "hero", url: cloudinary.infrastructure.library[1], alt: "Library" },

    // Banners
    "banner_about": { section: "banners", url: cloudinary.infrastructure.building[1], alt: "About Banner" },
    "banner_admissions": { section: "banners", url: cloudinary.sessionStart[0], alt: "Admissions Banner" },
    "banner_academics": { section: "banners", url: cloudinary.infrastructure.classrooms[2], alt: "Academics Banner" },
    "banner_contact": { section: "banners", url: cloudinary.infrastructure.computerLab[1], alt: "Contact Banner" }, // Fallback to lab image if others missing

    // Life at SIA
    "life_assembly": { section: "life_at_sia", url: cloudinary.sessionStart[0], alt: "Morning Assembly" },
    "life_library": { section: "life_at_sia", url: cloudinary.infrastructure.library[0], alt: "Library Time" },
    "life_labs": { section: "life_at_sia", url: cloudinary.lab.computer[0], alt: "Innovation Labs" },
    "life_sports": { section: "life_at_sia", url: cloudinary.sportsAchievements[2], alt: "Sports" },

    // Infrastructure (Gallery/Highlights)
    "infra_classroom": { section: "infrastructure", url: cloudinary.infrastructure.classrooms[0], alt: "Classrooms" },
    "infra_library": { section: "infrastructure", url: cloudinary.infrastructure.library[0], alt: "Library" },
    "infra_computer_lab": { section: "infrastructure", url: cloudinary.infrastructure.computerLab[0], alt: "Computer Lab" },
    "infra_sports_ground": { section: "infrastructure", url: cloudinary.infrastructure.others[3], alt: "Sports Ground" },

    // Sports
    "sports_achievement_1": { section: "sports", url: cloudinary.sportsAchievements[0], alt: "Sports Achievement 1" },
    "sports_achievement_2": { section: "sports", url: cloudinary.sportsAchievements[1], alt: "Sports Achievement 2" },

    // Hall of Fame (Student Achievers)
    "hof_1": { section: "hall_of_fame", url: cloudinary.districtLevelTaekwando[0], alt: "Hall of Fame 1" },
    "hof_2": { section: "hall_of_fame", url: cloudinary.sportsAchievements[5], alt: "Hall of Fame 2" },
    "hof_3": { section: "hall_of_fame", url: cloudinary.districtLevelTaekwando[3], alt: "Hall of Fame 3" },
};

export async function POST(req: Request) {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // 1. Get existing data to avoid duplicates
        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.SITE_ASSETS}!C:C`, // Get Keys
        });

        const existingKeys = new Set(readRes.data.values?.flat() || []);

        const newRows: any[] = [];
        const timestamp = new Date().toISOString();

        for (const [key, def] of Object.entries(DEFAULT_ASSETS_MAP)) {
            if (!existingKeys.has(key)) {
                // Key doesn't exist, append it
                const id = crypto.randomUUID();
                newRows.push([id, def.section, key, def.url, def.alt, timestamp]);
            }
        }

        if (newRows.length > 0) {
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${SHEET_TAB_IDS.SITE_ASSETS}!A:F`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: newRows
                }
            });
            return NextResponse.json({ success: true, message: `Seeded ${newRows.length} assets.` });
        } else {
            return NextResponse.json({ success: true, message: "All assets already exist." });
        }

    } catch (error) {
        console.error("Seed Assets Error:", error);
        return NextResponse.json({ error: "Failed to seed assets" }, { status: 500 });
    }
}
