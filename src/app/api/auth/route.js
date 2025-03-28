import jwt from "jsonwebtoken";
export async function POST(request) {
  const { email, password } = await request.json();

  if (email === "admin@gmail.com" && password === "admin") {
    const token = jwt.sign({ email }, "JWTsecret", {
      expiresIn: "1h",
    });

    const cookie = `token=${token};  Path=/; Max-Age=3600; SameSite=Strict; Secure;`;

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
}
