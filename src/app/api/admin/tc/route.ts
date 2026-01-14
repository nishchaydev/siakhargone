import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

// GET: List all TCs
export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A2:I`,
            // A: AdmissionNo, B: TCNo, C: Name, D: Class, E: Session, F: IssueDate, G: PDF, H: Status, I: CreatedAt
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
            createdAt: row[8]
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
        const { admissionNo, tcNo, studentName, className, session, issueDate, pdfLink } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const createdAt = new Date().toISOString();
        const status = "Active";

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A:I`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[admissionNo, tcNo, studentName, className, session, issueDate, pdfLink, status, createdAt]],
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
        const { id, admissionNo, tcNo, studentName, className, session, issueDate, pdfLink, status } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // We assume 'id' is the row number
        const range = `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A${id}:H${id}`; // Update A to H (leave CreatedAt alone)

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[admissionNo, tcNo, studentName, className, session, issueDate, pdfLink, status]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("TC PUT Error:", error);
        return NextResponse.json({ error: "Failed to update TC" }, { status: 500 });
    }
}
