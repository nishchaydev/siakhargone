import { NextResponse } from "next/server";
import { getCareersService, addCareerService, updateCareerService, deleteCareerService } from "@/services/careersService";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const careers = await getCareersService();
        // Public api usually wants active ones? But admin might want all.
        // Let's return all. The consumer can filter.
        return NextResponse.json({ data: careers });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { role, department, type, experience, description } = await req.json();
        await addCareerService({ role, department, type, experience, description });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add career" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, role, department, type, experience, description, isActive } = await req.json();
        await updateCareerService({ id, role, department, type, experience, description, isActive });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update career" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await deleteCareerService(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete career" }, { status: 500 });
    }
}
