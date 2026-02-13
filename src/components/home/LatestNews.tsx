"use client";

import { Section } from "@/components/common/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Trophy, Bell, Star, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

import { useEffect, useState } from "react";
import { getCMSNews, CMSNewsItem } from "@/lib/cms-fetch";



interface LatestNewsProps {
    initialNews: any[];
}

export const LatestNews = ({ initialNews = [] }: LatestNewsProps) => {
    const [newsItems, setNewsItems] = useState<any[]>(initialNews.length > 0 ? initialNews.map(item => ({
        id: item.id,
        category: item.type || "Update",
        date: item.date,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl, // Notices might not have images, handle gracefully below
        icon: item.type === 'Event' ? Calendar : (item.type === 'Notice' ? AlertCircle : Bell),
        color: item.type === 'Event' ? "bg-orange-100 text-orange-700 border-orange-200" :
            (item.type === 'Notice' ? "bg-red-100 text-red-700 border-red-200" : "bg-blue-50 text-blue-600 border-blue-100")
    })) : []);

    const [isLoading, setIsLoading] = useState(false); // No client fetch needed if SSR data provided

    // Fallback client fetch if no initial data and we want to try?
    // For now, assume SSR is primary source of truth for "instant" load.

    // If we want subsequent updates or real-time? Usually not needed for news.
    // Keeping it simple: Use props if available, else defaults.

    // if (!isLoading && newsItems.length === 0) {
    //     return null;
    // }

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
                {newsItems.length === 0 ? (
                    <div className="col-span-3 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <Bell className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-lg font-medium">No recent updates available</p>
                            <p className="text-sm">Check back soon for the latest campus buzz</p>
                        </div>
                    </div>
                ) : (
                    newsItems.map((item, index) => (
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
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                    ))
                )}
            </div>
        </Section>
    );
};
