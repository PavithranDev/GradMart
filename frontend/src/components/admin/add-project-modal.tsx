"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Plus } from "lucide-react";
import { useState } from "react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  // Simple state instead of complex form libraries for mock UI
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 bg-[#f5f4ef]/50">
              <h2 className="text-[20px] font-bold text-[#0a0a0a]">Add New Project</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-black/10 hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4 text-[#0a0a0a]" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <form id="add-project-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-[15px] font-bold text-[#0a0a0a] uppercase tracking-wider border-b pb-2">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Project Name</label>
                      <input type="text" required placeholder="e.g. AI Attendance System" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Category</label>
                      <select required className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                        <option>AI & Machine Learning</option>
                        <option>MERN Stack</option>
                        <option>Internet of Things</option>
                        <option>Mobile Apps</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Description</label>
                    <textarea rows={3} required placeholder="Detailed description of the project..." className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Technology Stack (Comma separated)</label>
                      <input type="text" required placeholder="React, Node.js, Python" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Price (₹)</label>
                      <input type="number" required placeholder="499" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                  </div>
                </div>

                {/* Uploads */}
                <div className="space-y-4">
                  <h3 className="text-[15px] font-bold text-[#0a0a0a] uppercase tracking-wider border-b pb-2">Assets & Files</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Upload Thumbnail Image", type: "image/*" },
                      { label: "Upload Source Code (ZIP)", type: ".zip" },
                      { label: "Upload Report (DOCX)", type: ".docx,.pdf" },
                      { label: "Upload Presentation (PPT)", type: ".ppt,.pptx" },
                    ].map((upload, i) => (
                      <div key={i} className="border-2 border-dashed border-black/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-[#6c3bff] hover:bg-[#6c3bff]/5 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#6c3bff]/10 group-hover:text-[#6c3bff] transition-colors">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <span className="text-[13px] font-bold text-[#0a0a0a] mb-1">{upload.label}</span>
                        <span className="text-[11px] text-[rgba(10,10,10,0.5)] font-medium">Click or drag & drop</span>
                        <input type="file" accept={upload.type} className="hidden" />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">YouTube Demo URL (Optional)</label>
                    <input type="url" placeholder="https://youtube.com/watch?v=..." className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-black/5 flex justify-end gap-3 bg-[#f5f4ef]/50">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-[14px] font-bold text-[#0a0a0a] border border-black/10 hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="add-project-form"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-[#0a0a0a] hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : <><Plus className="w-4 h-4" /> Save Project</>}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
