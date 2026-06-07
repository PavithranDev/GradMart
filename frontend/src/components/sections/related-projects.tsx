"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const RELATED = [
  { id: "gps-attendance", title: "GPS Attendance", tech: "Flutter • Node", price: "Premium", image: "#6c3bff", rating: "4.8" },
  { id: "library-management", title: "Library Management", tech: "PHP • MySQL", price: "Free", image: "#1a3a2a", rating: "4.6" },
  { id: "campus-erp", title: "Campus ERP", tech: "Next.js • Node", price: "Premium", image: "#e8430a", rating: "4.9" },
];

export function RelatedProjects() {
  return (
    <section className="mt-20 pt-16 border-t border-black/5 w-full">
      <h3 className="text-2xl font-bold text-[#0a0a0a] mb-8 text-center sm:text-left">Related Projects</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {RELATED.map((project, index) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
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
                style={{ background: project.image }}
              >
                 <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest border border-white/10">
                   {project.price}
                 </div>
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="text-[#0a0a0a] text-[15px] font-bold">{project.title}</h3>
                  <div className="flex items-center gap-1 text-[13px] font-semibold text-[#0a0a0a]">
                    ★ {project.rating}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[13px] text-[rgba(10,10,10,0.6)] font-medium">
                  <span>{project.tech}</span>
                  <span className="text-[#0a0a0a] font-bold">
                    {project.price === "Free" ? "FREE" : "₹499"}
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
