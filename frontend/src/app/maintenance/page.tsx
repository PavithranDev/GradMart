"use client";

import { motion } from "framer-motion";
import { Wrench, Clock } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background abstract elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 max-w-2xl bg-white border border-black/5 rounded-[40px] p-10 md:p-16 shadow-xl"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-orange-50 rounded-full flex items-center justify-center"
          >
            <Wrench className="w-10 h-10 text-orange-500" />
          </motion.div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 tracking-tight">System Maintenance</h1>
        
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium mb-10 leading-relaxed">
          GradMart is currently down for scheduled maintenance to improve system performance and upgrade our database. We'll be back online shortly.
        </p>

        <div className="inline-flex items-center gap-2 bg-black/5 text-[#0a0a0a] px-6 py-3 rounded-full font-bold text-[13px]">
          <Clock className="w-4 h-4 text-orange-600" /> Expected downtime: 30 minutes
        </div>
      </motion.div>
    </div>
  );
}
