"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Wallet,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AFFILIATE_LINKS = [
  { href: "/affiliate", label: "Dashboard", icon: LayoutDashboard },
  { href: "/affiliate/rules", label: "Commission & Rules", icon: Trophy },
  { href: "/affiliate/payouts", label: "Payouts", icon: Wallet },
  { href: "/affiliate/marketing", label: "Marketing Tools", icon: Megaphone },
];

export function AffiliateSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="flex-shrink-0 bg-gradient-to-b from-[#0a0a0a] to-neutral-900 h-screen sticky top-0 text-white hidden lg:flex flex-col border-r border-black/10 z-50 overflow-hidden shadow-2xl"
    >
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0 relative z-10">
        <Link href="/affiliate" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="text-[20px]">🎓</span>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center"
              >
                <span className="text-[18px] font-bold tracking-tight ml-1">GradMart</span>
                <span className="text-[9px] bg-emerald-500 text-[#0a0a0a] px-2 py-0.5 rounded-full ml-1.5 font-bold tracking-wider">AFFILIATE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white ${isCollapsed ? 'absolute right-0 translate-x-[-1.25rem]' : ''}`}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-8 overflow-y-auto overflow-x-hidden hide-scrollbar flex flex-col gap-1 z-10">
        {AFFILIATE_LINKS.map((route) => {
          const isActive = pathname === route.href;

          return (
            <Link
              key={route.href}
              href={route.href}
              title={isCollapsed ? route.label : undefined}
              className={`flex items-center px-3 py-3 rounded-xl text-[14px] font-bold transition-all group relative ${isCollapsed ? 'justify-center' : 'gap-3'
                } ${isActive
                  ? "text-[#0a0a0a] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
            >
              <route.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-[#0a0a0a]" : "text-white/40 group-hover:text-white"}`} />

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden flex-1"
                  >
                    {route.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User Area / Logout */}
      <div className="p-4 border-t border-white/10 flex-shrink-0 z-10">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between mb-3 backdrop-blur-md">
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-[#0a0a0a] flex items-center justify-center font-bold text-[12px] flex-shrink-0">
                    RS
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-white leading-none">Rahul Sharma</p>
                    <p className="text-[11px] font-medium text-emerald-400">Level 2 Affiliate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          title={isCollapsed ? "Logout" : undefined}
          className={`flex items-center w-full px-3 py-2.5 rounded-xl text-[14px] font-bold text-red-400 hover:bg-red-500/10 transition-colors ${isCollapsed ? 'justify-center' : 'gap-3'
            }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>

    </motion.aside>
  );
}
