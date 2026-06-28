"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { DashboardSidebar } from "@/components/sections/dashboard-sidebar";
import { useSession } from "@/lib/auth/AuthContext";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="min-h-screen bg-[#f5f4ef] flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative w-24 h-24 mb-6">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-[#6c3bff] border-r-[#6c3bff]/50 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-4 border-transparent border-b-[#0a0a0a] border-l-[#0a0a0a]/50 rounded-full"
            />
          </div>
          <p className="text-[14px] font-bold text-[#0a0a0a] tracking-[0.2em] uppercase">Loading Dashboard</p>
        </motion.div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <main className="h-screen bg-[#f5f4ef] flex flex-col overflow-hidden">
      <div className="flex-none pt-6 px-4 md:px-8">
        <Navbar />
      </div>

      <div className="flex-1 w-full pt-24 pb-0 flex flex-col lg:flex-row min-h-0">
        {/* Left Sidebar */}
        <DashboardSidebar />

        {/* Nested Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-20" data-lenis-prevent="true">
          {children}
        </div>
      </div>
    </main>
  );
}
