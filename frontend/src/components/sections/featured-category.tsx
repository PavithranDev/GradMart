"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrainCircuit, ArrowRight } from "lucide-react";

export function FeaturedCategory() {
  return (
    <section className="px-4 md:px-12 mb-20 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-r from-neutral-900 to-black rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
      >
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[12px] font-bold text-white uppercase tracking-wider mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Most Popular Right Now
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI & Machine Learning
          </h2>
          <p className="text-lg text-white/70 mb-8 font-medium">
            Stay ahead of the curve. Explore the highest-rated Face Recognition, Smart Attendance, and Predictive Analysis templates built with Python and TensorFlow.
          </p>

          <Link 
            href="/projects?category=AI"
            className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-[15px] hover:bg-neutral-200 transition-colors shadow-lg"
          >
            Browse AI Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="relative z-10 hidden md:flex items-center justify-center">
          <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-md rotate-12 hover:rotate-0 transition-transform duration-500">
            <BrainCircuit className="w-24 h-24 text-purple-400" />
          </div>
        </div>

      </motion.div>
    </section>
  );
}
