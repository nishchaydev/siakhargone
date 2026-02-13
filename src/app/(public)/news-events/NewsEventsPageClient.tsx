"use client";

import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { NoticeBoard } from "@/components/notices/NoticeBoard";
import { cloudinary } from "@/lib/cloudinary-images";
import { useState } from "react";
// import { getCMSNews, CMSNewsItem } from "@/lib/cms-fetch"; 
// Removed internal fetch for news, using props instead
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface CMSNewsItem {
    id: string; // Changed to string to match service
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
}

interface CMSEventItem {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    imageUrl: string;
}

interface NewsEventsPageClientProps {
    initialNews: CMSNewsItem[];
    initialEvents: CMSEventItem[];
}

export default function NewsEventsPageClient({ initialNews, initialEvents }: NewsEventsPageClientProps) {
    const newsItems = initialNews;
    const eventsItems = initialEvents;
    const [selectedNews, setSelectedNews] = useState<CMSNewsItem | null>(null);

    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="News & Events"
                subtitle="Celebrating our stories, achievements, and upcoming moments."
                image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Latest News Section */}
            <Section id="news" title="Latest News" subtitle="Happenings around the campus">
                <div className="grid md:grid-cols-3 gap-8">
                    {newsItems.length === 0 ? (
                        <div className="col-span-3 text-center py-10 text-gray-500">No news updates available securely.</div>
                    ) : (
                        newsItems.map((news) => (
                            <motion.div
                                key={news.id}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card
                                    onClick={() => setSelectedNews(news)}
                                    className="overflow-hidden hover:shadow-xl transition-all border-none shadow-md group cursor-pointer h-full flex flex-col"
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        {news.imageUrl ? (
                                            <Image
                                                src={news.imageUrl}
                                                alt={news.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-navy/5 flex items-center justify-center">
                                                <ImageIcon className="text-navy/20 w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-white/90 text-navy hover:bg-white shadow-sm">Update</Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <p className="text-xs font-bold text-gold mb-2 flex items-center gap-1 uppercase tracking-wider">
                                            <Calendar size={12} /> {news.date}
                                        </p>
                                        <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                                            {news.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3 mb-4 text-sm flex-grow">
                                            {news.description}
                                        </p>
                                        <Button variant="link" className="p-0 h-auto text-navy font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto self-start">
                                            Read More <ArrowRight size={14} />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>
            </Section>

            {/* Notice Board Section */}
            <Section id="notices" title="Notice Board" subtitle="Official circulars and announcements" bgColor="bg-white">
                <div className="max-w-5xl mx-auto">
                    <NoticeBoard />
                </div>
            </Section>

            {/* Upcoming Events Section */}
            <Section id="events" title="Upcoming Events" subtitle="Mark your calendars">
                <div className="space-y-6 max-w-5xl mx-auto">
                    {eventsItems.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No upcoming events scheduled.</div>
                    ) : (
                        eventsItems.map((event) => (
                            <Card key={event.id} className="overflow-hidden border-l-4 border-l-gold hover:shadow-md transition-all cursor-default">
                                <div className="flex flex-col md:flex-row">
                                    {/* Date Box */}
                                    <div className="bg-navy text-white p-6 flex flex-col items-center justify-center min-w-[120px] shrink-0 text-center">
                                        <span className="text-3xl font-bold font-display">{event.date.split('-')[2] || event.date.split('-')[0]}</span>
                                        <span className="text-sm uppercase tracking-wider opacity-80">
                                            {formatDate(event.date).split(' ').slice(0, 2).join(' ')}
                                        </span>
                                    </div>

                                    {/* Image */}
                                    <div className="relative h-48 w-full md:w-64 shrink-0 hidden sm:block">
                                        {event.imageUrl ? (
                                            <Image
                                                src={event.imageUrl}
                                                alt={event.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <ImageIcon />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-navy mb-2">{event.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1"><MapPin size={14} className="text-gold" /> {event.location}</span>
                                            <span className="flex items-center gap-1"><Calendar size={14} className="text-gold" /> {event.time}</span>
                                        </div>
                                        <p className="text-gray-600">{event.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </Section>

            {/* Gallery Preview Section */}
            <Section id="gallery" title="Campus Life" subtitle="Glimpses of life at SIA" bgColor="bg-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        cloudinary.infrastructure.others[4],
                        cloudinary.annualFunction[0],
                        cloudinary.sportsAchievements[2],
                        cloudinary.lab.physics[0]
                    ].map((src, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                            {src && (
                                <Image
                                    src={src}
                                    alt="Campus Life"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            )}
                            <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon className="text-white w-8 h-8" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Button asChild size="lg" className="bg-navy hover:bg-navy-dark text-white">
                        <Link href="/gallery">View Full Gallery</Link>
                    </Button>
                </div>
            </Section>

            {/* News Detail Modal */}
            <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
                <DialogContent className="sm:max-w-2xl bg-white p-0 overflow-hidden border-0">
                    <div className="relative h-64 w-full">
                        {selectedNews?.imageUrl ? (
                            <Image
                                src={selectedNews.imageUrl}
                                alt={selectedNews?.title || "News"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-navy/10 flex items-center justify-center">
                                <ImageIcon className="text-navy/30 w-16 h-16" />
                            </div>
                        )}
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-4 right-4 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border-0"
                            onClick={() => setSelectedNews(null)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-gold text-navy font-bold border-none shadow-lg">Latest Update</Badge>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">
                            <Calendar className="w-4 h-4 text-gold" />
                            {selectedNews?.date}
                        </div>
                        <DialogTitle className="text-3xl font-display font-bold text-navy mb-4 leading-tight">
                            {selectedNews?.title}
                        </DialogTitle>
                        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                            <p>{selectedNews?.description}</p>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button className="bg-navy hover:bg-navy-light text-white" onClick={() => setSelectedNews(null)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
