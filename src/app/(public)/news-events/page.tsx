import { getNewsService } from "@/services/newsService";
import { getEventsService } from "@/services/eventsService";
import NewsEventsPageClient from "./NewsEventsPageClient";
import Schema from "@/components/seo/Schema";

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function NewsEventsPage() {
    // Fetch both News and Events in parallel
    const [newsItems, eventsItems] = await Promise.all([
        getNewsService().catch((e) => {
            console.error("News Fetch Error:", e);
            return [];
        }),
        getEventsService().catch((e) => {
            console.error("Events Fetch Error:", e);
            return [];
        })
    ]);

    return (
        <>
            {/* Generate Schema for latest 5 news items to avoid overly large DOM */}
            {newsItems.slice(0, 5).map(item => (
                <Schema
                    key={item.id}
                    type="NewsArticle"
                    data={item}
                />
            ))}
            <NewsEventsPageClient initialNews={newsItems} initialEvents={eventsItems} />
        </>
    );
}
