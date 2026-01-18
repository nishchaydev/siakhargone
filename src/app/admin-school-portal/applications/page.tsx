"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink, Calendar, Mail, Phone, RefreshCw, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Application {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    resumeLink: string;
    date: string;
    status: string;
    notes: string;
}

const STATUS_COLORS: Record<string, string> = {
    "New": "bg-blue-100 text-blue-800",
    "Contacted": "bg-yellow-100 text-yellow-800",
    "Interview": "bg-purple-100 text-purple-800",
    "Accepted": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800",
};

export default function ApplicationsPage() {
    const [data, setData] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/applications", { cache: "no-store" });
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

    const handleStatusChange = async (id: string, newStatus: string) => {
        setUpdating(id);
        try {
            await fetch("/api/admin/applications", {
                method: "PUT",
                body: JSON.stringify({ id, status: newStatus })
            });
            // Optimistic Update
            setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        } catch (e) {
            alert("Update failed");
        } finally {
            setUpdating(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application?")) return;
        setUpdating(id);
        try {
            await fetch("/api/admin/applications", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            await fetchData();
        } catch (e) {
            alert("Delete failed");
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-navy">Admissions CRM</h2>
                    <p className="text-muted-foreground">Manage job applications and student admission leads.</p>
                </div>
                <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="h-40 flex items-center justify-center text-muted-foreground">
                            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading data...
                        </div>
                    ) : data.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">No applications found.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Role/Position</TableHead>
                                    <TableHead>Applied On</TableHead>
                                    <TableHead>Resume</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-navy">{item.name}</span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {item.email}</span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> {item.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{item.role}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {item.date ? format(new Date(item.date), "dd MMM yyyy") : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {item.resumeLink && (
                                                <a href={item.resumeLink} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                                    View PDF <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                defaultValue={item.status}
                                                onValueChange={(val) => handleStatusChange(item.id, val)}
                                                disabled={updating === item.id}
                                            >
                                                <SelectTrigger className={`w-[130px] h-8 text-xs font-bold border-0 ${STATUS_COLORS[item.status] || "bg-gray-100"}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="New">New</SelectItem>
                                                    <SelectItem value="Contacted">Contacted</SelectItem>
                                                    <SelectItem value="Interview">Interview</SelectItem>
                                                    <SelectItem value="Accepted">Accepted</SelectItem>
                                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            {/* Placeholder for future Notes feature */}
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="text-xs text-gray-400" disabled>
                                                    Note
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    disabled={updating === item.id}
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
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
