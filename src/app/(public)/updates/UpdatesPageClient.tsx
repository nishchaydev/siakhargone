"use client";

import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, AlertCircle, Info, Coffee } from "lucide-react";
import { useState } from "react";
import { UpdateItem } from "@/services/updatesService";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UpdatesPageClientProps {
    initialUpdates: UpdateItem[];
}

export default function UpdatesPageClient({ initialUpdates }: UpdatesPageClientProps) {
    const [filter, setFilter] = useState("All");

    const types = ["All", "Urgent", "General", "Holiday", "Info"];

    const filteredItems = filter === "All"
        ? initialUpdates
        : initialUpdates.filter(item => (item.type || "General") === filter);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Urgent": return <AlertCircle className="text-red-500" />;
            case "Holiday": return <Coffee className="text-green-500" />;
            case "Info": return <Info className="text-blue-500" />;
            default: return <Bell className="text-navy" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Urgent": return "bg-red-50 border-red-200 text-red-700";
            case "Holiday": return "bg-green-50 border-green-200 text-green-700";
            case "Info": return "bg-blue-50 border-blue-200 text-blue-700";
            default: return "bg-gray-50 border-gray-200 text-gray-700";
        }
    };

    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Latest Updates"
                subtitle="Stay informed with real-time announcements."
                image="https://images.unsplash.com/photo-1577412647305-991150c7d1e6?q=80&w=2072&auto=format&fit=crop"
            />

            <Section id="updates" title="Notice Board" subtitle="Official Announcements">

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border",
                                filter === type
                                    ? "bg-navy text-white border-navy"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto space-y-6 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>

                    <AnimatePresence mode="popLayout">
                        {filteredItems.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border p-8 z-10 relative">No updates found.</div>
                        ) : (
                            filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="relative pl-0 md:pl-20 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className={cn(
                                        "absolute left-6 top-6 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 hidden md:block",
                                        item.type === "Urgent" ? "bg-red-500" : "bg-navy"
                                    )}></div>

                                    <div className={cn(
                                        "relative p-6 rounded-xl border shadow-sm transition-all hover:shadow-md",
                                        getTypeColor(item.type || "General"),
                                        filter !== "All" ? "" : "bg-white" // Override bg if not filtered to keep clean look? Or keep type colors? 
                                        // User requested WhatsApp style. Let's keep type colors for distinction.
                                    )}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getTypeIcon(item.type || "General")}
                                                    <span className="font-bold uppercase tracking-wider text-xs opacity-70">{item.type || "General"}</span>
                                                </div>
                                                <p className="text-lg font-medium leading-relaxed">
                                                    {item.content}
                                                </p>
                                                {item.link && (
                                                    <a href={item.link} className="text-blue-600 hover:underline text-sm mt-2 inline-block font-semibold">
                                                        Read More &rarr;
                                                    </a>
                                                )}
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-sm font-bold opacity-70 flex flex-col items-end">
                                                    <span>{item.date}</span>
                                                    {/* If we had time, we could show it here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

            </Section>

            {/* Related Links Section */}
            <Section id="related" title="Stay Connected" subtitle="More from SIA" className="bg-white">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <a href="/news-events" className="group">
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                    <Calendar className="w-8 h-8 text-gold group-hover:text-white" />
                                </div>
                                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">News & Events</h3>
                                <p className="text-gray-600 text-sm">Detailed news and upcoming events</p>
                            </CardContent>
                        </Card>
                    </a>
                    <a href="/achievements" className="group">
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                    <Bell className="w-8 h-8 text-gold group-hover:text-white" />
                                </div>
                                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Achievements</h3>
                                <p className="text-gray-600 text-sm">Celebrating our students' success</p>
                            </CardContent>
                        </Card>
                    </a>
                    <a href="/contact" className="group">
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                    <Info className="w-8 h-8 text-gold group-hover:text-white" />
                                </div>
                                <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Contact Us</h3>
                                <p className="text-gray-600 text-sm">Have questions? Get in touch with us</p>
                            </CardContent>
                        </Card>
                    </a>
                </div>
            </Section>
        </div>
    );
}
