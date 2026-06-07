"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ProjectsCTA() {
  return (
    <section className="px-4 md:px-12 mb-20">
      <div className="w-full bg-[#0a0a0a] rounded-[32px] p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
            Ready to Build <br />
            <span className="font-serif italic font-normal text-white/80">Your Dream Project?</span>
          </h2>
          
          <p className="text-white/60 text-[14px] md:text-[15px] mb-8 leading-[1.6]">
            Join thousands of students who have successfully graduated using our premium, verified templates. Stop stressing over code and start building faster.
          </p>
          
          <Link
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block bg-white text-[#0a0a0a] px-8 py-3.5 rounded-full font-semibold text-[14px] hover:bg-neutral-100 transition-colors shadow-lg"
          >
            Browse All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
