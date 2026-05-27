import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2).max(100),
    phone: z.string().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone format"),
    email: z.string().email("Invalid email format").optional().or(z.literal("")),
    class: z.string().min(1, "Class is required"),
    message: z.string().max(1000, "Message too long"),
});

function hasFormulaInjection(val: string): boolean {
    const trimmed = val.trim();
    return trimmed.startsWith("=") || trimmed.startsWith("+") || trimmed.startsWith("-") || trimmed.startsWith("@");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Zod validation
        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid input data", details: parsed.error.format() }, { status: 400 });
        }

        const data = parsed.data;

        // Prevent formula injection
        if (
            hasFormulaInjection(data.name) ||
            hasFormulaInjection(data.phone) ||
            (data.email && hasFormulaInjection(data.email)) ||
            hasFormulaInjection(data.class) ||
            hasFormulaInjection(data.message)
        ) {
            return NextResponse.json({ error: "Invalid input: Formula injection characters detected." }, { status: 400 });
        }

        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        if (!spreadsheetId) return NextResponse.json({ error: "Configuration Error" }, { status: 500 });

        const date = new Date().toISOString();
        const status = "New";

        const row = [
            data.name,
            data.phone,
            data.email || "",
            data.class,
            data.message,
            date,
            status
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.ENQUIRIES}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact Submission Error:", error);
        return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
    }
}
