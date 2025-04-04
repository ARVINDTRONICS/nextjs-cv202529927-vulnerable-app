import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Simple rate limiting implementation
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // Maximum requests per minute

// Get JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production";

export async function middleware(request) {
  const ip = request.ip || request.headers.get("x-forwarded-for");
  const now = Date.now();

  // Rate limiting
  if (ip) {
    const userRequests = rateLimit.get(ip) || [];
    const recentRequests = userRequests.filter((time) => now - time < RATE_LIMIT_WINDOW);

    if (recentRequests.length >= MAX_REQUESTS) {
      return new Response(JSON.stringify({ message: "Too many requests" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);
  }

  const token = request.cookies.get("token")?.value;
  const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/api/admin-data");

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (isAdminRoute && payload.email !== "admin@gmail.com") {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const config = {
  matcher: ["/api/admin-data/:path*", "/api/auth/:path*"],
};
