"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Map,
  CheckSquare,
  UserCheck,
  ShieldAlert,
  LifeBuoy,
  Mail,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ADMIN_LINKS = [
  { href: "/admin", label: "Analytics", icon: LayoutDashboard },
  { href: "/admin/revenue", label: "Revenue Reports", icon: BarChart3 },
  { href: "/admin/heatmap", label: "Sales Heatmap", icon: Map },
  { href: "/admin/approvals", label: "Project Approvals", icon: CheckSquare },
  { href: "/admin/sellers", label: "Seller Verification", icon: UserCheck },
  { href: "/admin/fraud", label: "Fraud Detection", icon: ShieldAlert },
  { href: "/admin/tickets", label: "Support Tickets", icon: LifeBuoy },
  { href: "/admin/campaigns", label: "Email Campaigns", icon: Mail },
  { href: "/admin/settings", label: "Admin Settings", icon: Settings },
];

export function AdminSidebar() {
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
        <Link href="/admin" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
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
                <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 rounded-full ml-1.5 font-bold">ADMIN</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Absolute positioning for the toggle when collapsed so it stays centered/visible */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 hover:bg-black/5 rounded-lg transition-colors text-[rgba(10,10,10,0.5)] hover:text-[#0a0a0a] ${isCollapsed ? 'absolute right-0 translate-x-[-1.25rem]' : ''}`}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-8 overflow-y-auto overflow-x-hidden hide-scrollbar flex flex-col gap-1">
        {ADMIN_LINKS.map((route) => {
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

      {/* User Area / Logout */}
      <div className="p-4 border-t border-black/5 flex-shrink-0">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[#f5f4ef] rounded-xl p-3 flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <div className="w-8 h-8 rounded-full bg-purple-600/10 text-purple-600 flex items-center justify-center font-bold text-[12px] flex-shrink-0">
                    AD
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0a0a0a] leading-none">Super Admin</p>
                    <p className="text-[11px] font-medium text-[rgba(10,10,10,0.5)]">admin@gradmart.in</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
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
