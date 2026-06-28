"use client";

import { useState, useEffect } from "react";
import { 
  Search, Briefcase, ChevronRight, User, GraduationCap, Building2, 
  Calendar, DollarSign, Laptop, Clock, Paperclip, ChevronDown, 
  Plus, MoreHorizontal, CheckCircle2, MessageSquare, Send, Mail, Phone
} from "lucide-react";
import { toast } from "sonner";

const PIPELINE_STAGES = [
  "SUBMITTED", "REVIEW", "QUOTED", "ASSIGNED", "DEVELOPMENT", "TESTING", "READY", "DELIVERED"
];

export default function CustomProjectsCRM() {
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [advanceInput, setAdvanceInput] = useState("");
  const [finalInput, setFinalInput] = useState("");
  const [payingType, setPayingType] = useState<"advance"|"final"|null>(null);
  const [payAmount, setPayAmount] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/custom-projects", {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.error) {
        setProjects(data);
        if (data.length > 0 && !activeProject) {
          setActiveProject(data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch custom projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateStatus = async (newStatus: string) => {
    if (!activeProject) return;
    
    try {
      const res = await fetch(`http://localhost:4000/api/admin/custom-projects/${activeProject.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });
      
      const data = await res.json();
      if (!data.error) {
        setActiveProject(data);
        setProjects(projects.map(p => p.id === data.id ? data : p));
        toast.success("Project status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };

  const sendQuote = async () => {
    if (!activeProject || !quoteAmount) return;
    
    try {
      const res = await fetch(`http://localhost:4000/api/admin/custom-projects/${activeProject.id}/quote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quotedBudget: quoteAmount }),
        credentials: "include",
      });
      
      const data = await res.json();
      if (!data.error) {
        setActiveProject(data);
        setProjects(projects.map(p => p.id === data.id ? data : p));
        setQuoteAmount("");
        toast.success("Quote sent successfully!");
      } else {
        toast.error("Failed to send quote");
      }
    } catch (error) {
      console.error("Failed to send quote", error);
      toast.error("Failed to send quote");
    }
  };

  const markPayment = async (type: "advance" | "final", amount: string) => {
    if (!activeProject || !amount) return;
    try {
      const res = await fetch(`http://localhost:4000/api/admin/custom-projects/${activeProject.id}/payment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, amount: Number(amount), note: paymentNote }),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.error) {
        setActiveProject(data);
        setProjects(projects.map(p => p.id === data.id ? data : p));
        setPayingType(null);
        setPayAmount("");
        setPaymentNote("");
        toast.success(`${type === "advance" ? "Advance" : "Final"} payment marked as received! ✅`);
      } else {
        toast.error("Failed to update payment");
      }
    } catch {
      toast.error("Failed to update payment");
    }
  };

  const requestOnlinePayment = async (type: "advance" | "final", amount: string) => {
    if (!activeProject || !amount) return;
    try {
      const res = await fetch(`http://localhost:4000/api/admin/custom-projects/${activeProject.id}/request-payment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, amount: Number(amount) }),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.error) {
        setActiveProject(data);
        setProjects(projects.map(p => p.id === data.id ? data : p));
        setPayingType(null);
        setPayAmount("");
        toast.success(`Payment request sent to ${activeProject.user?.name}! 🔔 They will see a "Pay Now" button.`);
      } else {
        toast.error("Failed to send payment request");
      }
    } catch {
      toast.error("Failed to send payment request");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 w-full h-[calc(100vh-80px)] lg:h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="w-8 h-8 border-4 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          {projects.length === 0 ? (
            <div className="p-8 text-center text-black/40 text-[13px] font-bold">No custom project requests found.</div>
          ) : projects.map(project => (
            <div 
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                activeProject?.id === project.id 
                  ? "bg-[#0a0a0a]/5 border-black/10 shadow-sm" 
                  : "bg-white border-black/5 hover:bg-black/[0.02]"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[11px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">#{project.id.slice(-6)}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  project.status === 'SUBMITTED' ? 'bg-amber-100 text-amber-700' :
                  project.status === 'DEVELOPMENT' ? 'bg-blue-100 text-blue-700' :
                  project.status === 'TESTING' ? 'bg-purple-100 text-purple-700' :
                  project.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-[14px] font-bold text-[#0a0a0a] line-clamp-1 mb-1">{project.title}</h3>
              <p className="text-[12px] font-medium text-[rgba(10,10,10,0.6)] mb-3">{project.user?.name || "Unknown User"}</p>
              
              <div className="flex items-center justify-between text-[11px] font-bold text-[rgba(10,10,10,0.4)]">
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {project.budget || "TBD"}</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Main Area: Active Project Details */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {activeProject ? (
          <>
            {/* Project Header */}
            <div className="bg-white border-b border-black/5 flex-shrink-0 p-6 lg:p-8">
              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#0a0a0a] text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      #{activeProject.id.slice(-8)}
                    </span>
                    <div className="relative">
                      <select 
                        value={activeProject.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        className={`appearance-none text-[11px] font-bold px-3 py-1 pr-8 rounded-md uppercase tracking-wider border outline-none cursor-pointer ${
                          activeProject.status === 'SUBMITTED' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          activeProject.status === 'DEVELOPMENT' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          activeProject.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                          'bg-slate-50 text-slate-600 border-slate-100'
                        }`}
                      >
                        {PIPELINE_STAGES.map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/40 pointer-events-none" />
                    </div>
                  </div>
                  <h2 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight">{activeProject.title}</h2>
                </div>
                
                <div className="flex gap-3">
                  <button className="bg-white border border-black/10 text-[#0a0a0a] px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm">
                    Assign Team
                  </button>
                  <button className="bg-[#0a0a0a] text-white px-4 py-2 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors shadow-sm">
                    Generate Invoice
                  </button>
                </div>
              </div>

              {/* Pipeline Stepper */}
              <div className="w-full relative hidden md:block">
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
                      <div key={stage} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => updateStatus(stage)}>
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
            <div className="px-6 lg:px-8 border-b border-black/5 bg-white flex gap-6 mt-6 md:mt-0">
              {[
                { id: "overview", label: "Overview" },
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
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                  
                  <div className="xl:col-span-3 space-y-8">
                    {/* Custom Request Details */}
                    <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                      <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[rgba(10,10,10,0.5)]" /> Request Details
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                          <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Student</div>
                          <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><User className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> {activeProject.user?.name || "Unknown"}</div>
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Email</div>
                          <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2 overflow-hidden text-ellipsis"><Mail className="w-4 h-4 text-[rgba(10,10,10,0.4)] flex-shrink-0"/> <span className="truncate">{activeProject.user?.email || "N/A"}</span></div>
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Phone</div>
                          <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><Phone className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> {activeProject.user?.phone || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Deadline</div>
                          <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><Calendar className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> {activeProject.deadline || "TBD"}</div>
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Budget</div>
                          <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2"><DollarSign className="w-4 h-4 text-[rgba(10,10,10,0.4)]"/> {activeProject.budget || "TBD"}</div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-black/5">
                        <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">Requirements Description</div>
                        <p className="text-[14px] text-[rgba(10,10,10,0.7)] leading-relaxed bg-[#fcfcfc] p-4 rounded-xl border border-black/5 whitespace-pre-wrap">
                          {activeProject.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar in Overview */}
                  <div className="xl:col-span-2 space-y-6">


                    {/* Quote Budget */}
                    {(activeProject.status === 'SUBMITTED' || activeProject.status === 'REVIEW' || activeProject.status === 'QUOTED') && (
                      <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                        <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-[rgba(10,10,10,0.5)]" /> Quote Budget
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">New Budget Amount (₹)</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                value={quoteAmount}
                                onChange={(e) => setQuoteAmount(e.target.value)}
                                placeholder={activeProject.quotedBudget || "e.g. 10000"}
                                className="w-full bg-[#fcfcfc] border border-black/5 rounded-xl py-2.5 px-4 text-[13px] font-bold text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/20"
                              />
                              <button 
                                onClick={sendQuote}
                                className="bg-[#0a0a0a] text-white px-4 py-2.5 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors whitespace-nowrap"
                              >
                                Send
                              </button>
                            </div>
                            {activeProject.quotedBudget && (
                              <div className="text-[11px] font-bold text-green-600 mt-2 bg-green-50 p-2 rounded-lg">
                                Quote of ₹{activeProject.quotedBudget} sent.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 💰 Payment Tracker — Full Admin Control */}
                    <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                      <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-1 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" /> Payment Tracker
                      </h3>
                      <p className="text-[11px] text-[rgba(10,10,10,0.4)] font-medium mb-5">You decide amounts, timing & method.</p>

                      <div className="space-y-4">

                        {/* ── Advance Payment Row ── */}
                        <div className={`rounded-2xl border overflow-hidden ${activeProject.advancePaid ? 'border-green-200' : 'border-black/8'}`}>
                          {/* Header */}
                          <div className={`px-4 pt-4 pb-3 ${activeProject.advancePaid ? 'bg-green-50' : 'bg-[#fcfcfc]'}`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-[13px] font-bold text-[#0a0a0a]">Advance Payment</p>
                                {activeProject.advancePaid ? (
                                  <p className="text-[11px] font-bold text-green-600 mt-0.5">
                                    ✅ ₹{activeProject.advanceAmount?.toLocaleString('en-IN')} received
                                    {activeProject.advancePaidAt && (
                                      <span className="text-[10px] text-green-500 ml-1">· {new Date(activeProject.advancePaidAt).toLocaleDateString()}</span>
                                    )}
                                  </p>
                                ) : activeProject.advanceRequested ? (
                                  <p className="text-[11px] font-bold text-blue-600 mt-0.5">🔔 ₹{activeProject.advanceAmount?.toLocaleString('en-IN')} — Waiting for student payment</p>
                                ) : (
                                  <p className="text-[11px] text-[rgba(10,10,10,0.4)] font-medium mt-0.5">
                                    {activeProject.advanceAmount ? `₹${activeProject.advanceAmount?.toLocaleString('en-IN')} pending` : "Not set"}
                                  </p>
                                )}
                              </div>
                              {!activeProject.advancePaid && !activeProject.advanceRequested && (
                                <button
                                  onClick={() => setPayingType(payingType === "advance" ? null : "advance")}
                                  className="text-[11px] font-bold text-[#0a0a0a] bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                                >
                                  {payingType === "advance" ? "Cancel" : "+ Collect"}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Expanded form */}
                          {payingType === "advance" && !activeProject.advancePaid && !activeProject.advanceRequested && (
                            <div className="px-4 pb-4 bg-white border-t border-black/5 space-y-3 pt-3">
                              <input
                                type="number"
                                value={payAmount}
                                onChange={e => setPayAmount(e.target.value)}
                                placeholder="Enter amount (₹)"
                                className="w-full bg-[#fcfcfc] border border-black/10 rounded-xl px-3 py-2.5 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-black/20"
                              />
                              {/* 2 Options */}
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => { if(payAmount){ setPaymentNote(""); markPayment("advance", payAmount); }}}
                                  disabled={!payAmount}
                                  className="flex flex-col items-center gap-1 bg-[#0a0a0a] text-white py-3 rounded-xl text-[12px] font-bold hover:bg-neutral-800 transition-colors disabled:opacity-40"
                                >
                                  <span className="text-lg">✏️</span>
                                  Manual
                                  <span className="text-[10px] font-medium opacity-70">I received cash/UPI</span>
                                </button>
                                <button
                                  onClick={() => { if(payAmount) requestOnlinePayment("advance", payAmount); }}
                                  disabled={!payAmount}
                                  className="flex flex-col items-center gap-1 bg-blue-600 text-white py-3 rounded-xl text-[12px] font-bold hover:bg-blue-700 transition-colors disabled:opacity-40"
                                >
                                  <span className="text-lg">🔗</span>
                                  Request Online
                                  <span className="text-[10px] font-medium opacity-70">Student pays on platform</span>
                                </button>
                              </div>
                              {/* manual note */}
                              <input
                                type="text"
                                value={paymentNote}
                                onChange={e => setPaymentNote(e.target.value)}
                                placeholder="Note (optional): UPI, Cash, NEFT..."
                                className="w-full bg-[#fcfcfc] border border-black/10 rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                              />
                            </div>
                          )}
                        </div>

                        {/* ── Final Payment Row ── */}
                        <div className={`rounded-2xl border overflow-hidden ${activeProject.finalPaid ? 'border-green-200' : 'border-black/8'}`}>
                          <div className={`px-4 pt-4 pb-3 ${activeProject.finalPaid ? 'bg-green-50' : 'bg-[#fcfcfc]'}`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-[13px] font-bold text-[#0a0a0a]">Final Payment</p>
                                {activeProject.finalPaid ? (
                                  <p className="text-[11px] font-bold text-green-600 mt-0.5">
                                    ✅ ₹{activeProject.finalAmount?.toLocaleString('en-IN')} received
                                    {activeProject.finalPaidAt && (
                                      <span className="text-[10px] text-green-500 ml-1">· {new Date(activeProject.finalPaidAt).toLocaleDateString()}</span>
                                    )}
                                  </p>
                                ) : activeProject.finalRequested ? (
                                  <p className="text-[11px] font-bold text-blue-600 mt-0.5">🔔 ₹{activeProject.finalAmount?.toLocaleString('en-IN')} — Waiting for student payment</p>
                                ) : (
                                  <p className="text-[11px] text-[rgba(10,10,10,0.4)] font-medium mt-0.5">
                                    {activeProject.finalAmount ? `₹${activeProject.finalAmount?.toLocaleString('en-IN')} pending` : "Not set"}
                                  </p>
                                )}
                              </div>
                              {!activeProject.finalPaid && !activeProject.finalRequested && (
                                <button
                                  onClick={() => setPayingType(payingType === "final" ? null : "final")}
                                  className="text-[11px] font-bold text-[#0a0a0a] bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                                >
                                  {payingType === "final" ? "Cancel" : "+ Collect"}
                                </button>
                              )}
                            </div>
                          </div>

                          {payingType === "final" && !activeProject.finalPaid && !activeProject.finalRequested && (
                            <div className="px-4 pb-4 bg-white border-t border-black/5 space-y-3 pt-3">
                              <input
                                type="number"
                                value={payAmount}
                                onChange={e => setPayAmount(e.target.value)}
                                placeholder="Enter amount (₹)"
                                className="w-full bg-[#fcfcfc] border border-black/10 rounded-xl px-3 py-2.5 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-black/20"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => { if(payAmount){ setPaymentNote(""); markPayment("final", payAmount); }}}
                                  disabled={!payAmount}
                                  className="flex flex-col items-center gap-1 bg-[#0a0a0a] text-white py-3 rounded-xl text-[12px] font-bold hover:bg-neutral-800 transition-colors disabled:opacity-40"
                                >
                                  <span className="text-lg">✏️</span>
                                  Manual
                                  <span className="text-[10px] font-medium opacity-70">I received cash/UPI</span>
                                </button>
                                <button
                                  onClick={() => { if(payAmount) requestOnlinePayment("final", payAmount); }}
                                  disabled={!payAmount}
                                  className="flex flex-col items-center gap-1 bg-blue-600 text-white py-3 rounded-xl text-[12px] font-bold hover:bg-blue-700 transition-colors disabled:opacity-40"
                                >
                                  <span className="text-lg">🔗</span>
                                  Request Online
                                  <span className="text-[10px] font-medium opacity-70">Student pays on platform</span>
                                </button>
                              </div>
                              <input
                                type="text"
                                value={paymentNote}
                                onChange={e => setPaymentNote(e.target.value)}
                                placeholder="Note (optional): UPI, Cash, NEFT..."
                                className="w-full bg-[#fcfcfc] border border-black/10 rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                              />
                            </div>
                          )}
                        </div>

                        {/* Payment Note display */}
                        {activeProject.paymentNote && (
                          <div className="text-[11px] font-medium text-[rgba(10,10,10,0.5)] bg-[#f5f4ef] p-3 rounded-xl">
                            📝 {activeProject.paymentNote}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TIMELINE TAB */}
              {activeTab === "timeline" && (
                <div className="max-w-3xl mx-auto">
                  <div className="text-center text-black/50 py-12">
                    Detailed activity timeline will appear here once connected to the events microservice.
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[14px] font-bold text-black/30">
            Select a project from the left to view details
          </div>
        )}
      </div>
    </div>
  );
}
