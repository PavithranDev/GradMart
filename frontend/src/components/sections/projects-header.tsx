"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProjectsHeader() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  return (
    <section className="flex flex-col items-center pt-32 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto z-10 w-full px-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a]/5 border border-black/10 mb-6">
          <span className="text-[12px] font-semibold text-[#0a0a0a] uppercase tracking-wider">Premium Collection</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-[#0a0a0a] mb-6">
          Find Your Next<br/>
          <span className="font-serif italic text-[#0a0a0a] font-normal">Final Year Project</span>
        </h1>

        <p className="text-[14px] md:text-[15px] text-[rgba(10,10,10,0.5)] mb-12 max-w-xl mx-auto leading-[1.6]">
          Browse verified college projects with Source Code, Report, PPT and Setup Guide. Filter by technology and find exactly what you need.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#0a0a0a]/40 group-focus-within:text-[#0a0a0a] transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full bg-white border border-[#0a0a0a]/10 rounded-full py-4 pl-14 pr-6 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:border-transparent transition-shadow shadow-sm text-[15px]"
            placeholder="Search AI, MERN, Java, Python..."
          />
          <div className="absolute inset-y-2 right-2">
             <button type="submit" className="bg-[#0a0a0a] text-white px-6 py-2 rounded-full font-semibold text-[13px] hover:bg-neutral-800 transition-colors h-full">
               Search
             </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
