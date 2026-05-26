"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Loader2, Search, ExternalLink, GraduationCap, Trash2, Upload, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SCHOOL_CLASS_OPTIONS, normalizeClassName } from "@/lib/class-options";

interface ResultRecord {
    id: number;
    admissionNo: string;
    dob: string;
    studentName: string;
    class: string;
    examName: string;
    resultLink: string;
    status: string;
}

export default function ResultsManager() {
    const [records, setRecords] = useState<ResultRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClass, setSelectedClass] = useState("All Classes");

    // Modal State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<ResultRecord | null>(null);
    const [form, setForm] = useState({
        admissionNo: "",
        dob: "",
        studentName: "",
        className: "",
        examName: "",
        resultLink: "",
        status: "Published"
    });
    const [submitting, setSubmitting] = useState(false);
    const [bulkUploading, setBulkUploading] = useState(false);
    const [bulkMessage, setBulkMessage] = useState("");
    const [bulkError, setBulkError] = useState("");
    const [bulkCsvFile, setBulkCsvFile] = useState<File | null>(null);
    const [bulkResultFiles, setBulkResultFiles] = useState<File[]>([]);
    const [bulkInputResetKey, setBulkInputResetKey] = useState(0);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await fetch("/api/admin/results");
            const json = await res.json();
            if (json.data) {
                const normalizedRecords = json.data.map((record: ResultRecord) => ({
                    ...record,
                    class: normalizeClassName(record.class || ""),
                }));
                setRecords(normalizedRecords);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const classFilterOptions = Array.from(
        new Set(
            [...SCHOOL_CLASS_OPTIONS, ...records.map((record) => normalizeClassName(record.class || ""))]
                .filter((className) => className.trim().length > 0)
        )
    );

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredRecords = records.filter((record) => {
        const recordClass = normalizeClassName(record.class || "");
        const matchesClass = selectedClass === "All Classes" || recordClass === selectedClass;
        const matchesSearch =
            normalizedSearch.length === 0 ||
            record.studentName.toLowerCase().includes(normalizedSearch) ||
            record.admissionNo.toLowerCase().includes(normalizedSearch) ||
            record.examName.toLowerCase().includes(normalizedSearch) ||
            recordClass.toLowerCase().includes(normalizedSearch);

        return matchesClass && matchesSearch;
    });

    const toDateInputValue = (value: string): string => {
        const trimmed = value.trim();
        if (!trimmed) return "";
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
        if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
            const [day, month, year] = trimmed.split("-");
            return `${year}-${month}-${day}`;
        }
        return "";
    };

    const toDobForApi = (value: string): string => {
        const trimmed = value.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            const [year, month, day] = trimmed.split("-");
            return `${day}-${month}-${year}`;
        }
        return trimmed;
    };

    const openCreateModal = () => {
        setCurrentRecord(null);
        setForm({
            admissionNo: "",
            dob: "",
            studentName: "",
            className: "",
            examName: "",
            resultLink: "",
            status: "Published"
        });
        setIsDialogOpen(true);
    };

    const openEditModal = (record: ResultRecord) => {
        setCurrentRecord(record);
        setForm({
            admissionNo: record.admissionNo,
            dob: toDateInputValue(record.dob),
            studentName: record.studentName,
            className: normalizeClassName(record.class || ""),
            examName: record.examName,
            resultLink: record.resultLink,
            status: record.status
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if (!form.className) {
            alert("Please select a class.");
            setSubmitting(false);
            return;
        }

        try {
            const method = currentRecord ? "PUT" : "POST";
            const normalizedForm = {
                ...form,
                dob: toDobForApi(form.dob),
                className: normalizeClassName(form.className),
            };
            const body = currentRecord ? { ...normalizedForm, id: currentRecord.id } : normalizedForm;

            const res = await fetch("/api/admin/results", {
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

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this result? This action cannot be undone.")) return;

        // Optimistic UI Update (optional, but nice)
        // setRecords(prev => prev.filter(r => r.id !== id)); 
        // Better to wait for server confirmation to avoid sync issues with row indices if failure occurs.

        try {
            const res = await fetch("/api/admin/results", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                fetchRecords(); // Refresh to get new indices/data
            } else {
                alert("Failed to delete result");
            }
        } catch (error) {
            alert("Error deleting result");
        }
    };

    const downloadTemplateCsv = () => {
        const csv = [
            "admissionNo,dob,studentName,className,examName,resultLink,status",
            "2024001,15-08-2010,Aarav Sharma,Class 10,Final Term 2025,https://example.com/result-2024001.pdf,Published",
            "2024002,19-09-2010,Diya Patel,Class 10,Final Term 2025,https://example.com/result-2024002.pdf,Published",
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "results-bulk-template.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleBulkUpload = async () => {
        if (!bulkCsvFile) {
            setBulkError("Please select a CSV file first.");
            return;
        }

        setBulkUploading(true);
        setBulkError("");
        setBulkMessage("");

        try {
            const formData = new FormData();
            formData.append("file", bulkCsvFile);
            bulkResultFiles.forEach((resultFile) => {
                formData.append("resultFiles", resultFile);
            });

            const res = await fetch("/api/admin/results/bulk", {
                method: "POST",
                body: formData,
            });
            const json = await res.json();

            if (!res.ok) {
                const details = Array.isArray(json.errors) ? ` ${json.errors.slice(0, 3).join(" | ")}` : "";
                setBulkError((json.error || "Bulk upload failed.") + details);
                return;
            }

            const uploadedInfo = json.uploadedFiles ? ` (${json.uploadedFiles} files auto-uploaded to Cloudinary)` : "";
            setBulkMessage(`Successfully uploaded ${json.inserted || 0} result records.${uploadedInfo}`);
            setBulkCsvFile(null);
            setBulkResultFiles([]);
            setBulkInputResetKey((prev) => prev + 1);
            fetchRecords();
        } catch {
            setBulkError("Unable to upload CSV right now. Please try again.");
        } finally {
            setBulkUploading(false);
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
                                <GraduationCap className="w-8 h-8 text-blue-600" />
                                Student Results
                            </h1>
                            <p className="text-gray-500 mt-1 font-medium">Upload and manage academic report cards.</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => setIsBulkDialogOpen(true)}
                        >
                            <Upload className="w-4 h-4 mr-2" /> Bulk Import
                        </Button>
                        <Button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200">
                            <Plus className="w-4 h-4 mr-2" /> Upload Result
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <Card className="border-0 shadow-lg ring-1 ring-gray-100 bg-white overflow-hidden rounded-xl">
                    <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <CardTitle>Result Records</CardTitle>
                                <CardDescription>Manage published results.</CardDescription>
                            </div>
                            <div className="flex w-full md:w-auto flex-col md:flex-row gap-3">
                                <div className="relative w-full md:w-80">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search by Name, Class, Exam, or Admission No..."
                                        className="pl-9 bg-white"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="w-full md:w-48">
                                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Filter Class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All Classes">All Classes</SelectItem>
                                            {classFilterOptions.map((className) => (
                                                <SelectItem key={className} value={className}>
                                                    {className}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Admission No</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Exam</TableHead>
                                    <TableHead>DOB (Auth)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">PDF</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRecords.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                                            No results found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRecords.map((record) => (
                                        <TableRow key={record.id} className="group hover:bg-gray-50/80 cursor-pointer" onClick={() => openEditModal(record)}>
                                            <TableCell className="font-mono font-medium text-blue-600">{record.admissionNo}</TableCell>
                                            <TableCell className="font-semibold text-gray-700">{record.studentName}</TableCell>
                                            <TableCell>{record.class}</TableCell>
                                            <TableCell>{record.examName}</TableCell>
                                            <TableCell>{record.dob}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={record.status === "Published" ? "default" : "secondary"}
                                                    className={record.status === "Published" ? "bg-green-100 text-green-700 hover:bg-green-100 border-0" : "bg-gray-100 text-gray-700 hover:bg-gray-100 border-0"}
                                                >
                                                    {record.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {record.resultLink && (
                                                        <a
                                                            href={record.resultLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex items-center text-xs font-medium text-blue-500 hover:underline"
                                                        >
                                                            View <ExternalLink className="w-3 h-3 ml-1" />
                                                        </a>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(record.id);
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

                {/* Bulk Upload Dialog */}
                <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Smart Bulk Import</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label>CSV File</Label>
                                <Input
                                    key={`bulk-csv-${bulkInputResetKey}`}
                                    type="file"
                                    accept=".csv,text/csv"
                                    disabled={bulkUploading}
                                    onChange={(e) => {
                                        setBulkCsvFile(e.target.files?.[0] || null);
                                        setBulkError("");
                                        setBulkMessage("");
                                    }}
                                />
                                {bulkCsvFile && <p className="text-xs text-gray-500">Selected: {bulkCsvFile.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Result Files (Optional)</Label>
                                <Input
                                    key={`bulk-files-${bulkInputResetKey}`}
                                    type="file"
                                    accept="application/pdf,image/*"
                                    multiple
                                    disabled={bulkUploading}
                                    onChange={(e) => {
                                        setBulkResultFiles(Array.from(e.target.files || []));
                                        setBulkError("");
                                        setBulkMessage("");
                                    }}
                                />
                                <p className="text-xs text-gray-500">
                                    If CSV has no resultLink, file names should match admission number (e.g. <span className="font-mono">2024001.pdf</span>)
                                    or admission+exam (e.g. <span className="font-mono">2024001finalterm2025.pdf</span>).
                                </p>
                                <p className="text-xs text-red-600">DOB column is mandatory. Rows without valid DOB are rejected.</p>
                                {bulkResultFiles.length > 0 && (
                                    <p className="text-xs text-gray-500">{bulkResultFiles.length} file(s) selected for automatic Cloudinary upload.</p>
                                )}
                            </div>

                            {bulkUploading && <p className="text-sm text-blue-600 font-medium">Uploading and validating CSV...</p>}
                            {bulkMessage && <p className="text-sm text-green-700 font-medium">{bulkMessage}</p>}
                            {bulkError && <p className="text-sm text-red-600 font-medium">{bulkError}</p>}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                                onClick={downloadTemplateCsv}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download Template
                            </Button>
                            <Button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleBulkUpload}
                                disabled={bulkUploading || !bulkCsvFile}
                            >
                                {bulkUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                                Start Bulk Import
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{currentRecord ? "Edit Result" : "Upload New Result"}</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
                            <div className="col-span-1 space-y-2">
                                <Label>Admission No</Label>
                                <Input required value={form.admissionNo} onChange={e => setForm({ ...form, admissionNo: e.target.value })} placeholder="e.g. 2024001" />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Student DOB (Password)</Label>
                                <Input
                                    required
                                    type="date"
                                    value={form.dob}
                                    onChange={e => setForm({ ...form, dob: e.target.value })}
                                />
                                <span className="text-[10px] text-gray-400">Select DOB from calendar. It will be saved in DD-MM-YYYY.</span>
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label>Student Name</Label>
                                <Input required value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} placeholder="Full Name" />
                            </div>

                            <div className="col-span-1 space-y-2">
                                <Label>Class</Label>
                                <Select value={form.className} onValueChange={(val) => setForm({ ...form, className: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SCHOOL_CLASS_OPTIONS.map((className) => (
                                            <SelectItem key={className} value={className}>
                                                {className}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-1 space-y-2">
                                <Label>Exam Name</Label>
                                <Input required value={form.examName} onChange={e => setForm({ ...form, examName: e.target.value })} placeholder="e.g. Final Term 2024" />
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label>Status</Label>
                                <Select value={form.status} onValueChange={(val) => setForm({ ...form, status: val })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Published">Published</SelectItem>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label className="flex items-center gap-2">
                                    Upload Result (PDF / Image)
                                    <span className="text-xs text-muted-foreground font-normal">(Uploaded to Cloudinary)</span>
                                </Label>
                                {form.resultLink ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Input disabled value={form.resultLink} className="bg-gray-50 text-gray-500 flex-1" />
                                        <Button type="button" variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200" onClick={() => setForm({ ...form, resultLink: "" })}>
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="file"
                                            accept="application/pdf, image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                const formData = new FormData();
                                                formData.append("file", file);

                                                // Show uploading state
                                                e.target.disabled = true;

                                                try {
                                                    const res = await fetch("/api/admin/upload-cloudinary", {
                                                        method: "POST",
                                                        body: formData
                                                    });
                                                    const json = await res.json();

                                                    if (json.success) {
                                                        setForm(prev => ({ ...prev, resultLink: json.link }));
                                                    } else {
                                                        alert("Upload Failed: " + (json.details || json.error));
                                                    }
                                                } catch (err) {
                                                    alert("Upload Error");
                                                } finally {
                                                    e.target.disabled = false;
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <DialogFooter className="col-span-2 pt-4">
                                <Button type="button" variant="outline" className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold" disabled={submitting}>
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Result"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
