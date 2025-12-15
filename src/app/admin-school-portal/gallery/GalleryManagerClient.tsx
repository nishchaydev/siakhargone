"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

interface GalleryManagerClientProps {
    cloudName: string;
}

export default function GalleryManagerClient({ cloudName }: GalleryManagerClientProps) {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/admin/gallery");
            const json = await res.json();
            if (json.data) setImages(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSuccess = async (result: any) => {
        setUploading(true);
        try {
            const publicId = result?.info?.public_id;
            if (!publicId) return;

            // Save to Sheet
            await fetch("/api/admin/gallery", {
                method: "POST",
                body: JSON.stringify({
                    spreadsheetSave: true,
                    imageId: publicId,
                    category: "General",
                    alt: "Uploaded from Admin"
                })
            });

            fetchImages();
        } catch (e) {
            alert("Failed to save image record");
        } finally {
            setUploading(false);
        }
    };

    if (!cloudName) {
        return (
            <div className="p-8 text-center text-red-500">
                Error: Cloudinary Cloud Name is missing. Please check .env.local
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin-school-portal/dashboard">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-navy">Photo Gallery</h1>
                        <p className="text-muted-foreground">Upload event photos and campus memories.</p>
                    </div>
                </div>

                {/* Upload Area */}
                <Card className="border-t-4 border-t-purple-600 shadow-sm border-dashed">
                    <CardContent className="p-12 text-center">
                        <div className="mx-auto w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Upload New Photos</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            Supported formats: JPG, PNG, WEBP. <br /> Max file size: 5MB.
                        </p>

                        <CldUploadWidget
                            uploadPreset="siakhargone_uploads"
                            signatureEndpoint="/api/admin/gallery"
                            onSuccess={handleUploadSuccess}
                            options={{
                                cloudName: cloudName,
                                autoMinimize: true,
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button
                                        onClick={() => open()}
                                        className="bg-purple-600 hover:bg-purple-700"
                                        disabled={uploading}
                                    >
                                        {uploading ? "Saving..." : "Select Files"}
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                    </CardContent>
                </Card>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {loading ? (
                        <p className="text-gray-400 col-span-full text-center">Loading gallery...</p>
                    ) : images.map((img) => (
                        <div key={img.imageId} className="relative aspect-square rounded-lg overflow-hidden border bg-gray-200">
                            <Image
                                src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_300/${img.imageId}`}
                                alt={img.alt}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-white truncate">
                                {img.imageId}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
