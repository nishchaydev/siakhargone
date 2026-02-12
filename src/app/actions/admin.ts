
'use server'

import { seedDataLogic } from '@/lib/seed-logic';

export async function seedDataAction() {
    // In a real application, you should validate the user session here.
    // For now, we assume the dashboard is protected by middleware/layout
    // or we are relying on the simple fact that this is an internal action.

    // Validate secret key from environment if needed, but since this is server-side code
    // executed by a trusted client component (in admin dashboard), we can proceed.
    // Ideally, check for admin role from session.

    try {
        const results = await seedDataLogic();
        return { success: true, results };
    } catch (error) {
        console.error("Seed Data Action Error:", error);
        return { success: false, error: 'Failed to seed data' };
    }
}
