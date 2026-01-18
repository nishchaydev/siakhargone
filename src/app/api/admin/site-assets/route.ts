
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const section = searchParams.get('section');

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.SITE_ASSETS}!A2:F`,
        });

        const rows = response.data.values || [];
        // Map to structured objects
        let assets = rows.map(row => ({
            id: row[0],
            section: row[1],
            key: row[2],
            imageUrl: row[3],
            altText: row[4],
            updatedAt: row[5]
        }));

        if (section) {
            assets = assets.filter(a => a.section === section);
        }

        return NextResponse.json({ data: assets });
    } catch (error) {
        console.error("Site Assets GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        // We will likely upsert here. If Key+Section exists, update it. Else append.
        const { section, key, imageUrl, altText } = await req.json();

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // 1. Read all to find match
        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.SITE_ASSETS}!A:C`, // Get Id,Section,Key
        });

        const rows = readRes.data.values || [];
        // Skip header
        const dataRows = rows.slice(1);

        // Find row index (0-based in dataRows means +2 for A1 index if header is row 1)
        // Wait, dataRows is slice(1). So original index is index+1.
        // Actually, let's just use original rows to simplify index calc.

        const rowIndex = rows.findIndex(row => row[1] === section && row[2] === key);

        const timestamp = new Date().toISOString();

        if (rowIndex !== -1) {
            // Update
            const sheetRow = rowIndex + 1; // 1-based
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${SHEET_TAB_IDS.SITE_ASSETS}!D${sheetRow}:F${sheetRow}`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[imageUrl, altText, timestamp]]
                }
            });
        } else {
            // Insert
            const id = crypto.randomUUID();
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${SHEET_TAB_IDS.SITE_ASSETS}!A:F`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[id, section, key, imageUrl, altText, timestamp]]
                }
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Site Assets PUT Error:", error);
        return NextResponse.json({ error: "Failed to update asset" }, { status: 500 });
    }
}
