
import { NextResponse } from 'next/server';
import { seedDataLogic } from '@/lib/seed-logic';

export async function GET(request: Request) {
    try {
        // Simple auth bypass using secret key from environment
        const url = new URL(request.url);
        const secretKey = url.searchParams.get('key');
        const expectedKey = process.env.SEED_DATA_SECRET_KEY;

        if (!expectedKey) {
            console.error("SEED_DATA_SECRET_KEY is not set in environment variables");
            return NextResponse.json({ success: false, error: 'Server Configuration Error' }, { status: 500 });
        }

        if (secretKey !== expectedKey) {
            return NextResponse.json({ success: false, error: 'Unauthorized - Invalid or missing key parameter' }, { status: 401 });
        }

        const results = await seedDataLogic();

        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error("Seed Data Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to seed data' }, { status: 500 });
    }
}
