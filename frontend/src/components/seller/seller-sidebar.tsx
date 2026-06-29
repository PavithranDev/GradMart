"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  TrendingUp,
  Wallet,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  GitCommit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SELLER_ROUTES = [
  { href: "/seller", label: "Overview", icon: LayoutDashboard },
  { href: "/seller/projects", label: "My Projects", icon: FolderGit2 },
  { href: "/seller/project-version", label: "Versions & Updates", icon: GitCommit },
  { href: "/seller/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/seller/withdrawals", label: "Withdrawals", icon: Wallet },
  { href: "/seller/levels", label: "Seller Levels", icon: TrendingUp },
  { href: "/seller/messages", label: "Messages", icon: MessageSquare },
  { href: "/seller/notifications", label: "Notifications", icon: Bell },
  { href: "/seller/settings", label: "Settings", icon: Settings },
];

export function SellerSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="flex-shrink-0 bg-white h-screen sticky top-0 text-[#0a0a0a] hidden lg:flex flex-col border-r border-black/5 z-50 overflow-hidden"
    >

      {/* Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-black/5 flex-shrink-0 relative">
        <Link href="/seller" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
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
                <span className="text-[9px] bg-[#0a0a0a] text-white px-2 py-0.5 rounded-full ml-1.5 font-bold">SELLER</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 hover:bg-black/5 rounded-lg transition-colors text-[rgba(10,10,10,0.5)] hover:text-[#0a0a0a] ${isCollapsed ? 'absolute right-0 translate-x-[-1.25rem]' : ''}`}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-8 overflow-y-auto overflow-x-hidden hide-scrollbar flex flex-col gap-1">
        {SELLER_ROUTES.map((route) => {
          const isActive = pathname === route.href;

          return (
            <Link
              key={route.href}
              href={route.href}
              title={isCollapsed ? route.label : undefined}
              className={`flex items-center px-3 py-2.5 rounded-xl text-[14px] font-bold transition-all group ${isCollapsed ? 'justify-center' : 'gap-3'
                } ${isActive
                  ? "text-[#0a0a0a] bg-[#0a0a0a]/5 shadow-sm"
                  : "text-[rgba(10,10,10,0.6)] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
                }`}
            >
              <route.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-[#0a0a0a]" : "text-[rgba(10,10,10,0.4)] group-hover:text-[#0a0a0a]"}`} />

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

              {!isCollapsed && isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-black/5 flex-shrink-0">
        <button
          onClick={() => { localStorage.removeItem('gradmart_token'); window.location.href = '/login'; }}
          title={isCollapsed ? "Logout" : undefined}
          className={`flex items-center w-full px-3 py-2.5 rounded-xl text-[14px] font-bold text-red-600 hover:bg-red-50 transition-colors ${isCollapsed ? 'justify-center' : 'gap-3'
            }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>

    </motion.aside>
  );
}
