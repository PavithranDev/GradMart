"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FILTERS = [
  "All",
  "AI & ML",
  "MERN",
  "Java",
  "Python",
  "Cloud",
  "IoT",
  "Cyber Security",
  "Mobile Apps",
  "Blockchain",
  "Mini Projects",
  "Final Year Projects"
];

export function ProjectsFilter() {
  const [active, setActive] = useState("All");

  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex items-center gap-2 px-4 md:px-12 w-max mx-auto">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={cn(
              "px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 whitespace-nowrap",
              active === filter
                ? "bg-[#0a0a0a] text-white shadow-md"
                : "bg-white text-[#0a0a0a] border border-[#0a0a0a]/10 hover:bg-[#0a0a0a]/5 hover:border-[#0a0a0a]/20 text-[rgba(10,10,10,0.6)]"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
