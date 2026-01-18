
"use client";

import { Section } from "@/components/common/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Trophy, Bell, Star, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { getCMSNews, CMSNewsItem } from "@/lib/cms-fetch";



const defaultNews = [
    {
        id: 1,
        category: "Admission",
        date: "15 Dec 2024",
        title: "Admissions Open for Session 2025-26",
        description: "Applications are now invited for Nursery to Class XI. Apply online or visit the campus.",
        icon: Star,
        color: "bg-blue-100 text-blue-700"
    },
    {
        id: 4,
        category: "Excursion",
        date: "18 Jan 2026",
        title: "Educational Trip to Gujarat",
        description: "A memorable journey where students explored the vibrant culture and heritage of Gujarat.",
        icon: MapPin,
        color: "bg-orange-100 text-orange-700"
    },
    {
        id: 2,
        category: "Sports",
        date: "10 Dec 2024",
        title: "SIA Wins Inter-School Cricket Championship",
        description: "Our under-14 cricket team brings home the trophy after a thrilling final match.",
        icon: Trophy,
        color: "bg-gold/20 text-gold-dark"
    }
];

interface LatestNewsProps {
    initialNews: any[];
}

export const LatestNews = ({ initialNews = [] }: LatestNewsProps) => {
    const [newsItems, setNewsItems] = useState<any[]>(initialNews.length > 0 ? initialNews.map(item => ({
        id: item.id,
        category: "Update",
        date: item.date,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        icon: item.icon || Bell, // Fallback if server doesn't provide
        color: "bg-blue-50 text-blue-600"
    })) : defaultNews);

    const [isLoading, setIsLoading] = useState(false); // No client fetch needed if SSR data provided

    // Fallback client fetch if no initial data and we want to try?
    // For now, assume SSR is primary source of truth for "instant" load.

    // If we want subsequent updates or real-time? Usually not needed for news.
    // Keeping it simple: Use props if available, else defaults.

    // Don't render the section if we have finished loading and there is no news
    if (!isLoading && newsItems.length === 0) {
        return null;
    }

    return (
        <Section className="bg-white" id="latest-news">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                    <span className="text-gold font-bold tracking-wider uppercase text-sm">Campus Buzz</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-navy">
                        Happenings <span className="text-gold-accent">@ SIA</span>
                    </h2>
                </div>
                <Link href="/news-events">
                    <Button className="bg-navy/5 hover:bg-navy text-navy hover:text-white font-bold transition-all group">
                        View All News <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {newsItems.map((item, index) => (
                    <Link
                        href="/news-events"
                        key={item.id}
                        className="block h-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift group cursor-pointer h-full flex flex-col overflow-hidden"
                        >
                            {item.imageUrl ? (
                                <div className="h-48 -mx-6 -mt-6 mb-4 relative overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className={`${item.color} hover:${item.color} border-none shadow-md`}>
                                            {item.category}
                                        </Badge>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="secondary" className={`${item.color} hover:${item.color} border-none`}>
                                        {item.category}
                                    </Badge>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {item.date}
                                    </div>
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-accent transition-colors line-clamp-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 mb-6 text-sm line-clamp-3 flex-grow">
                                {item.description}
                            </p>

                            <div className="inline-flex items-center text-sm font-bold text-navy hover:text-gold-accent transition-colors mt-auto">
                                Read More <ChevronRight className="ml-1 w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </Section>
    );
};
