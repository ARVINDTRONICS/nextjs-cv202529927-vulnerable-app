"use client";

import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();

  const token = document && document?.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));

  if (!token && router.pathname !== "/") {
    router.push("/");
  }

  return children;
}
