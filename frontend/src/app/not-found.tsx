"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background abstract elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6c3bff]/5 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 max-w-2xl"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          className="text-[150px] md:text-[200px] font-black text-[#0a0a0a] leading-none tracking-tighter mb-4"
        >
          404
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#0a0a0a] mb-6">Page Not Found</h1>
        
        <p className="text-lg text-[rgba(10,10,10,0.6)] font-medium mb-12">
          Oops! The project or page you're looking for seems to have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg">
            <Home className="w-5 h-5" /> Go Home
          </Link>
          <Link href="/search" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-black/5 transition-colors">
            <Search className="w-5 h-5" /> Search Projects
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
