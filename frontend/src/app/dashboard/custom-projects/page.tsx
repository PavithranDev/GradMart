"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Users, 
  Code2, 
  BugPlay, 
  CheckCircle2, 
  PackageCheck,
  Download,
  MessageSquare,
  Plus,
  AlertCircle
} from "lucide-react";
import { RequestProjectModal } from "@/components/request-project-modal";
import { toast } from "sonner";

const TIMELINE_STEPS = [
  { id: 'SUBMITTED', label: 'Request Submitted', icon: FileText },
  { id: 'REVIEW', label: 'Under Review', icon: Search },
  { id: 'QUOTED', label: 'Quoted', icon: AlertCircle },
  { id: 'ASSIGNED', label: 'Team Assigned', icon: Users },
  { id: 'DEVELOPMENT', label: 'Development', icon: Code2 },
  { id: 'TESTING', label: 'Testing', icon: BugPlay },
  { id: 'READY', label: 'Ready', icon: CheckCircle2 },
  { id: 'DELIVERED', label: 'Delivered', icon: PackageCheck },
];

export default function CustomProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccepting, setIsAccepting] = useState<string | null>(null);

  const fetchProjects = () => {
    fetch("http://localhost:4000/api/custom-projects", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const acceptQuote = async (projectId: string) => {
    setIsAccepting(projectId);
    try {
      const res = await fetch(`http://localhost:4000/api/custom-projects/${projectId}/accept-quote`, {
        method: 'PUT',
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.error) {
        toast.success("Quote accepted successfully!");
        setProjects(projects.map(p => p.id === projectId ? data : p));
      } else {
        toast.error(data.error || "Failed to accept quote");
      }
    } catch (err) {
      toast.error("Failed to accept quote");
    } finally {
      setIsAccepting(null);
    }
  };

  const getStepIndex = (status: string) => {
    return TIMELINE_STEPS.findIndex(step => step.id === status);
  };

  return (
    <div className="flex-1 lg:pl-10 pb-20 w-full mt-8 lg:mt-0">
      
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-2">Custom Projects</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Track the live development progress of your requested projects.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-6 py-3 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors shadow-lg whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Request Custom Project
        </button>
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-[32px] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-6">
            <Code2 className="w-8 h-8 text-black/40" />
          </div>
          <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">No Custom Projects Yet</h2>
          <p className="text-[15px] font-medium text-[rgba(10,10,10,0.6)] max-w-md mb-8">
            Need a specific project built from scratch? Request a custom project and our team will build it for you.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-8 py-3 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" /> Start a Request
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {projects.map(project => {
            const currentStepIndex = getStepIndex(project.status) === -1 ? 0 : getStepIndex(project.status);
            const progressPercentage = ((currentStepIndex + 1) / TIMELINE_STEPS.length) * 100;

            return (
              <div key={project.id} className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/5 mb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-[#0a0a0a]">{project.title}</h2>
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> {project.status}
                      </span>
                    </div>
                    <p className="text-[14px] font-medium text-[rgba(10,10,10,0.5)]">
                      Order ID: #{project.id.slice(-8).toUpperCase()} • Requested on {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-4 py-2.5 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm">
                      <MessageSquare className="w-4 h-4" /> Message Team
                    </button>
                    <button disabled={project.status !== 'DELIVERED'} className="flex items-center gap-2 bg-black/5 text-[rgba(10,10,10,0.4)] px-4 py-2.5 rounded-xl font-bold text-[13px] disabled:cursor-not-allowed">
                      <Download className="w-4 h-4" /> Download Files
                    </button>
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="relative mb-8">
                  {/* Progress Bar Background */}
                  <div className="absolute top-6 left-6 right-6 h-1.5 bg-black/5 rounded-full z-0 hidden md:block" />
                  
                  {/* Active Progress Bar */}
                  <div 
                    className="absolute top-6 left-6 h-1.5 bg-[#6c3bff] rounded-full z-0 hidden md:block transition-all duration-1000"
                    style={{ width: `calc(${progressPercentage}% - 48px)` }}
                  />

                  <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                    {TIMELINE_STEPS.map((step, index) => {
                      const isCompleted = index < currentStepIndex;
                      const isActive = index === currentStepIndex;

                      return (
                        <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-3 flex-1 relative group">
                          {/* Vertical line for mobile */}
                          {index !== TIMELINE_STEPS.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-[-2rem] w-0.5 bg-black/5 md:hidden z-0" />
                          )}
                          {index !== TIMELINE_STEPS.length - 1 && isCompleted && (
                            <div className="absolute left-6 top-12 bottom-[-2rem] w-0.5 bg-[#6c3bff] md:hidden z-0" />
                          )}

                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm relative z-10 transition-colors duration-300 ${
                              isCompleted ? 'bg-[#6c3bff] text-white' : 
                              isActive ? 'bg-white border-2 border-[#6c3bff] text-[#6c3bff] shadow-[0_0_15px_rgba(108,59,255,0.3)]' : 
                              'bg-[#f5f4ef] text-[rgba(10,10,10,0.3)]'
                            }`}
                          >
                            <step.icon className={`w-5 h-5 ${isCompleted ? 'text-white' : isActive ? 'text-[#6c3bff]' : 'text-black/40'}`} />
                          </motion.div>

                          <div className="text-left md:text-center">
                            <div className={`text-[12px] font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                              isActive ? 'text-[#0a0a0a]' : isCompleted ? 'text-[#0a0a0a]' : 'text-black/40'
                            }`}>
                              {step.label}
                            </div>
                            {isActive && (
                              <div className="text-[10px] font-bold text-[#6c3bff] uppercase tracking-wider">Current Phase</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {project.status === 'QUOTED' && project.quotedBudget && (
                  <div className="mb-8 bg-[#6c3bff]/5 border border-[#6c3bff]/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-[#6c3bff] flex-shrink-0" />
                      <div>
                        <h3 className="text-[15px] font-bold text-[#0a0a0a] mb-1">Quote Received: ₹{project.quotedBudget}</h3>
                        <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)]">
                          Our team has reviewed your request. To proceed with development, please accept the quote.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => acceptQuote(project.id)}
                      disabled={isAccepting === project.id}
                      className="bg-[#6c3bff] text-white px-6 py-2.5 rounded-xl font-bold text-[13px] hover:bg-[#5b32d9] transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isAccepting === project.id ? 'Accepting...' : 'Accept Quote'}
                    </button>
                  </div>
                )}
                
                <div className="bg-[#f5f4ef]/50 rounded-2xl p-6">
                  <div className="text-[13px] font-bold text-[#0a0a0a] mb-2">Description / Requirements</div>
                  <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium leading-relaxed">
                    {project.description}
                  </p>
                  
                  {(project.budget || project.deadline) && (
                    <div className="mt-4 pt-4 border-t border-black/5 flex gap-6">
                      {project.budget && (
                        <div>
                          <span className="text-[12px] font-bold text-black/50 block uppercase tracking-wider mb-1">Budget</span>
                          <span className="text-[14px] font-bold text-[#0a0a0a]">₹{project.budget}</span>
                        </div>
                      )}
                      {project.deadline && (
                        <div>
                          <span className="text-[12px] font-bold text-black/50 block uppercase tracking-wider mb-1">Deadline</span>
                          <span className="text-[14px] font-bold text-[#0a0a0a]">{project.deadline}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <RequestProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchProjects}
      />
    </div>
  );
}
