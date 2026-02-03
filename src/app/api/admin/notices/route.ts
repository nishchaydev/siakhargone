
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES}!A2:G`,
        });

        const rows = response.data.values || [];
        const notices = rows.map((row) => ({
            id: row[0],
            text: row[1],
            date: row[2],
            isImportant: row[3] === "Important",
            link: row[4] || "#",
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

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        // Setup Schema: Id, Text, Date, Priority, Link, Status, CreatedAt
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[id, text, date, isImportant ? "Important" : "Normal", link, "Active", createdAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add notice" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, text, link, date, isImportant } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // 1. Find Row by UUID (Column A)
        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES}!A:A`,
        });

        const rows = readRes.data.values || [];
        const rowIndex = rows.findIndex((row) => row[0] === id);

        if (rowIndex === -1) {
            return NextResponse.json({ error: "Notice not found" }, { status: 404 });
        }

        const sheetRowNumber = rowIndex + 1;

        // 2. Update columns B, C, D, E (Text, Date, Priority, Link)
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NOTICES}!B${sheetRowNumber}:E${sheetRowNumber}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[text, date, isImportant ? "Important" : "Normal", link]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notice PUT Error:", error);
        return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const { deleteRowById, SHEET_TAB_IDS } = await import("@/lib/google-sheets");

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await deleteRowById(SHEET_TAB_IDS.NOTICES, id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notice DELETE Error:", error);
        return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
    }
}
