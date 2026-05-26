import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_AUTH_COOKIE = "admin_token";
const ADMIN_AUTH_VALUE = "authorized";
const DEBUG_KEY_HEADER = "x-debug-key";

export function hasAdminSession(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_AUTH_COOKIE)?.value === ADMIN_AUTH_VALUE;
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
