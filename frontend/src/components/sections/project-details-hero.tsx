"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectDetailsHeroProps {
  project: any;
}

export function ProjectDetailsHero({ project }: ProjectDetailsHeroProps) {
  return (
    <div className="flex flex-col mb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-[rgba(10,10,10,0.5)] font-medium mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-[#0a0a0a] transition-colors">Projects</Link>
        <span>/</span>
        <Link href={`/projects?category=${project.category}`} className="hover:text-[#0a0a0a] transition-colors">{project.category}</Link>
        <span>/</span>
        <span className="text-[#0a0a0a]">{project.title}</span>
      </nav>

      {/* Main Image Gallery */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col gap-4"
      >
        {/* Large Main Image */}
        <div 
          className="w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/10] rounded-[24px] relative overflow-hidden"
          style={{ background: project.image }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Small Thumbnail Slider */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((thumb) => (
            <div 
              key={thumb}
              className="w-full aspect-video rounded-xl bg-black/5 overflow-hidden border border-black/5 hover:border-black/20 transition-colors cursor-pointer"
            >
               {/* Thumbnail Placeholder */}
               <div className="w-full h-full opacity-50 bg-[#0a0a0a]" style={{ background: project.image }} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
