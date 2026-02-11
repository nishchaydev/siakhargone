"use client";

import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Trophy, Medal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AchievementItem } from "@/services/achievementsService";
import { motion } from "framer-motion";
import PageTransition from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";

interface AchievementsPageClientProps {
    initialAchievements: AchievementItem[];
}

export default function AchievementsPageClient({ initialAchievements }: AchievementsPageClientProps) {
    const [filter, setFilter] = useState("All");

    // Extract unique categories, ensuring 'All' is first
    const categories = ["All", ...Array.from(new Set(initialAchievements.map(item => item.category || "Uncategorized")))];

    const filteredItems = filter === "All"
        ? initialAchievements
        : initialAchievements.filter(item => (item.category || "Uncategorized") === filter);

    return (
        <PageTransition>
            <div className="bg-grain min-h-screen">
                <Breadcrumbs items={[{ name: "Achievements" }]} />
                <PageBanner
                    title="Our Pride & Glory"
                    subtitle="Celebrating the milestones and victories of our students."
                    image="https://images.unsplash.com/photo-1546519638-68e109498ee2?q=80&w=2070&auto=format&fit=crop"
                />

                <Section id="achievements" title="Hall of Fame" subtitle="Recognizing Excellence">

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map(cat => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                onClick={() => setFilter(cat)}
                                className={filter === cat ? "bg-navy text-white" : "border-navy text-navy hover:bg-navy/10"}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {filteredItems.length === 0 ? (
                            <div className="col-span-3 text-center py-10 text-gray-500">No achievements found in this category.</div>
                        ) : (
                            filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden hover:shadow-2xl transition-all border-none shadow-lg h-full flex flex-col group">
                                        <div className="relative h-64 w-full overflow-hidden">
                                            {item.imageUrl ? (
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-navy/5 flex items-center justify-center">
                                                    <Trophy className="text-navy/20 w-16 h-16" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                                {item.mediaCoverage && (
                                                    <Badge className="bg-red-500 text-white font-bold shadow-md animate-pulse">
                                                        AS SEEN IN MEDIA
                                                    </Badge>
                                                )}
                                                <Badge className="bg-gold text-navy font-bold shadow-md">
                                                    {item.category || "Achievement"}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 flex-1 flex flex-col relative">
                                            {/* Floating Date Badge */}
                                            <div className="absolute -top-5 left-6 bg-navy text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                                <Calendar size={12} /> {item.date}
                                            </div>

                                            <div className="mt-4 mb-2">
                                                <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 font-medium">
                                                <User size={14} className="text-gold" />
                                                <span>{item.studentName}</span>
                                                {item.class && <span className="text-gray-400">• {item.class}</span>}
                                            </div>

                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </div>
                </Section>

                {/* Related Links Section */}
                <Section id="related" title="Explore More" subtitle="Discover Related Content" className="bg-white" >
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Link href="/results" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Trophy className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Exam Results</h3>
                                    <p className="text-gray-600 text-sm">View our academic performance and board results</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/news-events" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Calendar className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Latest News</h3>
                                    <p className="text-gray-600 text-sm">Stay updated with school happenings</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/gallery" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Medal className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Photo Gallery</h3>
                                    <p className="text-gray-600 text-sm">Campus life in pictures</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12 p-8 bg-navy/5 rounded-2xl">
                        <h3 className="text-2xl font-bold text-navy mb-4">Interested in joining SIA?</h3>
                        <p className="text-gray-600 mb-6">Discover how our students excel in every field</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/admissions" className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl">
                                Apply for Admissions 2026-27
                            </Link>
                            <Link href="/about" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-navy border-2 border-navy px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                                Learn More About SIA
                            </Link>
                        </div>
                    </div>
                </Section>
            </div>
        </PageTransition>
    );
}
