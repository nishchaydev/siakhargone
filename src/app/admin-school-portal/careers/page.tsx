"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Trash2, Plus, Loader2, Briefcase, Pencil, X, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface JobItem {
    id: number;
    role: string;
    experience: string;
    description: string;
    isActive: boolean;
    type: string;
    department: string;
}

export default function CareersManager() {
    const [jobs, setJobs] = useState<JobItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        role: "",
        experience: "",
        description: "",
        isActive: true,
        type: "Full Time",
        department: "Academic"
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/admin/careers");
            const json = await res.json();
            if (json.data) setJobs(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (job: JobItem) => {
        setForm({
            role: job.role,
            experience: job.experience,
            description: job.description,
            isActive: job.isActive,
            type: job.type || "Full Time",
            department: job.department || "Academic"
        });
        setEditingId(job.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setForm({ role: "", experience: "", description: "", isActive: true, type: "Full Time", department: "Academic" });
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this job posting?")) return;
        setDeletingId(id);
        try {
            const res = await fetch("/api/admin/careers", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                setJobs(jobs.filter(j => j.id !== id));
            } else {
                alert("Failed to delete job");
            }
        } catch (error) {
            alert("Error deleting job");
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

            const res = await fetch("/api/admin/careers", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setForm({ role: "", experience: "", description: "", isActive: true, type: "Full Time", department: "Academic" });
                setEditingId(null);
                fetchJobs(); // Refresh list
            } else {
                alert("Failed to save job");
            }
        } catch (err) {
            alert("Error submitting form");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
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
                                <Briefcase className="w-8 h-8 text-blue-600" />
                                Career Opportunities
                            </h1>
                            <p className="text-gray-500 mt-1 font-medium">Manage job openings and find the best talent.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg ring-1 ring-gray-100 sticky top-6 bg-white overflow-hidden rounded-2xl">
                            <div className={`h-2 w-full ${editingId ? "bg-amber-500" : "bg-blue-600"}`} />
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    {editingId ? (
                                        <><Pencil className="w-5 h-5 text-amber-500" /> Edit Job</>
                                    ) : (
                                        <><Plus className="w-5 h-5 text-blue-600" /> Post New Job</>
                                    )}
                                </CardTitle>
                                <CardDescription>
                                    {editingId ? "Update details for this position." : "Fill in the details to publish a new opening."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Job Role</Label>
                                        <Input
                                            placeholder="e.g. Senior Mathematics Teacher"
                                            value={form.role}
                                            onChange={e => setForm({ ...form, role: e.target.value })}
                                            required
                                            className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Type</Label>
                                            <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Full Time">Full Time</SelectItem>
                                                    <SelectItem value="Part Time">Part Time</SelectItem>
                                                    <SelectItem value="Contract">Contract</SelectItem>
                                                    <SelectItem value="Internship">Internship</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department</Label>
                                            <Select value={form.department} onValueChange={(val) => setForm({ ...form, department: val })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Academic">Academic</SelectItem>
                                                    <SelectItem value="Sports">Sports</SelectItem>
                                                    <SelectItem value="Arts">Arts</SelectItem>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                    <SelectItem value="Support">Support</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Required Experience</Label>
                                        <Input
                                            placeholder="e.g. 3-5 Years"
                                            value={form.experience}
                                            onChange={e => setForm({ ...form, experience: e.target.value })}
                                            required
                                            className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</Label>
                                        <Textarea
                                            placeholder="Key responsibilities and qualifications..."
                                            value={form.description}
                                            onChange={e => setForm({ ...form, description: e.target.value })}
                                            required
                                            className="min-h-[120px] bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-semibold text-gray-700">Active Status</Label>
                                            <p className="text-xs text-gray-500">Show on website immediately</p>
                                        </div>
                                        <Switch
                                            checked={form.isActive}
                                            onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
                                            className="data-[state=checked]:bg-blue-600"
                                        />
                                    </div>

                                    <div className="pt-2 flex gap-3">
                                        {editingId && (
                                            <Button type="button" variant="outline" onClick={handleCancelEdit} disabled={submitting} className="flex-1">
                                                Cancel
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            className={`flex-1 ${editingId ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold shadow-md hover:shadow-lg transition-all`}
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            ) : (
                                                <><Save className="w-4 h-4 mr-2" /> {editingId ? "Update Job" : "Publish Job"}</>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <h3 className="font-bold text-gray-700 text-lg">Active Listings ({jobs.length})</h3>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                                <p className="text-gray-400 font-medium">Loading opportunities...</p>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Briefcase className="w-8 h-8 text-gray-300" />
                                </div>
                                <h4 className="text-gray-900 font-bold text-lg">No jobs posted yet</h4>
                                <p className="text-gray-500 mt-1 max-w-sm text-center">Get started by filling out the form on the left to post your first career opportunity.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                <AnimatePresence>
                                    {jobs.map((job) => (
                                        <motion.div
                                            key={job.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            layout
                                        >
                                            <Card className="group overflow-hidden border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                                                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                    <div className="space-y-2 flex-1">
                                                        <div className="flex items-center gap-3 flex-wrap">
                                                            <h4 className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors">
                                                                {job.role}
                                                            </h4>
                                                            {job.isActive ? (
                                                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Active</Badge>
                                                            ) : (
                                                                <Badge variant="secondary" className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-0">Inactive</Badge>
                                                            )}
                                                            <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50">{job.type}</Badge>
                                                            <Badge variant="outline" className="text-purple-600 border-purple-100 bg-purple-50">{job.department}</Badge>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                                            <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">Exp: {job.experience}</span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl pt-1">
                                                            {job.description}
                                                        </p>
                                                    </div>

                                                    <div className="flex sm:flex-col gap-2 pt-2 sm:pt-0">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-full h-8 w-8"
                                                            onClick={() => handleEdit(job)}
                                                            title="Edit Job"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full h-8 w-8"
                                                            onClick={() => handleDelete(job.id)}
                                                            disabled={deletingId === job.id}
                                                            title="Delete Job"
                                                        >
                                                            {deletingId === job.id ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="w-4 h-4" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
