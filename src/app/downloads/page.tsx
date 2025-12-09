

import { loadDownloads } from "@/lib/content";
import { Link, FileText, Download } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Downloads",
    description: "Download important documents, forms, and resources.",
};

export default async function DownloadsPage() {
    const downloads = loadDownloads();

    return (
        <div className="min-h-screen bg-grain pt-[70px]">
            <Section id="downloads" title="Downloads & Resources" subtitle="Access important school documents">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {downloads.length === 0 ? (
                        <p className="text-center col-span-full text-muted-foreground">No downloads available at the moment.</p>
                    ) : (
                        downloads.map((item: any, index: number) => {
                            const fileUrl = item.file;
                            return (
                                <Card key={index} className="card-premium hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild className="w-full gap-2" variant="outline">
                                            <a href={fileUrl || "#"} target="_blank" rel="noopener noreferrer" download>
                                                <Download className="h-4 w-4" /> Download
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            </Section>
        </div>
    );
}
