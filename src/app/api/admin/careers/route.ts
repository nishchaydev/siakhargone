
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // Fetch Careers
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `Careers!A2:H`,
        });

        const rows = response.data.values || [];
        const careers = rows.map((row) => ({
            id: row[0],
            role: row[1],
            department: row[2],
            type: row[3],
            experience: row[4],
            description: row[5],
            isActive: row[6] === "Active",
        })).filter(j => j.isActive); // Only show active jobs

        return NextResponse.json({ data: careers });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { role, experience, description, isActive, type, department } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        // Setup Schema: Id, JobTitle, Department, Type, Experience, Description, Status, CreatedAt
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `Careers!A:H`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[id, role, department, type, experience, description, isActive ? "Active" : "Inactive", createdAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add career" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, role, experience, description, isActive, type, department } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // Update the specific row (id corresponds to row number)
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.CAREERS}!A${id}:F${id}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[role, experience, description, isActive ? "TRUE" : "FALSE", type, department]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update career" }, { status: 500 });
    }
}
// DELETE: Soft delete (set Active to FALSE)
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // Update the specific row's "Active" column (Col D) to "FALSE", and "DeletedAt" (Col G) to Timestamp
        const timestamp = new Date().toISOString();

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.CAREERS}!D${id}:G${id}`, // Update D (Active) ... G (DeletedAt)
            // Note: We need to be careful with range. A2:F is the read range.
            // D is index 3. E is Type, F is Dept. G is new.
            // If we write to D:G, we need to provide values for D, E, F, G?
            // Or can we write discontinuous ranges? No.
            // So we should just write to active, and separate write to G? Or fetch row and update?
            // Simpler: Just write to D and G separately? Or just write D...G preserving E and F?
            // Writing E and F is risky if we don't know them.
            // Actually, `values.update` requires a contiguous range.
            // Alternative: Use `batchUpdate` or just two separate `values.update` calls.
            // Two calls is easier to implement safely.
        });

        // 1. Mark as Inactive
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.CAREERS}!D${id}`,
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [["FALSE"]] }
        });

        // 2. Add Deleted At Timestamp (Col G)
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.CAREERS}!G${id}`,
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [[timestamp]] }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete career" }, { status: 500 });
    }
}
