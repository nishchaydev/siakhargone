
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Configuration Error" }, { status: 500 });

        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const status = "New";

        // Map body fields to columns
        // Header: Id, Date, StudentName, DOB, Gender, CurrentClass, ApplyingFor, CurrentSchool, Board, FatherName, FatherMobile, FatherEmail, MotherName, MotherMobile, MotherEmail, Address, Transport, VisitTime, Status

        const row = [
            id,
            date,
            body.studentName || "",
            body.dob || "",
            body.gender || "",
            body.currentClass || "",
            body.grade || "", // ApplyingFor
            body.currentSchool || "",
            body.board || "",
            body.fatherName || "",
            body.fatherMobile || "",
            body.fatherEmail || "",
            body.motherName || "",
            body.motherMobile || "",
            body.motherEmail || "",
            body.address || "",
            body.transportRequired || "No",
            body.visitTime || "",
            status
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.ADMISSIONS}!A:S`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admissions Submission Error:", error);
        return NextResponse.json({ error: "Failed to submit admission" }, { status: 500 });
    }
}
