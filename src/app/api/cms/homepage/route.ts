import { NextResponse } from 'next/server';
import { getHomepageData } from "@/lib/cms";

export async function GET() {
    const data = await getHomepageData();
    return NextResponse.json(data);
}
