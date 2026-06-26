"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/auth/AuthContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, status } = useSession();

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[600px]">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between bg-[#0a0a0a] rounded-full px-2 py-2 shadow-xl border border-neutral-800 w-full"
        >
          <Link href="/" className="flex items-center gap-2 text-white px-4 hover:opacity-80 transition-opacity flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
            <span className="font-semibold text-[13px] tracking-tight">GradMart</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-[13px] text-neutral-300">
            <Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          </nav>

          <div className="flex items-center gap-2 pr-2">
            <button className="hidden md:flex w-8 h-8 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            
            {status === "loading" ? (
              <div className="hidden md:block w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin mx-2"></div>
            ) : status === "authenticated" ? (
              <Link
                href="/dashboard"
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold text-[14px] uppercase hover:opacity-80 transition-opacity ml-1 border border-black/10"
              >
                {session?.user?.name?.charAt(0) || <User className="w-4 h-4" />}
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-white text-[13px] font-semibold hover:text-white/80 transition-colors px-2"
              >
                Login
              </Link>
            )}
            <Link
              href="/projects"
              className="hidden md:block bg-white text-black px-5 py-2 rounded-full font-semibold text-[13px] hover:bg-neutral-200 transition-colors ml-1"
            >
              Discover
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 top-0 bg-[#0a0a0a] border-b border-neutral-800 shadow-2xl z-[60] md:hidden flex flex-col rounded-b-3xl"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-white">
                  <GraduationCap className="w-6 h-6 text-white" />
                  <span className="text-[16px] font-bold tracking-tight">GradMart</span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8 flex flex-col gap-6">
                <Link href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-bold text-white/80 hover:text-white flex items-center justify-between">
                  How it works <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
                <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-bold text-white/80 hover:text-white flex items-center justify-between">
                  Projects <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
                <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-bold text-white/80 hover:text-white flex items-center justify-between">
                  Search <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </nav>

              <div className="p-6 border-t border-white/5 flex flex-col gap-3">
                {status === "authenticated" ? (
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 text-center text-white text-[15px] font-bold hover:bg-white/5 rounded-2xl transition-colors border border-white/10"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 text-center text-white text-[15px] font-bold hover:bg-white/5 rounded-2xl transition-colors border border-white/10"
                  >
                    Login
                  </Link>
                )}
                <Link 
                  href="/projects" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 text-center bg-white text-black text-[15px] font-bold rounded-2xl transition-colors"
                >
                  Discover Projects
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
