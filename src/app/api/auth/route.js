import { SignJWT } from "jose";

// Get JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (email === "admin@gmail.com" && password === "admin") {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const token = await new SignJWT({ email }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").sign(secret);

      const cookie = `token=${token}; Path=/; Max-Age=3600; SameSite=Strict; Secure; HttpOnly;`;

      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
