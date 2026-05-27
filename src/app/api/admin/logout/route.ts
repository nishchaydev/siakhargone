
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/api-auth";

export async function POST() {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.destroy();

    // Also clear the old insecure cookie just in case
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
}
