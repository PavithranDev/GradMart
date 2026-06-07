"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    title: "AI Attendance System",
    category: "AI & ML",
    price: "Premium",
    image: "#1a3a2a", // Green dark
  },
  {
    id: 2,
    title: "Smart Library Management",
    category: "MERN Stack",
    price: "Free",
    image: "#6c3bff", // Purple
  },
  {
    id: 3,
    title: "Hospital Management",
    category: "Java Spring Boot",
    price: "Premium",
    image: "#0a0a0a", // Dark Black
  }
];

export function FeaturedProjects() {
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
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-lg h-[320px]"
          >
            {/* Image Background */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ background: project.image }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />
            
            {/* Text Overlay */}
            <div className="relative z-10 mt-auto p-6">
              <h3 className="text-white text-[15px] font-semibold mb-1.5">{project.title}</h3>
              <div className="flex items-center gap-1.5 text-[13px] text-white/70 font-medium">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{project.price}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="#all-projects"
          className="inline-block bg-[#0a0a0a] text-white px-8 py-2.5 rounded-full font-semibold text-[13px] hover:bg-neutral-800 transition-colors"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
