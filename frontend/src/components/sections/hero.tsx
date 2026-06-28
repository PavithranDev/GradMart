"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Globe, Smartphone, Database, Code2, ChevronLeft, ChevronRight } from "lucide-react";

const TECH_STACKS = [
  { id: 1, name: "AI & Python", icon: Cpu, color: "bg-[#8b5cf6]", shadow: "shadow-[#8b5cf6]/20", mdHeight: "md:h-[280px]", mdWidth: "md:w-[180px]", query: "Python" },
  { id: 2, name: "Web Dev", icon: Globe, color: "bg-[#ec4899]", shadow: "shadow-[#ec4899]/20", mdHeight: "md:h-[340px]", mdWidth: "md:w-[240px]", query: "Web" },
  { id: 3, name: "Mobile Apps", icon: Smartphone, color: "bg-[#ea580c]", shadow: "shadow-[#ea580c]/20", mdHeight: "md:h-[400px]", mdWidth: "md:w-[280px]", query: "Mobile", isCenter: true },
  { id: 4, name: "Enterprise", icon: Database, color: "bg-[#3b82f6]", shadow: "shadow-[#3b82f6]/20", mdHeight: "md:h-[340px]", mdWidth: "md:w-[240px]", query: "Java" },
  { id: 5, name: "IoT & Hardware", icon: Code2, color: "bg-[#3f6212]", shadow: "shadow-[#3f6212]/20", mdHeight: "md:h-[280px]", mdWidth: "md:w-[180px]", query: "IoT" },
];

export function Hero() {
  const scrollLeft = () => document.getElementById('tech-stack-scroll')?.scrollBy({ left: -280, behavior: 'smooth' });
  const scrollRight = () => document.getElementById('tech-stack-scroll')?.scrollBy({ left: 280, behavior: 'smooth' });

  return (
    <section className="flex flex-col items-center pt-10">
      <div className="w-full bg-gradient-to-b from-white to-[#f5f4ef] rounded-[40px] px-0 md:px-6 pt-24 pb-0 flex flex-col items-center shadow-[0_4px_40px_rgba(0,0,0,0.02)] overflow-hidden relative">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto z-10 px-6"
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

        {/* Tech Stack Floating Cards */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-16 relative translate-y-10 group"
        >
          {/* Scroll Arrows for Mobile */}
          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between md:hidden z-20 pointer-events-none pb-10">
             <button onClick={scrollLeft} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg pointer-events-auto active:scale-95 transition-transform border border-black/5">
                <ChevronLeft className="w-6 h-6 text-black" />
             </button>
             <button onClick={scrollRight} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg pointer-events-auto active:scale-95 transition-transform border border-black/5">
                <ChevronRight className="w-6 h-6 text-black" />
             </button>
          </div>

          <div id="tech-stack-scroll" className="flex items-end justify-start md:justify-center gap-4 md:gap-6 px-8 md:px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 pt-4">
            {TECH_STACKS.map((stack) => (
              <Link 
                key={stack.id}
                href={`/search?q=${stack.query}`}
                className={`w-[260px] ${stack.mdWidth} h-[340px] ${stack.mdHeight} shrink-0 snap-center ${stack.color} rounded-t-3xl shadow-xl hover:shadow-2xl md:hover:-translate-y-4 transition-all duration-300 flex flex-col items-center justify-center text-white cursor-pointer relative overflow-hidden group/card ${stack.isCenter ? 'md:z-10 md:shadow-2xl' : ''}`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover/card:bg-white/10 transition-colors" />
                <stack.icon className={`w-16 h-16 mb-6 opacity-90 group-hover/card:scale-110 group-hover/card:opacity-100 transition-all duration-300 ${stack.isCenter ? 'md:w-20 md:h-20' : ''}`} strokeWidth={1.5} />
                <h3 className={`font-bold tracking-wide ${stack.isCenter ? 'md:text-2xl text-xl' : 'text-lg'}`}>
                  {stack.name}
                </h3>
                <div className="absolute bottom-6 md:opacity-0 md:translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
                  <span className="text-[13px] font-bold bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    Explore Projects
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
