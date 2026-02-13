import { NextResponse } from "next/server";
import { getCareersService, addCareerService, updateCareerService, deleteCareerService } from "@/services/careersService";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const careers = await getCareersService();
        // Public api usually wants active ones? But admin might want all.
        // Let's return all. The consumer can filter.
        return NextResponse.json({ success: true, data: careers });
    } catch (error) {
        console.error("GET /api/admin/careers error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch careers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { role, department, type, experience, description } = body;

        const missingFields = [];
        if (!role) missingFields.push('role');
        if (!department) missingFields.push('department');
        if (!type) missingFields.push('type');
        if (!experience) missingFields.push('experience');
        if (!description) missingFields.push('description');

        if (missingFields.length > 0) {
            return NextResponse.json({ success: false, error: "Missing required fields", missing: missingFields }, { status: 400 });
        }

        await addCareerService({ role, department, type, experience, description });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("POST /api/admin/careers error:", error);
        return NextResponse.json({ success: false, error: "Failed to add career" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, role, department, type, experience, description, isActive } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing or invalid id" }, { status: 400 });
        }

        await updateCareerService({ id, role, department, type, experience, description, isActive });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("PUT /api/admin/careers error:", error);
        return NextResponse.json({ success: false, error: "Failed to update career" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing or invalid id" }, { status: 400 });
        }

        await deleteCareerService(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/admin/careers error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete career" }, { status: 500 });
    }
}
