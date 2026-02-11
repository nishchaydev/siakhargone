"use client";

import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Trophy, Medal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AchievementItem } from "@/services/achievementsService";
import { motion } from "framer-motion";
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
        <div className="bg-grain min-h-screen">
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
        </div>
    );
}
