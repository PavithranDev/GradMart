"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/projects")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data.slice(0, 3)); // Get top 3 projects
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch featured projects", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="projects" className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="flex flex-col items-center">
      <div className="w-full mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[#0a0a0a]">
          Explore Our <br/>
          <span className="font-sans font-medium">Featured </span>
          <span className="font-serif italic font-normal">Projects</span>
        </h2>
        <p className="text-[rgba(10,10,10,0.5)] text-[14px] md:text-[15px] max-w-xl mx-auto leading-[1.6]">
          Discover our hand-picked selection of stunning project templates designed to elevate your brand. Each template is crafted for performance and style, paving the way to customize and launch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {projects.map((project, index) => (
          <Link key={project.id} href={`/projects/${project.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-lg h-[320px] cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                style={{ background: project.imageColor || "#0a0a0a" }}
              >
                {project.thumbnail && (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover mix-blend-overlay opacity-80" 
                  />
                )}
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />
              
              {/* Text Overlay */}
              <div className="relative z-10 mt-auto p-6">
                <h3 className="text-white text-[15px] font-semibold mb-1.5">{project.title}</h3>
                <div className="flex items-center gap-1.5 text-[13px] text-white/70 font-medium">
                  <span>{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className={project.price === 0 ? "text-green-400 font-bold" : "text-white"}>
                    {project.price === 0 ? "FREE" : `₹${project.price}`}
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/projects"
          className="inline-block bg-[#0a0a0a] text-white px-8 py-2.5 rounded-full font-semibold text-[13px] hover:bg-neutral-800 transition-colors shadow-md"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
