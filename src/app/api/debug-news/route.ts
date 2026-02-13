
import { NextResponse } from 'next/server';
import { getNewsService } from '@/services/newsService';
import { getEventsService } from '@/services/eventsService';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const news = await getNewsService();
        const events = await getEventsService();
        return NextResponse.json({ news, events });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
