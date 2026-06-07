"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";

export function CategoriesCTA() {
  return (
    <section className="px-4 md:px-12 mb-20 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-white rounded-[40px] border border-black/5 p-10 md:p-16 flex flex-col items-center text-center shadow-sm"
      >
        <div className="w-16 h-16 bg-[#f5f4ef] rounded-2xl flex items-center justify-center mb-6">
          <MessageSquarePlus className="w-8 h-8 text-[#0a0a0a]" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4">
          Can't Find Your Project?
        </h2>
        <p className="text-lg text-[rgba(10,10,10,0.6)] mb-8 font-medium max-w-xl">
          Need something specific? Request a custom project template and our top verified creators will build it for you.
        </p>

        <Link 
          href="/contact"
          className="bg-[#0a0a0a] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2"
        >
          Request Custom Project
        </Link>
      </motion.div>
    </section>
  );
}
