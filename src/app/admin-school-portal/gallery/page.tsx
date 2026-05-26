import GalleryManagerClient from "./GalleryManagerClient";

export const dynamic = "force-dynamic";

export default function GalleryPage() {
    // Cloudinary cloud name can be read from server env if NEXT_PUBLIC_ is missing
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_TC_CLOUD_NAME || process.env.CLOUDINARY_TC_CLOUD_NAME || "";
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_TC_UPLOAD_PRESET || process.env.CLOUDINARY_TC_UPLOAD_PRESET || "siakhargone_tc";

    return <GalleryManagerClient cloudName={cloudName} uploadPreset={uploadPreset} />;
}
