import { getCommitteeData } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CommitteePage() {
    const { content, documents } = await getCommitteeData();

    return (
        <div className="container mx-auto py-20 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-navy font-display">School Managing Committee</h1>

            {/* Render Docx Content */}
            <div className="prose max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm mb-12">
                {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <p className="text-center text-muted-foreground">Committee details are currently being updated.</p>
                )}
            </div>

            {/* Render Attached Documents if any */}
            {documents.length > 0 && (
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Related Documents</h2>
                    <div className="grid gap-4">
                        {documents.map((doc: any, idx: number) => (
                            <a
                                key={idx}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-4 bg-white border rounded-lg hover:shadow-md transition-all"
                            >
                                <span className="font-medium flex-1">{doc.title}</span>
                                <span className="text-primary text-sm font-bold">Download</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
