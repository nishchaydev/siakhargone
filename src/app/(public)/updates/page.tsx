import { getUpdatesService } from "@/services/updatesService";
import UpdatesPageClient from "./UpdatesPageClient";
import { Metadata } from "next";

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Latest Updates & Announcements | SIA Khargone",
    description: "Stay updated with latest news, events, and important announcements from Sanskar International Academy Khargone.",
    keywords: "sia updates, school announcements khargone, sia news",
};

export default async function UpdatesPage() {
    const updates = await getUpdatesService();

    // NewsArticle Schema for Updates
    // Note: If multiple updates, better to use ItemList of NewsArticles or just individual NewsArticle script tags?
    // Google supports multiple script tags. Or a single ItemList. 
    // User asked for NewsArticle schema for EACH update.

    return (
        <>
            {updates.map((update, index) => (
                <script
                    key={update.id}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "NewsArticle",
                            "headline": update.content,
                            "datePublished": update.date,
                            "publisher": {
                                "@type": "Organization",
                                "name": "Sanskar International Academy"
                            }
                        })
                    }}
                />
            ))}
            <UpdatesPageClient initialUpdates={updates} />
        </>
    );
}
