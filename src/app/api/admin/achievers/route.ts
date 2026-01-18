
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS, deleteRowById } from "@/lib/google-sheets";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `'${SHEET_TAB_IDS.STUDENT_ACHIEVERS}'!A2:I`,
        });

        const rows = response.data.values || [];
        const achievers = rows.map(row => ({
            id: row[0],
            name: row[1],
            class: row[2],
            achievement: row[3],
            category: row[4],
            imageUrl: row[5],
            priority: row[6],
            status: row[7],
            createdAt: row[8]
        })).filter(a => a.status !== 'Deleted'); // Soft delete check if we use it, but we implement hard delete primarily

        return NextResponse.json({ data: achievers });
    } catch (error) {
        console.error("Achievers GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch achievers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, studentClass, achievement, category, imageUrl, priority } = body;

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        const status = "Active";

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `'${SHEET_TAB_IDS.STUDENT_ACHIEVERS}'!A:I`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[id, name, studentClass, achievement, category, imageUrl, priority || "0", status, createdAt]]
            }
        });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error("Achievers POST Error:", error);
        return NextResponse.json({ error: "Failed to create achiever" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await deleteRowById(SHEET_TAB_IDS.STUDENT_ACHIEVERS, id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Achievers DELETE Error:", error);
        return NextResponse.json({ error: "Failed to delete achiever" }, { status: 500 });
    }
}
