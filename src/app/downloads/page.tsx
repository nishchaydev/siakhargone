
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificates } from "@/lib/static-data";

export const metadata = {
    title: 'Downloads & Resources | Sanskar International Academy',
    description: 'Download important circulars, academic calendars, syllabi, and mandatory public disclosures.',
};

export default function DownloadsPage() {
    // Group certificates and other downloads for display
    const specializedResources = [
        {
            category: "Academic",
            icon: Calendar,
            items: [
                { title: "Academic Calendar 2024-25", url: "#" },
                { title: "List of Books (All Classes)", url: "#" },
                { title: "Holiday List 2025", url: "#" },
            ]
        },
        {
            category: "Mandatory Disclosures",
            icon: FileText,
            items: certificates.map(cert => ({ title: cert.title, url: cert.fileUrl }))
        },
        {
            category: "Forms & Policies",
            icon: BookOpen,
            items: [
                { title: "Admission Form", url: "/admissions" },
                { title: "School Transport Policy", url: "#" },
                { title: "Code of Conduct", url: "#" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="bg-navy text-white pt-32 pb-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Downloads & Resources</h1>
                <p className="text-white/70 max-w-2xl mx-auto text-lg">
                    Access all important documents, circulars, and academic resources in one place.
                </p>
            </div>

            <div className="container mx-auto max-w-6xl -mt-10 px-4">
                <div className="grid gap-8">
                    {specializedResources.map((section, idx) => (
                        <Card key={idx} className="shadow-lg border-t-4 border-t-gold">
                            <CardHeader className="bg-slate-50 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-navy/10 rounded-full">
                                        <section.icon className="h-6 w-6 text-navy" />
                                    </div>
                                    <CardTitle className="text-xl text-navy">{section.category}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {section.items.map((item, i) => (
                                        <a
                                            key={i}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 rounded-xl border hover:border-gold/50 hover:bg-gold/5 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-gold" />
                                                <span className="font-medium text-sm text-foreground/80 group-hover:text-navy">{item.title}</span>
                                            </div>
                                            <Download className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
