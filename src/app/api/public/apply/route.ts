
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, getGoogleDriveInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { Readable } from "stream";
import { limiter } from "@/lib/rate-limit";
import { ApplyFormSchema } from "@/lib/schemas";

export async function POST(req: Request) {
    try {
        // 1. Rate Limiting
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(',')[0] : "127.0.0.1";

        try {
            await limiter.check(5, ip); // 5 requests per minute per IP
        } catch {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const formData = await req.formData();
        const file = formData.get("resume") as File;

        // Extract fields for validation
        const rawData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            position: formData.get("position") as string,
        };

        // 2. Input Validation
        const validation = ApplyFormSchema.safeParse(rawData);

        if (!validation.success || !file) {
            return NextResponse.json({
                error: "Invalid input",
                details: validation.error ? validation.error.format() : "Missing resume"
            }, { status: 400 });
        }

        const { name, email, phone, position } = validation.data;

        // ... existing upload logic ...

        // 1. Upload Resume to Drive
        const drive = await getGoogleDriveInstance();
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        const driveRes = await drive.files.create({
            requestBody: {
                name: `${name}_Resume_${Date.now()}.pdf`,
                mimeType: file.type,
            },
            media: {
                mimeType: file.type,
                body: stream,
            },
            fields: 'id, webViewLink',
        });

        await drive.permissions.create({
            fileId: driveRes.data.id!,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const resumeLink = driveRes.data.webViewLink;

        // 2. Save Application to Sheets
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `Applications!A:F`, // Name, Email, Phone, Position, ResumeLink, Date
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[name, email, phone, position, resumeLink, new Date().toISOString()]],
            },
        });

        return NextResponse.json({ success: true, link: resumeLink });

    } catch (error: any) {
        console.error("Apply Error:", error);
        return NextResponse.json({ error: "Application failed" }, { status: 500 });
    }
}
