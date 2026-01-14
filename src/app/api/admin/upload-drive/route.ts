
import { NextResponse } from "next/server";
import { getGoogleDriveInstance } from "@/lib/google-sheets";
import { Readable } from "stream";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const uploadName = formData.get("fileName") as string;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const drive = await getGoogleDriveInstance();

        // Convert File to Stream
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        const response = await drive.files.create({
            requestBody: {
                name: uploadName || file.name,
                mimeType: file.type,
                parents: folderId ? [folderId] : undefined,
            },
            media: {
                mimeType: file.type,
                body: stream,
            },
            fields: 'id, webViewLink, webContentLink',
        });

        // Make the file publicly readable (Anyone with link)
        if (response.data.id) {
            await drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                },
            });
        }

        return NextResponse.json({
            success: true,
            link: response.data.webViewLink,
            id: response.data.id
        });

    } catch (error: any) {
        console.error("Drive Upload Error:", error);
        return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
    }
}
