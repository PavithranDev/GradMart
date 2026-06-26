"use client";

import { useState } from "react";
import { 
  Database, Search, Filter, Folder, FileArchive, FileText, 
  Image as ImageIcon, Video, File, Download, Trash2, ShieldAlert,
  HardDrive, AlertTriangle, Link as LinkIcon, Edit3, MoreVertical,
  CheckCircle2
} from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

// Mock Data
const ASSETS = [
  { id: 1, name: "hospital_erp_source_v2.zip", type: "zip", size: "45 MB", date: "Oct 15, 2023", uploader: "Rahul S.", downloads: 1240, status: "Secure" },
  { id: 2, name: "react_course_intro.mp4", type: "video", size: "120 MB", date: "Oct 14, 2023", uploader: "Admin", downloads: 85, status: "Secure" },
  { id: 3, name: "api_documentation.pdf", type: "pdf", size: "2.4 MB", date: "Oct 10, 2023", uploader: "Rahul S.", downloads: 340, status: "Secure" },
  { id: 4, name: "project_architecture.png", type: "image", size: "1.1 MB", date: "Sep 28, 2023", uploader: "Admin", downloads: 12, status: "Secure" },
  { id: 5, name: "malicious_script_test.zip", type: "zip", size: "12 KB", date: "Sep 25, 2023", uploader: "Unknown", downloads: 0, status: "Quarantine" },
  { id: 6, name: "investor_pitch_deck.pptx", type: "ppt", size: "15 MB", date: "Sep 20, 2023", uploader: "Admin", downloads: 5, status: "Secure" },
  { id: 7, name: "hospital_erp_v1_backup.zip", type: "zip", size: "42 MB", date: "May 10, 2023", uploader: "Rahul S.", downloads: 5000, status: "Duplicate" },
];

const getIconForType = (type: string) => {
  switch(type) {
    case 'zip': return <FileArchive className="w-8 h-8 text-amber-500" />;
    case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
    case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
    case 'video': return <Video className="w-8 h-8 text-purple-500" />;
    case 'ppt': return <FileText className="w-8 h-8 text-orange-500" />;
    default: return <File className="w-8 h-8 text-slate-500" />;
  }
};

export default function AdminAssetsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredAssets = ASSETS.filter(a => {
    if (activeTab === "quarantine" && a.status !== "Quarantine") return false;
    if (activeTab === "duplicates" && a.status !== "Duplicate") return false;
    if (activeTab === "images" && a.type !== "image") return false;
    if (activeTab === "zips" && a.type !== "zip") return false;
    return a.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex-1 w-full h-screen overflow-hidden flex flex-col bg-[#fcfcfc] font-sans">
      
      {/* Header & Storage KPIs */}
      <div className="p-6 lg:p-10 border-b border-black/5 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-[32px] font-bold text-[#0a0a0a] tracking-tight mb-2 flex items-center gap-3">
              Asset Manager <Database className="w-8 h-8 text-[rgba(10,10,10,0.5)]" />
            </h1>
            <p className="text-[16px] text-[rgba(10,10,10,0.6)] font-medium">
              Manage all uploaded files, track storage limits, and monitor security.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-black/10 text-[#0a0a0a] px-4 py-2.5 rounded-xl text-[14px] font-bold shadow-sm hover:bg-black/5 transition-colors">
              Storage Settings
            </button>
            <button className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-[14px] font-bold shadow-sm hover:bg-purple-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Access Logs
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center gap-2 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">
              <HardDrive className="w-4 h-4 text-purple-500" /> Total Used
            </div>
            <div className="text-[28px] font-black text-[#0a0a0a] tracking-tight">
              1.2 <span className="text-[16px] text-[rgba(10,10,10,0.5)]">TB</span>
            </div>
            <div className="w-full h-1.5 bg-black/5 rounded-full mt-3 overflow-hidden">
              <div className="w-[60%] h-full bg-purple-500 rounded-full" />
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center gap-2 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">
              <File className="w-4 h-4 text-blue-500" /> Total Files
            </div>
            <div className="text-[28px] font-black text-[#0a0a0a] tracking-tight">
              <NumberTicker value={24580} />
            </div>
            <div className="text-[12px] font-bold text-emerald-600 mt-2">+120 this week</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center gap-2 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4 text-red-500" /> Quarantined
            </div>
            <div className="text-[28px] font-black text-[#0a0a0a] tracking-tight">
              3
            </div>
            <div className="text-[12px] font-bold text-red-600 mt-2">Requires admin review</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center gap-2 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">
              <FileArchive className="w-4 h-4 text-amber-500" /> Duplicates
            </div>
            <div className="text-[28px] font-black text-[#0a0a0a] tracking-tight">
              12
            </div>
            <div className="text-[12px] font-bold text-amber-600 mt-2">~450 MB wasted space</div>
          </div>
        </div>
      </div>

      {/* Cloud Drive Interface */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Inner Sidebar */}
        <div className="w-64 bg-white border-r border-black/5 p-6 flex-shrink-0 overflow-y-auto hidden md:block">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-[11px] font-black text-[rgba(10,10,10,0.4)] uppercase tracking-widest mb-3">Library</h3>
              <div className="space-y-1">
                <button onClick={() => setActiveTab('all')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-bold transition-colors ${activeTab === 'all' ? 'bg-black/5 text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.6)] hover:text-[#0a0a0a]'}`}>
                  <Folder className="w-4 h-4" /> All Assets
                </button>
                <button onClick={() => setActiveTab('zips')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-bold transition-colors ${activeTab === 'zips' ? 'bg-black/5 text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.6)] hover:text-[#0a0a0a]'}`}>
                  <FileArchive className="w-4 h-4" /> Project ZIPs
                </button>
                <button onClick={() => setActiveTab('images')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-bold transition-colors ${activeTab === 'images' ? 'bg-black/5 text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.6)] hover:text-[#0a0a0a]'}`}>
                  <ImageIcon className="w-4 h-4" /> Images & Media
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black text-[rgba(10,10,10,0.4)] uppercase tracking-widest mb-3">Security Alerts</h3>
              <div className="space-y-1">
                <button onClick={() => setActiveTab('quarantine')} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-bold transition-colors ${activeTab === 'quarantine' ? 'bg-red-50 text-red-700' : 'text-red-600 hover:bg-red-50'}`}>
                  <div className="flex items-center gap-3"><AlertTriangle className="w-4 h-4" /> Quarantine</div>
                  <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px]">3</span>
                </button>
                <button onClick={() => setActiveTab('duplicates')} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-bold transition-colors ${activeTab === 'duplicates' ? 'bg-amber-50 text-amber-700' : 'text-amber-600 hover:bg-amber-50'}`}>
                  <div className="flex items-center gap-3"><FileArchive className="w-4 h-4" /> Duplicates</div>
                  <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[10px]">12</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#f5f4ef]">
          
          {/* Action Bar */}
          <div className="h-16 border-b border-black/5 flex items-center justify-between px-6 bg-white flex-shrink-0">
            <div className="flex items-center gap-2 bg-[#f5f4ef] px-3 py-2 rounded-full w-[300px]">
              <Search className="w-4 h-4 text-[rgba(10,10,10,0.4)]" />
              <input 
                type="text" 
                placeholder="Search files..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-[13px] font-medium w-full text-[#0a0a0a]"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-[rgba(10,10,10,0.5)] hover:bg-black/5 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* File Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAssets.map(asset => (
                <div key={asset.id} className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm group hover:shadow-md transition-shadow relative">
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    {asset.status === 'Quarantine' && (
                      <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Quarantined
                      </span>
                    )}
                    {asset.status === 'Duplicate' && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
                        Duplicate
                      </span>
                    )}
                  </div>

                  {/* Actions Dropdown Trigger (Mocked) */}
                  <button className="absolute top-3 right-3 p-1.5 text-[rgba(10,10,10,0.4)] hover:bg-black/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  <div className="h-32 bg-[#f5f4ef] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    {getIconForType(asset.type)}
                  </div>

                  <h3 className="text-[13px] font-bold text-[#0a0a0a] truncate mb-1" title={asset.name}>
                    {asset.name}
                  </h3>
                  
                  <div className="flex justify-between items-center text-[11px] font-medium text-[rgba(10,10,10,0.5)] mb-3">
                    <span>{asset.size}</span>
                    <span>{asset.date}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/5 pt-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[rgba(10,10,10,0.6)]">
                      <Download className="w-3.5 h-3.5" /> {asset.downloads}
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Copy Signed URL" className="p-1.5 bg-black/5 hover:bg-black/10 text-[#0a0a0a] rounded-lg transition-colors">
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                      <button title="Rename" className="p-1.5 bg-black/5 hover:bg-black/10 text-[#0a0a0a] rounded-lg transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button title="Delete" className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAssets.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Folder className="w-16 h-16 text-[rgba(10,10,10,0.1)] mb-4" />
                <div className="text-[16px] font-bold text-[#0a0a0a]">No assets found</div>
                <div className="text-[13px] font-medium text-[rgba(10,10,10,0.5)]">Try adjusting your search or filters.</div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
