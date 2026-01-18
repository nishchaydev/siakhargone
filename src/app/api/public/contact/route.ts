
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Configuration Error" }, { status: 500 });

        const date = new Date().toISOString();
        const status = "New";

        // Map body fields to columns
        // Header: ["Name", "Phone", "Email", "Class", "Message", "Date", "Status"]

        const row = [
            body.name || "",
            body.phone || "",
            body.email || "",
            body.class || "",
            body.message || "",
            date,
            status
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.ENQUIRIES}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact Submission Error:", error);
        return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
    }
}
