"use client";

import { useState } from "react";
import { Bell, Search, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_LINKS } from "./admin-sidebar";

export function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
        
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center gap-6 flex-1">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-[rgba(10,10,10,0.6)] hover:bg-black/5 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden md:flex items-center gap-3 bg-[#f5f4ef]/50 border border-black/5 rounded-full px-4 py-2.5 max-w-md w-full focus-within:ring-2 ring-[#0a0a0a] transition-all">
            <Search className="w-4 h-4 text-[rgba(10,10,10,0.4)]" />
            <input 
              type="text" 
              placeholder="Search orders, tickets, or users..." 
              className="bg-transparent border-none outline-none w-full text-[13px] font-bold text-[#0a0a0a] placeholder-[rgba(10,10,10,0.4)]"
            />
            <div className="text-[10px] font-bold text-[rgba(10,10,10,0.4)] bg-black/5 px-2 py-0.5 rounded-md">⌘K</div>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4">
          
          <button className="relative p-2.5 text-[rgba(10,10,10,0.6)] hover:bg-black/5 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          <div className="h-8 w-px bg-black/10 mx-2 hidden sm:block" />

          <div className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-black/5 rounded-full transition-colors">
            <div className="text-right hidden sm:block pr-2">
              <p className="text-[13px] font-bold text-[#0a0a0a] leading-none mb-1">System Status</p>
              <p className="text-[11px] font-bold text-green-600 flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> All Systems Operational
              </p>
            </div>
          </div>

        </div>

      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-black/5 flex-shrink-0">
                <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <span className="text-[20px]">🎓</span>
                  <span className="text-[18px] font-bold tracking-tight">GradMart <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 rounded-full ml-1 font-bold">ADMIN</span></span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[rgba(10,10,10,0.6)] hover:bg-black/5 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 overflow-y-auto flex flex-col gap-1">
                {ADMIN_LINKS.map((route) => {
                  const isActive = pathname === route.href;
                  return (
                    <Link 
                      key={route.href} 
                      href={route.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
                        isActive 
                          ? "text-[#0a0a0a] bg-[#0a0a0a]/5 shadow-sm" 
                          : "text-[rgba(10,10,10,0.6)] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
                      }`}
                    >
                      <route.icon className={`w-5 h-5 ${isActive ? "text-[#0a0a0a]" : "text-[rgba(10,10,10,0.4)]"}`} />
                      {route.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-black/5 flex-shrink-0">
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[15px] font-bold text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
