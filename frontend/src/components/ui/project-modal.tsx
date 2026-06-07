"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 text-black rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto hide-scrollbar">
              {/* Header Image */}
              <div 
                className="w-full h-[250px] sm:h-[300px] relative"
                style={{ background: project.image }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest rounded-full">
                      {project.price}
                    </span>
                    <span className="text-white/80 text-[13px] font-medium">
                      ★ {project.rating}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-1">{project.title}</h2>
                  <p className="text-white/80 text-[14px]">{project.tech}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
                
                {/* Main Content */}
                <div className="flex-1">
                  <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-3">Project Overview</h3>
                  <p className="text-[14px] text-[rgba(10,10,10,0.6)] leading-relaxed mb-6">
                    This is a comprehensive {project.title} designed for final year students. It includes a complete setup guide, database schemas, and clean, documented source code. Built using modern best practices and fully responsive design.
                  </p>

                  <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-3">Key Features</h3>
                  <ul className="space-y-2 mb-6">
                    {["User Authentication & Authorization", "Real-time Dashboard Analytics", "Responsive Mobile-first Design", "Admin Control Panel"].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] text-[rgba(10,10,10,0.6)]">
                        <span className="text-green-500 mt-0.5">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-[280px] flex flex-col gap-6">
                  <div className="bg-[#f5f4ef] rounded-2xl p-5">
                    <h4 className="text-[14px] font-bold text-[#0a0a0a] mb-3">Files Included</h4>
                    <div className="space-y-2.5">
                      {["Source Code (Zip)", "Project Report (Docx)", "Presentation (PPT)", "Setup Guide (PDF)"].map((file) => (
                        <div key={file} className="flex items-center gap-2 text-[13px] text-[rgba(10,10,10,0.7)] font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#0a0a0a]" />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-full font-semibold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                      Buy Now — {project.price === "Free" ? "FREE" : "₹499"}
                    </button>
                    <Link 
                      href={`/projects/${project.id || 'ai-attendance-system'}`}
                      className="w-full bg-white text-[#0a0a0a] border border-[#0a0a0a]/10 py-3.5 rounded-full font-semibold text-[14px] hover:bg-[#0a0a0a]/5 transition-colors flex items-center justify-center"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
