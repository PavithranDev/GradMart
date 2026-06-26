"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { DashboardSidebar } from "@/components/sections/dashboard-sidebar";
import { useSession } from "@/lib/auth/AuthContext";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?redirect=/dashboard");
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
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col overflow-hidden">
      <div className="pt-6 px-4 md:px-8">
        <Navbar />
      </div>

      <div className="flex-1 w-full pt-12 pb-0 flex flex-col lg:flex-row h-[calc(100vh-100px)]">
        {/* Left Sidebar */}
        <DashboardSidebar />

        {/* Nested Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
