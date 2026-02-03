
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";

const RESULTS_TAB_NAME = "Results"; // Must match sheet tab name

// GET: List all Results
export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${RESULTS_TAB_NAME}!A2:I`,
            // 0:AdmissionNo, 1:DOB, 2:Name, 3:Class, 4:Exam, 5:Link, 6:Status, 7:CreatedAt
        });

        const rows = response.data.values || [];
        const results = rows.map((row, i) => ({
            id: i + 2,
            admissionNo: row[0],
            dob: row[1],
            studentName: row[2],
            class: row[3],
            examName: row[4],
            resultLink: row[5],
            status: row[6],
            createdAt: row[7]
        }));

        return NextResponse.json({ data: results });
    } catch (error) {
        console.error("Results GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch Results" }, { status: 500 });
    }
}

// POST: Upload New Result
export async function POST(req: Request) {
    try {
        const { admissionNo, dob, studentName, className, examName, resultLink } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const createdAt = new Date().toISOString();
        const status = "Published";

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${RESULTS_TAB_NAME}!A:H`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[admissionNo, dob, studentName, className, examName, resultLink, status, createdAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Result POST Error:", error);
        return NextResponse.json({ error: "Failed to add Result" }, { status: 500 });
    }
}

// PUT: Edit Result
export async function PUT(req: Request) {
    try {
        const { id, admissionNo, dob, studentName, className, examName, resultLink, status } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // Preserve CreatedAt (Col H / Index 7)
        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${RESULTS_TAB_NAME}!H${id}`,
        });
        const currentCreatedAt = readRes.data.values?.[0]?.[0] || new Date().toISOString();

        const range = `${RESULTS_TAB_NAME}!A${id}:H${id}`;

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[admissionNo, dob, studentName, className, examName, resultLink, status, currentCreatedAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Result PUT Error:", error);
        return NextResponse.json({ error: "Failed to update Result" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json(); // id is row number
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        const rowIndex = parseInt(id) - 1;

        // Get Sheet ID
        const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId });
        const sheet = sheetMetadata.data.sheets?.find(s => s.properties?.title === RESULTS_TAB_NAME);
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
        console.error("Result Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete result" }, { status: 500 });
    }
}
