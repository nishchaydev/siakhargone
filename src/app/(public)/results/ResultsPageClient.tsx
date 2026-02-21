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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsPageClientProps {
    initialResults: ResultItem[];
}

export default function ResultsPageClient({ initialResults }: ResultsPageClientProps) {
    const [filter, setFilter] = useState("All");

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
                    subtitle="Showcasing the hard work and success of our scholars."
                    image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
                />

                <Section id="results" title="Exam Results" subtitle="Detailed Performance Reports">

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
