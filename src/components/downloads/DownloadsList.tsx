"use client";

import { FileText, Download, Calendar, Book, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionDiv } from '@/components/common/Motion';

interface DownloadItem {
    title: string;
    description?: string;
    size?: string;
    date?: string;
    url: string;
    type?: "pdf" | "doc" | "image";
}

interface Category {
    id: string;
    title: string;
    icon: any;
    items: DownloadItem[];
}

const categories: Category[] = [
    {
        id: "academic",
        title: "Academic Resources",
        icon: Book,
        items: [
            { title: "Academic Calendar 2026-27", size: "1.2 MB", url: "#", date: "Coming Soon" },
            { title: "Prescribed Book List", size: "850 KB", url: "#", date: "Coming Soon" },
            { title: "Syllabus Split-up (Term 1)", size: "2.4 MB", url: "#", date: "Coming Soon" },
        ]
    },
    {
        id: "admin",
        title: "Administrative Forms",
        icon: FileText,
        items: [
            { title: "Transfer Certificate (TC) Application", size: "150 KB", url: "#" },
            { title: "Student Leave Application Format", size: "120 KB", url: "#" },
            { title: "Transport Enrollment Form", size: "180 KB", url: "#" },
        ]
    },
    {
        id: "exam",
        title: "Examinations",
        icon: Calendar,
        items: [
            { title: "Exam Schedule (Term 1)", description: "Tentative dates for Term 1 assessments.", size: "450 KB", url: "#", date: "TBA" },
        ]
    },
];

export function DownloadsList() {
    return (
        <div className="grid gap-8">
            {categories.map((category, idx) => {
                const Icon = category.icon;
                return (
                    <MotionDiv
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Icon size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-navy">{category.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.items.map((item, i) => (
                                <Card key={i} className="group hover:shadow-md transition-shadow duration-300">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base font-semibold leading-tight text-navy group-hover:text-primary transition-colors">
                                            {item.title}
                                        </CardTitle>
                                        {item.description && (
                                            <CardDescription className="text-xs line-clamp-2 mt-1">
                                                {item.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between text-muted-foreground text-xs mb-4">
                                            <span>{item.size || "N/A"}</span>
                                            <span>{item.date || "2026-27"}</span>
                                        </div>
                                        <Button size="sm" className="w-full gap-2 bg-gold hover:bg-gold-dark text-navy font-bold transition-all shadow-sm hover:shadow" asChild>
                                            <a href={item.url} download onClick={(e) => { if (item.url === '#') e.preventDefault(); }}>
                                                <Download size={16} />
                                                Download PDF
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </MotionDiv>
                );
            })}
        </div>
    );
}
