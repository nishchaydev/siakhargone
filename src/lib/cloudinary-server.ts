
import { v2 as cloudinary } from "cloudinary";

if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

/**
 * Generates a signed upload URL for client-side uploading.
 * This keeps the API Secret hidden on the server.
 */
export function generateSignature(publicId?: string, folder: string = "cms_uploads") {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const params: any = {
        timestamp: timestamp,
        folder: folder,
    };

    if (publicId) {
        params.public_id = publicId;
    }

    const signature = cloudinary.utils.api_sign_request(
        params,
        process.env.CLOUDINARY_API_SECRET!
    );

    return { timestamp, signature };
}

export default cloudinary;
