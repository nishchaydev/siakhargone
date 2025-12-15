
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
        date: "Recent",
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

export const LatestNews = () => {
    const [newsItems, setNewsItems] = useState<any[]>(defaultNews);

    useEffect(() => {
        const loadNews = async () => {
            const apiNews = await getCMSNews();
            if (apiNews.length > 0) {
                // Map API format to Component format
                const mapped = apiNews.slice(0, 3).map((item) => ({
                    id: item.id,
                    category: "Update", // Default category for dynamic news
                    date: item.date,
                    title: item.title,
                    description: item.description,
                    icon: Bell, // Default icon
                    color: "bg-blue-50 text-blue-600"
                }));

                // If we have API news, combine or replace. Here we replace for simplicity.
                setNewsItems(mapped);
            }
        };
        loadNews();
    }, []);
    return (
        <Section className="bg-ivory" id="latest-news">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                    <span className="text-gold font-bold tracking-wider uppercase text-sm">Campus Buzz</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-navy">
                        Happenings <span className="text-gold-accent">@ SIA</span>
                    </h2>
                </div>
                <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white group">
                    View All News <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {newsItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:border-gold/30 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant="secondary" className={`${item.color} hover:${item.color} border-none`}>
                                {item.category}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                {item.date}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-accent transition-colors line-clamp-2">
                            {item.title}
                        </h3>

                        <p className="text-gray-600 mb-6 text-sm line-clamp-3">
                            {item.description}
                        </p>

                        <a href="#" className="inline-flex items-center text-sm font-bold text-navy hover:text-gold-accent transition-colors">
                            Read More <ChevronRight className="ml-1 w-4 h-4" />
                        </a>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
