"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectDetailsHeroProps {
  project: any;
}

export function ProjectDetailsHero({ project }: ProjectDetailsHeroProps) {
  const allImages: string[] = [
    ...(project.thumbnail ? [project.thumbnail] : []),
    ...(Array.isArray(project.gallery) ? project.gallery : []),
  ];

  const [activeImg, setActiveImg] = useState(0);

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
          style={{ background: project.imageColor || project.image || "#e5e5e5" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
          {allImages[activeImg] && (
            <img
              src={allImages[activeImg]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Thumbnail strip — only show if there are images */}
        {allImages.length > 0 && (
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {allImages.slice(0, 4).map((url, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-full aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                  activeImg === i
                    ? "border-[#0a0a0a] shadow-md scale-[1.02]"
                    : "border-transparent hover:border-black/20"
                }`}
              >
                <img
                  src={url}
                  alt={`${project.title} preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {/* Fill remaining slots with color placeholders */}
            {Array.from({ length: Math.max(0, 4 - allImages.length) }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="w-full aspect-video rounded-xl bg-black/5 border border-black/5"
                style={{ background: project.imageColor || "#e5e5e5" }}
              />
            ))}
          </div>
        )}

        {/* Fallback: no images uploaded yet — show 4 colored placeholder slots */}
        {allImages.length === 0 && (
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full aspect-video rounded-xl bg-black/5 border border-black/5"
                style={{ background: project.imageColor || "#e5e5e5" }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
