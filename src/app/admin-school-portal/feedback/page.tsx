"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, RefreshCw, Mail, Phone, MessageSquare, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FeedbackItem {
    id: string;
    name: string;
    phone: string;
    email: string;
    category: string;
    message: string;
    date: string;
    status: string;
}

export default function FeedbackAdminPage() {
    const [data, setData] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/feedback", { cache: "no-store" });
            const json = await res.json();
            if (json.data) setData(json.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin-school-portal/dashboard">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-sm hover:bg-gray-100">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-display font-bold text-navy flex items-center gap-2">
                            <MessageSquare className="w-8 h-8 text-teal-600" /> Parent Feedback
                        </h2>
                        <p className="text-muted-foreground mt-1">Review feedback and suggestions submitted by parents.</p>
                    </div>
                </div>
                <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="h-40 flex items-center justify-center text-muted-foreground">
                            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading data...
                        </div>
                    ) : data.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">No feedback found.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Parent Info</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Message Preview</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-navy">{item.name}</span>
                                                {item.email && item.email !== "-" && (
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Mail className="w-3 h-3" /> {item.email}
                                                    </span>
                                                )}
                                                {item.phone && item.phone !== "-" && (
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Phone className="w-3 h-3" /> {item.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                                                {item.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {item.date !== "-" ? formatDate(item.date) : "-"}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate text-sm text-gray-600">
                                            {item.message}
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm">View Full</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Feedback Details</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4 pt-4">
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-gray-500 block">Name</span>
                                                                <span className="font-medium">{item.name}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-500 block">Category</span>
                                                                <span className="font-medium">{item.category}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-500 block">Phone</span>
                                                                <span>{item.phone}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-500 block">Email</span>
                                                                <span>{item.email}</span>
                                                            </div>
                                                        </div>
                                                        <div className="pt-4 border-t">
                                                            <span className="text-gray-500 block text-sm mb-2">Message</span>
                                                            <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed p-4 bg-gray-50 rounded-lg border border-gray-100">
                                                                {item.message}
                                                            </p>
                                                        </div>
                                                        <div className="text-xs text-gray-400 text-right pt-2">
                                                            Submitted: {item.date !== "-" ? formatDate(item.date) : "-"}
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
