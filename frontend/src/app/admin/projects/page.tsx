"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, LayoutGrid, List, Edit2, Trash2, Eye, Loader2 } from "lucide-react";
import { AddProjectModal } from "@/components/admin/add-project-modal";

const MOCK_PROJECTS = [
  { id: 1, title: "AI Smart Attendance", category: "AI & ML", tech: "React, Python", price: "₹499", status: "Published", sales: 124, image: "#8b5cf6" },
  { id: 2, title: "Campus ERP", category: "Web Dev", tech: "Next.js, Node", price: "₹499", status: "Draft", sales: 0, image: "#e8430a" },
  { id: 3, title: "Food Delivery App", category: "Mobile Apps", tech: "Flutter", price: "Free", status: "Published", sales: 890, image: "#6c3bff" },
  { id: 4, title: "Hospital Management", category: "Java", tech: "Java Spring", price: "₹499", status: "Published", sales: 56, image: "#1a3a2a" },
  { id: 5, title: "IoT Smart Farming", category: "IoT", tech: "Arduino", price: "₹499", status: "Published", sales: 210, image: "#ea580c" },
];

export default function AdminProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/admin/projects`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch admin projects", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/admin/project/${id}`, { method: 'DELETE' });
      fetchProjects(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Projects</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Manage all your marketplace listings.</p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0a0a0a] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-neutral-800 transition-all hover:shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(10,10,10,0.4)]" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-10 pr-4 py-2.5 bg-[#f5f4ef]/50 border border-black/10 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 text-[13px] font-bold text-[#0a0a0a] hover:bg-[#f5f4ef]/50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          
          <div className="flex bg-[#f5f4ef]/50 p-1 rounded-xl border border-black/10">
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white shadow-sm" : "text-[rgba(10,10,10,0.4)] hover:text-[#0a0a0a]"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white shadow-sm" : "text-[rgba(10,10,10,0.4)] hover:text-[#0a0a0a]"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === "list" ? (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#f5f4ef]/50 border-b border-black/5 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">
                  <th className="p-4 pl-6">Project</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Seller/Admin</th>
                  <th className="p-4">Views</th>
                  <th className="p-4">Sales</th>
                  <th className="p-4">Downloads</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#f5f4ef]/30 transition-colors group">
                    <td className="p-4 pl-6 flex items-center gap-4">
                      {project.thumbnail ? (
                        <img src={project.thumbnail} alt={project.title} className="w-12 h-12 rounded-lg flex-shrink-0 object-cover shadow-sm" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg flex-shrink-0 shadow-sm" style={{ background: project.imageColor || project.image || "#6c3bff" }} />
                      )}
                      <div>
                        <div className="text-[14px] font-bold text-[#0a0a0a] mb-0.5">{project.title}</div>
                        <div className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium">{(project.tags && project.tags.length > 0) ? project.tags.join(', ') : project.category}</div>
                      </div>
                    </td>
                    <td className="p-4 text-[13px] font-bold text-[#0a0a0a]">{project.category}</td>
                    <td className="p-4 text-[13px] font-bold text-[#0a0a0a]">
                      {project.price === 0 ? "FREE" : `₹${project.price}`}
                      {project.discount > 0 && <span className="ml-1 text-[10px] text-red-500">-{project.discount}%</span>}
                    </td>
                    <td className="p-4 text-[13px] font-bold text-[#0a0a0a]">{project.seller?.name || "System Admin"}</td>
                    <td className="p-4 text-[13px] font-bold text-[#0a0a0a]">{project.views || 0}</td>
                    <td className="p-4 text-[13px] font-bold text-[#0a0a0a]">{project.sales || 0}</td>
                    <td className="p-4 text-[13px] font-bold text-[#0a0a0a]">{project.downloads || 0}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        project.status === "Published" ? "bg-green-100 text-green-700" : "bg-neutral-200 text-neutral-700"
                      }`}>
                        {project.status || "Draft"}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => { setSelectedProject(project); setIsAddModalOpen(true); }} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm group">
              <div className="h-36 w-full relative" style={!project.thumbnail ? { background: project.imageColor || project.image || "#6c3bff" } : {}}>
                {project.thumbnail && <img src={project.thumbnail} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setSelectedProject(project); setIsAddModalOpen(true); }} className="p-1.5 bg-white/90 rounded-md text-[#0a0a0a] hover:bg-white shadow-sm"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-1.5 bg-red-500/90 rounded-md text-white hover:bg-red-500 shadow-sm"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[14px] font-bold text-[#0a0a0a] line-clamp-1">{project.title}</h3>
                  <span className={`flex-shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700`}>
                    Live
                  </span>
                </div>
                <div className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium mb-4">{project.category}</div>
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <div className="text-[14px] font-bold text-[#0a0a0a]">{project.price === 0 ? "FREE" : `₹${project.price}`}</div>
                  <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)]">{project.reviews * 4} sales</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {isAddModalOpen && (
        <AddProjectModal 
          isOpen={isAddModalOpen} 
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedProject(null);
          }}
          initialData={selectedProject}
        />
      )}

    </div>
  );
}
