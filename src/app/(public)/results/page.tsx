"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Search, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";

export default function ResultPage() {
    const [form, setForm] = useState({ admissionNo: "", dob: "" });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch(`/api/public/results?admissionNo=${encodeURIComponent(form.admissionNo)}&dob=${encodeURIComponent(form.dob)}`);
            const data = await res.json();

            if (res.ok) {
                setResult(data.data);
            } else {
                setError(data.error || "Result not found. Please check details.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-grain flex items-center justify-center p-4 pt-20">
            <div className="w-full max-w-md space-y-8">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-display font-bold text-navy">Student Results</h1>
                    <p className="text-muted-foreground">Access your academic records securely.</p>
                </div>

                <Card className="border-t-4 border-t-gold shadow-xl">
                    <CardHeader>
                        <CardTitle>Check Result</CardTitle>
                        <CardDescription>Enter your admission details below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="admission" className="text-xs uppercase font-bold text-gray-500">Admission No.</Label>
                                <Input
                                    id="admission"
                                    placeholder="e.g. 2024001"
                                    required
                                    value={form.admissionNo}
                                    onChange={(e) => setForm({ ...form, admissionNo: e.target.value })}
                                    className="bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dob" className="text-xs uppercase font-bold text-gray-500">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    placeholder="DD-MM-YYYY"
                                    required
                                    value={form.dob}
                                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                                    className="bg-gray-50 focus:bg-white transition-all"
                                    title="Format: DD-MM-YYYY"
                                />
                                <p className="text-[10px] text-gray-400">Format: DD-MM-YYYY (e.g. 15-08-2010)</p>
                            </div>

                            <Button type="submit" className="w-full bg-navy hover:bg-gold hover:text-navy font-bold transition-all" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                                View Result
                            </Button>
                        </form>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </CardContent>
                </Card>

                {/* Result Display Card */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Card className="border-0 shadow-2xl bg-navy text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-6 -mt-6"></div>
                            <CardHeader className="relative z-10 border-b border-white/10 pb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold font-display text-gold mb-1">{result.studentName}</h3>
                                        <p className="text-sm text-white/70">Class: {result.class}</p>
                                    </div>
                                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono">
                                        {result.admissionNo}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 relative z-10 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Exam Name</span>
                                        <span className="font-semibold">{result.examName}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Status</span>
                                        <span className="font-semibold text-green-400 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> {result.status}
                                        </span>
                                    </div>
                                </div>

                                {result.resultLink ? (
                                    <Button asChild className="w-full bg-gold text-navy hover:bg-white font-bold transition-colors">
                                        <a href={result.resultLink} target="_blank" rel="noopener noreferrer">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Report Card
                                        </a>
                                    </Button>
                                ) : (
                                    <div className="text-center text-xs text-white/50 italic">
                                        Result PDF not available for download yet.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
