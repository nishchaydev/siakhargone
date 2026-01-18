"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trash2, Loader2, Bell, Pencil, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CldUploadWidget } from 'next-cloudinary';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NoticeItem {
    id: number;
    text: string;
    link: string;
    date: string;
    isPriority: boolean; // Map from 'Priority' column (TRUE/FALSE)
}

export default function NoticesManager() {
    const [notices, setNotices] = useState<NoticeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ text: "", link: "", date: "", isPriority: false });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await fetch("/api/admin/notices", { cache: 'no-store' });
            const json = await res.json();
            if (json.data) setNotices(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    // ... (skip unchanged lines)
    <div className="space-y-1.5">
        <Label>Notice Image (Optional)</Label>
        <div className="flex gap-2">
            <Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="Paste Image URL" className="flex-1" />
            <CldUploadWidget
                uploadPreset="siakhargone_uploads"
                onSuccess={(result: any) => {
                    const url = result?.info?.secure_url;
                    if (url) setForm(prev => ({ ...prev, link: url }));
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
                        type="button"
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            open();
                        }}
                        title="Upload Image (JPG/PNG)"
                    >
                        <UploadCloud className="w-4 h-4" />
                    </Button>
                )}
            </CldUploadWidget>
        </div>
    </div>

    const handleEdit = (item: NoticeItem) => {
        setForm({
            text: item.text,
            link: item.link,
            date: item.date,
            isPriority: item.isPriority
        });
        setEditingId(item.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setForm({ text: "", link: "", date: "", isPriority: false });
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this notice?")) return;
        setDeletingId(id);
        try {
            const res = await fetch("/api/admin/notices", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setNotices(notices.filter(n => n.id !== id));
            } else alert("Failed to delete");
        } catch (e) { alert("Error deleting"); } finally { setDeletingId(null); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { ...form, id: editingId } : form;
            const res = await fetch("/api/admin/notices", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                handleCancelEdit();
                fetchNotices();
            } else alert("Failed to save");
        } catch (e) { alert("Error saving"); } finally { setSubmitting(false); }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin-school-portal/dashboard">
                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-sm hover:bg-gray-100">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                                <Bell className="w-8 h-8 text-yellow-500" />
                                Notices Board
                            </h1>
                            <p className="text-gray-500 mt-1 font-medium">Flash alerts and important downloads.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Card className="border-0 shadow-lg ring-1 ring-gray-100 sticky top-6 bg-white overflow-hidden rounded-2xl">
                            <div className={`h-2 w-full ${editingId ? "bg-amber-500" : "bg-yellow-500"}`} />
                            <CardHeader>
                                <CardTitle>{editingId ? "Edit Notice" : "New Notice"}</CardTitle>
                                <CardDescription>Visible on the ticker tape.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label>Notice Text</Label>
                                        <Input required value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="e.g. School closed tomorrow" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Notice Image (Optional)</Label>
                                        <div className="flex gap-2">
                                            <Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="Paste Image URL or Upload" className="flex-1" />
                                            <CldUploadWidget
                                                uploadPreset="siakhargone_uploads"
                                                onSuccess={(result: any) => {
                                                    const url = result?.info?.secure_url;
                                                    if (url) setForm(prev => ({ ...prev, link: url }));
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
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            open();
                                                        }}
                                                        title="Upload Image Only"
                                                    >
                                                        <UploadCloud className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </CldUploadWidget>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Date</Label>
                                        <Input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <Label>High Priority?</Label>
                                        <Switch checked={form.isPriority} onCheckedChange={c => setForm({ ...form, isPriority: c })} />
                                    </div>
                                    <div className="pt-2 flex gap-2">
                                        {editingId && <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1">Cancel</Button>}
                                        <Button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold" disabled={submitting}>
                                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Update" : "Add")}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <h3 className="font-bold text-gray-700 text-lg">Active Notices ({notices.length})</h3>
                        </div>
                        {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> :
                            notices.length === 0 ? <div className="text-center py-12 border-2 border-dashed rounded-xl">No notices.</div> : (
                                <div className="space-y-3">
                                    {notices.map(n => (
                                        <div key={n.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    {n.isPriority && <span className="bg-red-100 text-red-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Priority</span>}
                                                    <span className="text-xs text-gray-400">{n.date}</span>
                                                </div>
                                                <p className="font-medium text-gray-800">{n.text}</p>
                                                {n.link && <a href={n.link} className="text-xs text-blue-500 hover:underline">View Link</a>}
                                            </div>
                                            <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(n)}><Pencil className="w-3 h-3" /></Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => handleDelete(n.id)}><Trash2 className="w-3 h-3" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
