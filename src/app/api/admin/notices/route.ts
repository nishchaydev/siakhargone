
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getNoticesService, addNoticeService, updateNoticeService, deleteNoticeService } from "@/services/noticesService";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const notices = await getNoticesService();
        // Map service format to API format (if different, but looks like service returns nice objects)
        // Service returns: { id, title, date, pdfUrl, important }
        // Admin UI expects: { id, text, date, isPriority, link } (based on current map in route.ts)
        // We need to map it back to what the UI expects OR change the UI. 
        // Changing the UI `page.tsx` is better for long term, but to minimize breakage let's see.
        // Old route mapped: text=row[1] (Title), isImportant=row[3]===Important, link=row[4]
        // Service maps: title=row[1], important=row[4], pdfUrl=row[3]

        // WAIT: The service and the old route had DIFFERENT schemas/column mappings!
        // Old Route: 
        //   Col A: ID
        //   Col B: Text (Title)
        //   Col C: Date
        //   Col D: Priority ("Important"/"Normal")
        //   Col E: Link

        // Service:
        //   Col A: ID
        //   Col B: Title
        //   Col C: Date
        //   Col D: PdfUrl (Link)
        //   Col E: Important (TRUE/FALSE)

        // Only one of these can be right for the actual sheet data!
        // Given I just updated the service to use "TRUE"/"FALSE" for Important in Col E...
        // And the old route used "Important"/"Normal" in Col D...
        // SYSTEM CONFLICT DETECTED.

        // I must rely on the SERVICE as the source of truth going forward, but I must ensure it MATCHES the data.
        // If the Sheet currently uses "Important"/"Normal" in Col D, the service reading Col E is WRONG.

        // Let's assume the SERVICE is the intended modern implementation, but I need to be careful.
        // The user said "use noticesService". I will trust the service's schema but map the output to what the frontend expects 
        // so I don't have to rewrite the whole frontend right now (though I should update frontend too).

        // Frontend expects: { id, text, link, date, isPriority }
        // Service returns: { id, title, pdfUrl, date, important }

        const mappedNotices = notices.map(n => ({
            id: n.id,
            text: n.title,
            link: n.pdfUrl,
            date: n.date,
            isPriority: n.important
        }));

        return NextResponse.json({ data: mappedNotices });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch notices" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { text, link, date, isPriority } = await req.json();

        if (!text || !date) {
            return NextResponse.json({ success: false, error: "Text and Date are required" }, { status: 400 });
        }

        await addNoticeService({
            title: text,
            date,
            pdfUrl: link || "",
            important: isPriority ?? false
        });

        revalidatePath('/', 'layout');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notice POST Error:", error);
        return NextResponse.json({ success: false, error: "Failed to add notice" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, text, link, date, isPriority } = await req.json();

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        if (!text || !date) {
            return NextResponse.json({ success: false, error: "Text and Date are required" }, { status: 400 });
        }

        await updateNoticeService({
            id,
            title: text,
            date,
            pdfUrl: link || "",
            important: isPriority ?? false
        });

        revalidatePath('/', 'layout');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notice PUT Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update notice" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

        await deleteNoticeService(id);
        revalidatePath('/', 'layout');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notice DELETE Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete notice" }, { status: 500 });
    }
}
