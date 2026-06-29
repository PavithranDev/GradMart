"use client";

import { apiFetch } from "@/lib/api";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  FileArchive, 
  RefreshCcw, 
  CheckCircle2, 
  HardDrive, 
  AlertCircle,
  FileCode2,
  Clock,
  ShieldCheck,
  SearchX
} from "lucide-react";

// Set to true to view Empty State
const isEmpty = false;

const DOWNLOADS = [
  { 
    id: 1, 
    title: "AI Smart Attendance System", 
    version: "v2.1.0", 
    date: "Today, 10:30 AM", 
    size: "45 MB",
    status: "verified",
    hasUpdate: false
  },
  { 
    id: 2, 
    title: "MERN E-commerce Platform", 
    version: "v1.4.2", 
    date: "Oct 12, 2023", 
    size: "128 MB",
    status: "verified",
    hasUpdate: true
  },
  { 
    id: 3, 
    title: "Hospital Management Java", 
    version: "v3.0.0", 
    date: "Sep 28, 2023", 
    size: "82 MB",
    status: "verified",
    hasUpdate: false
  }
];

export default function DownloadsPage() {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [successId, setSuccessId] = useState<number | null>(null);

  const handleDownload = (id: number) => {
    if (downloadingId !== null) return;
    
    setDownloadingId(id);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          setSuccessId(id);
          setTimeout(() => setSuccessId(null), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="flex-1 lg:pl-10 pb-20 w-full flex items-center justify-center min-h-[500px]">
         <div className="w-8 h-8 border-4 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="flex-1 lg:pl-10 pb-20 w-full flex flex-col items-center justify-center text-center py-20 mt-8 lg:mt-0">
        <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-[rgba(10,10,10,0.4)]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-4">No Downloads Yet</h2>
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium max-w-md mb-8">
          You haven't purchased any projects yet. Once you do, your source code and files will securely appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 lg:pl-10 pb-20 w-full mt-8 lg:mt-0">
      
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-2">Download Center</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Manage and securely download your purchased project files.</p>
      </div>


      {/* Download History List */}
      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#0a0a0a]">Purchased Files</h2>
          <span className="text-[13px] font-bold bg-[#f5f4ef] px-3 py-1 rounded-md">{purchases.length} Items</span>
        </div>

        <div className="divide-y divide-black/5">
          {purchases.map((item) => {
            const hasDriveLink = !!item.driveUrl;
            return (
              <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#f5f4ef]/50 transition-colors">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center flex-shrink-0 text-[#0a0a0a]">
                    <FileArchive className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-1 flex items-center gap-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[12px] font-medium text-[rgba(10,10,10,0.5)]">
                      <span className="flex items-center gap-1"><FileCode2 className="w-3.5 h-3.5" /> Source</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.date}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col items-end gap-2">
                  <AnimatePresence mode="wait">
                    {downloadingId === item.id ? (
                      <motion.div 
                        key="progress"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full md:w-48 bg-black/5 h-10 rounded-xl overflow-hidden relative flex items-center justify-center"
                      >
                        <div 
                          className="absolute top-0 left-0 h-full bg-[#0a0a0a] transition-all duration-200" 
                          style={{ width: `${progress}%` }} 
                        />
                        <span className="relative z-10 text-[12px] font-bold text-white mix-blend-difference">
                          Processing... {progress}%
                        </span>
                      </motion.div>
                    ) : successId === item.id ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full md:w-48 bg-green-50 text-green-600 h-10 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px]"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Ready
                      </motion.div>
                    ) : (
                      <motion.button 
                        key="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                          if (hasDriveLink) {
                            window.open(item.driveUrl, '_blank');
                          } else {
                            handleDownload(item.id);
                          }
                        }}
                        className="w-full md:w-48 bg-white border border-black/10 text-[#0a0a0a] h-10 rounded-xl font-bold text-[13px] hover:bg-black/5 hover:border-black/20 transition-all flex items-center justify-center gap-2"
                      >
                        {hasDriveLink ? (
                          <>Open Drive Link</>
                        ) : (
                          <><Download className="w-4 h-4" /> Download ZIP</>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
