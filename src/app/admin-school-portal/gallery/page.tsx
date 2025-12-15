import GalleryManagerClient from "./GalleryManagerClient";

export const dynamic = "force-dynamic";

export default function GalleryPage() {
    // Cloudinary cloud name can be read from server env if NEXT_PUBLIC_ is missing
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || "";

    return <GalleryManagerClient cloudName={cloudName} />;
}
