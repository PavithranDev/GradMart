"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Clock, Code, DollarSign, Send, FileText, FileUp, Loader2 } from "lucide-react";

export function RequestFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Track status (Mock)
  // 'pending' | 'review' | 'progress' | 'completed'
  const currentStatus = "pending";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const steps = [
    { title: "Submit Request", icon: FileUp, status: "completed" },
    { title: "Team Reviews", icon: Clock, status: "pending" },
    { title: "Quote Provided", icon: DollarSign, status: "pending" },
    { title: "Project Delivered", icon: CheckCircle2, status: "pending" },
  ];

  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full">
      
      {/* Hero & Process */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-[#0a0a0a] tracking-tight mb-4"
        >
          Need a <br className="hidden md:block" />
          <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">Custom Project?</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[rgba(10,10,10,0.6)] font-medium max-w-2xl mx-auto"
        >
          Fill out the form below with your exact requirements, and our verified creators will build it for you.
        </motion.p>
      </div>

      <div className="flex flex-col xl:flex-row gap-12">
        
        {/* Left Side: Form */}
        <div className="flex-[2] w-full bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Info */}
              <div>
                <h3 className="text-[15px] font-bold text-[#0a0a0a] mb-4 border-b border-black/5 pb-2">Student Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Student Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">College Name</label>
                    <input required type="text" placeholder="MIT Institute" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Department</label>
                    <input required type="text" placeholder="Computer Science Engineering" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <h3 className="text-[15px] font-bold text-[#0a0a0a] mb-4 border-b border-black/5 pb-2">Project Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Project Title</label>
                    <input required type="text" placeholder="e.g. AI Based Smart Attendance System" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Preferred Technology</label>
                    <select required className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                      <option value="">Select Technology</option>
                      <option value="mern">MERN Stack</option>
                      <option value="python">Python / ML</option>
                      <option value="java">Java Spring</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Estimated Budget (₹)</label>
                    <input required type="number" placeholder="e.g. 5000" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Detailed Description</label>
                    <textarea required rows={5} placeholder="Describe the core features, modules, and exact requirements..." className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Deadline</label>
                    <input required type="date" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  
                  {/* File Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Upload Reference File (Optional)</label>
                    <div className="w-full border-2 border-dashed border-black/10 rounded-xl p-8 flex flex-col items-center justify-center hover:border-black/30 hover:bg-black/5 transition-all cursor-pointer">
                      <Upload className="w-8 h-8 text-[rgba(10,10,10,0.4)] mb-2" />
                      <p className="text-[14px] font-bold text-[#0a0a0a]">Click to upload document or PDF</p>
                      <p className="text-[12px] font-medium text-[rgba(10,10,10,0.5)] mt-1">Max file size: 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#0a0a0a] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Request</>}
              </button>

            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-[#0a0a0a] mb-4">Request Submitted!</h2>
              <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium max-w-md mx-auto">
                Your custom project request has been sent to our team. We will review the requirements and provide a quote within 24 hours.
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Side: Process & Status Tracker */}
        <div className="flex-1 space-y-8">
          
          {/* How It Works */}
          <div className="bg-[#f5f4ef] border border-black/5 rounded-3xl p-8">
            <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-6">The Process</h3>
            <div className="space-y-6 relative">
              <div className="absolute top-4 left-[15px] bottom-4 w-0.5 bg-black/10" />
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#f5f4ef] ${step.status === 'completed' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-[rgba(10,10,10,0.4)] border-black/20'}`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div className="pt-1.5">
                    <p className={`text-[14px] font-bold ${step.status === 'completed' ? 'text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.6)]'}`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Status Tracker (Mocking if submitted) */}
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a0a0a] rounded-3xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-[16px] font-bold mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-400" /> Track Request #GRD-4829
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/10">
                  <span className="text-[14px] font-bold text-white/70">Current Status</span>
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /> Pending Review
                  </span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-[13px] font-medium text-white/50">Requested On</span>
                  <span className="text-[13px] font-bold text-white">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </div>

    </section>
  );
}
