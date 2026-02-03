"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UploadCloud, Pencil, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CMS_IMAGE_SLOTS } from "@/lib/cms-constants";

interface GalleryManagerClientProps {
    cloudName: string;
    uploadPreset: string;
}

interface GalleryImage {
    id: number;
    imageId: string;
    category: string;
    alt: string;
}

export default function GalleryManagerClient({ cloudName, uploadPreset }: GalleryManagerClientProps) {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Edit State
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
    const [editForm, setEditForm] = useState({ category: "General", alt: "" });
    const [saving, setSaving] = useState(false);

    // Filter State
    const [activeTab, setActiveTab] = useState("All");
    // Upload State
    const [uploadCategory, setUploadCategory] = useState<string>("");

    useEffect(() => {
        setMounted(true);
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            // Safety timeout to prevent infinite loading
            const timeoutId = setTimeout(() => {
                if (loading) {
                    console.warn("Gallery fetch timed out");
                    setLoading(false);
                }
            }, 8000);

            const res = await fetch("/api/admin/gallery");
            clearTimeout(timeoutId);

            if (res.ok) {
                const json = await res.json();
                if (json.data) {
                    setImages(json.data);
                }
            } else {
                console.error("Gallery API Error:", await res.text());
            }
        } catch (err) {
            console.error("Gallery Fetch Failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSuccess = async (result: any) => {
        setUploading(true);
        try {
            const publicId = result?.info?.public_id;
            if (!publicId) return;

            // Save to Sheet (Use Selected Category)
            const saveRes = await fetch("/api/admin/gallery", {
                method: "POST",
                body: JSON.stringify({
                    spreadsheetSave: true,
                    imageId: publicId,
                    category: uploadCategory || "General",
                    alt: "Uploaded from Admin"
                })
            });

            if (saveRes.ok) {
                fetchImages();
            } else {
                const errText = await saveRes.text();
                alert("Image uploaded to Cloudinary, but failed to save to Database (Sheet). Error: " + errText);
            }

        } catch (e) {
            alert("Unexpected error saving image record: " + e);
        } finally {
            setUploading(false);
        }
    };

    const handleEditClick = (img: GalleryImage) => {
        setEditingImage(img);
        setEditForm({ category: img.category || "General", alt: img.alt });
    };

    const handleSaveEdit = async () => {
        if (!editingImage) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/gallery", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editingImage.id,
                    imageId: editingImage.imageId,
                    category: editForm.category,
                    alt: editForm.alt
                })
            });

            if (res.ok) {
                setEditingImage(null);
                fetchImages();
            } else {
                alert("Failed to update image");
            }
        } catch (e) {
            alert("Error updating image");
        } finally {
            setSaving(false);
        }
    };

    if (!cloudName) {
        return (
            <div className="p-12 text-center text-red-500 bg-red-50 rounded-lg m-8">
                <h2 className="text-xl font-bold mb-2">Configuration Error</h2>
                <p>Cloudinary Cloud Name is missing. Please check your environment variables.</p>
            </div>
        );
    }

    const filteredImages = activeTab === "All"
        ? images
        : images.filter(img => img.category === activeTab);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin-school-portal/dashboard">
                            <Button variant="outline" size="icon" className="rounded-full bg-white shadow-sm hover:bg-slate-100">
                                <ArrowLeft className="w-5 h-5 text-slate-700" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-navy">Media Gallery</h1>
                            <p className="text-slate-500">Manage website photos.</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Upload */}
                    <Card className="lg:col-span-1 shadow-md border-0 bg-white h-fit sticky top-8">
                        <CardHeader>
                            <CardTitle>Add New Photo</CardTitle>
                            <CardDescription>Upload image to Cloudinary & assign a slot.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                {/* Step 1: Placement Selector */}
                                <div className="text-left">
                                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                                        Step 1: Choose Placement *
                                    </Label>
                                    <Select
                                        value={uploadCategory}
                                        onValueChange={setUploadCategory}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select placement..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CMS_IMAGE_SLOTS.map(slot => (
                                                <SelectItem key={slot.id} value={slot.id}>
                                                    {slot.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {!uploadCategory && (
                                        <p className="text-[10px] text-red-500 mt-1">* Required to unlock upload</p>
                                    )}
                                </div>

                                {/* Step 2: Upload Widget */}
                                <div className={`transition-all duration-200 ${!uploadCategory ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`}>
                                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                                        Step 2: Upload Image
                                    </Label>

                                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                                        {mounted && (
                                            <CldUploadWidget
                                                onSuccess={handleUploadSuccess}
                                                uploadPreset={uploadPreset || "siakhargone_uploads"}
                                                options={{
                                                    cloudName: cloudName,
                                                    // @ts-ignore
                                                    cloud_name: cloudName,
                                                    autoMinimize: true,
                                                    folder: "gallery_uploads",
                                                    sources: ['local', 'url', 'camera']
                                                }}
                                            >
                                                {({ open }) => (
                                                    <Button
                                                        onClick={() => {
                                                            if (!uploadCategory) return;
                                                            open();
                                                        }}
                                                        className="bg-navy hover:bg-navy-light w-full"
                                                        disabled={uploading || !uploadCategory}
                                                    >
                                                        {uploading ? (
                                                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                                                        ) : (
                                                            <>
                                                                <UploadCloud className="w-4 h-4 mr-2" />
                                                                Open Uploader
                                                            </>
                                                        )}
                                                    </Button>
                                                )}
                                            </CldUploadWidget>
                                        )}
                                        <p className="text-[10px] text-slate-400 mt-2">JPG, PNG, WEBP</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column: Grid */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Filter Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            <Button
                                variant={activeTab === "All" ? "default" : "secondary"}
                                onClick={() => setActiveTab("All")}
                                size="sm"
                                className="rounded-full"
                            >
                                All Photos
                            </Button>
                            {CMS_IMAGE_SLOTS.map(slot => (
                                <Button
                                    key={slot.id}
                                    variant={activeTab === slot.id ? "default" : "ghost"}
                                    onClick={() => setActiveTab(slot.id)}
                                    size="sm"
                                    className="rounded-full whitespace-nowrap"
                                >
                                    {slot.label.split(":")[0]}
                                </Button>
                            ))}
                        </div>

                        {loading ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                                <Loader2 className="w-10 h-10 text-slate-300 animate-spin mx-auto mb-4" />
                                <p className="text-slate-500">Loading your gallery...</p>
                            </div>
                        ) : filteredImages.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                                <ImageIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <h3 className="text-slate-900 font-medium">No photos found</h3>
                                <p className="text-slate-500 text-sm">Upload images to populate this section.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {filteredImages.map((img) => (
                                    <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border bg-slate-100 shadow-sm transition-all hover:shadow-md">
                                        <Image
                                            src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_400/${img.imageId}`}
                                            alt={img.alt || "Gallery Image"}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
                                            <span className="text-xs font-bold tracking-wider text-yellow-500 uppercase bg-blue-950/50 px-2 py-1 rounded">
                                                {CMS_IMAGE_SLOTS.find(s => s.id === img.category)?.label || img.category}
                                            </span>
                                            <p className="text-white text-xs line-clamp-2">{img.alt}</p>
                                            <Button size="sm" variant="secondary" className="mt-2" onClick={() => handleEditClick(img)}>
                                                <Pencil className="w-3 h-3 mr-1" /> Edit
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Edit Dialog */}
                <Dialog open={!!editingImage} onOpenChange={(open) => !open && setEditingImage(null)}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Edit Image Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Website Slot (Placement)</Label>
                                <Select
                                    value={editForm.category}
                                    onValueChange={(val) => setEditForm(prev => ({ ...prev, category: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CMS_IMAGE_SLOTS.map(slot => (
                                            <SelectItem key={slot.id} value={slot.id}>
                                                {slot.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-[10px] text-slate-400">Determines where this image appears on the website.</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Caption / Alt Text</Label>
                                <Input
                                    value={editForm.alt}
                                    onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
                                    placeholder="Brief description"
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex items-center justify-between sm:justify-between">
                            {/* Left Side: Delete */}
                            <Button
                                variant="destructive"
                                onClick={async () => {
                                    if (!confirm("Are you sure you want to delete this image?")) return;
                                    setSaving(true);
                                    try {
                                        const res = await fetch(`/api/admin/gallery?id=${editingImage?.id}`, { method: "DELETE" });
                                        if (res.ok) {
                                            setEditingImage(null);
                                            fetchImages();
                                        } else {
                                            alert("Failed to delete");
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    } finally {
                                        setSaving(false);
                                    }
                                }}
                                disabled={saving}
                            >
                                Delete
                            </Button>

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setEditingImage(null)} className="border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</Button>
                                <Button onClick={handleSaveEdit} disabled={saving} className="bg-gold hover:bg-gold-dark text-navy font-bold">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Changes"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}
