"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative overflow-hidden rounded-[32px] min-h-[350px] flex flex-col justify-end p-10 md:p-14"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506744626753-1fa28f673fac?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-xl"
      >
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4 leading-tight">
          Launch Your <br/>
          Website <span className="font-serif italic font-normal text-white">Today</span>
        </h2>
        
        <p className="text-white/80 text-[14px] md:text-[15px] mb-8 leading-[1.6] max-w-md">
          Ready to bring your vision to life? Choose a template, customize it, and launch your website in just a few easy steps. Start your online journey now!
        </p>
        
        <Link
          href="#projects"
          className="inline-block bg-white text-[#0a0a0a] px-6 py-2.5 rounded-full font-semibold text-[13px] hover:bg-neutral-100 transition-colors"
        >
          Discover Templates
        </Link>
      </motion.div>
    </section>
  );
}
