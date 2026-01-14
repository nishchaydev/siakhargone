
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { headers } from "next/headers";

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
            range: `${SHEET_TAB_IDS.NEWS}!A2:D`, // Columns: Title, Description, Date, ImageUrl
        });

        const rows = response.data.values || [];
        const news = rows.map((row, index) => ({
            id: index + 2, // Row number as ID
            title: row[0],
            description: row[1],
            date: row[2],
            imageUrl: row[3],
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

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NEWS}!A:D`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[title, description, date, imageUrl]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Append Error:", error);
        return NextResponse.json({ error: "Failed to add news" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, title, description, date, imageUrl } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.NEWS}!A${id}:D${id}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[title, description, date, imageUrl]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Update Error:", error);
        return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }
}
