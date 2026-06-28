"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/AuthContext";

export function RedirectIfAuthenticated() {
  const { status, session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") {
        router.replace("/admin/crm");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [status, session, router]);

  return null; // This component doesn't render anything
}
