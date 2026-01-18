
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

// GET: Fetch all news
export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            return NextResponse.json({ error: "Configuration Error: Missing Sheet ID" }, { status: 500 });
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NEWS}!A2:G`, // Id, Title, Date, Content, Link, Status, CreatedAt
        });

        const rows = response.data.values || [];
        const news = rows.map((row) => ({
            id: row[0],
            title: row[1],
            date: row[2],
            description: row[3],
            imageUrl: row[4],
        }));

        // Reverse to show latest first
        return NextResponse.json({ data: news.reverse() });
    } catch (error) {
        console.error("News API Error:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

// POST: Add new news item
export async function POST(req: Request) {
    try {
        const { title, description, date, imageUrl } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        // Setup Schema: Id, Title, Date, Content, Link, Status, CreatedAt
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NEWS}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[id, title, date, description, imageUrl, "Active", createdAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Append Error:", error);
        return NextResponse.json({ error: "Failed to add news" }, { status: 500 });
    }
}

// PUT: Update news item
export async function PUT(req: Request) {
    try {
        const { id, title, description, date, imageUrl } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // 1. Find the Row Index by ID (UUID)
        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NEWS}!A:A`, // Read all IDs in Column A
        });

        const rows = readRes.data.values || [];
        const rowIndex = rows.findIndex((row) => row[0] === id); // 0-based index

        if (rowIndex === -1) {
            return NextResponse.json({ error: "News item not found" }, { status: 404 });
        }

        const sheetRowNumber = rowIndex + 1; // 1-based index for API

        // 2. Update the row
        // Columns: A=Id, B=Title, C=Date, D=Content, E=Link
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NEWS}!B${sheetRowNumber}:E${sheetRowNumber}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[title, date, description, imageUrl]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Update Error:", error);
        return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const { deleteRowById, SHEET_TAB_IDS } = await import("@/lib/google-sheets"); // Dynamic import to avoid circular dep if any

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await deleteRowById(SHEET_TAB_IDS.NEWS, id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
    }
}
