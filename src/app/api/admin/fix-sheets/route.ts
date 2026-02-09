import { NextResponse } from 'next/server';
import { verifyAndFixSheets, FixReport } from '@/lib/verify-sheets';

// This is an admin-only route. In a real app, middleware should protect this.
// Assuming /api/admin/* is protected by middleware or we check here.

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        const report: FixReport = await verifyAndFixSheets();

        if (report.errors.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Some errors occurred during verification.",
                report
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Database verification complete.",
            report
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
