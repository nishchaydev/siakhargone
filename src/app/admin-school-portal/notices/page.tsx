
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Trash2, Bell, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Notice {
    id: number;
    text: string;
    link: string;
    date: string;
    isImportant: boolean;
}

export default function NoticesManager() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ text: "", link: "", isImportant: false });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await fetch("/api/admin/notices");
            const json = await res.json();
            if (json.data) setNotices(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = { ...form, date: new Date().toLocaleDateString() };

            const res = await fetch("/api/admin/notices", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setForm({ text: "", link: "", isImportant: false });
                fetchNotices();
            }
        } catch (err) {
            alert("Failed to save");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin-school-portal/dashboard">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-navy">Notice Board</h1>
                        <p className="text-muted-foreground">Manage scrolling ticker and alerts.</p>
                    </div>
                </div>

                <Card className="border-t-4 border-t-amber-500 shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-amber-600" /> New Notice
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Notice Text (e.g. School Closed Tomorrow)"
                                value={form.text}
                                onChange={e => setForm({ ...form, text: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                                <Input
                                    placeholder="Link (Optional PDF/Page)"
                                    value={form.link}
                                    onChange={e => setForm({ ...form, link: e.target.value })}
                                />
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={form.isImportant}
                                        onCheckedChange={checked => setForm({ ...form, isImportant: checked })}
                                    />
                                    <label className="text-sm font-medium">Urgent?</label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                                Publish Notice
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    <h3 className="font-bold text-gray-700 mt-8">Active Notices</h3>
                    {loading ? <p className="text-gray-400">Loading...</p> : notices.map((n) => (
                        <div key={n.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center group">
                            <div className="flex items-center gap-3">
                                {n.isImportant && <AlertCircle className="w-5 h-5 text-red-500" />}
                                <div>
                                    <p className="font-medium text-gray-800">{n.text}</p>
                                    <p className="text-xs text-gray-400">{n.date} • {n.link}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-red-400 opacity-50 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
