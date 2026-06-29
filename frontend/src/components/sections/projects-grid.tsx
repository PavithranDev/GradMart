"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ProjectModal } from "../ui/project-modal";
import { Loader2 } from "lucide-react";

const SAMPLE_PROJECTS = [
  { id: 1, title: "AI Attendance", tech: "React • Python", price: "Premium", image: "#e8430a", rating: "4.9" },
  { id: 2, title: "Campus ERP", tech: "Next.js • Node", price: "Premium", image: "#0a0a0a", rating: "4.8" },
  { id: 3, title: "MERN Food Delivery", tech: "MERN Stack", price: "Free", image: "#6c3bff", rating: "5.0" },
  { id: 4, title: "Hospital Management", tech: "Java Spring", price: "Premium", image: "#1a3a2a", rating: "4.7" },
  { id: 5, title: "Online Voting", tech: "Blockchain", price: "Premium", image: "#e91e8c", rating: "4.9" },
  { id: 6, title: "Library Management", tech: "PHP • MySQL", price: "Free", image: "#3b82f6", rating: "4.6" },
  { id: 7, title: "IoT Farming", tech: "Arduino • IoT", price: "Premium", image: "#ea580c", rating: "4.8" },
  { id: 8, title: "Face Recognition", tech: "Python • OpenCV", price: "Premium", image: "#8b5cf6", rating: "5.0" },
  { id: 9, title: "Transport Automation", tech: "Django • React", price: "Premium", image: "#3f6212", rating: "4.7" },
  { id: 10, title: "Student Tracker", tech: "Vue • Firebase", price: "Free", image: "#0a0a0a", rating: "4.9" },
  { id: 11, title: "Cloud Storage", tech: "AWS • React", price: "Premium", image: "#6c3bff", rating: "4.8" },
  { id: 12, title: "Portfolio Builder", tech: "Next.js", price: "Free", image: "#1a3a2a", rating: "5.0" },
];

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  return (
    <section className="px-4 md:px-12 mb-20 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-black/5 hover:-translate-y-1 cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image */}
            <div 
              className="h-[180px] w-full rounded-xl mb-4 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ background: project.imageColor || project.image || "#e5e5e5" }}
            >
               {project.thumbnail && (
                 <img 
                   src={project.thumbnail} 
                   alt={project.title} 
                   className="absolute inset-0 w-full h-full object-cover"
                 />
               )}
               {/* Badge */}
               <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest border border-white/10">
                 {project.price === 0 ? "Free" : "Premium"}
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
                <span>{project.category}</span>
                <span className="text-[#0a0a0a] font-bold">
                  {project.price === 0 ? "FREE" : `₹${project.price}`}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex items-center justify-center gap-2">
        <button className="px-4 py-2 rounded-full text-[13px] font-medium text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-colors">
          Previous
        </button>
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium transition-colors ${
              page === 1 ? "bg-[#0a0a0a] text-white" : "text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="px-4 py-2 rounded-full text-[13px] font-medium text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-colors">
          Next
        </button>
      </div>

      {/* Details Modal */}
      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
}
