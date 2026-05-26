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
    dob: string;
}

const MAX_TC_UPLOAD_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_TC_UPLOAD_SIZE_LABEL = "2MB";

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
        status: "Active",
        dob: "" // Added DOB
    });
    const [submitting, setSubmitting] = useState(false);
    const [bulkUploadStatus, setBulkUploadStatus] = useState<{
        uploading: boolean;
        current: number;
        total: number;
        successes: { name: string; url: string }[];
        failures: { name: string; error: string }[];
    } | null>(null);


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
        setBulkUploadStatus(null);
        setCurrentRecord(null);
        setForm({
            admissionNo: "",
            tcNo: "",
            studentName: "",
            className: "",
            session: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
            issueDate: new Date().toISOString().split('T')[0],
            pdfLink: "",
            status: "Active",
            dob: ""
        });
        setIsDialogOpen(true);
    };

    const openEditModal = (record: TCRecord) => {
        setBulkUploadStatus(null);
        setCurrentRecord(record);
        setForm({
            admissionNo: record.admissionNo,
            tcNo: record.tcNo,
            studentName: record.studentName,
            className: record.class,
            session: record.session,
            issueDate: record.issueDate,
            pdfLink: record.pdfLink,
            status: record.status,
            dob: record.dob || ""
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
                                    <TableHead>DOB</TableHead>
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
                                            <TableCell>{record.dob}</TableCell>
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

                            <div className="col-span-1 space-y-2">
                                <Label>Student Name</Label>
                                <Input required value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} placeholder="Full Name" />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Date of Birth</Label>
                                <Input type="date" required value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
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
                                    Upload TC (PDF / Image)
                                    <span className="text-xs text-muted-foreground font-normal">(Uploaded to Cloudinary)</span>
                                </Label>
                                {form.pdfLink ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Input
                                            key="pdf-link-display"
                                            disabled
                                            value={form.pdfLink}
                                            className="bg-gray-50 text-gray-500"
                                        />
                                        <Button type="button" variant="ghost" className="text-red-500" onClick={() => setForm({ ...form, pdfLink: "" })}>
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            key="pdf-upload-input"
                                            type="file"
                                            accept="application/pdf, image/*"
                                            multiple
                                            onChange={async (e) => {
                                                const files = e.target.files;
                                                if (!files || files.length === 0) return;

                                                const totalFiles = files.length;
                                                const initialStatus = {
                                                    uploading: true,
                                                    current: 0,
                                                    total: totalFiles,
                                                    successes: [],
                                                    failures: []
                                                };
                                                setBulkUploadStatus(initialStatus);

                                                const successesList: { name: string; url: string }[] = [];
                                                const failuresList: { name: string; error: string }[] = [];

                                                e.target.disabled = true;

                                                for (let i = 0; i < totalFiles; i++) {
                                                    const file = files[i];

                                                    setBulkUploadStatus(prev => {
                                                        if (!prev) return prev;
                                                        return {
                                                            ...prev,
                                                            current: i + 1
                                                        };
                                                    });

                                                    if (file.size > MAX_TC_UPLOAD_SIZE) {
                                                        failuresList.push({
                                                            name: file.name,
                                                            error: `File too large (Maximum ${MAX_TC_UPLOAD_SIZE_LABEL})`
                                                        });
                                                        setBulkUploadStatus(prev => {
                                                            if (!prev) return prev;
                                                            return {
                                                                ...prev,
                                                                failures: [...failuresList]
                                                            };
                                                        });
                                                        continue;
                                                    }

                                                    const formData = new FormData();
                                                    formData.append("file", file);

                                                    try {
                                                        const res = await fetch("/api/admin/upload-cloudinary?folder=tc", {
                                                            method: "POST",
                                                            body: formData
                                                        });
                                                        
                                                        let json: any = null;
                                                        try {
                                                            json = await res.json();
                                                        } catch (jsonErr) {
                                                            // Handle or ignore JSON parsing error (e.g. non-JSON error response)
                                                        }

                                                        if (res.ok && json && json.success) {
                                                            successesList.push({ name: file.name, url: json.link });
                                                        } else {
                                                            const errMsg = json?.error || json?.details || `Status ${res.status}`;
                                                            failuresList.push({ name: file.name, error: errMsg });
                                                        }
                                                    } catch (err) {
                                                        failuresList.push({
                                                            name: file.name,
                                                            error: err instanceof Error ? err.message : "Network error"
                                                        });
                                                    }

                                                    setBulkUploadStatus(prev => {
                                                        if (!prev) return prev;
                                                        return {
                                                            ...prev,
                                                            successes: [...successesList],
                                                            failures: [...failuresList]
                                                        };
                                                    });
                                                }

                                                setBulkUploadStatus(prev => {
                                                    if (!prev) return prev;
                                                    return {
                                                        ...prev,
                                                        uploading: false
                                                    };
                                                });

                                                e.target.disabled = false;
                                                e.target.value = ""; // Reset input so same file can be selected again

                                                if (totalFiles === 1 && successesList.length === 1) {
                                                    setForm(prev => ({ ...prev, pdfLink: successesList[0].url }));
                                                }
                                            }}
                                        />
                                    </div>
                                )}

                                {bulkUploadStatus && (
                                    <div className="mt-3 p-4 bg-slate-50 border rounded-lg space-y-3 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-slate-700">
                                                {bulkUploadStatus.uploading 
                                                    ? `Uploading: ${bulkUploadStatus.current} of ${bulkUploadStatus.total} files...` 
                                                    : `Upload Completed (${bulkUploadStatus.successes.length} of ${bulkUploadStatus.total} succeeded)`
                                                }
                                            </span>
                                            {bulkUploadStatus.uploading && (
                                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                            )}
                                        </div>

                                        {bulkUploadStatus.successes.length > 0 && (
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Successful Uploads</span>
                                                    {!bulkUploadStatus.uploading && (
                                                        <Button 
                                                            type="button" 
                                                            variant="link" 
                                                            className="h-auto p-0 text-xs text-blue-600 font-bold"
                                                            onClick={() => {
                                                                const urls = bulkUploadStatus.successes.map(s => s.url).join("\n");
                                                                navigator.clipboard.writeText(urls);
                                                                alert("All links copied to clipboard!");
                                                            }}
                                                        >
                                                            Copy All Links
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="max-h-36 overflow-y-auto space-y-1 bg-white border rounded p-2">
                                                    {bulkUploadStatus.successes.map((s, idx) => (
                                                        <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                                                            <span className="truncate max-w-[250px] font-medium text-slate-600">{s.name}</span>
                                                            <div className="flex items-center gap-2">
                                                                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate max-w-[150px]">
                                                                    View
                                                                </a>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    className="h-6 px-1.5 text-[10px] text-slate-500 hover:text-slate-900"
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(s.url);
                                                                        alert(`Copied link for ${s.name}`);
                                                                    }}
                                                                >
                                                                    Copy
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {bulkUploadStatus.failures.length > 0 && (
                                            <div className="space-y-1.5">
                                                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Failed Uploads</span>
                                                <div className="max-h-24 overflow-y-auto space-y-1 bg-red-50/50 border border-red-100 rounded p-2">
                                                    {bulkUploadStatus.failures.map((f, idx) => (
                                                        <div key={idx} className="flex items-center justify-between text-xs text-red-600">
                                                            <span className="truncate max-w-[200px] font-medium">{f.name}</span>
                                                            <span className="text-[10px] italic max-w-[200px] truncate">{f.error}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="col-span-2 pt-4 flex justify-end gap-2">
                                <Button type="button" variant="outline" className="border-gray-300 text-gray-700" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold" disabled={submitting}>
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Record"}
                                </Button>
                            </div>

                            {/* Delete Button (Only for existing records) */}
                            {currentRecord && (
                                <div className="col-span-2 pt-2 border-t mt-4 flex justify-between items-center">
                                    <p className="text-xs text-red-500 font-medium">Danger Zone</p>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        disabled={submitting}
                                        onClick={async () => {
                                            if (!confirm("Are you sure you want to delete this TC? This action cannot be undone.")) return;

                                            setSubmitting(true);
                                            try {
                                                const res = await fetch("/api/admin/tc", {
                                                    method: "DELETE",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ id: currentRecord.id })
                                                });

                                                if (res.ok) {
                                                    setIsDialogOpen(false);
                                                    fetchRecords();
                                                } else {
                                                    alert("Failed to delete");
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert("Error deleting");
                                            } finally {
                                                setSubmitting(false);
                                            }
                                        }}
                                    >
                                        Delete Forever
                                    </Button>
                                </div>
                            )}
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
