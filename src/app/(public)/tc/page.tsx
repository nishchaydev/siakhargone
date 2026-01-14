
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileCheck, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageBanner from "@/components/common/PageBanner";

export default function TCVerificationPage() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setHasSearched(true);
        setResult(null);

        try {
            // We can reuse the admin API or create a specific public search API
            // For security, it's better to verify exact matches only.
            // Using a new search API: /api/tc/search?q=...
            const res = await fetch(`/api/tc/search?q=${encodeURIComponent(query)}`);
            const json = await res.json();

            if (json.data) {
                setResult(json.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PageBanner
                title="Transfer Certificates"
                subtitle="Verify and download student transfer certificates securely."
                image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-extrabold text-gray-900">TC Verification Portal</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Enter the Student Admission Number below.
                        </p>
                    </div>

                    <Card className="shadow-lg border-0 ring-1 ring-gray-100">
                        {/* ... rest of the content unchanged ... */}
                        <CardContent className="p-6 md:p-10">
                            <form onSubmit={handleSearch} className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <Input
                                        className="pl-10 h-12 text-lg"
                                        placeholder="Enter Admission Number (e.g. 2024001)..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 font-bold" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {hasSearched && !loading && !result && (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">No Transfer Certificate found for specific Admission Number.</p>
                            <p className="text-sm text-gray-400 mt-2">Please check the number and try again.</p>
                        </div>
                    )}

                    {result && (
                        <Card className="border-l-4 border-l-green-500 shadow-md animate-in fade-in slide-in-from-bottom-4">
                            <CardHeader className="bg-green-50/50 pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Verified Record</Badge>
                                            <span className="text-sm text-gray-400">Issued On: {result.issueDate}</span>
                                        </div>
                                        <CardTitle className="text-2xl text-gray-800">{result.studentName}</CardTitle>
                                        <CardDescription className="text-base">Admission No: <span className="font-mono font-medium text-gray-700">{result.admissionNo}</span></CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">TC Number</p>
                                        <p className="text-xl font-mono text-blue-600 font-bold">{result.tcNo}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Class Last Attended</p>
                                        <p className="font-medium text-gray-900">{result.class}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Session</p>
                                        <p className="font-medium text-gray-900">{result.session}</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t flex justify-end">
                                    {result.pdfLink && (
                                        <a href={result.pdfLink} target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-navy hover:bg-navy-light text-white font-bold">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                View Original TC (PDF)
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
