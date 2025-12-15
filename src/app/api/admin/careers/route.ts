
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // Fetch Careers
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.CAREERS}!A2:D`, // Role, Experience, Description, Active
        });

        const rows = response.data.values || [];
        const careers = rows.map((row, i) => ({
            id: i + 2,
            role: row[0],
            experience: row[1],
            description: row[2],
            isActive: row[3] === "TRUE",
        })).filter(j => j.isActive); // Only show active jobs

        return NextResponse.json({ data: careers });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { role, experience, description, isActive } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.CAREERS}!A:D`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[role, experience, description, isActive ? "TRUE" : "FALSE"]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add career" }, { status: 500 });
    }
}
