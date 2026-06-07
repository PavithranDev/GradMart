"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Plus, FileImage, FileArchive, FileText, MonitorPlay } from "lucide-react";
import { useState } from "react";

interface UploadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadProjectModal({ isOpen, onClose }: UploadProjectModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-black/5 bg-[#f5f4ef]/30">
              <div>
                <h2 className="text-[22px] font-bold text-[#0a0a0a] tracking-tight">Upload New Project</h2>
                <p className="text-[13px] text-[rgba(10,10,10,0.5)] font-medium mt-1">Add details and upload all necessary files for your listing.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-black/10 hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5 text-[#0a0a0a]" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <form id="upload-project-form" onSubmit={handleSubmit} className="space-y-10">
                
                {/* Details Section */}
                <div className="space-y-6">
                  <h3 className="text-[14px] font-bold text-[#0a0a0a] uppercase tracking-wider border-b border-black/5 pb-2">1. Project Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Project Title</label>
                      <input type="text" required placeholder="e.g. Next.js SaaS Template" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Category</label>
                      <select required className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-shadow">
                        <option>Web Development</option>
                        <option>AI & Machine Learning</option>
                        <option>Internet of Things</option>
                        <option>Mobile Apps</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Pricing (₹)</label>
                    <input type="number" required placeholder="e.g. 499 (0 for free)" className="w-full md:w-1/2 bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-shadow" />
                  </div>
                </div>

                {/* Uploads Section */}
                <div className="space-y-6">
                  <h3 className="text-[14px] font-bold text-[#0a0a0a] uppercase tracking-wider border-b border-black/5 pb-2">2. Upload Assets</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: "Thumbnail Image", icon: FileImage, type: "image/*" },
                      { label: "Source Code", icon: FileArchive, type: ".zip" },
                      { label: "Project Report", icon: FileText, type: ".pdf,.docx" },
                      { label: "Presentation", icon: MonitorPlay, type: ".pptx" },
                      { label: "Setup Guide", icon: FileText, type: ".pdf" },
                      { label: "Demo Images", icon: FileImage, type: "image/*", multiple: true },
                    ].map((upload, i) => (
                      <div key={i} className="border border-dashed border-black/20 bg-[#f5f4ef]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-[#0a0a0a] hover:bg-black/5 transition-colors cursor-pointer group">
                        <upload.icon className="w-6 h-6 text-[#0a0a0a]/40 group-hover:text-[#0a0a0a] transition-colors mb-3" />
                        <span className="text-[13px] font-bold text-[#0a0a0a] mb-1">{upload.label}</span>
                        <input type="file" multiple={upload.multiple} accept={upload.type} className="hidden" />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">YouTube Demo URL (Highly Recommended)</label>
                    <input type="url" placeholder="https://youtube.com/watch?v=..." className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-shadow" />
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 sm:p-8 border-t border-black/5 flex justify-end gap-3 bg-white">
              <button 
                type="button" 
                onClick={onClose}
                className="px-8 py-3.5 rounded-full text-[14px] font-bold text-[#0a0a0a] hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="upload-project-form"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-full text-[14px] font-bold text-white bg-[#0a0a0a] hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? "Publishing..." : <><UploadCloud className="w-4 h-4" /> Publish Project</>}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
