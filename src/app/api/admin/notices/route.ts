
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES}!A2:D`, // Text, Link, Date, Priority
        });

        const rows = response.data.values || [];
        const notices = rows.map((row, i) => ({
            id: i + 2,
            text: row[0],
            link: row[1] || "#",
            date: row[2],
            isImportant: row[3] === "TRUE",
        }));

        return NextResponse.json({ data: notices.reverse() });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { text, link, date, isImportant } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES}!A:D`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[text, link, date, isImportant ? "TRUE" : "FALSE"]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add notice" }, { status: 500 });
    }
}
