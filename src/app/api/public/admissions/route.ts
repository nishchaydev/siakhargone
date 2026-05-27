import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { z } from "zod";

const admissionSchema = z.object({
    studentName: z.string().min(2).max(100),
    dob: z.string().min(1),
    gender: z.string().min(1),
    currentClass: z.string().optional().or(z.literal("")),
    grade: z.string().min(1), // ApplyingFor
    currentSchool: z.string().optional().or(z.literal("")),
    board: z.string().optional().or(z.literal("")),
    fatherName: z.string().min(2).max(100),
    fatherMobile: z.string().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone format"),
    fatherEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
    motherName: z.string().optional().or(z.literal("")),
    motherMobile: z.string().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone format").optional().or(z.literal("")),
    motherEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
    address: z.string().max(500),
    transportRequired: z.string().optional().or(z.literal("")),
    visitTime: z.string().optional().or(z.literal("")),
});

function hasFormulaInjection(val: string): boolean {
    const trimmed = val.trim();
    return trimmed.startsWith("=") || trimmed.startsWith("+") || trimmed.startsWith("-") || trimmed.startsWith("@");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Zod validation
        const parsed = admissionSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid input data", details: parsed.error.format() }, { status: 400 });
        }

        const data = parsed.data;

        // Prevent formula injection
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === "string" && hasFormulaInjection(value)) {
                return NextResponse.json({ error: `Invalid input: Formula injection character detected in ${key}.` }, { status: 400 });
            }
        }

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Configuration Error" }, { status: 500 });

        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const status = "New";

        const row = [
            id,
            date,
            data.studentName,
            data.dob,
            data.gender,
            data.currentClass || "",
            data.grade,
            data.currentSchool || "",
            data.board || "",
            data.fatherName,
            data.fatherMobile,
            data.fatherEmail || "",
            data.motherName || "",
            data.motherMobile || "",
            data.motherEmail || "",
            data.address,
            data.transportRequired || "No",
            data.visitTime || "",
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
