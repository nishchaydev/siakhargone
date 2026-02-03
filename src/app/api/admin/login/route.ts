
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            console.error("ADMIN_PASSWORD is not set in environment variables");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        if (password === adminPassword) {
            const cookieStore = await cookies();

            // Set Secure HttpOnly Cookie
            cookieStore.set("admin_token", "authorized", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
