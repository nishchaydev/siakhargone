import { NextResponse } from "next/server";
import { getSheetDataAsObjects, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function GET() {
    try {
        const rows = await getSheetDataAsObjects(SHEET_TAB_IDS.ENQUIRIES);

        const data = rows.map((row: any, index: number) => ({
            id: index.toString(),
            name: row["Name"] || "Anonymous",
            phone: row["Phone"] || "-",
            email: row["Email"] || "-",
            class: row["Class"] || "-",
            message: row["Message"] || "-",
            date: row["Date"] || "-",
            status: row["Status"] || "New",
        })).reverse();

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Admin Enquiries Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
    }
}
