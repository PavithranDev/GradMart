"use client";

import { useState } from "react";
import { Plus, Eye, Download, Edit2, Trash2, PowerOff } from "lucide-react";
import { UploadProjectModal } from "@/components/seller/upload-project-modal";

const TABS = ["All", "Draft", "Pending Approval", "Published", "Rejected", "Archived"];

const MY_PROJECTS = [
  { id: 1, title: "AI Smart Attendance", category: "AI & ML", views: 1240, downloads: 458, rev: "₹61,876", status: "Published", image: "#8b5cf6" },
  { id: 2, title: "Hospital Management", category: "Java", views: 890, downloads: 86, rev: "₹42,914", status: "Published", image: "#1a3a2a" },
  { id: 3, title: "Food Delivery App", category: "Mobile Apps", views: 650, downloads: 65, rev: "₹32,435", status: "Published", image: "#e8430a" },
  { id: 4, title: "Library System", category: "Web Dev", views: 120, downloads: 0, rev: "₹0", status: "Draft", image: "#6c3bff" },
  { id: 5, title: "IoT Weather Station", category: "IoT", views: 0, downloads: 0, rev: "₹0", status: "Pending Approval", image: "#2dd4bf" },
  { id: 6, title: "Blockchain Voting", category: "Blockchain", views: 34, downloads: 0, rev: "₹0", status: "Rejected", image: "#f43f5e" },
];

export default function SellerProjectsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All" 
    ? MY_PROJECTS 
    : MY_PROJECTS.filter(p => p.status === activeTab);

  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">My Projects</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Manage and track your marketplace listings.</p>
        </div>

        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#0a0a0a] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
          Upload Project
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2 border-b border-black/5">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? "bg-[#0a0a0a] text-white" 
                : "bg-black/5 text-[rgba(10,10,10,0.6)] hover:bg-black/10 hover:text-[#0a0a0a]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-black/5 p-12 text-center flex flex-col items-center">
           <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
             <FolderGit2 className="w-8 h-8 text-[rgba(10,10,10,0.4)]" />
           </div>
           <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-2">No projects found</h3>
           <p className="text-[14px] text-[rgba(10,10,10,0.5)] font-medium max-w-sm">
             You don't have any projects in the '{activeTab}' status right now.
           </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-[24px] overflow-hidden border border-black/5 shadow-sm group">
              {/* Thumbnail */}
              <div className="h-48 w-full relative" style={{ background: project.image }}>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                    project.status === "Published" ? "bg-white/20 text-white border-white/20" : 
                    project.status === "Pending Approval" ? "bg-amber-500/20 text-white border-white/20" :
                    project.status === "Rejected" ? "bg-red-500/20 text-white border-white/20" :
                    "bg-black/50 text-white border-white/10"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-1">{project.title}</h3>
                <div className="text-[13px] text-[rgba(10,10,10,0.5)] font-medium mb-6">{project.category}</div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-black/5">
                  <div>
                    <div className="flex items-center gap-1.5 text-[rgba(10,10,10,0.5)] mb-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Views</span>
                    </div>
                    <div className="text-[16px] font-bold text-[#0a0a0a]">{project.views}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[rgba(10,10,10,0.5)] mb-1">
                      <Download className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Sales</span>
                    </div>
                    <div className="text-[16px] font-bold text-[#0a0a0a]">{project.downloads}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[rgba(10,10,10,0.5)] mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider">Rev</span>
                    </div>
                    <div className="text-[16px] font-bold text-green-600">{project.rev}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-[#f5f4ef] text-[#0a0a0a] py-2.5 rounded-xl font-bold text-[13px] hover:bg-[#0a0a0a] hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  {project.status === "Published" && (
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-black/10 text-[rgba(10,10,10,0.5)] hover:text-orange-600 hover:bg-orange-50 hover:border-orange-200 transition-colors" title="Unpublish">
                      <PowerOff className="w-4 h-4" />
                    </button>
                  )}
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-black/10 text-[rgba(10,10,10,0.5)] hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <UploadProjectModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />

    </div>
  );
}
