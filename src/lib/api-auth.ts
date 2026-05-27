import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getIronSession, type SessionOptions } from "iron-session";

export interface SessionData {
  isLoggedIn?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "fallback_session_secret_of_at_least_32_chars_long",
  cookieName: "admin_token",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  },
};

const DEBUG_KEY_HEADER = "x-debug-key";

export async function hasAdminSession(request: NextRequest): Promise<boolean> {
  const res = new Response();
  const session = await getIronSession<SessionData>(request, res, sessionOptions);
  return session.isLoggedIn === true;
}

export function unauthorizedJson(message = "Unauthorized") {
  return NextResponse.json({ success: false, error: message }, { status: 401 });
}

export function forbiddenJson(message = "Forbidden") {
  return NextResponse.json({ success: false, error: message }, { status: 403 });
}

export function canAccessDebugApi(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const debugKey = process.env.DEBUG_API_KEY;
  if (!debugKey) {
    return false;
  }

  const headerKey = request.headers.get(DEBUG_KEY_HEADER);
  const queryKey = request.nextUrl.searchParams.get("key");

  return headerKey === debugKey || queryKey === debugKey;
}
