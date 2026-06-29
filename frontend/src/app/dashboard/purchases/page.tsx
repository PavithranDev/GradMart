"use client";

import { apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth/AuthContext";

type Purchase = {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  driveUrl?: string;
  project?: any;
};

export default function PurchasesPage() {
  const { status } = useSession();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/user/dashboard`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error && data.purchases) {
            setPurchases(data.purchases);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch purchases", err);
          setLoading(false);
        });
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading || status === "loading") {
    return (
      <div className="flex-1 w-full flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-6 lg:p-12 lg:pl-16 pb-20">
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#0a0a0a] mb-2">My Purchases</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">
          Access and download your purchased projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {purchases.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm group hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div 
              className="w-full h-40 relative"
              style={!project.image?.startsWith('http') ? { background: project.image || "#6c3bff" } : {}}
            >
              {project.image?.startsWith('http') && <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-black/20" />
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
                      <button onClick={() => window.open(project.project.pdfUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> PDF</button>
                    )}
                    {project.project?.pptUrl && (
                      <button onClick={() => window.open(project.project.pptUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> PPT</button>
                    )}
                    {project.project?.sqlUrl && (
                      <button onClick={() => window.open(project.project.sqlUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> SQL DB</button>
                    )}
                    {project.project?.readmeUrl && (
                      <button onClick={() => window.open(project.project.readmeUrl, '_blank')} className="bg-[#f5f4ef] text-[#0a0a0a] py-2 rounded-lg font-bold text-[12px] hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> Guide</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {purchases.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-black/5">
            <div className="w-16 h-16 bg-[#f5f4ef] rounded-full flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-black/20" />
            </div>
            <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">No purchases yet</h3>
            <p className="text-[14px] font-medium text-black/40 mb-6 max-w-sm">
              You haven't bought any projects. Browse our marketplace to find your next project.
            </p>
            <Link 
              href="/projects"
              className="bg-[#0a0a0a] text-white px-8 py-3 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Browse Projects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
