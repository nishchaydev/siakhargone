
import { NextResponse } from 'next/server';
import { getNewsService } from '@/services/newsService';
import { getEventsService } from '@/services/eventsService';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Gate execution: Only allow in development
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const [news, events] = await Promise.all([
            getNewsService(),
            getEventsService()
        ]);

        return NextResponse.json({ data: { news, events } });
    } catch (error) {
        console.error("API Error:", error); // Log the actual error for debugging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); // Sanitize error output
    }
}
