"use client";

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
  MessageSquare
} from "lucide-react";

const TIMELINE_STEPS = [
  { id: 'submitted', label: 'Request Submitted', icon: FileText },
  { id: 'review', label: 'Under Review', icon: Search },
  { id: 'assigned', label: 'Team Assigned', icon: Users },
  { id: 'development', label: 'Development', icon: Code2 },
  { id: 'testing', label: 'Testing', icon: BugPlay },
  { id: 'ready', label: 'Ready', icon: CheckCircle2 },
  { id: 'delivered', label: 'Delivered', icon: PackageCheck },
];

export default function CustomProjectsPage() {
  
  // Mock Data: Assuming 'development' is the current active step
  const currentStepIndex = 3; 

  const progressPercentage = ((currentStepIndex + 1) / TIMELINE_STEPS.length) * 100;

  return (
    <div className="flex-1 lg:pl-10 pb-20 w-full mt-8 lg:mt-0">
      
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-2">Custom Projects</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Track the live development progress of your requested projects.</p>
      </div>

      <div className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
        
        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/5 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-[#0a0a0a]">IoT Smart Agriculture System</h2>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> In Development
              </span>
            </div>
            <p className="text-[14px] font-medium text-[rgba(10,10,10,0.5)]">Order ID: #CST-9284 • Requested on Oct 14, 2023</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-4 py-2.5 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm">
              <MessageSquare className="w-4 h-4" /> Message Team
            </button>
            <button disabled className="flex items-center gap-2 bg-black/5 text-[rgba(10,10,10,0.4)] px-4 py-2.5 rounded-xl font-bold text-[13px] cursor-not-allowed">
              <Download className="w-4 h-4" /> Download Files
            </button>
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="relative mb-16">
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
              const isPending = index > currentStepIndex;

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
                    <step.icon className={`w-5 h-5 ${isActive && 'animate-pulse'}`} />
                  </motion.div>

                  <div className="md:text-center pt-1 md:pt-0">
                    <p className={`text-[13px] font-bold ${
                      isCompleted || isActive ? 'text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.4)]'
                    }`}>
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-[11px] font-bold text-[#6c3bff] mt-1 uppercase tracking-wider">Current Phase</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Status Updates Log */}
        <div className="bg-[#f5f4ef]/50 rounded-2xl p-6 border border-black/5">
          <h3 className="text-[15px] font-bold text-[#0a0a0a] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Updates
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] w-24 pt-0.5">Today, 2:30 PM</div>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-[#0a0a0a]">Frontend Integration Started</p>
                <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)]">The React dashboard interface is currently being connected to the IoT sensor APIs.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] w-24 pt-0.5">Yesterday</div>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-[#0a0a0a]">Database Schema Approved</p>
                <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)]">Core MongoDB structures for reading temperature and humidity have been finalized.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] w-24 pt-0.5">Oct 15, 2023</div>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-[#0a0a0a]">Team Assigned</p>
                <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)]">Project has been handed over to Lead Developer Sarah M.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
