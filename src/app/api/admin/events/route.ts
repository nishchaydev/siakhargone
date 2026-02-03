import { NextResponse } from 'next/server';
import { getEventsService, addEventService, deleteEventService } from "@/services/eventsService";

// Helper to prevent caching
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const events = await getEventsService();
        return NextResponse.json({ success: true, data: events });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Validation could go here
        await addEventService(body);
        return NextResponse.json({ success: true, message: 'Event added successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to add event' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        if (!body.id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await deleteEventService(body.id);
        return NextResponse.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 });
    }
}
