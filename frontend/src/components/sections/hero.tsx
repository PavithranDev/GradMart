"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="flex flex-col items-center pt-10">
      <div className="w-full bg-gradient-to-b from-white to-[#f5f4ef] rounded-[40px] px-6 pt-24 pb-0 flex flex-col items-center shadow-[0_4px_40px_rgba(0,0,0,0.02)] overflow-hidden relative">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto z-10"
        >
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-[#0a0a0a] mb-6">
            Graduate Smarter<br/>
            <span className="font-sans font-medium">in </span>
            <span className="font-serif italic text-[#0a0a0a] font-normal">Record Time</span>
          </h1>

          <p className="text-[14px] md:text-[15px] text-[rgba(10,10,10,0.5)] mb-8 max-w-xl mx-auto leading-[1.6]">
            Transform your final year experience with expertly crafted project templates that captivate and convert, providing a seamless and efficient experience from start to finish.
          </p>

          <Link
            href="#projects"
            className="inline-flex bg-[#0a0a0a] text-white px-6 py-3 rounded-full font-semibold text-[13px] hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Discover Projects
          </Link>
        </motion.div>

        {/* Floating Cards Carousel Placeholder */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-16 flex items-end justify-center gap-6 px-4 relative translate-y-10"
        >
          {/* Card 1 */}
          <div className="w-[180px] h-[280px] bg-[#8b5cf6] rounded-t-2xl shadow-xl flex-shrink-0" />
          {/* Card 2 */}
          <div className="w-[240px] h-[340px] bg-white rounded-t-2xl shadow-xl flex-shrink-0" />
          {/* Card 3 (Center) */}
          <div className="w-[280px] h-[400px] bg-[#ea580c] rounded-t-2xl shadow-2xl flex-shrink-0 z-10" />
          {/* Card 4 */}
          <div className="w-[240px] h-[340px] bg-[#ec4899] rounded-t-2xl shadow-xl flex-shrink-0" />
          {/* Card 5 */}
          <div className="w-[180px] h-[280px] bg-[#3f6212] rounded-t-2xl shadow-xl flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
