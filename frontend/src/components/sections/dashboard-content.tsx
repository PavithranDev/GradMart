"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Crown, FolderDot, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth/AuthContext";
import { apiFetch } from "@/lib/api";

type Purchase = {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  driveUrl?: string;
  project?: {
    pdfUrl?: string;
    pptUrl?: string;
    sqlUrl?: string;
    readmeUrl?: string;
  };
};

type DashboardData = {
  stats: {
    projectsBought: number;
    totalDownloads: number;
  };
  purchases: Purchase[];
};

export function DashboardContent() {
  const { session, status } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const userName = session?.user?.name || "User";

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setLoading(false);
      return;
    }
    apiFetch(`/api/user/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          setData(null);
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data", err);
        setLoading(false);
      });
  }, [status]);

  if (loading || status === "loading") {
    return (
      <div className="flex-1 w-full flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-6 lg:p-12 lg:pl-16">
      
      {/* Header & Stats */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#0a0a0a] mb-2">Welcome Back, {userName}</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium mb-8">
          Here is what's happening with your projects today.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <FolderDot className="w-5 h-5" />
            </div>
            <div className="text-[28px] font-bold text-[#0a0a0a] mb-1">{data?.stats?.projectsBought || 0}</div>
            <div className="text-[13px] text-[rgba(10,10,10,0.6)] font-medium">Projects Bought</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
              <Download className="w-5 h-5" />
            </div>
            <div className="text-[28px] font-bold text-[#0a0a0a] mb-1">{data?.stats?.totalDownloads || 0}</div>
            <div className="text-[13px] text-[rgba(10,10,10,0.6)] font-medium">Total Downloads</div>
          </div>
        </div>
      </div>

      {/* Premium Upsell */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-[#0a0a0a] to-neutral-800 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-[13px] font-bold text-yellow-400 uppercase tracking-widest">Premium Status</span>
          </div>
          <h2 className="text-[22px] font-bold text-white mb-1">GradMart Pro Member</h2>
          <p className="text-[14px] text-white/60 font-medium max-w-md">
            Unlock unlimited downloads and priority support for all premium templates.
          </p>
        </div>
        <button className="relative z-10 whitespace-nowrap bg-white text-[#0a0a0a] px-6 py-3 rounded-full font-bold text-[14px] hover:bg-neutral-100 transition-colors shadow-lg">
          Upgrade Now
        </button>
      </motion.div>

      {/* My Purchases */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-bold text-[#0a0a0a]">My Purchases</h2>
          <Link href="/projects" className="text-[13px] font-bold text-[#0a0a0a] hover:underline flex items-center gap-1">
            Browse More <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.purchases?.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm group hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div 
                className="w-full h-40 relative"
                style={{ background: (project.image && !project.image.startsWith('http')) ? project.image : "#e5e5e5" }}
              >
                {project.image?.startsWith('http') && (
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">
                  Purchased {project.date}
                </div>
                <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex-1">{project.title}</h3>
                
                <div className="flex flex-col gap-2 mt-auto">
                  <button 
                    onClick={() => {
                      if (project.driveUrl) window.open(project.driveUrl, '_blank');
                      else alert('Downloading ZIP...');
                    }}
                    className="w-full bg-[#0a0a0a] text-white py-2.5 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> 
                    {project.driveUrl ? "Source Code (Drive Link)" : "Source Code (.zip)"}
                  </button>
                  
                  {(project.project?.pdfUrl || project.project?.pptUrl || project.project?.sqlUrl || project.project?.readmeUrl) && (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {project.project?.pdfUrl && (
                        <button onClick={() => window.open(project.project?.pdfUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> PDF</button>
                      )}
                      {project.project?.pptUrl && (
                        <button onClick={() => window.open(project.project?.pptUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> PPT</button>
                      )}
                      {project.project?.sqlUrl && (
                        <button onClick={() => window.open(project.project?.sqlUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> SQL DB</button>
                      )}
                      {project.project?.readmeUrl && (
                        <button onClick={() => window.open(project.project?.readmeUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> Guide</button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {(!data?.purchases || data.purchases.length === 0) && (
            <div className="col-span-full py-12 text-center text-[15px] font-medium text-black/40">
              You haven't purchased any projects yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
