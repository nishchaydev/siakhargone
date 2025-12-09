import { getDownloads } from "@/lib/content";
import { FileText, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DownloadsPage() {
    const downloads = await getDownloads();

    return (
        <div className="container mx-auto py-20 px-4">
            <h1 className="text-4xl font-bold mb-4 text-center text-navy font-display">Downloads</h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Access important forms, circulars, and documents.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloads.length > 0 ? (
                    downloads.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-gold/20 transition-colors">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <a
                                    href={item.fileUrl}
                                    download
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Download className="w-5 h-5 text-gray-500" />
                                </a>
                            </div>
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                            <a
                                href={item.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary font-medium hover:underline"
                            >
                                View Document
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-muted-foreground">No downloads available at the moment.</p>
                )}
            </div>
        </div>
    );
}
