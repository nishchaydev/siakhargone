
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const hostname = request.headers.get("host") || "";
    const pathname = request.nextUrl.pathname;

    // Check if we are on the 'cms' subdomain (e.g. cms.siakhargone.in)
    const isCmsSubdomain = hostname.startsWith("cms.");

    // --- 1. CMS Subdomain Logic ---
    if (isCmsSubdomain) {
        // A. API Routes: Pass through untouched (they are global)
        if (pathname.startsWith("/api")) {
            return NextResponse.next();
        }

        // B. Auth Check for CMS
        const adminSession = request.cookies.get("admin_session");
        const isLoginPage = pathname === "/login";

        // Exclude public static files if any (usually handled by matcher, but being safe)
        if (!pathname.includes(".")) {
            // Redirect unauthenticated to login
            if (!adminSession?.value && !isLoginPage) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
            // Redirect authenticated away from login
            if (adminSession?.value && isLoginPage) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        }

        // C. Rewrite URL (Map root to admin folder)
        // e.g. cms.site.com/dashboard -> /admin-school-portal/dashboard
        let targetPath = pathname === "/" ? "/dashboard" : pathname;

        // Construct the rewrite URL pointing to the actual folder structure
        return NextResponse.rewrite(new URL(`/admin-school-portal${targetPath}`, request.url));
    }

    // --- 2. Main Domain Logic ---
    // Protect the physical path if accessed directly (optional, but good for security)
    if (request.nextUrl.pathname.startsWith("/admin-school-portal")) {
        const adminSession = request.cookies.get("admin_session");
        if (request.nextUrl.pathname === "/admin-school-portal/login") {
            if (adminSession?.value === "true") {
                return NextResponse.redirect(new URL("/admin-school-portal/dashboard", request.url));
            }
            return NextResponse.next();
        }
        if (adminSession?.value !== "true") {
            return NextResponse.redirect(new URL("/admin-school-portal/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Matched everything except statics to ensure we catch the subdomain
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
