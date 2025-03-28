export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/api/admin-data");

  if (!token && !isAuthRoute) {
    return new Response("Unauthorized", {
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
