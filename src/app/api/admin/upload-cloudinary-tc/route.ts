import { NextResponse } from "next/server";
import { uploadBufferToCloudinaryTC } from "@/lib/cloudinary-tc";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await uploadBufferToCloudinaryTC(buffer, {
            folder: "school_documents",
        });

        return NextResponse.json({
            success: true,
            link: result.secure_url,
            publicId: result.public_id
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Cloudinary TC Upload Error:", error);
        return NextResponse.json({ error: "Upload failed", details: errorMessage }, { status: 500 });
    }
}
