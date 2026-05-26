
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";
import { normalizeClassName } from "@/lib/class-options";

const RESULTS_TAB_NAME = "Results"; // Must match sheet tab name
const DOB_PATTERN = /^\d{2}-\d{2}-\d{4}$/;

function normalizeDob(value: string): string {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return trimmed.split("-").reverse().join("-");
    }
    return trimmed;
}

function isValidDob(value: string): boolean {
    if (!DOB_PATTERN.test(value)) return false;

    const [dayRaw, monthRaw, yearRaw] = value.split("-");
    const day = Number(dayRaw);
    const month = Number(monthRaw);
    const year = Number(yearRaw);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function toErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Unknown error";
}

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
            class: normalizeClassName(row[3] || ""),
            examName: row[4],
            resultLink: row[5],
            status: row[6],
            createdAt: row[7]
        }));

        return NextResponse.json({ data: results });
    } catch (error: unknown) {
        console.error("Results GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch Results", details: toErrorMessage(error) }, { status: 500 });
    }
}

// POST: Upload New Result
export async function POST(req: Request) {
    try {
        const { admissionNo, dob, studentName, className, examName, resultLink, status } = await req.json();
        const normalizedClassName = normalizeClassName(className || "");
        const normalizedDob = normalizeDob(dob || "");

        if (!admissionNo || !normalizedDob || !studentName || !normalizedClassName || !examName || !resultLink) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }
        if (!isValidDob(normalizedDob)) {
            return NextResponse.json({ success: false, error: "Invalid DOB format. Use DD-MM-YYYY." }, { status: 400 });
        }

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const createdAt = new Date().toISOString();
        const finalStatus = status || "Published";

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${RESULTS_TAB_NAME}!A:H`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[admissionNo, normalizedDob, studentName, normalizedClassName, examName, resultLink, finalStatus, createdAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error("Result POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to add Result", details: toErrorMessage(error) }, { status: 500 });
    }
}

// PUT: Edit Result
export async function PUT(req: Request) {
    try {
        const { id, admissionNo, dob, studentName, className, examName, resultLink, status } = await req.json();
        const normalizedClassName = normalizeClassName(className || "");
        const normalizedDob = normalizeDob(dob || "");
        if (!id || !admissionNo || !normalizedDob || !studentName || !normalizedClassName || !examName || !resultLink) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }
        if (!isValidDob(normalizedDob)) {
            return NextResponse.json({ success: false, error: "Invalid DOB format. Use DD-MM-YYYY." }, { status: 400 });
        }

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
                values: [[admissionNo, normalizedDob, studentName, normalizedClassName, examName, resultLink, status || "Published", currentCreatedAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error("Result PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update Result", details: toErrorMessage(error) }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json(); // id is row number
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

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
    } catch (error: unknown) {
        console.error("Result Delete Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete result", details: toErrorMessage(error) }, { status: 500 });
    }
}
