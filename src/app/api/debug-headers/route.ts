
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";

export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        const responseEnquiry = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "Enquiry!A1:Z1"
        });

        const responseEnquiries = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "Enquiries!A1:Z1"
        });

        return NextResponse.json({
            enquiry: responseEnquiry.data.values?.[0] || "Empty/Not Found",
            enquiries: responseEnquiries.data.values?.[0] || "Empty/Not Found"
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
