
import { NextResponse } from "next/server";
import { uploadBufferToCloudinaryTC } from "@/lib/cloudinary-tc";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const folder = searchParams.get("folder") || "news";

        const validFolders = ["tc", "gallery", "news", "results"];
        const targetFolder = validFolders.includes(folder) ? folder : "news";

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const maxSize = targetFolder === "tc" ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
        const sizeLimitLabel = targetFolder === "tc" ? "2MB" : "5MB";

        if (file.size > maxSize) {
            return NextResponse.json({ 
                error: `File too large. Maximum size is ${sizeLimitLabel} for ${targetFolder} uploads.` 
            }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadOptions: any = {
            folder: targetFolder,
        };

        if (["gallery", "news", "events"].includes(targetFolder)) {
            uploadOptions.transformation = [
                { width: 1920, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "webp" }
            ];
        }

        const result = await uploadBufferToCloudinaryTC(buffer, uploadOptions);

        return NextResponse.json({
            success: true,
            link: result.secure_url,
            publicId: result.public_id
        });

    } catch (error: unknown) {
        console.error("Cloudinary Upload Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

