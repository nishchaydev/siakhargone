
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";

const TAB_NAME = "Applications";

export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${TAB_NAME}!A2:I`,
        });

        const rows = response.data.values || [];
        const applications = rows.map((row, index) => ({
            id: index + 2, // Row number as temporary ID
            name: row[0],
            phone: row[1],
            email: row[2],
            role: row[3],
            resumeLink: row[4],
            coverLetter: row[5],
            date: row[6],
            status: row[7] || "New",
            notes: row[8] || ""
        })).reverse(); // Show newest first

        return NextResponse.json({ data: applications });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, status, notes } = await req.json(); // id is row number

        if (!id || !status) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        // Update Status (Column H -> Index 7)
        if (status) {
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${TAB_NAME}!H${id}`,
                valueInputOption: "USER_ENTERED",
                requestBody: { values: [[status]] }
            });
        }

        // Update Notes (Column I -> Index 8)
        if (notes !== undefined) {
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${TAB_NAME}!I${id}`,
                valueInputOption: "USER_ENTERED",
                requestBody: { values: [[notes]] }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Update Error", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json(); // id is row number (1-based from sheet perspective, e.g., 2, 3...)
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        // Calculate grid index (0-based). Row 1 is index 0.
        // If id is 2, index is 1.
        const rowIndex = parseInt(id) - 1;

        // Get Sheet ID for "Applications"
        const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId });
        const sheet = sheetMetadata.data.sheets?.find(s => s.properties?.title === TAB_NAME);
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
        console.error("Application Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
    }
}
