"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

export function FeaturedProjectHero() {
  return (
    <section className="px-4 md:px-12 mt-12 mb-20 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-white rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row gap-8 lg:gap-16 shadow-[0_4px_40px_rgba(0,0,0,0.04)] items-center group relative overflow-hidden"
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Left Side: Thumbnail */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-[#6c3bff] rounded-2xl relative overflow-hidden flex-shrink-0 group-hover:shadow-2xl transition-all duration-500">
           <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
           {/* Placeholder for project UI mockups */}
           <div className="absolute inset-x-8 -bottom-10 top-12 bg-white rounded-t-xl shadow-2xl opacity-90 transition-transform duration-500 group-hover:-translate-y-2" />
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 w-max mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[12px] font-bold uppercase tracking-wider">Top Rated Project</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#0a0a0a] mb-4">
            AI Smart Attendance <br />
            <span className="font-serif italic font-normal">System</span>
          </h2>

          <div className="flex items-center gap-4 mb-6 text-[14px]">
            <div className="flex text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[rgba(10,10,10,0.5)]">(128 Reviews)</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["React", "Node.js", "Express", "MongoDB", "Face Recognition"].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-[#f5f4ef] text-[rgba(10,10,10,0.6)] text-[12px] font-semibold rounded-full border border-black/5">
                {tech}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-3 mb-10">
            {["Source Code", "Report", "PPT", "Setup Guide"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[14px] text-[#0a0a0a] font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto bg-[#0a0a0a] text-white px-8 py-3.5 rounded-full font-semibold text-[14px] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
              Buy Now — ₹499
            </button>
            <Link 
              href="/projects/ai-attendance-system" 
              className="w-full sm:w-auto bg-white text-[#0a0a0a] border border-[#0a0a0a]/10 px-8 py-3.5 rounded-full font-semibold text-[14px] hover:bg-[#0a0a0a]/5 transition-colors flex items-center justify-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
