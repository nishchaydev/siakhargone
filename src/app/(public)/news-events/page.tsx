import { getNewsService } from "@/services/newsService";
import { getEventsService } from "@/services/eventsService";
import NewsEventsPageClient from "./NewsEventsPageClient";

export const dynamic = 'force-dynamic';

export default async function NewsEventsPage() {
    // Fetch both News and Events in parallel
    const [newsItems, eventsItems] = await Promise.all([
        getNewsService(),
        getEventsService()
    ]);

    return <NewsEventsPageClient initialNews={newsItems} initialEvents={eventsItems} />;
}
