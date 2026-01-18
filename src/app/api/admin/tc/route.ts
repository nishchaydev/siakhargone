import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { revalidateTag } from "next/cache";

// GET: List all TCs
export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A2:J`,
            // A: AdmissionNo, B: TCNo, C: Name, D: Class, E: Session, F: IssueDate, G: PDF, H: Status, I: CreatedAt, J: DOB
        });

        const rows = response.data.values || [];
        const tcs = rows.map((row, i) => ({
            id: i + 2, // Row number as ID
            admissionNo: row[0],
            tcNo: row[1],
            studentName: row[2],
            class: row[3],
            session: row[4],
            issueDate: row[5],
            pdfLink: row[6],
            status: row[7],
            createdAt: row[8],
            dob: row[9] || "" // Add DOB
        }));

        return NextResponse.json({ data: tcs });
    } catch (error) {
        console.error("TC GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch TCs" }, { status: 500 });
    }
}

// POST: Issue New TC
export async function POST(req: Request) {
    try {
        const { admissionNo, tcNo, studentName, className, session, issueDate, pdfLink, dob } = await req.json();
        console.log("TC POST Data:", { admissionNo, tcNo, studentName, pdfLink }); // Debug Log
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const createdAt = new Date().toISOString();
        const status = "Active";

        // Append DOB at the end (Column J)
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A:J`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[admissionNo, tcNo, studentName, className, session, issueDate, pdfLink, status, createdAt, dob]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("TC POST Error:", error);
        return NextResponse.json({ error: "Failed to issue TC" }, { status: 500 });
    }
}

// PUT: Edit or Revoke TC
export async function PUT(req: Request) {
    try {
        const { id, admissionNo, tcNo, studentName, className, session, issueDate, pdfLink, status, dob } = await req.json();
        console.log("TC PUT Data:", { id, admissionNo, pdfLink }); // Debug Log
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // We assume 'id' is the row number
        // We update A to J (excluding I-CreatedAt if we want, but row-based update replaces the whole slice in that range if we specify it)
        // Actually, to update non-contiguous columns nicely, it's better to update the whole row or specific ranges.
        // CreatedAt is I (8). DOB is J (9).
        // Let's update A:H and J separately or construct the whole row logic more carefully?
        // Simpler: Just update A:J. We need to preserve CreatedAt?
        // GET first to preserve CreatedAt? Or just update specific cells?
        // Let's just update specific cells to avoid overwriting CreatedAt?
        // No, simplest is to just overwrite A:H and J. But CreatedAt is in the middle (I).
        // If we write A${id}:J${id}, we overwrite I too.
        // We can just update two ranges? Or get the row first.

        // Let's just fetch the row first to be safe about CreatedAt.
        const readRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!I${id}`,
        });
        const currentCreatedAt = readRes.data.values?.[0]?.[0] || new Date().toISOString();

        const range = `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A${id}:J${id}`;

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[admissionNo, tcNo, studentName, className, session, issueDate, pdfLink, status, currentCreatedAt, dob]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("TC PUT Error:", error);
        return NextResponse.json({ error: "Failed to update TC" }, { status: 500 });
    }
}

// DELETE: Remove TC
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // 1. Get Sheet ID dynamically
        const meta = await sheets.spreadsheets.get({ spreadsheetId });
        const sheet = meta.data.sheets?.find(s => s.properties?.title === SHEET_TAB_IDS.TRANSFER_CERTIFICATES);
        const sheetId = sheet?.properties?.sheetId;

        if (sheetId === undefined) {
            throw new Error("Sheet not found");
        }

        // 2. Delete Row (Dimension)
        // Row ID (e.g. 2) -> Index 1
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [{
                    deleteDimension: {
                        range: {
                            sheetId,
                            dimension: "ROWS",
                            startIndex: id - 1,
                            endIndex: id,
                        }
                    }
                }]
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("TC DELETE Error:", error);
        return NextResponse.json({ error: "Failed to delete TC" }, { status: 500 });
    }
}
