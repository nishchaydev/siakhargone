"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Loader2, FileText, Search, ExternalLink, AlertTriangle, FileCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TCRecord {
    id: number;
    admissionNo: string;
    tcNo: string;
    studentName: string;
    class: string;
    session: string;
    issueDate: string;
    pdfLink: string;
    status: string;
}

export default function TCManager() {
    const [records, setRecords] = useState<TCRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<TCRecord | null>(null);
    const [form, setForm] = useState({
        admissionNo: "",
        tcNo: "",
        studentName: "",
        className: "",
        session: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
        issueDate: new Date().toISOString().split('T')[0],
        pdfLink: "",
        status: "Active"
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await fetch("/api/admin/tc");
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
        r.studentName.toLowerCase().includes(searchTerm) ||
        r.admissionNo.toLowerCase().includes(searchTerm) ||
        r.tcNo.toLowerCase().includes(searchTerm)
    );

    const openIssueModal = () => {
        setCurrentRecord(null);
        setForm({
            admissionNo: "",
            tcNo: "",
            studentName: "",
            className: "",
            session: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
            issueDate: new Date().toISOString().split('T')[0],
            pdfLink: "",
            status: "Active"
        });
        setIsDialogOpen(true);
    };

    const openEditModal = (record: TCRecord) => {
        setCurrentRecord(record);
        setForm({
            admissionNo: record.admissionNo,
            tcNo: record.tcNo,
            studentName: record.studentName,
            className: record.class,
            session: record.session,
            issueDate: record.issueDate,
            pdfLink: record.pdfLink,
            status: record.status
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const method = currentRecord ? "PUT" : "POST";
            const body = currentRecord ? { ...form, id: currentRecord.id } : form;

            const res = await fetch("/api/admin/tc", {
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
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                                <FileCheck className="w-8 h-8 text-blue-600" />
                                Transfer Certificates
                            </h1>
                            <p className="text-gray-500 mt-1 font-medium">Issue, manage, and verify student TCs.</p>
                        </div>
                    </div>
                    <Button onClick={openIssueModal} className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200">
                        <Plus className="w-4 h-4 mr-2" /> Issue New TC
                    </Button>
                </div>

                {/* Main Content */}
                <Card className="border-0 shadow-lg ring-1 ring-gray-100 bg-white overflow-hidden rounded-xl">
                    <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <CardTitle>TC Records</CardTitle>
                                <CardDescription>Search and manage all issued certificates.</CardDescription>
                            </div>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search by Name, TC No, or Admission No..."
                                    className="pl-9 bg-white"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>TC No</TableHead>
                                    <TableHead>Admission No</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Loading records...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRecords.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                                            No records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRecords.map((record) => (
                                        <TableRow key={record.id} className="group hover:bg-gray-50/80 cursor-pointer" onClick={() => openEditModal(record)}>
                                            <TableCell className="font-mono font-medium text-blue-600">{record.tcNo}</TableCell>
                                            <TableCell>{record.admissionNo}</TableCell>
                                            <TableCell className="font-semibold text-gray-700">{record.studentName}</TableCell>
                                            <TableCell>{record.class}</TableCell>
                                            <TableCell>{record.issueDate}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={record.status === "Active" ? "default" : "destructive"}
                                                    className={record.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100 border-0" : "bg-red-100 text-red-700 hover:bg-red-100 border-0"}
                                                >
                                                    {record.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {record.pdfLink && (
                                                    <a
                                                        href={record.pdfLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="inline-flex items-center text-xs font-medium text-blue-500 hover:underline"
                                                    >
                                                        View PDF <ExternalLink className="w-3 h-3 ml-1" />
                                                    </a>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Issue/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{currentRecord ? "Edit TC Record" : "Issue New TC"}</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
                            <div className="col-span-1 space-y-2">
                                <Label>Admission No</Label>
                                <Input required value={form.admissionNo} onChange={e => setForm({ ...form, admissionNo: e.target.value })} placeholder="e.g. 2024001" />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>TC Number</Label>
                                <Input required value={form.tcNo} onChange={e => setForm({ ...form, tcNo: e.target.value })} placeholder="e.g. TC/2024/056" />
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label>Student Name</Label>
                                <Input required value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} placeholder="Full Name" />
                            </div>

                            <div className="col-span-1 space-y-2">
                                <Label>Class Last Attended</Label>
                                <Input required value={form.className} onChange={e => setForm({ ...form, className: e.target.value })} placeholder="e.g. X-B" />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Session</Label>
                                <Input required value={form.session} onChange={e => setForm({ ...form, session: e.target.value })} placeholder="e.g. 2024-25" />
                            </div>

                            <div className="col-span-1 space-y-2">
                                <Label>Date of Issue</Label>
                                <Input type="date" required value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })} />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Status</Label>
                                <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Revoked">Revoked</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label className="flex items-center gap-2">
                                    Google Drive PDF Link
                                    <span className="text-xs text-muted-foreground font-normal">(Make sure sharing is set to "Anyone with link")</span>
                                </Label>
                                {form.pdfLink ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Input disabled value={form.pdfLink} className="bg-gray-50 text-gray-500" />
                                        <Button type="button" variant="ghost" className="text-red-500" onClick={() => setForm({ ...form, pdfLink: "" })}>
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                const formData = new FormData();
                                                formData.append("file", file);

                                                // Show uploading state (simple UI feedback)
                                                e.target.disabled = true;

                                                try {
                                                    const res = await fetch("/api/admin/upload-drive", {
                                                        method: "POST",
                                                        body: formData
                                                    });
                                                    const json = await res.json();

                                                    if (json.success) {
                                                        setForm(prev => ({ ...prev, pdfLink: json.link }));
                                                    } else {
                                                        alert("Upload Failed: " + json.error);
                                                    }
                                                } catch (err) {
                                                    console.error(err);
                                                    alert("Upload Error");
                                                } finally {
                                                    e.target.disabled = false;
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-span-2 pt-4 flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold" disabled={submitting}>
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Record"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
