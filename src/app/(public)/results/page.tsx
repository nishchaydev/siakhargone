import { getResultsService, ResultItem } from "@/services/resultsService";
import { sendErrorToMonitoring } from "@/lib/monitoring";
import Link from "next/link";
import ResultsPageClient from "./ResultsPageClient";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Exam Results & Board Performance | SIA Khargone 2026",
    description: "Class 10th and 12th CBSE Board exam results, topper lists, and academic performance of SIA Khargone students.",
    keywords: "sia khargone results, cbse results sia, class 10 results khargone, class 12 results",
};

export default async function ResultsPage() {
    let results: ResultItem[] = [];
    let hasError = false;
    try {
        results = await getResultsService();
    } catch (error) {
        hasError = true;
        sendErrorToMonitoring(error, { page: 'ResultsPage' });
    }

    // Helper to escape script tags in JSON-LD
    const escapeJsonLd = (text: string) => text.replace(/<\/script>/gi, '<\\/script>').replace(/<\/style>/gi, '<\\/style>');

    // ItemList Schema for Results/Toppers
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": results.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "EducationalOccupationalCredential",
                "name": item.title,
                "description": item.description,
                "url": item.link
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(jsonLd)) }}
            />
            <ResultsPageClient initialResults={results} hasError={hasError} />

            <section className="py-12 bg-gray-50 mt-12 text-center">
                <div className="container px-4">
                    <h3 className="text-2xl font-bold text-navy mb-4">Consistent Excellence</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Our academic track record is just one reason why Sanskar International Academy is considered a
                        <Link href="/best-cbse-school-in-khargone" className="text-gold font-bold hover:underline mx-1">
                            leading CBSE school in Khargone
                        </Link>.
                    </p>
                </div>
            </section>
        </>
    );
}
