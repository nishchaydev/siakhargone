
import { NextResponse } from "next/server";
import { getGoogleSheetsInstance, SHEET_TAB_IDS } from "@/lib/google-sheets";
import { generateSignature } from "@/lib/cloudinary-server";

// GET: Fetch Gallery Images
export async function GET() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        if (!spreadsheetId) return NextResponse.json({ error: "Missing ID" }, { status: 500 });

        // Fetch last 100 images
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEET_TAB_IDS.GALLERY}!A2:C`, // ImageID, Category, AltText
        });

        const rows = response.data.values || [];
        const images = rows.map((row) => ({
            imageId: row[0],
            category: row[1],
            alt: row[2],
        }));

        return NextResponse.json({ data: images.reverse() });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
    }
}

// POST: 1. Generate Signature (if no body) OR 2. Save to Sheet (if body has data)
export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);

        // Case 1: Requesting Signature for Client Upload
        if (!body || !body.spreadsheetSave) {
            const { timestamp, signature } = generateSignature();
            const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
            const apiKey = process.env.CLOUDINARY_API_KEY;

            return NextResponse.json({ timestamp, signature, cloudName, apiKey });
        }

        // Case 2: Saving Uploaded Image Metadata to Sheets
        const { imageId, category, alt, spreadsheetSave } = body;
        if (spreadsheetSave) {
            const sheets = await getGoogleSheetsInstance();
            const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${SHEET_TAB_IDS.GALLERY}!A:C`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[imageId, category || "General", alt || "School Photo"]],
                },
            });

            return NextResponse.json({ success: true });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
