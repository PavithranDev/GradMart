"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ServerCrash, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f5f4ef] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background abstract elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-black/5 rounded-[40px] p-10 md:p-16 max-w-2xl w-full text-center relative z-10 shadow-xl"
      >
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <ServerCrash className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-[#0a0a0a] mb-4">Something went wrong!</h1>
        
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium mb-10">
          We encountered an unexpected server error. Our engineering team has been notified and is looking into it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg"
          >
            <RotateCcw className="w-5 h-5" /> Try Again
          </button>
          <Link href="/" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-black/5 transition-colors">
            <Home className="w-5 h-5" /> Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
