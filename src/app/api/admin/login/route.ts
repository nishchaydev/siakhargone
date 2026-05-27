
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/api-auth";
import { limiter } from "@/lib/rate-limit";

export async function POST(req: Request) {
    try {
        // Rate Limiting (Max 5 attempts per minute per IP)
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        try {
            await limiter.check(5, ip);
        } catch {
            return NextResponse.json({ error: "Too Many Requests. Please try again in a minute." }, { status: 429 });
        }

        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            console.error("ADMIN_PASSWORD is not set in environment variables");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        if (password === adminPassword) {
            const cookieStore = await cookies();
            const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
            session.isLoggedIn = true;
            await session.save();

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
