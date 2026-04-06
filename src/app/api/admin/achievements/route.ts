
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";

const ACHIEVEMENTS_TAB_NAME = "Achievements";

// GET: List all Achievements
export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${ACHIEVEMENTS_TAB_NAME}!A2:L`,
            // 0:Id, 1:Title, 2:StudentName, 3:Class, 4:Date, 5:Description, 6:ImageUrl, 7:Priority, 8:Category, 9:Status, 10:CreatedAt, 11:MediaCoverage
        });

        const rows = response.data.values || [];
        const achievements = rows.map((row, i) => ({
            rowId: i + 2, // Excel/Sheet row number
            id: row[0] || (i + 2).toString(),
            title: row[1] || "",
            studentName: row[2] || "",
            class: row[3] || "",
            date: row[4] || "",
            description: row[5] || "",
            imageUrl: row[6] || "",
            priority: row[7] || "3",
            category: row[8] || "General",
            status: row[9] || "Active",
            createdAt: row[10] || "",
            mediaCoverage: row[11] === 'Yes'
        }));

        return NextResponse.json({ data: achievements });
    } catch (error) {
        console.error("Achievements GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch Achievements" }, { status: 500 });
    }
}

// POST: Add New Achievement
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const id = Date.now().toString();
        const createdAt = new Date().toISOString();
        const status = data.status || "Active";
        const mediaCoverage = data.mediaCoverage ? "Yes" : "No";

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${ACHIEVEMENTS_TAB_NAME}!A:L`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    id, 
                    data.title, 
                    data.studentName, 
                    data.class, 
                    data.date, 
                    data.description, 
                    data.imageUrl, 
                    data.priority || "3", 
                    data.category || "General", 
                    status, 
                    createdAt, 
                    mediaCoverage
                ]],
            },
        });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error("Achievement POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to add Achievement" }, { status: 500 });
    }
}

// PUT: Edit Achievement
export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const rowId = data.rowId;
        if (!rowId) return NextResponse.json({ error: "Missing Row ID" }, { status: 400 });

        const mediaCoverage = data.mediaCoverage ? "Yes" : "No";
        const range = `${ACHIEVEMENTS_TAB_NAME}!A${rowId}:L${rowId}`;

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    data.id,
                    data.title,
                    data.studentName,
                    data.class,
                    data.date,
                    data.description,
                    data.imageUrl,
                    data.priority,
                    data.category,
                    data.status,
                    data.createdAt,
                    mediaCoverage
                ]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Achievement PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update Achievement" }, { status: 500 });
    }
}

// DELETE: Delete Achievement
export async function DELETE(req: Request) {
    try {
        const { rowId } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!rowId) return NextResponse.json({ error: "Missing Row ID" }, { status: 400 });

        const rowIndex = parseInt(rowId) - 1;

        // Get Sheet ID
        const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId });
        const sheet = sheetMetadata.data.sheets?.find(s => s.properties?.title === ACHIEVEMENTS_TAB_NAME);
        if (!sheet || typeof sheet.properties?.sheetId === 'undefined') {
            throw new Error("Sheet not found");
        }
        const sheetId = sheet.properties.sheetId;

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: sheetId,
                                dimension: "ROWS",
                                startIndex: rowIndex,
                                endIndex: rowIndex + 1,
                            },
                        },
                    },
                ],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Achievement Delete Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete achievement" }, { status: 500 });
    }
}
