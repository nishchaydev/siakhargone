"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Trash2, Loader2, Newspaper, Pencil, UploadCloud } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CldUploadWidget } from 'next-cloudinary';
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

import { Switch } from "@/components/ui/switch";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    isFeatured: boolean;
}

export default function NewsManager() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ title: "", description: "", date: "", imageUrl: "", isFeatured: true });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch("/api/admin/news", { cache: 'no-store' });
            const json = await res.json();
            if (json.data) setNews(json.data);
        } catch (err) {
            console.error(err);
            toast({ title: "Error", description: "Failed to fetch news", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: NewsItem) => {
        setForm({
            title: item.title,
            description: item.description,
            date: item.date,
            imageUrl: item.imageUrl,
            isFeatured: item.isFeatured
        });
        setEditingId(item.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setForm({ title: "", description: "", date: "", imageUrl: "", isFeatured: true });
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this news item?")) return;
        setDeletingId(id);
        try {
            const res = await fetch("/api/admin/news", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                setNews(news.filter(n => n.id !== id));
                toast({ title: "Success", description: "News item deleted" });
            } else {
                toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "Error deleting item", variant: "destructive" });
        } finally {
            setDeletingId(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { ...form, id: editingId } : form;

            const res = await fetch("/api/admin/news", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                toast({ title: "Success", description: editingId ? "News updated" : "News published" });
                handleCancelEdit();
                fetchNews();
            } else {
                toast({ title: "Error", description: "Failed to save", variant: "destructive" });
            }
        } catch (err) {
            toast({ title: "Error", description: "Error submitting form", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin-school-portal/dashboard">
                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-sm hover:bg-gray-100">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                                <Newspaper className="w-8 h-8 text-orange-600" />
                                News Manager
                            </h1>
                            <p className="text-gray-500 mt-1 font-medium">Manage school updates and announcements.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg ring-1 ring-gray-100 sticky top-6 bg-white overflow-hidden rounded-2xl">
                            <div className={`h-2 w-full ${editingId ? "bg-amber-500" : "bg-orange-600"}`} />
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    {editingId ? "Edit News" : "Post News"}
                                </CardTitle>
                                <CardDescription>Share recent events and achievements.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label>Headline</Label>
                                        <Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Annual Sports Day Results" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Date</Label>
                                        <Input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="news-is-featured" className="text-base cursor-pointer">Show on Home</Label>
                                            <p className="text-xs text-muted-foreground">Display in "Latest News"</p>
                                        </div>
                                        <Switch
                                            id="news-is-featured"
                                            checked={form.isFeatured}
                                            onCheckedChange={checked => setForm({ ...form, isFeatured: checked })}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label>Image (Optional)</Label>

                                        {form.imageUrl ? (
                                            <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                                                <div className="aspect-video w-full relative bg-gray-100">
                                                    <Image
                                                        src={form.imageUrl}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => setForm({ ...form, imageUrl: "" })}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                                                <CldUploadWidget
                                                    uploadPreset="siakhargone_uploads"
                                                    onSuccess={(result) => {
                                                        if (result.info && typeof result.info !== 'string' && result.info.secure_url) {
                                                            setForm({ ...form, imageUrl: result.info.secure_url });
                                                        }
                                                    }}
                                                    options={{
                                                        sources: ['local', 'url'],
                                                        maxFiles: 1,
                                                        clientAllowedFormats: ["image"],
                                                    }}
                                                >
                                                    {({ open }) => (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                open();
                                                            }}
                                                            className="w-full h-full border-0 bg-transparent hover:bg-transparent"
                                                        >
                                                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                                                <UploadCloud className="w-8 h-8" />
                                                                <span className="text-sm font-medium">Click to Upload Image</span>
                                                            </div>
                                                        </Button>
                                                    )}
                                                </CldUploadWidget>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Description</Label>
                                        <Textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Details..." className="h-32" />
                                    </div>

                                    <div className="pt-2 flex gap-3">
                                        {editingId && <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1">Cancel</Button>}
                                        <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 font-bold text-white" disabled={submitting}>
                                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Update" : "Publish")}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <h3 className="font-bold text-gray-700 text-lg">Published Articles ({news.length})</h3>
                        </div>

                        {loading ? (
                            <div className="py-12 text-center text-gray-400">Loading news...</div>
                        ) : news.length === 0 ? (
                            <div className="py-12 text-center border-2 border-dashed rounded-xl">No news posted yet.</div>
                        ) : (
                            <div className="space-y-4">
                                {news.map((item) => (
                                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all">
                                        <CardContent className="p-0 flex flex-col md:flex-row">
                                            {item.imageUrl && (
                                                <div className="w-full md:w-48 h-32 bg-gray-200 shrink-0 relative">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.title || "News article image"}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 300px"
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            )}
                                            <div className="p-5 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-lg text-gray-900 line-clamp-1">{item.title}</h4>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2 bg-gray-100 px-2 py-1 rounded">{item.date}</span>
                                                            <span className={`text-xs px-1.5 py-0.5 rounded mt-1 ${item.isFeatured ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                                                                {item.isFeatured ? "On Home" : "Hidden on Home"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                                                </div>
                                                <div className="flex justify-end gap-2 mt-4">
                                                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}><Trash2 className="w-3 h-3 mr-1" /> Delete</Button>
                                                </div>
                                            </div>
                                        </CardContent>
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
