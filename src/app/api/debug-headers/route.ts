
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";
import { canAccessDebugApi, forbiddenJson } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
    if (!canAccessDebugApi(request)) {
        return forbiddenJson();
    }

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
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
