"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Upload, 
  CheckCircle2,
  Users
} from "lucide-react";

const JOBS = [
  {
    id: "frontend",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    description: "We are looking for a React/Next.js expert to build beautiful, highly-interactive student experiences."
  },
  {
    id: "backend",
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    description: "Build robust Node.js APIs and scalable database architectures to support thousands of students."
  },
  {
    id: "ui-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    description: "Help us craft premium, aesthetic, and converting SaaS interfaces for the GradMart platform."
  },
  {
    id: "campus",
    title: "Campus Ambassador",
    department: "Marketing",
    location: "On-Campus",
    type: "Part-time",
    description: "Represent GradMart at your college. Drive student signups and organize technical workshops."
  }
];

export function CareersContent() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplied(true);
      setTimeout(() => {
        setIsApplied(false);
        setSelectedJob(null);
      }, 4000);
    }, 2000);
  };

  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full">
      
      {/* Hero Section */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider mb-8"
        >
          <Users className="w-4 h-4" /> Join The Team
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tight mb-6"
        >
          Build The Future Of <br className="hidden md:block" />
          <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">Student Learning</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-[rgba(10,10,10,0.6)] font-medium max-w-2xl mx-auto"
        >
          We're on a mission to make high-quality engineering projects accessible to everyone. Join our fully remote team.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Job Listings */}
        <div className="flex-1 w-full space-y-4">
          <h2 className="text-2xl font-bold text-[#0a0a0a] mb-6">Open Positions</h2>
          
          {JOBS.map((job) => {
            const isSelected = selectedJob === job.id;
            return (
              <motion.div 
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className={`bg-white rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected ? 'border-[#0a0a0a] shadow-md' : 'border-black/5 hover:border-black/10 hover:shadow-sm'
                }`}
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-[rgba(10,10,10,0.5)]">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                    isSelected ? 'bg-[#0a0a0a] text-white' : 'bg-black/5 text-[#0a0a0a]'
                  }`}>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium leading-relaxed border-t border-black/5 pt-6">
                          {job.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Apply Form */}
        <div className="flex-1 w-full lg:max-w-md xl:max-w-lg">
          <div className="bg-[#f5f4ef] border border-black/5 rounded-[40px] p-8 md:p-10 sticky top-32">
            
            {!selectedJob ? (
              <div className="text-center py-20">
                <Briefcase className="w-12 h-12 text-[rgba(10,10,10,0.2)] mx-auto mb-4" />
                <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-2">Select a Position</h3>
                <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Click on a role from the list to start your application process.</p>
              </div>
            ) : !isApplied ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-8 border-b border-black/5 pb-6">
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-1">Apply for</h3>
                  <p className="text-[#6c3bff] font-bold">{JOBS.find(j => j.id === selectedJob)?.title}</p>
                </div>
                
                <form onSubmit={handleApply} className="space-y-6">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Portfolio / GitHub Link</label>
                    <input required type="url" placeholder="https://github.com/johndoe" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                  </div>
                  
                  {/* Resume Upload */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Resume / CV</label>
                    <div className="w-full bg-white border-2 border-dashed border-black/10 rounded-xl p-6 flex flex-col items-center justify-center hover:border-black/30 transition-all cursor-pointer">
                      <Upload className="w-6 h-6 text-[rgba(10,10,10,0.4)] mb-2" />
                      <p className="text-[13px] font-bold text-[#0a0a0a]">Upload PDF</p>
                      <p className="text-[11px] font-medium text-[rgba(10,10,10,0.5)] mt-1">Max 5MB</p>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#0a0a0a] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center"
                  >
                    {isSubmitting ? "Sending Application..." : "Submit Application"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">Application Sent!</h2>
                <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium">
                  Thanks for applying to GradMart. Our hiring team will review your profile and reach out soon.
                </p>
              </motion.div>
            )}
            
          </div>
        </div>

      </div>

    </section>
  );
}
