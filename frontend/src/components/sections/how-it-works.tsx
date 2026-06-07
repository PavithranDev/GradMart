"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "1",
    title: "Choose Project",
    description: "Browse templates and pick the fit for your vision.",
  },
  {
    number: "2",
    title: "Customize It",
    description: "Personalize your site with your content and branding.",
  },
  {
    number: "3",
    title: "Publish It",
    description: "Go live with a polished and professional website fast.",
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="flex flex-col">
      <div className="w-full mb-10 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[#0a0a0a]">
          Easy Steps to <br/>
          Your New <span className="font-serif italic font-normal">Project</span>
        </h2>
        <p className="text-[rgba(10,10,10,0.5)] text-[14px] md:text-[15px] leading-[1.6]">
          Follow these simple steps to launch your custom website quickly and effortlessly. Each step is designed to guide you through the process, ensuring a seamless experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 relative overflow-hidden min-h-[220px] flex flex-col justify-end"
          >
            {/* Top Right Serif Number */}
            <div className="absolute top-4 right-6 text-[80px] font-serif italic text-white/10 leading-none group-hover:text-white/20 transition-colors">
              {step.number}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-white text-[18px] font-semibold mb-2">{step.title}</h3>
              <p className="text-white/60 text-[14px] leading-[1.6]">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
