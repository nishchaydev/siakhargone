import { getNewsService } from "@/services/newsService";
import NewsEventsPageClient from "./NewsEventsPageClient";

export const dynamic = 'force-dynamic';

export default async function NewsEventsPage() {
    const newsItems = await getNewsService();

    // Map service items to UI items if needed, but they should match closely
    // Service: { id, title, description, date, imageUrl, ... }
    // Client Expects: { id, title, description, date, imageUrl? }

    return <NewsEventsPageClient initialNews={newsItems} />;
}
