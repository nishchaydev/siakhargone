
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getNewsService, addNewsService, updateNewsService, deleteNewsService } from "@/services/newsService";

export const dynamic = 'force-dynamic';

// GET: Fetch all news
export async function GET() {
    try {
        const news = await getNewsService();
        return NextResponse.json({ data: news });
    } catch (error) {
        console.error("News API Error:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

// POST: Add new news item
export async function POST(req: Request) {
    try {
        const { title, description, date, imageUrl, isFeatured } = await req.json();
        await addNewsService({
            title,
            description,
            date,
            imageUrl,
            isFeatured: isFeatured !== undefined ? isFeatured : true // Default to true if missing
        });
        revalidatePath('/', 'layout'); // Revalidate everything
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Append Error:", error);
        return NextResponse.json({ error: "Failed to add news" }, { status: 500 });
    }
}

// PUT: Update news item
export async function PUT(req: Request) {
    try {
        const { id, title, description, date, imageUrl, isFeatured } = await req.json();
        await updateNewsService({
            id,
            title,
            description,
            date,
            imageUrl,
            isFeatured: isFeatured !== undefined ? isFeatured : true
        });
        revalidatePath('/', 'layout');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Update Error:", error);
        return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await deleteNewsService(id);
        revalidatePath('/', 'layout');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("News Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
    }
}
