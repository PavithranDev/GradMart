"use client";

import { motion } from "framer-motion";

export function Quote() {
  return (
    <section className="py-12 flex justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#0a0a0a] tracking-tight">
          <span className="font-sans font-medium">Ship</span> 
          <span className="inline-block mx-4 bg-[#0a0a0a] p-2 rounded-xl align-middle">
             {/* Small icon placeholder for the diamond icon in the image */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="white" fillOpacity="0.8"/>
            </svg>
          </span>
          <span className="font-sans font-medium">Faster,</span>
          <br />
          <span className="font-serif italic font-normal">Work Smarter, Succeed.</span>
        </h2>
      </motion.div>
    </section>
  );
}
