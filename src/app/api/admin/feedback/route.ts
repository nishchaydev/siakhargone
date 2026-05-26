import { NextResponse } from "next/server";
import { getSheetDataAsObjects, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function GET() {
    try {
        const rows = await getSheetDataAsObjects(SHEET_TAB_IDS.FEEDBACK);

        // Convert the object array from Google Sheets to an array we can use
        const data = rows.map((row: any, index: number) => ({
            id: index.toString(), // Use row index as an ID for now
            name: row["Name"] || "Anonymous",
            phone: row["Phone"] || "-",
            email: row["Email"] || "-",
            category: row["Category"] || "-",
            message: row["Message"] || "-",
            date: row["Date"] || "-",
            status: row["Status"] || "New",
        })).reverse(); // Reverse to show latest first

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Admin Feedback Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }
}
