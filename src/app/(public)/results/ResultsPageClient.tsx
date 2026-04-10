"use client";

import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Download, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ResultItem } from "@/services/resultsService";
import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/common/PageTransition";
// Removed unused Tabs imports

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, CheckCircle2, User, UserCheck, GraduationCap, Award, X } from "lucide-react";
import { StudentResult } from "@/types/results";
import { useToast } from "@/hooks/use-toast";

interface ResultsPageClientProps {
    initialResults: ResultItem[];
    hasError?: boolean;
}

export default function ResultsPageClient({ initialResults, hasError }: ResultsPageClientProps) {
    const [filter, setFilter] = useState("All");
    const { toast } = useToast();
    
    // Search states
    const [rollNo, setRollNo] = useState("");
    const [dob, setDob] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<StudentResult | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);

    const clearSearch = () => {
        setSearchResult(null);
        setSearchError(null);
        setRollNo("");
        setDob("");
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rollNo || !dob) {
            toast({
                title: "Incomplete Details",
                description: "Please enter both Roll Number and Date of Birth.",
                variant: "destructive",
            });
            return;
        }

        setIsSearching(true);
        setSearchError(null);
        setSearchResult(null);

        try {
            const response = await fetch("/api/results/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rollNo, dob }),
            });

            const data = await response.json();

            if (!response.ok) {
                setSearchError(data.error || "Result not found.");
                toast({
                    title: "No Result Found",
                    description: data.error || "Please check your details and try again.",
                    variant: "destructive",
                });
            } else {
                setSearchResult(data);
                toast({
                    title: "Result Found",
                    description: `Successfully retrieved result for ${data.StudentName}.`,
                });
            }
        } catch (err) {
            console.error("Search error:", err);
            setSearchError("An unexpected error occurred. Please try again.");
            toast({
                title: "Connection Error",
                description: "Failed to connect to the results server.",
                variant: "destructive",
            });
        } finally {
            setIsSearching(false);
        }
    };



    // Extract unique types for filters/tabs
    const types = ["All", ...Array.from(new Set(initialResults.map(item => item.type || "General")))];

    const filteredItems = filter === "All"
        ? initialResults
        : initialResults.filter(item => (item.type || "General") === filter);

    return (
        <PageTransition>
            <div className="bg-grain min-h-screen">
                <Breadcrumbs items={[{ name: "Exam Results" }]} />
                <PageBanner
                    title="Academic Excellence"
                    subtitle="Access your examination results and celebrate your progress."
                    image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
                />

                <Section id="search" title="Check Your Result" subtitle="Enter your Roll Number and Date of Birth" className="bg-white/50 backdrop-blur-sm">
                    <div className="max-w-lg mx-auto px-4">

                        {/* Simple Form Card */}
                        <Card className="border-2 border-navy/10 shadow-xl rounded-2xl overflow-hidden">
                            <CardContent className="p-8 space-y-6">

                                <div className="space-y-2">
                                    <Label htmlFor="rollNo" className="text-navy font-bold text-base">
                                        📋 Roll Number
                                    </Label>
                                    <p className="text-sm text-gray-500">Find this on your school diary or TC</p>
                                    <Input
                                        id="rollNo"
                                        placeholder="Enter Roll Number"
                                        value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)}
                                        className="h-14 text-lg border-2 border-gray-200 focus:border-navy focus:ring-navy rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob" className="text-navy font-bold text-base">
                                        🎂 Date of Birth
                                    </Label>
                                    <p className="text-sm text-gray-500">Enter the student's date of birth</p>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        className="h-14 text-lg border-2 border-gray-200 focus:border-navy focus:ring-navy rounded-xl"
                                        required
                                    />
                                </div>

                                <Button
                                    type="button"
                                    disabled={isSearching}
                                    onClick={handleSearch as unknown as React.MouseEventHandler<HTMLButtonElement>}
                                    className="w-full h-14 bg-navy hover:bg-navy-light text-white font-bold text-xl rounded-xl shadow-lg transition-all"
                                >
                                    {isSearching ? (
                                        <span className="flex items-center gap-2">
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                                <Search size={24} />
                                            </motion.div>
                                            Searching...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Search size={24} />
                                            View Result 🔍
                                        </span>
                                    )}
                                </Button>

                                {/* Error State */}
                                {searchError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3"
                                    >
                                        <AlertCircle className="text-red-500 w-6 h-6 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-red-800 font-bold">Result not found ❌</p>
                                            <p className="text-red-600 text-sm mt-1">Please double-check your Roll Number and Date of Birth.</p>
                                            <button onClick={clearSearch} className="mt-2 text-sm text-red-500 underline">Try Again</button>
                                        </div>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Result Card */}
                        {searchResult && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-8"
                            >
                                <Card className="border-2 border-green-300 shadow-2xl rounded-2xl overflow-hidden">
                                    <div className="bg-green-600 p-4 text-white flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={22} />
                                            <span className="font-bold text-lg">Result Found! ✅</span>
                                        </div>
                                        <button onClick={clearSearch} className="text-white/80 hover:text-white">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <span className="text-sm text-gray-500 font-medium">Student Name</span>
                                                <span className="font-bold text-navy text-lg">{searchResult.StudentName}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <span className="text-sm text-gray-500 font-medium">Roll No.</span>
                                                <span className="font-bold text-navy">{searchResult.AdmissionNo}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <span className="text-sm text-gray-500 font-medium">Class</span>
                                                <span className="font-bold text-navy">{searchResult.Class}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <span className="text-sm text-gray-500 font-medium">Exam</span>
                                                <span className="font-bold text-navy">{searchResult.ExamName}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 font-medium">Status</span>
                                                <Badge className={searchResult.Status?.toLowerCase() === 'published' || searchResult.Status?.toLowerCase() === 'pass' ? 'bg-green-100 text-green-700 border-green-300 text-sm px-3' : 'bg-yellow-100 text-yellow-700 border-yellow-300 text-sm px-3'}>
                                                    {searchResult.Status}
                                                </Badge>
                                            </div>
                                        </div>

                                        <Button asChild className="w-full h-14 bg-gold hover:bg-yellow-500 text-navy font-bold text-xl rounded-xl shadow-lg transition-all">
                                            <Link href={searchResult.ResultLink || "#"} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 w-6 h-6" />
                                                Download Result Card 📄
                                            </Link>
                                        </Button>
                                        <p className="text-center text-xs text-gray-400">The result card will download as a PDF.</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </Section>

                <Section id="results" title="School Summaries" subtitle="General Performance Overview">

                    {hasError && (
                        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-xl text-center mb-8 max-w-2xl mx-auto">
                            <p className="font-bold text-lg mb-2">Results temporarily unavailable</p>
                            <p className="text-sm opacity-80">We're having trouble fetching the latest results. Please check back in a few minutes.</p>
                        </div>
                    )}

                    {/* Tabs/Filters */}
                    <div role="tablist" className="flex justify-center mb-10 overflow-x-auto pb-4">
                        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground bg-white border shadow-sm">
                            {types.map(type => (
                                <button
                                    key={type}
                                    role="tab"
                                    aria-selected={filter === type}
                                    onClick={() => setFilter(type)}
                                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${filter === type ? 'bg-navy text-white shadow-sm' : 'hover:bg-gray-100'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {filteredItems.length === 0 ? (
                            <div className="col-span-2 text-center py-10 text-gray-500">No results found for this category.</div>
                        ) : (
                            filteredItems.map((result, index) => (
                                <motion.div
                                    key={result.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-gold shadow-sm">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex gap-2 mb-2">
                                                        <Badge className="bg-navy/10 text-navy hover:bg-navy/20">{result.type || "Result"}</Badge>
                                                        {result.mediaCoverage && (
                                                            <Badge className="bg-red-100 text-red-600 border-red-200">Featured in News</Badge>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-navy">{result.title}</h3>
                                                </div>
                                                <div className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-md">
                                                    {result.date ? result.date.split("-")[0] : "—"}
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <FileText size={16} className="text-gold" />
                                                    <span className="font-semibold">{result.examName}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {result.description}
                                                </p>

                                                {result.topperName && (
                                                    <div className="bg-gold/10 p-3 rounded-lg flex items-center gap-3 border border-gold/20 mt-2">
                                                        <div className="bg-gold p-2 rounded-full text-white">
                                                            <Trophy size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-navy font-bold uppercase tracking-wider">Top Performer</p>
                                                            <p className="font-bold text-navy flex items-center gap-2">
                                                                {result.topperName}
                                                                <span className="bg-white px-2 py-0.5 rounded text-xs text-gold border border-gold">{result.topperMarks}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-4 border-t flex justify-between items-center">
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Calendar size={14} /> Published: {result.date}
                                                </span>
                                                {result.link && (
                                                    <Button size="sm" asChild className="bg-navy text-white hover:bg-navy-light">
                                                        <Link href={result.link} target="_blank" rel="noopener noreferrer">
                                                            <Download size={16} className="mr-2" />
                                                            View Result
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </div>
                </Section>

                {/* Related Links Section */}
                <Section id="related" title="Related Content" subtitle="Explore More" className="bg-white">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Link href="/achievements" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Trophy className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Student Achievements</h3>
                                    <p className="text-gray-600 text-sm">Celebrating our students' victories and milestones</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/academics" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <FileText className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Our Curriculum</h3>
                                    <p className="text-gray-600 text-sm">Explore our comprehensive academic programs</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/updates" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Star className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Latest Updates</h3>
                                    <p className="text-gray-600 text-sm">Stay informed with important announcements</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12 p-8 bg-navy/5 rounded-2xl">
                        <h3 className="text-2xl font-bold text-navy mb-4">See how our students excel!</h3>
                        <p className="text-gray-600 mb-6">Join SIA and be part of our success story</p>
                        <Link href="/admissions" className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl">
                            Enroll Your Child
                        </Link>
                    </div>
                </Section>
            </div>
        </PageTransition>
    );
}
