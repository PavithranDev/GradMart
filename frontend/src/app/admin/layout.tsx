"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { useSession } from "@/lib/auth/AuthContext";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { status, session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?redirect=/admin");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

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
          <p className="text-[14px] font-bold text-[#0a0a0a] tracking-[0.2em] uppercase">Loading Admin Panel</p>
        </motion.div>
      </div>
    );
  }

  if (status === "unauthenticated" || (status === "authenticated" && session?.user?.role !== "ADMIN")) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f5f4ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen w-full relative">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
