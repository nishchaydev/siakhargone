
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Trash2, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface NewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
}

export default function NewsManager() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ title: "", description: "", date: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch("/api/admin/news");
            const json = await res.json();
            if (json.data) setNews(json.data);
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
            // Just hardcoding date to "Recent" if not provided, for simplicity in school context
            const payload = { ...form, date: form.date || "Recent" };

            const res = await fetch("/api/admin/news", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setForm({ title: "", description: "", date: "" });
                fetchNews(); // Refresh list
            }
        } catch (err) {
            alert("Failed to save");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin-school-portal/dashboard">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-navy">Headlines & News</h1>
                        <p className="text-muted-foreground">Manage the "Updates" section on the homepage.</p>
                    </div>
                </div>

                {/* Add New Form */}
                <Card className="border-t-4 border-t-blue-600 shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-blue-600" /> Post New Update
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Title (e.g. Annual Sports Day)"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Date (e.g. 15 Aug 2024)"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value })}
                                />
                            </div>
                            <Textarea
                                placeholder="Short description..."
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                            />
                            <div className="flex justify-end">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Post Update"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-700 mt-8">Recent Updates</h3>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400">Loading sheets...</div>
                    ) : news.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                            <p className="text-gray-400">No news items found. Add one above!</p>
                        </div>
                    ) : (
                        news.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-navy">{item.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                    <span className="text-xs text-blue-500 font-medium mt-2 block">{item.date}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
