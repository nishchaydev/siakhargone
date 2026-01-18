"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from 'next-cloudinary';
import { Badge } from "@/components/ui/badge";

import { RefreshCw } from "lucide-react"; // Import Refresh icon

// Define the assets we want to manage structurally
const ASSET_SECTIONS = [
    {
        id: "hero",
        title: "Home Page Hero",
        assets: [
            { key: "hero_slide_1", label: "Main Hero Background" },
            { key: "hero_slide_2", label: "Hero Slider Image 2 (If applicable)" },
            { key: "hero_slide_3", label: "Hero Slider Image 3 (If applicable)" },
            { key: "hero_slide_4", label: "Hero Slider Image 4 (If applicable)" },
        ]
    },
    {
        id: "banners",
        title: "Page Banners",
        assets: [
            { key: "banner_about", label: "About Us Page Banner" },
            { key: "banner_admissions", label: "Admissions Page Banner" },
            { key: "banner_academics", label: "Academics Page Banner" },
            { key: "banner_contact", label: "Contact Us Page Banner" },
        ]
    },
    {
        id: "life_at_sia",
        title: "Life at SIA Section",
        assets: [
            { key: "life_assembly", label: "Large Left Block (Assembly)" },
            { key: "life_library", label: "Top Right Block (Library)" },
            { key: "life_labs", label: "Mid Right Block (Labs)" },
            { key: "life_sports", label: "Bottom Block (Sports)" },
        ]
    },
    {
        id: "infrastructure",
        title: "Infrastructure Highlights",
        assets: [
            { key: "infra_classroom", label: "Classroom Image" },
            { key: "infra_library", label: "Library Image" },
            { key: "infra_computer_lab", label: "Computer Lab Image" },
            { key: "infra_sports_ground", label: "Sports Ground Image" },
        ]
    },
    {
        id: "sports",
        title: "Sports & Achievements",
        assets: [
            { key: "sports_achievement_1", label: "Achievement Slide 1" },
            { key: "sports_achievement_2", label: "Achievement Slide 2" },
        ]
    },
    {
        id: "hall_of_fame",
        title: "Hall of Fame (Student Achievers)",
        assets: [
            { key: "hof_1", label: "Achiever 1 (Left)" },
            { key: "hof_2", label: "Achiever 2 (Center)" },
            { key: "hof_3", label: "Achiever 3 (Right)" },
        ]
    }
];

interface AssetData {
    id?: string;
    section: string;
    key: string;
    imageUrl: string;
    altText?: string;
    updatedAt?: string;
}

export default function SiteAssetsManager() {
    const [assets, setAssets] = useState<Record<string, AssetData>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null); // key of asset being saved
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const res = await fetch("/api/admin/site-assets");
            const json = await res.json();
            if (json.data) {
                const map: Record<string, AssetData> = {};
                json.data.forEach((a: AssetData) => {
                    map[a.key] = a;
                });
                setAssets(map);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const res = await fetch("/api/admin/site-assets/seed", { method: "POST" });
            if (res.ok) {
                const json = await res.json();
                alert(json.message);
                fetchAssets(); // Refresh data
            } else {
                alert("Sync failed");
            }
        } catch (e) {
            alert("Error syncing");
        } finally {
            setSyncing(false);
        }
    };

    const handleSave = async (sectionId: string, assetKey: string, imageUrl: string) => {
        setSaving(assetKey);
        try {
            const res = await fetch("/api/admin/site-assets", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    section: sectionId,
                    key: assetKey,
                    imageUrl: imageUrl,
                    altText: `Asset for ${assetKey}` // Can expand to allow custom alt text later
                })
            });

            if (res.ok) {
                // Update local state
                setAssets(prev => ({
                    ...prev,
                    [assetKey]: {
                        ...prev[assetKey],
                        section: sectionId, // Ensure fields if new
                        key: assetKey,
                        imageUrl: imageUrl,
                        updatedAt: new Date().toISOString()
                    }
                }));
            } else {
                alert("Failed to save asset");
            }
        } catch (e) {
            alert("Error saving");
        } finally {
            setSaving(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin-school-portal/dashboard">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-sm hover:bg-gray-100">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <ImageIcon className="w-8 h-8 text-blue-500" />
                            Site Assets Manager
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium">Manage website banners and static images.</p>
                    </div>
                    <div className="ml-auto">
                        <Button
                            variant="outline"
                            onClick={handleSync}
                            disabled={syncing || loading}
                            className="bg-white hover:bg-gray-50 text-navy border-gray-200"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                            {syncing ? 'Syncing...' : 'Sync Default Images'}
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-4" />
                        <p className="text-gray-400">Loading site assets...</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {ASSET_SECTIONS.map(section => (
                            <Card key={section.id} className="border-0 shadow-sm ring-1 ring-gray-100 bg-white overflow-hidden rounded-2xl">
                                <CardHeader className="bg-gray-50/50 border-b border-gray-100/50 pb-4">
                                    <CardTitle className="scroll-m-20 text-xl font-bold tracking-tight">{section.title}</CardTitle>
                                    <CardDescription>Manage images for {section.title.toLowerCase()}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        {section.assets.map(assetDef => {
                                            const currentAsset = assets[assetDef.key];
                                            const displayUrl = currentAsset?.imageUrl;

                                            return (
                                                <div key={assetDef.key} className="bg-white border rounded-xl p-4 space-y-4 hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1">
                                                            <div className="font-semibold text-gray-900">{assetDef.label}</div>
                                                            <div className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded inline-block">{assetDef.key}</div>
                                                        </div>
                                                        {currentAsset?.updatedAt && (
                                                            <Badge variant="secondary" className="text-[10px] opacity-70">
                                                                Updated: {new Date(currentAsset.updatedAt).toLocaleDateString()}
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    {/* Image Preview */}
                                                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border relative flex items-center justify-center group">
                                                        {displayUrl ? (
                                                            <img src={displayUrl} alt={assetDef.label} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="text-gray-400 flex flex-col items-center">
                                                                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                                                <span className="text-xs">No image set</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Uploader */}
                                                    <div className="flex justify-end pt-2">
                                                        <CldUploadWidget
                                                            uploadPreset="siakhargone_uploads"
                                                            onSuccess={(result: any) => {
                                                                const url = result?.info?.secure_url;
                                                                if (url) {
                                                                    handleSave(section.id, assetDef.key, url);
                                                                }
                                                            }}
                                                            options={{
                                                                sources: ['local', 'url'],
                                                                maxFiles: 1,
                                                                clientAllowedFormats: ["image"],
                                                                resourceType: "image"
                                                            }}
                                                        >
                                                            {({ open }) => (
                                                                <Button
                                                                    variant="default"
                                                                    size="sm"
                                                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                                                    onClick={(e) => { e.preventDefault(); open(); }}
                                                                    disabled={saving === assetDef.key}
                                                                >
                                                                    {saving === assetDef.key ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                                                                    {displayUrl ? "Change Image" : "Upload Image"}
                                                                </Button>
                                                            )}
                                                        </CldUploadWidget>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
