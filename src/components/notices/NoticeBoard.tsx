"use client";

import { useState, useEffect } from "react";
import { format, isAfter, subDays, parseISO } from "date-fns";
import { FileText, Calendar, Filter, Download, Bell, X, Share2, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MotionDiv } from '@/components/common/Motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notice {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    category: "Academic" | "General" | "Exam" | "Holiday";
    fileUrl?: string; // PDF Link
    isImportant?: boolean;
    content?: string; // HTML or Text content
}

const dummyNotices: Notice[] = [
    {
        id: "1",
        title: "Term 1 Examination Schedule Class X & XII",
        date: "2026-08-15",
        category: "Exam",
        fileUrl: "#",
        isImportant: true,
        content: "The Term 1 Examinations for Classes X and XII will commence from August 25th, 2026. Students are requested to collect their admit cards from the administrative office. The detailed date sheet is attached below."
    },
    {
        id: "2",
        title: "Inter-School Sports Meet Registration",
        date: "2026-07-20",
        category: "General",
        fileUrl: "#",
        content: "We are excited to announce the annual Inter-School Sports Meet. Events include Athletics, Basketball, and Football. Interested students must register with their sports coaches by July 25th."
    },
    {
        id: "3",
        title: "Parent-Teacher Meeting (PTM) - August",
        date: "2026-08-01",
        category: "Academic",
        content: "A Parent-Teacher Meeting will be held on August 8th, 2026, from 9:00 AM to 1:00 PM to discuss student progress after the first unit tests."
    },
    {
        id: "4",
        title: "Holiday Notice: Independence Day",
        date: "2026-08-12",
        category: "Holiday",
        content: "The school will remain closed on August 15th, 2026, in observance of Independence Day. Flag hoisting ceremony details will be shared shortly."
    },
    {
        id: "5",
        title: "Revised School Timings for Winter",
        date: "2026-11-01",
        category: "General",
        content: "Please note that school timings will change effective November 5th due to the winter season. New timings: 8:30 AM to 2:30 PM."
    },
    {
        id: "6",
        title: "Admission Open for Session 2026-27",
        date: "2026-01-15",
        category: "Academic",
        isImportant: true,
        content: "Admissions are now open for the academic session 2026-27 from Nursery to Class IX. Apply online or visit the school office."
    },
];

export function NoticeBoard() {
    const [filterYear, setFilterYear] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotices = async () => {
            try {
                // Import dynamically to avoid server-client mismatches if needed, though here it's fine
                const { getCMSNotices } = await import("@/lib/cms-fetch");
                const cmsData = await getCMSNotices();

                // Transform CMS data to UI format
                const formatted: Notice[] = cmsData.map(item => ({
                    id: String(item.id),
                    title: item.text,
                    date: item.date,
                    // Default to 'General' if category logic isn't in CMS yet, or map simple logic
                    category: item.isImportant ? "Exam" : "General", // Simple mapping for now
                    fileUrl: item.link === "#" ? undefined : item.link,
                    isImportant: item.isImportant,
                    content: item.text // Using text as content for now
                }));
                setNotices(formatted);
            } catch (err) {
                console.error("Failed to load notices", err);
            } finally {
                setLoading(false);
            }
        };
        loadNotices();
    }, []);

    const isNew = (dateStr: string) => {
        try {
            const date = parseISO(dateStr);
            const sevenDaysAgo = subDays(new Date(), 30); // Keeping 30 days logic as per original
            return isAfter(date, sevenDaysAgo);
        } catch (e) { return false; }
    };

    // Use fetched notices instead of dummy
    const displayedNotices = notices.length > 0 ? notices : [];

    const filteredNotices = displayedNotices.filter(notice => {
        if (filterYear !== "all") {
            if (!notice.date.includes(filterYear)) return false;
        }
        if (filterCategory !== "all" && notice.category !== filterCategory) return false;
        return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-6">
            {/* Full Screen Notice Dialog */}
            <Dialog open={!!selectedNotice} onOpenChange={(open) => !open && setSelectedNotice(null)}>
                <DialogContent className="max-w-[100vw] w-screen h-screen p-0 rounded-none border-none flex flex-col bg-slate-50">
                    {selectedNotice && (
                        <>
                            {/* Header */}
                            <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm shrink-0 z-10">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-navy truncate max-w-[70vw]">
                                        {selectedNotice.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span>{format(parseISO(selectedNotice.date), "dd MMMM yyyy")}</span>
                                        <span>•</span>
                                        <Badge variant="outline" className="text-xs">{selectedNotice.category}</Badge>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" title="Print" onClick={() => window.print()} className="hidden sm:flex">
                                        <Printer size={20} className="text-muted-foreground" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedNotice(null)}>
                                        <X size={24} className="text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>

                            {/* Body (Scrollable) */}
                            <div className="flex-1 overflow-auto bg-grain">
                                <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
                                    <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border space-y-6 min-h-[60vh]">
                                        <div className="flex justify-between items-start border-b pb-6">
                                            <div className="space-y-4">
                                                <Badge className={`
                                                    ${selectedNotice.category === 'Holiday' ? 'bg-green-100 text-green-700' :
                                                        selectedNotice.category === 'Exam' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'} 
                                                    hover:bg-opacity-80 border-0 px-3 py-1 text-sm
                                                `}>
                                                    {selectedNotice.category} Notice
                                                </Badge>
                                                <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight">
                                                    {selectedNotice.title}
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                            <p>{selectedNotice.content}</p>
                                            {/* Placeholder for more content */}
                                            <p className="opacity-80">
                                                For further details, please contact the school administration office during working hours.
                                            </p>
                                        </div>

                                        {selectedNotice.fileUrl && (
                                            <div className="mt-8 pt-8 border-t">
                                                {/* Simple check for image extensions or cloudinary image path */}
                                                {(selectedNotice.fileUrl.match(/\.(jpeg|jpg|gif|png|webp|avif)$/i) || selectedNotice.fileUrl.includes("/image/upload/")) ? (
                                                    <div className="flex flex-col items-center space-y-4">
                                                        <h4 className="font-semibold text-lg self-start text-navy">Notice Image</h4>
                                                        <div className="relative w-full rounded-xl overflow-hidden border shadow-sm bg-gray-100">
                                                            <img
                                                                src={selectedNotice.fileUrl}
                                                                alt={selectedNotice.title}
                                                                className="w-full h-auto max-h-[600px] object-contain"
                                                            />
                                                        </div>
                                                        <Button variant="outline" asChild>
                                                            <a href={selectedNotice.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                <Download size={16} className="mr-2" /> Download Image
                                                            </a>
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed">
                                                        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                                            <FileText size={32} className="text-navy" />
                                                        </div>
                                                        <h4 className="font-semibold text-lg mb-2">Attached Document</h4>
                                                        <p className="text-muted-foreground text-sm mb-4 text-center max-w-sm">
                                                            Official document relevant to this notice is available for download.
                                                        </p>
                                                        <Button className="bg-navy hover:bg-navy-dark text-white gap-2" asChild>
                                                            <a href={selectedNotice.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                <Download size={18} />
                                                                Download Attachment
                                                            </a>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-navy font-bold">
                    <Filter size={20} />
                    <span>Filters:</span>
                </div>

                <Select value={filterYear} onValueChange={setFilterYear}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Academic Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="2026">2026-27</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Exam">Exams</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Holiday">Holidays</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-muted-foreground bg-gray-50 rounded-xl border border-dashed animate-pulse">
                        <p>Loading notices...</p>
                    </div>
                ) : filteredNotices.length > 0 ? (
                    filteredNotices.map((notice, index) => (
                        <MotionDiv
                            key={notice.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card
                                className={`hover:shadow-lg hover:shadow-gold/10 transition-all cursor-pointer group hover:bg-slate-50 relative overflow-hidden
                                    ${notice.isImportant ? 'border-l-4 border-l-gold' : 'border-l-4 border-l-navy'}
                                `}
                                onClick={() => setSelectedNotice(notice)}
                            >
                                <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="flex items-center text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                                                <Calendar size={12} className="mr-1" />
                                                {format(parseISO(notice.date), "dd MMM yyyy")}
                                            </span>
                                            <Badge variant="outline" className="text-[10px] border-navy/30 text-navy">
                                                {notice.category}
                                            </Badge>
                                            {isNew(notice.date) && (
                                                <Badge className="bg-red-500 hover:bg-red-600 text-[10px] gap-1 pl-1 pr-2">
                                                    <Bell size={8} fill="currentColor" /> New
                                                </Badge>
                                            )}
                                            {notice.isImportant && (
                                                <Badge className="bg-amber-500 hover:bg-amber-600 text-[10px]">Important</Badge>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-navy text-lg leading-tight group-hover:text-amber-600 transition-colors">
                                            {notice.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* View Button */}
                                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-navy group-hover:bg-white">
                                            <span className="sr-only">View</span>
                                            <FileText size={18} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </MotionDiv>
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground bg-gray-50 rounded-xl border border-dashed">
                        <p>No notices found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
