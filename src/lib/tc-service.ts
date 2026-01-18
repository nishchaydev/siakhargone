import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "./google-sheets";
import { unstable_cache } from "next/cache";

export type TCRecord = {
    id: number;
    admissionNo: string;
    tcNo: string;
    studentName: string;
    class: string;
    session: string;
    issueDate: string;
    pdfLink: string;
    status: string;
    createdAt: string;
    dob: string;
};

async function fetchAllTCsFromSheets(): Promise<TCRecord[]> {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) throw new Error("Missing Spreadsheet ID");

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A2:J`,
        });

        const rows = response.data.values || [];
        return rows.map((row, i) => ({
            id: i + 2,
            admissionNo: row[0] || "",
            tcNo: row[1] || "",
            studentName: row[2] || "",
            class: row[3] || "",
            session: row[4] || "",
            issueDate: row[5] || "",
            pdfLink: row[6] || "",
            status: row[7] || "Active",
            createdAt: row[8] || "",
            dob: row[9] || "",
        }));

    } catch (error) {
        console.error("Failed to fetch TCs from Sheets:", error);
        return [];
    }
}

export const getCachedTCs = unstable_cache(
    async () => fetchAllTCsFromSheets(),
    ["tc-records-cache"],
    {
        tags: ["tc-records"],
        revalidate: 300 // 5 minutes cache by default
    }
);
