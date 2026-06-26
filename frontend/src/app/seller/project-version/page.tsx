"use client";

import { useState } from "react";
import { 
  GitCommit, Download, History, Plus, BellRing, 
  Send, AlertTriangle, CheckCircle2, ChevronDown, Rocket, ShieldCheck
} from "lucide-react";

// Mock Data
const VERSIONS = [
  {
    id: "v2.0",
    version: "2.0.0",
    date: "Oct 15, 2023",
    status: "Latest",
    downloads: 1240,
    changelog: [
      { type: "New Feature", desc: "Added real-time dashboard analytics", color: "bg-purple-100 text-purple-700" },
      { type: "UI Improvement", desc: "Redesigned checkout flow", color: "bg-blue-100 text-blue-700" },
      { type: "Documentation", desc: "Updated API integration guide", color: "bg-emerald-100 text-emerald-700" }
    ]
  },
  {
    id: "v1.2",
    version: "1.2.4",
    date: "Sep 02, 2023",
    status: "Stable",
    downloads: 3450,
    changelog: [
      { type: "Bug Fix", desc: "Fixed memory leak in background worker", color: "bg-amber-100 text-amber-700" },
      { type: "New Feature", desc: "Added dark mode support", color: "bg-purple-100 text-purple-700" }
    ]
  },
  {
    id: "v1.1",
    version: "1.1.0",
    date: "Jul 20, 2023",
    status: "Legacy",
    downloads: 2100,
    changelog: [
      { type: "Security", desc: "Patched cross-site scripting vulnerability", color: "bg-red-100 text-red-700" },
      { type: "Bug Fix", desc: "Fixed routing issue on mobile", color: "bg-amber-100 text-amber-700" }
    ]
  },
  {
    id: "v1.0",
    version: "1.0.0",
    date: "May 10, 2023",
    status: "Initial Release",
    downloads: 5000,
    changelog: [
      { type: "Release", desc: "Initial launch of the Hospital ERP System", color: "bg-[#0a0a0a]/10 text-[#0a0a0a]" }
    ]
  }
];

export default function ProjectVersionPage() {
  const [selectedProject, setSelectedProject] = useState("Hospital ERP System");
  const [notifyMsg, setNotifyMsg] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);

  return (
    <div className="flex-1 w-full p-6 lg:p-10 overflow-y-auto bg-[#fcfcfc]">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#0a0a0a] tracking-tight mb-2 flex items-center gap-3">
            Versions & Updates <GitCommit className="w-8 h-8 text-[rgba(10,10,10,0.5)]" />
          </h1>
          <p className="text-[16px] text-[rgba(10,10,10,0.6)] font-medium">
            Manage project versions, changelogs, and notify buyers.
          </p>
        </div>
        
        {/* Project Selector */}
        <div className="bg-white border border-black/5 rounded-2xl p-2 pr-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[rgba(10,10,10,0.4)] uppercase tracking-wider">Select Project</div>
            <div className="text-[14px] font-bold text-[#0a0a0a] flex items-center gap-2 cursor-pointer">
              {selectedProject} <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Left Column: Version Timeline */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[20px] font-bold text-[#0a0a0a] flex items-center gap-2">
              <History className="w-6 h-6" /> Version History
            </h2>
            <button className="bg-[#0a0a0a] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Draft New Release
            </button>
          </div>

          <div className="relative border-l-2 border-black/5 ml-4 pl-8 space-y-10">
            {VERSIONS.map((v, idx) => (
              <div key={v.id} className="relative">
                {/* Timeline Dot */}
                <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-[#fcfcfc] ${
                  idx === 0 ? "bg-blue-600" : "bg-[rgba(10,10,10,0.2)]"
                }`} />

                <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-[24px] font-black text-[#0a0a0a] tracking-tight">
                          {v.version}
                        </h3>
                        {idx === 0 && (
                          <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Latest
                          </span>
                        )}
                        {v.status === "Legacy" && (
                          <span className="bg-amber-50 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Legacy
                          </span>
                        )}
                      </div>
                      <div className="text-[13px] font-medium text-[rgba(10,10,10,0.5)]">
                        Released on {v.date} • {v.downloads.toLocaleString()} Downloads
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {idx !== 0 && (
                        <button className="px-4 py-2 bg-white border border-black/10 rounded-xl text-[13px] font-bold text-[rgba(10,10,10,0.7)] hover:text-[#0a0a0a] hover:bg-black/5 transition-colors">
                          Rollback
                        </button>
                      )}
                      <button className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Changelog */}
                  <div className="space-y-3">
                    <h4 className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] uppercase tracking-wider mb-2">Changelog</h4>
                    {v.changelog.map((change, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-3">
                        <span className={`px-2 py-1 rounded text-[11px] font-bold whitespace-nowrap ${change.color}`}>
                          {change.type}
                        </span>
                        <span className="text-[14px] font-medium text-[#0a0a0a] mt-0.5">
                          {change.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Buyer Notification */}
        <div className="xl:col-span-1">
          <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-8 flex items-center gap-2">
            <BellRing className="w-6 h-6" /> Notify Buyers
          </h2>

          <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-sm sticky top-28">
            <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium mb-6">
              Send an email and push notification to all past buyers of this project to let them know an update is available.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.6)] uppercase tracking-wider mb-2">
                  Update Subject
                </label>
                <input 
                  type="text" 
                  defaultValue="v2.0.0 Update is now available!" 
                  className="w-full bg-[#f5f4ef] border-none rounded-xl px-4 py-3 text-[14px] font-bold text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.6)] uppercase tracking-wider mb-2">
                  Message to Buyers
                </label>
                <textarea 
                  rows={4}
                  value={notifyMsg}
                  onChange={(e) => setNotifyMsg(e.target.value)}
                  placeholder="Describe what's new in this version and why they should update..."
                  className="w-full bg-[#f5f4ef] border-none rounded-xl px-4 py-3 text-[14px] font-medium text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="bg-[#fcfcfc] border border-black/5 p-4 rounded-2xl space-y-4">
                
                <div className="flex items-start justify-between cursor-pointer" onClick={() => setIsMandatory(!isMandatory)}>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isMandatory ? 'bg-red-100 text-red-600' : 'bg-black/5 text-[rgba(10,10,10,0.4)]'}`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[#0a0a0a]">Mandatory Security Update</div>
                      <div className="text-[12px] font-medium text-[rgba(10,10,10,0.5)]">Flags the update as critical.</div>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-colors ${isMandatory ? 'bg-red-500' : 'bg-black/10'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isMandatory ? 'left-[22px]' : 'left-1'}`} />
                  </div>
                </div>

              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-600/20">
                <Send className="w-4 h-4" /> Send Announcement
              </button>

              <div className="flex items-center gap-2 text-[11px] font-bold text-[rgba(10,10,10,0.4)] justify-center">
                <ShieldCheck className="w-4 h-4" /> Anti-spam protected. 1 broadcast per 24hrs.
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
