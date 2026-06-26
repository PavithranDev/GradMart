"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function RelatedProjects({ currentProjectId, category }: { currentProjectId?: string, category?: string }) {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          let related = data.filter(p => p.id !== currentProjectId);
          if (category) {
            const sameCategory = related.filter(p => p.category === category);
            if (sameCategory.length > 0) {
              related = [...sameCategory, ...related.filter(p => p.category !== category)];
            }
          }
          setProjects(related.slice(0, 3));
        }
      })
      .catch(err => console.error("Error fetching related projects:", err));
  }, [currentProjectId, category]);

  if (projects.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-black/5 w-full">
      <h3 className="text-2xl font-bold text-[#0a0a0a] mb-8 text-center sm:text-left">Related Projects</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const techString = Array.isArray(project.tags) && project.tags.length > 0 
            ? project.tags.slice(0, 2).join(' • ') 
            : 'Premium Code';
            
          return (
            <Link href={`/projects/${project.slug || project.id}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-black/5 hover:-translate-y-1 cursor-pointer"
              >
                {/* Image Placeholder */}
                <div 
                  className="h-[180px] w-full rounded-xl mb-4 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ background: project.imageColor || "#6c3bff" }}
                >
                   <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest border border-white/10">
                     {project.price === 0 ? "FREE" : "PREMIUM"}
                   </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-[#0a0a0a] text-[15px] font-bold line-clamp-1 pr-2">{project.title}</h3>
                    <div className="flex items-center gap-1 text-[13px] font-semibold text-[#0a0a0a] flex-shrink-0">
                      ★ {project.rating || "4.8"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[13px] text-[rgba(10,10,10,0.6)] font-medium">
                    <span className="line-clamp-1">{techString}</span>
                    <span className="text-[#0a0a0a] font-bold flex-shrink-0">
                      {project.price === 0 ? "FREE" : `₹${project.price}`}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
