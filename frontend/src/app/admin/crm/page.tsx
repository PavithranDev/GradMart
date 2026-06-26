"use client";

import { useState } from "react";
import { 
  Search, Briefcase, ChevronRight, User, GraduationCap, Building2, 
  Calendar, DollarSign, Laptop, Clock, Paperclip, ChevronDown, 
  Plus, MoreHorizontal, CheckCircle2, MessageSquare, Send
} from "lucide-react";

// Mock Data
const PIPELINE_STAGES = [
  "Lead", "Req Review", "Quoted", "Approved", "Dev", "Testing", "Delivered", "Closed"
];

const LEADS = [
  { id: "PRJ-001", name: "AI Attendance System", student: "Rahul Sharma", tech: "Python, OpenCV", status: "Dev", priority: "High", budget: "₹15,000", date: "Oct 24" },
  { id: "PRJ-002", name: "Hospital ERP Module", student: "Priya Patel", tech: "MERN Stack", status: "Quoted", priority: "Medium", budget: "₹25,000", date: "Oct 25" },
  { id: "PRJ-003", name: "Blockchain Voting App", student: "Arun Kumar", tech: "Solidity, React", status: "Lead", priority: "High", budget: "Pending", date: "Oct 26" },
  { id: "PRJ-004", name: "IoT Weather Station", student: "Sneha Reddy", tech: "Arduino, IoT", status: "Testing", priority: "Low", budget: "₹12,000", date: "Oct 20" },
];

const KANBAN_BOARD = {
  todo: [
    { id: 1, title: "Setup Database Schema", tag: "Backend" },
    { id: 2, title: "Design Login UI", tag: "Design" }
  ],
  inProgress: [
    { id: 3, title: "Face Recognition Model", tag: "AI/ML" },
    { id: 4, title: "API Integration", tag: "Backend" }
  ],
  review: [
    { id: 5, title: "Admin Dashboard", tag: "Frontend" }
  ],
  done: [
    { id: 6, title: "Project Setup & Repo", tag: "DevOps" }
  ]
};

export default function CustomProjectsCRM() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeProject, setActiveProject] = useState(LEADS[0]);

  return (
    <div className="flex-1 w-full h-[calc(100vh-80px)] lg:h-screen overflow-hidden flex bg-[#fcfcfc]">
      
      {/* Left Sidebar: Leads List */}
      <div className="w-[320px] lg:w-[380px] border-r border-black/5 flex flex-col bg-white flex-shrink-0">
        
        <div className="p-6 border-b border-black/5 flex-shrink-0">
          <h1 className="text-[24px] font-bold text-[#0a0a0a] tracking-tight mb-4">CRM Leads</h1>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(10,10,10,0.4)]" />
            <input 
              type="text"
              placeholder="Search projects or students..."
              className="w-full bg-[#fcfcfc] border border-black/5 rounded-full py-2.5 pl-11 pr-4 text-[13px] font-medium focus:outline-none focus:border-[#0a0a0a]/20 focus:ring-1 focus:ring-[#0a0a0a]/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {LEADS.map(lead => (
            <div 
              key={lead.id}
              onClick={() => setActiveProject(lead)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                activeProject.id === lead.id 
                  ? "bg-[#0a0a0a]/5 border-black/10 shadow-sm" 
                  : "bg-white border-black/5 hover:bg-black/[0.02]"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[11px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">{lead.id}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  lead.status === 'Lead' ? 'bg-amber-100 text-amber-700' :
                  lead.status === 'Dev' ? 'bg-blue-100 text-blue-700' :
                  lead.status === 'Testing' ? 'bg-purple-100 text-purple-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {lead.status}
                </span>
              </div>
              <h3 className="text-[14px] font-bold text-[#0a0a0a] line-clamp-1 mb-1">{lead.name}</h3>
              <p className="text-[12px] font-medium text-[rgba(10,10,10,0.6)] mb-3">{lead.student}</p>
              
              <div className="flex items-center justify-between text-[11px] font-bold text-[rgba(10,10,10,0.4)]">
                <span className="flex items-center gap-1"><Laptop className="w-3 h-3" /> {lead.tech}</span>
                <span>{lead.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Main Area: Active Project Details */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Project Header */}
        <div className="bg-white border-b border-black/5 flex-shrink-0 p-6 lg:p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#0a0a0a] text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {activeProject.id}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border ${
                  activeProject.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                  activeProject.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-green-50 text-green-600 border-green-100'
                }`}>
                  {activeProject.priority} Priority
                </span>
              </div>
              <h2 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight">{activeProject.name}</h2>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-white border border-black/10 text-[#0a0a0a] px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm">
                Edit Details
              </button>
              <button className="bg-[#0a0a0a] text-white px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* Pipeline Stepper */}
          <div className="w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-black/5 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full transition-all duration-500" 
              style={{ width: `${(PIPELINE_STAGES.indexOf(activeProject.status) / (PIPELINE_STAGES.length - 1)) * 100}%` }} 
            />
            
            <div className="relative flex justify-between">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isActive = stage === activeProject.status;
                const isCompleted = PIPELINE_STAGES.indexOf(activeProject.status) >= idx;
                return (
                  <div key={stage} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors bg-white ${
                      isActive ? "border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]" : 
                      isCompleted ? "border-green-500" : "border-black/10"
                    }`}>
                      {isCompleted && !isActive && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                      {isActive && <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />}
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider absolute top-8 whitespace-nowrap transition-colors ${
                      isActive ? "text-[#0a0a0a]" : 
                      isCompleted ? "text-[rgba(10,10,10,0.6)]" : "text-[rgba(10,10,10,0.3)]"
                    }`}>
                      {stage}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="px-6 lg:px-8 border-b border-black/5 bg-white flex gap-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "tasks", label: "Task Board" },
            { id: "timeline", label: "Timeline & Activity" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-[14px] font-bold transition-colors relative ${
                activeTab === tab.id ? "text-[#0a0a0a]" : "text-[rgba(10,10,10,0.5)] hover:text-[#0a0a0a]"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0a0a0a] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              <div className="xl:col-span-2 space-y-8">
                {/* Custom Request Details */}
                <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                  <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[rgba(10,10,10,0.5)]" /> Request Details
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Student</div>
                      <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><User className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> {activeProject.student}</div>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">College</div>
                      <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><Building2 className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> SRM Institute</div>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Department</div>
                      <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> B.Tech CSE</div>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Deadline</div>
                      <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><Calendar className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> Nov 15, 2026</div>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Technology</div>
                      <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><Laptop className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> {activeProject.tech}</div>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Total Budget</div>
                      <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><DollarSign className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> {activeProject.budget}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-black/5">
                    <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">Requirements Description</div>
                    <p className="text-[14px] text-[rgba(10,10,10,0.7)] leading-relaxed bg-[#fcfcfc] p-4 rounded-xl border border-black/5">
                      Need an AI based smart attendance system using face recognition. It should connect to a web dashboard built in React. The system should mark attendance in real-time and generate monthly Excel reports. Hardware integration with Raspberry Pi is a plus but not mandatory.
                    </p>
                  </div>
                </div>

                {/* Payments Section */}
                <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                  <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[rgba(10,10,10,0.5)]" /> Payment Tracker
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-5">
                      <div className="text-[12px] font-bold text-green-600 uppercase tracking-wider mb-1">Advance Paid</div>
                      <div className="text-[24px] font-bold text-green-700">₹5,000</div>
                      <div className="text-[12px] font-medium text-green-600/70 mt-1">Paid on Oct 24 via UPI</div>
                    </div>
                    <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-5">
                      <div className="text-[12px] font-bold text-amber-600 uppercase tracking-wider mb-1">Pending Balance</div>
                      <div className="text-[24px] font-bold text-amber-700">₹10,000</div>
                      <div className="text-[12px] font-medium text-amber-600/70 mt-1">Due on Delivery</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <button className="bg-white border border-black/10 text-[#0a0a0a] px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm">
                      Record Payment
                    </button>
                    <button className="bg-[#0a0a0a] text-white px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors shadow-sm">
                      Generate Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar in Overview */}
              <div className="xl:col-span-1 space-y-8">
                {/* Team Assignment */}
                <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                  <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-[rgba(10,10,10,0.5)]" /> Team Assignment
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">Lead Developer</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-[#fcfcfc] border border-black/5 rounded-xl py-2.5 pl-4 pr-10 text-[13px] font-bold text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/20">
                          <option>Manoj Kumar</option>
                          <option>Sanjay R.</option>
                          <option>Unassigned</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(10,10,10,0.4)] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">UI/UX Designer</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-[#fcfcfc] border border-black/5 rounded-xl py-2.5 pl-4 pr-10 text-[13px] font-bold text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/20">
                          <option>Divya S.</option>
                          <option>Unassigned</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(10,10,10,0.4)] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">QA / Reviewer</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-[#fcfcfc] border border-black/5 rounded-xl py-2.5 pl-4 pr-10 text-[13px] font-bold text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/20">
                          <option>Unassigned</option>
                          <option>Karthik M.</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(10,10,10,0.4)] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[16px] font-bold text-[#0a0a0a] flex items-center gap-2">
                      <Paperclip className="w-5 h-5 text-[rgba(10,10,10,0.5)]" /> Attachments
                    </h3>
                    <button className="text-[rgba(10,10,10,0.5)] hover:text-[#0a0a0a] transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-black/5 hover:bg-black/[0.02] transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[12px]">DOC</div>
                      <div className="flex-1">
                        <div className="text-[13px] font-bold text-[#0a0a0a]">Requirements.pdf</div>
                        <div className="text-[11px] font-medium text-[rgba(10,10,10,0.5)]">2.4 MB</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-black/5 hover:bg-black/[0.02] transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-[12px]">FIG</div>
                      <div className="flex-1">
                        <div className="text-[13px] font-bold text-[#0a0a0a]">UI_Mockups.fig</div>
                        <div className="text-[11px] font-medium text-[rgba(10,10,10,0.5)]">15 MB</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TASK BOARD TAB */}
          {activeTab === "tasks" && (
            <div className="h-full flex gap-6 overflow-x-auto hide-scrollbar pb-4">
              
              {Object.entries(KANBAN_BOARD).map(([columnId, tasks]) => {
                const colTitles: any = { todo: "To Do", inProgress: "In Progress", review: "Review", done: "Done" };
                const colColors: any = { todo: "bg-slate-100 text-slate-700", inProgress: "bg-blue-100 text-blue-700", review: "bg-amber-100 text-amber-700", done: "bg-green-100 text-green-700" };
                
                return (
                  <div key={columnId} className="w-[300px] flex-shrink-0 flex flex-col bg-black/[0.02] rounded-3xl p-4 border border-black/5">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-bold text-[#0a0a0a]">{colTitles[columnId]}</h3>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${colColors[columnId]}`}>{tasks.length}</span>
                      </div>
                      <button className="text-[rgba(10,10,10,0.4)] hover:text-[#0a0a0a]"><Plus className="w-4 h-4"/></button>
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                      {tasks.map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f5f4ef] text-[rgba(10,10,10,0.6)] px-2 py-1 rounded-md">{task.tag}</span>
                            <button className="text-[rgba(10,10,10,0.3)] hover:text-[#0a0a0a]"><MoreHorizontal className="w-4 h-4"/></button>
                          </div>
                          <h4 className="text-[14px] font-bold text-[#0a0a0a] leading-snug mb-3">{task.title}</h4>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold border border-white shadow-sm">
                              MK
                            </div>
                            {columnId === "done" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          </div>
                        </div>
                      ))}
                      
                      {tasks.length === 0 && (
                        <div className="flex-1 border-2 border-dashed border-black/5 rounded-2xl flex items-center justify-center">
                          <span className="text-[12px] font-medium text-[rgba(10,10,10,0.4)]">Drop tasks here</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
          )}

          {/* TIMELINE TAB */}
          {activeTab === "timeline" && (
            <div className="max-w-3xl mx-auto">
              
              {/* Progress Summary */}
              <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6 mb-8 flex items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex justify-between text-[13px] font-bold mb-2">
                    <span className="text-[#0a0a0a]">Project Progress</span>
                    <span className="text-[#6c3bff]">45%</span>
                  </div>
                  <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6c3bff] w-[45%] rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Expected Delivery</div>
                  <div className="text-[16px] font-bold text-[#0a0a0a]">Nov 15, 2026</div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="relative pl-6 border-l-2 border-black/5 space-y-10 py-4">
                
                <div className="relative">
                  <div className="absolute -left-[35px] w-4 h-4 bg-white border-2 border-green-500 rounded-full" />
                  <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[14px] font-bold text-[#0a0a0a]">Advance Payment Received</div>
                      <div className="text-[12px] font-medium text-[rgba(10,10,10,0.5)]">Oct 24, 10:30 AM</div>
                    </div>
                    <p className="text-[13px] text-[rgba(10,10,10,0.7)]">₹5,000 received via UPI. Project moved to Development state.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[35px] w-4 h-4 bg-white border-2 border-[#6c3bff] rounded-full" />
                  <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[14px] font-bold text-[#0a0a0a]">Schema Design Attached</div>
                      <div className="text-[12px] font-medium text-[rgba(10,10,10,0.5)]">Oct 25, 2:15 PM</div>
                    </div>
                    <p className="text-[13px] text-[rgba(10,10,10,0.7)] mb-3">Manoj uploaded the initial database schema for review.</p>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#fcfcfc] border border-black/5 w-max">
                      <Paperclip className="w-4 h-4 text-[rgba(10,10,10,0.5)]" />
                      <span className="text-[12px] font-bold text-[#0a0a0a]">db_schema_v1.pdf</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[35px] w-4 h-4 bg-white border-2 border-amber-500 rounded-full" />
                  <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[14px] font-bold text-[#0a0a0a]">Client Comment</div>
                      <div className="text-[12px] font-medium text-[rgba(10,10,10,0.5)]">Today, 9:00 AM</div>
                    </div>
                    <p className="text-[13px] text-[rgba(10,10,10,0.7)]">"Can we add a dark mode toggle to the dashboard UI?"</p>
                  </div>
                </div>

              </div>

              {/* Add Comment */}
              <div className="mt-8 relative">
                <div className="absolute left-4 top-4 text-[rgba(10,10,10,0.4)]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <textarea 
                  className="w-full bg-white border border-black/5 rounded-2xl p-4 pl-12 pr-16 resize-none focus:outline-none focus:border-[#0a0a0a]/20 focus:ring-1 focus:ring-[#0a0a0a]/20 text-[14px] shadow-sm"
                  rows={3}
                  placeholder="Add a comment or update log..."
                />
                <button className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-md">
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
