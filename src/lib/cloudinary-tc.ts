import { v2 as cloudinary, type UploadApiOptions, type UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_TC_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_TC_API_KEY,
    api_secret: process.env.CLOUDINARY_TC_API_SECRET,
});

export async function uploadBufferToCloudinaryTC(buffer: Buffer, options: UploadApiOptions = {}): Promise<UploadApiResponse> {
    const uploadPreset = process.env.CLOUDINARY_TC_UPLOAD_PRESET || "siakhargone_tc";

    return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                upload_preset: uploadPreset,
                folder: "school_documents",
                resource_type: "auto",
                use_filename: true,
                unique_filename: true,
                ...options,
            },
            (error, result) => {
                if (error || !result) {
                    reject(error ?? new Error("Cloudinary TC upload returned no result"));
                    return;
                }
                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
}
