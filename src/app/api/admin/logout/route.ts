
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");

    // Also clear the old insecure cookie just in case
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
}
