import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";

// Simple in-memory rate limiter (per instance)
// In a serverless environment like Vercel, this resets per cold start, 
// but it's "good enough" for basic abuse prevention without Redis.
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;
const ipRequestCounts = new Map<string, { count: number; expires: number }>();

export async function GET(req: Request) {
    try {
        // 1. Rate Limiting Check
        // Note: In Next.js App Router, finding real IP can be tricky without headers.
        // We will mock it or try to read standard headers.
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

        const now = Date.now();
        const record = ipRequestCounts.get(ip);

        if (record && now < record.expires) {
            if (record.count >= MAX_REQUESTS) {
                return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
            }
            record.count++;
        } else {
            ipRequestCounts.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW });
        }


        // 2. Parse Query
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q")?.trim();

        if (!query) {
            return NextResponse.json({ error: "Search query is required" }, { status: 400 });
        }

        // 3. Google Sheets Lookup
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.TRANSFER_CERTIFICATES}!A2:H`, // AdmissionNo(A), TCNo(B), Name(C), Class(D), Session(E), IssueDate(F), PDF(G), Status(H)
        });

        const rows = response.data.values || [];

        // 4. Exact Match Search Logic
        // We search in Admission No (Col 0) AND TC No (Col 1)
        // Comparison is case-insensitive but must be EXACT match.
        // We verify status is not "Revoked" (or handle it explicitly)

        const match = rows.find(row => {
            const admissionNo = row[0]?.trim().toLowerCase();
            const tcNo = row[1]?.trim().toLowerCase();
            const q = query.toLowerCase();

            return (admissionNo === q || tcNo === q);
        });

        if (match) {
            const status = match[7];

            if (status === "Revoked") {
                return NextResponse.json({
                    found: false,
                    message: "This Transfer Certificate has been revoked. Please contact the school administration."
                });
            }

            return NextResponse.json({
                found: true,
                data: {
                    admissionNo: match[0],
                    tcNo: match[1],
                    studentName: match[2],
                    class: match[3],
                    session: match[4],
                    issueDate: match[5],
                    pdfLink: match[6] // Only returned on successful match
                }
            });
        }

        return NextResponse.json({ found: false, message: "No record found with these details." });

    } catch (error) {
        console.error("TC Search Error:", error);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}
