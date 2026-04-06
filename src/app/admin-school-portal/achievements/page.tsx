
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Loader2, Search, Trophy, Trash2, Calendar, User, Layout, Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface AchievementRecord {
    rowId: number;
    id: string;
    title: string;
    studentName: string;
    class: string;
    date: string;
    description: string;
    imageUrl: string;
    priority: string;
    category: string;
    status: string;
    mediaCoverage: boolean;
    createdAt: string;
}

export default function AchievementsManager() {
    const [records, setRecords] = useState<AchievementRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<AchievementRecord | null>(null);
    const [form, setForm] = useState({
        title: "",
        studentName: "",
        class: "",
        date: "",
        description: "",
        imageUrl: "",
        priority: "3",
        category: "General",
        status: "Active",
        mediaCoverage: false
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await fetch("/api/admin/achievements");
            const json = await res.json();
            if (json.data) setRecords(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredRecords = records.filter(r =>
        r.title.toLowerCase().includes(searchTerm) ||
        r.studentName.toLowerCase().includes(searchTerm) ||
        r.category.toLowerCase().includes(searchTerm)
    );

    const openCreateModal = () => {
        setCurrentRecord(null);
        setForm({
            title: "",
            studentName: "",
            class: "",
            date: "",
            description: "",
            imageUrl: "",
            priority: "3",
            category: "General",
            status: "Active",
            mediaCoverage: false
        });
        setIsDialogOpen(true);
    };

    const openEditModal = (record: AchievementRecord) => {
        setCurrentRecord(record);
        setForm({
            title: record.title,
            studentName: record.studentName,
            class: record.class,
            date: record.date,
            description: record.description,
            imageUrl: record.imageUrl,
            priority: record.priority,
            category: record.category,
            status: record.status,
            mediaCoverage: record.mediaCoverage
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const method = currentRecord ? "PUT" : "POST";
            const body = currentRecord ? { ...form, rowId: currentRecord.rowId, id: currentRecord.id, createdAt: currentRecord.createdAt } : form;

            const res = await fetch("/api/admin/achievements", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setIsDialogOpen(false);
                fetchRecords();
            } else {
                alert("Operation failed");
            }
        } catch (error) {
            alert("Error submitting form");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (rowId: number) => {
        if (!confirm("Are you sure you want to delete this achievement?")) return;

        try {
            const res = await fetch("/api/admin/achievements", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rowId })
            });

            if (res.ok) {
                fetchRecords();
            } else {
                alert("Failed to delete achievement");
            }
        } catch (error) {
            alert("Error deleting achievement");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin-school-portal/dashboard">
                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white shadow-sm hover:bg-gray-100">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                                <Trophy className="w-8 h-8 text-amber-600" />
                                Student Achievements
                            </h1>
                            <p className="text-gray-500 mt-1 font-medium">Manage and celebrate student successes.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                         <Link href="/achievements" target="_blank">
                            <Button variant="outline" className="font-bold">
                                <Eye className="w-4 h-4 mr-2" /> View Public Page
                            </Button>
                        </Link>
                        <Button onClick={openCreateModal} className="bg-amber-600 hover:bg-amber-700 font-bold shadow-lg shadow-amber-200">
                            <Plus className="w-4 h-4 mr-2" /> Add Achievement
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <Card className="border-0 shadow-lg ring-1 ring-gray-100 bg-white overflow-hidden rounded-xl">
                    <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <CardTitle>Achievement Records</CardTitle>
                                <CardDescription>All your student victories in one place.</CardDescription>
                            </div>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search by Title, Student, or Category..."
                                    className="pl-9 bg-white"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Student/Class</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Loading achievements...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRecords.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                                            No achievements found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRecords.map((record) => (
                                        <TableRow key={record.rowId} className="group hover:bg-gray-50/80 cursor-pointer" onClick={() => openEditModal(record)}>
                                            <TableCell>
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border">
                                                    {record.imageUrl ? (
                                                        <img src={record.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Trophy className="w-6 h-6 m-3 text-gray-300" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold text-gray-700 max-w-xs truncate">{record.title}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{record.studentName}</span>
                                                    <span className="text-xs text-gray-500">{record.class}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100 italic">
                                                    {record.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm border-gray-400">{record.date}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={record.status === "Active" ? "default" : "secondary"}
                                                    className={record.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100 border-0" : "bg-gray-100 text-gray-700 hover:bg-gray-100 border-0"}
                                                >
                                                    {record.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {record.mediaCoverage && <Badge className="bg-red-100 text-red-600 border-red-200">Media</Badge>}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(record.rowId);
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{currentRecord ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
                            <div className="col-span-2 space-y-2">
                                <Label>Achievement Title</Label>
                                <Input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Winner of State Level Debate" />
                            </div>

                            <div className="col-span-1 space-y-2">
                                <Label>Student Name</Label>
                                <Input required value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} placeholder="Full Name" />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Class / Grade</Label>
                                <Input value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} placeholder="e.g. Class X-A" />
                            </div>

                            <div className="col-span-1 space-y-2">
                                <Label>Date of Achievement</Label>
                                <Input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Category</Label>
                                <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Academic">Academic</SelectItem>
                                        <SelectItem value="Sports">Sports</SelectItem>
                                        <SelectItem value="Cultural">Cultural</SelectItem>
                                        <SelectItem value="Arts">Arts</SelectItem>
                                        <SelectItem value="Science">Science</SelectItem>
                                        <SelectItem value="General">General</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label>Description</Label>
                                <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tell us about the achievement..." className="h-24" />
                            </div>

                            <div className="col-span-1 space-y-2">
                                <Label>Display Priority (1-highest)</Label>
                                <Select value={form.priority} onValueChange={(val) => setForm({ ...form, priority: val })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 (Featured)</SelectItem>
                                        <SelectItem value="2">2 (High)</SelectItem>
                                        <SelectItem value="3">3 (Normal)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Status</Label>
                                <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2 flex items-center space-x-2">
                                <Checkbox id="media" checked={form.mediaCoverage} onCheckedChange={(val) => setForm({ ...form, mediaCoverage: !!val })} />
                                <Label htmlFor="media" className="text-sm font-medium leading-none cursor-pointer">
                                    Has Media Coverage? (Shows "As Seen In Media" badge)
                                </Label>
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label className="flex items-center gap-2">
                                    Achievement Photo
                                    <span className="text-xs text-muted-foreground font-normal">(Cloudinary Upload)</span>
                                </Label>
                                {form.imageUrl ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Input disabled value={form.imageUrl} className="bg-gray-50 text-gray-500 flex-1 h-8 text-xs" />
                                        <Button type="button" variant="outline" size="sm" className="text-red-500" onClick={() => setForm({ ...form, imageUrl: "" })}>
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const formData = new FormData();
                                            formData.append("file", file);
                                            try {
                                                const res = await fetch("/api/admin/upload-cloudinary", {
                                                    method: "POST",
                                                    body: formData
                                                });
                                                const json = await res.json();
                                                if (json.success) setForm(prev => ({ ...prev, imageUrl: json.link }));
                                                else alert("Upload Failed");
                                            } catch (err) { alert("Upload Error"); }
                                        }}
                                    />
                                )}
                            </div>

                            <DialogFooter className="col-span-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 font-bold" disabled={submitting}>
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Achievement"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
