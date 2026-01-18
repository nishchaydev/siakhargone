"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";  // Assuming you have this, otherwise Input
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, Trophy, Star, Medal } from "lucide-react";
import { CldUploadWidget } from 'next-cloudinary';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Achiever {
    id: string;
    name: string;
    class: string;
    achievement: string;
    category: string;
    imageUrl: string;
    priority: string;
    status: string;
}

export default function AchieversManager() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        studentClass: "",
        achievement: "",
        category: "Sports",
        imageUrl: "",
        priority: "0"
    });

    useEffect(() => {
        fetchAchievers();
    }, []);

    const fetchAchievers = async () => {
        try {
            const res = await fetch("/api/admin/achievers");
            const json = await res.json();
            setAchievers(json.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/achievers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                // Reset form
                setFormData({
                    name: "",
                    studentClass: "",
                    achievement: "",
                    category: "Sports",
                    imageUrl: "",
                    priority: "0"
                });
                fetchAchievers();
            } else {
                alert("Failed to add achiever");
            }
        } catch (error) {
            alert("Error adding achiever");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this achiever?")) return;
        try {
            const res = await fetch(`/api/admin/achievers?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setAchievers(prev => prev.filter(a => a.id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (e) {
            alert("Error deleting");
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
                            <Trophy className="w-8 h-8 text-gold-dark" />
                            Hall of Fame (Achievers)
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium">Manage student achievements and hall of fame entries.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <Card className="lg:col-span-1 border-0 shadow-sm ring-1 ring-gray-100 h-fit">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100/50">
                            <CardTitle>Add New Achiever</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label>Student Name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Rahul Sharma"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Class</Label>
                                    <Input
                                        value={formData.studentClass}
                                        onChange={e => setFormData({ ...formData, studentClass: e.target.value })}
                                        placeholder="e.g. Class X"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Achievement Title</Label>
                                    <Input
                                        value={formData.achievement}
                                        onChange={e => setFormData({ ...formData, achievement: e.target.value })}
                                        placeholder="e.g. Gold Medalist"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={v => setFormData({ ...formData, category: v })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Academics">Academics</SelectItem>
                                            <SelectItem value="Sports">Sports</SelectItem>
                                            <SelectItem value="Arts">Arts</SelectItem>
                                            <SelectItem value="Leadership">Leadership</SelectItem>
                                            <SelectItem value="Taekwondo">Taekwondo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Photo</Label>
                                    <div className="mt-2">
                                        {formData.imageUrl ? (
                                            <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                                                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                                                    onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <CldUploadWidget
                                                uploadPreset="siakhargone_uploads"
                                                onSuccess={(result: any) => {
                                                    if (result?.info?.secure_url) {
                                                        setFormData({ ...formData, imageUrl: result.info.secure_url });
                                                    }
                                                }}
                                                options={{ sources: ['local', 'url'], maxFiles: 1, clientAllowedFormats: ["image"] }}
                                            >
                                                {({ open }) => (
                                                    <div
                                                        onClick={() => open()}
                                                        className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-blue-200 cursor-pointer transition-colors"
                                                    >
                                                        <Plus className="w-8 h-8 mb-2" />
                                                        <span className="text-sm">Upload Photo</span>
                                                    </div>
                                                )}
                                            </CldUploadWidget>
                                        )}
                                    </div>
                                </div>

                                <Button type="submit" className="w-full bg-navy hover:bg-navy-dark" disabled={submitting || !formData.imageUrl}>
                                    {submitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                    Add to Hall of Fame
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {loading ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-4" />
                                <p className="text-gray-400">Loading Achievers...</p>
                            </div>
                        ) : achievers.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed">
                                <Trophy className="w-12 h-12 mx-auto text-gray-200 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No Achievers Yet</h3>
                                <p className="text-gray-500">Add your first student to the Hall of Fame.</p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {achievers.map(achiever => (
                                    <Card key={achiever.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="flex h-32">
                                            <div className="w-32 relative bg-gray-100 shrink-0">
                                                <img src={achiever.imageUrl} className="w-full h-full object-cover" alt={achiever.name} />
                                            </div>
                                            <div className="p-4 flex flex-col justify-between flex-1">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-bold text-navy line-clamp-1">{achiever.name}</h3>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-gray-400 hover:text-red-500 -mt-1 -mr-1"
                                                            onClick={() => handleDelete(achiever.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-xs text-gray-500 font-medium">{achiever.class}</p>
                                                    <p className="text-sm text-gold-dark mt-1 font-semibold">{achiever.achievement}</p>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                                                        {achiever.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
