"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (document) {
      const token = document?.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));

      if (!token && router.pathname !== "/") {
        router.push("/");
      }
    }
  });

  return children;
}
