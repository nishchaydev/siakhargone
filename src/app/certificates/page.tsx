import { getCertificates } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
    const certificates = await getCertificates();

    return (
        <div className="container mx-auto py-20 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-navy font-display">Certificates & Affiliations</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.length > 0 ? (
                    certificates.map((cert: any, idx: number) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-all">
                            <h3 className="text-xl font-bold mb-4">{cert.title}</h3>
                            <a
                                href={cert.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-gold hover:text-navy transition-colors"
                            >
                                View Certificate
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-muted-foreground">No certificates found.</p>
                )}
            </div>
        </div>
    );
}
