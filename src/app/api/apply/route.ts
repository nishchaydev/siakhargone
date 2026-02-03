
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function POST(req: Request) {
    try {
        const { name, phone, email, role, resumeLink, coverLetter } = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) {
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        const date = new Date().toISOString();

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.APPLICATIONS}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[name, phone, email, role, resumeLink || "N/A", coverLetter || "N/A", date]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Application Submit Error:", error);
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}
