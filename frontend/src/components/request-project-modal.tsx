"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { toast } from "sonner";

interface RequestProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RequestProjectModal({ isOpen, onClose, onSuccess }: RequestProjectModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:4000/api/custom-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to submit request");

      toast.success("Project requested successfully!");
      setFormData({ title: "", description: "", budget: "", deadline: "" });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
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
            className="absolute inset-0 bg-[#0a0a0a]/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-black/5 flex items-center justify-between bg-[#f5f4ef]/50">
              <h2 className="text-[20px] font-bold text-[#0a0a0a]">Request Custom Project</h2>
              <button 
                onClick={onClose} 
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-black/10 hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4 text-[#0a0a0a]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Project Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. AI Based Medical Diagnostics System" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" 
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Detailed Description *</label>
                <textarea 
                  rows={5} 
                  required 
                  placeholder="Describe the features, technologies, and exact requirements for this project..." 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Expected Budget (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5000" 
                    value={formData.budget} 
                    onChange={e => setFormData({...formData, budget: e.target.value})} 
                    className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Deadline</label>
                  <input 
                    type="date" 
                    value={formData.deadline} 
                    onChange={e => setFormData({...formData, deadline: e.target.value})} 
                    className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl text-[14px] font-bold text-[rgba(10,10,10,0.6)] hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#0a0a0a] text-white px-8 py-3 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Check className="w-4 h-4" /> Submit Request</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
