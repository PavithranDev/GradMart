"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { SellerHeader } from "@/components/seller/seller-header";
import { useSession } from "@/lib/auth/AuthContext";
import { Loader2 } from "lucide-react";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?redirect=/seller");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="flex min-h-screen bg-[#f5f4ef] font-sans">
      <SellerSidebar />
      <main className="flex-1 flex flex-col min-h-screen w-full relative">
        <SellerHeader />
        {children}
      </main>
    </div>
  );
}
