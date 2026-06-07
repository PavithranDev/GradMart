"use client";

import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Code2, 
  Coffee, 
  TerminalSquare, 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  Link as LinkIcon, 
  Smartphone, 
  Zap, 
  GraduationCap 
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "AI & Machine Learning", count: 124, icon: BrainCircuit, color: "from-purple-500/20 to-indigo-500/20", iconColor: "text-purple-600" },
  { name: "MERN Stack", count: 86, icon: Code2, color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-600" },
  { name: "Java", count: 142, icon: Coffee, color: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-600" },
  { name: "Python", count: 215, icon: TerminalSquare, color: "from-yellow-500/20 to-amber-500/20", iconColor: "text-yellow-600" },
  { name: "Cloud Computing", count: 54, icon: Cloud, color: "from-sky-500/20 to-blue-500/20", iconColor: "text-sky-600" },
  { name: "IoT", count: 78, icon: Cpu, color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-600" },
  { name: "Cyber Security", count: 42, icon: ShieldCheck, color: "from-rose-500/20 to-red-500/20", iconColor: "text-rose-600" },
  { name: "Blockchain", count: 35, icon: LinkIcon, color: "from-slate-500/20 to-gray-500/20", iconColor: "text-slate-600" },
  { name: "Mobile Apps", count: 96, icon: Smartphone, color: "from-pink-500/20 to-rose-500/20", iconColor: "text-pink-600" },
  { name: "Mini Projects", count: 320, icon: Zap, color: "from-yellow-400/20 to-orange-400/20", iconColor: "text-yellow-500" },
  { name: "Final Year Projects", count: 450, icon: GraduationCap, color: "from-indigo-500/20 to-purple-500/20", iconColor: "text-indigo-600" },
];

export function CategoriesHero() {
  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-[13px] font-bold text-[#0a0a0a] uppercase tracking-wider mb-6"
        >
          <span>Curated Collections</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tight mb-6"
        >
          Explore By <span className="font-serif italic font-normal">Category</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-[rgba(10,10,10,0.6)] max-w-2xl font-medium"
        >
          Find exactly what you need. Browse thousands of premium templates, source codes, and reports across every major technology.
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (idx * 0.05) }}
          >
            <Link href={`/projects?category=${encodeURIComponent(category.name)}`} className="block">
              <div className="group bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                
                {/* Gradient Background Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-black/5 group-hover:bg-white transition-colors duration-300 shadow-sm`}>
                    <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>
                  
                  <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-2">{category.name}</h3>
                  
                  <div className="flex items-center justify-between mt-8">
                    <span className="text-[13px] font-bold text-[rgba(10,10,10,0.5)]">
                      {category.count} Projects
                    </span>
                    <span className="text-[13px] font-bold text-[#0a0a0a] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                      Explore <span className="text-lg leading-none">→</span>
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
