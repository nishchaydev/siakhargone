
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance } from "@/lib/google-sheets";
import { limiter } from "@/lib/rate-limit";
import { ResultSearchSchema } from "@/lib/schemas";

// ... constants
const RESULTS_TAB_NAME = "Results";

export async function GET(req: Request) {
    try {
        // 1. Rate Limiting
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(',')[0] : "127.0.0.1";

        try {
            await limiter.check(10, ip); // 10 requests per minute (higher for search)
        } catch {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const { searchParams } = new URL(req.url);

        // 2. Input Validation
        const rawParams = {
            admissionNo: searchParams.get("admissionNo")?.trim(),
            dob: searchParams.get("dob")?.trim(),
        };

        const validation = ResultSearchSchema.safeParse(rawParams);

        if (!validation.success) {
            return NextResponse.json({
                error: "Invalid input credentials",
                details: validation.error.format()
            }, { status: 400 });
        }

        const { admissionNo, dob } = validation.data;

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        // Fetch all results
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${RESULTS_TAB_NAME}!A2:H`, // Adjust range as needed
        });

        const rows = response.data.values || [];

        // Find match
        // Column Index Assumptions based on setup-sheets.js:
        // 0: AdmissionNo, 1: DOB, 2: Name, 3: Class, 4: Exam, 5: Link, 6: Status
        const studentResult = rows.find(row => {
            const rowAdm = row[0]?.toString().trim();
            const rowDob = row[1]?.toString().trim();
            return rowAdm === admissionNo && rowDob === dob;
        });

        if (!studentResult) {
            return NextResponse.json({ error: "No result found. Please check your details." }, { status: 404 });
        }

        // Return structured data
        return NextResponse.json({
            success: true,
            data: {
                admissionNo: studentResult[0],
                studentName: studentResult[2],
                class: studentResult[3],
                examName: studentResult[4],
                resultLink: studentResult[5],
                status: studentResult[6] || "Published"
            }
        });

    } catch (error) {
        console.error("Results API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
