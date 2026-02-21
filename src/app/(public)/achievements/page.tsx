import { getAchievementsService, AchievementItem } from "@/services/achievementsService";
import AchievementsPageClient from "./AchievementsPageClient";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Student Achievements & Awards | SIA Khargone",
    description: "Celebrating academic excellence, sports victories, and student achievements at Sanskar International Academy Khargone. View our hall of fame.",
    keywords: "sia student achievements, school toppers khargone, sia awards, student success stories",
    openGraph: {
        title: "Student Achievements | Sanskar International Academy",
        description: "Our students shine in academics, sports and competitions",
        images: ["/og-achievements.jpg"],
    }
};

export default async function AchievementsPage() {
    let achievements: any[] = [];
    try {
        achievements = await getAchievementsService();
    } catch (error) {
        console.error("AchievementsPage Error:", error);
    }

    // Helper to escape script tags in JSON-LD
    const escapeJsonLd = (text: string) => text.replace(/<\/script>/g, '<\\/script>').replace(/<\/style>/g, '<\\/style>');

    // ItemList Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": achievements.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Achievement", // Note: 'Achievement' might not be a standard Schema type, usually it's used within a Person or Organization. 
                // However, user requested this. Standard might be 'Thing' or just omitted if not strict. 
                // Let's use it as requested or map to a generic type if needed. 
                // Google recommends specific types. Let's stick to user request but maybe wrap in a known type if valid.
                "name": item.title,
                "description": item.description,
                "image": item.imageUrl
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(jsonLd)) }}
            />
            <AchievementsPageClient initialAchievements={achievements} />
        </>
    );
}
