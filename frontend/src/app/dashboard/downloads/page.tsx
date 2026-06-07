"use client";

import { useState } from "react";
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

  if (isEmpty) {
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

      {/* Storage & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#0a0a0a] rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <HardDrive className="w-5 h-5 text-purple-400" />
            <h3 className="text-[14px] font-bold text-white/70 uppercase tracking-wider">Cloud Storage</h3>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-white tracking-tight">255</span>
              <span className="text-[14px] font-medium text-white/50">MB Used</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[15%] bg-purple-500 rounded-full" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <h3 className="text-[14px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">File Verification</h3>
          </div>
          <div>
            <span className="text-4xl font-bold text-[#0a0a0a] tracking-tight block mb-2">100%</span>
            <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)]">All files are scanned, verified, and free of malicious code.</p>
          </div>
        </div>
      </div>

      {/* Download History List */}
      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#0a0a0a]">Purchased Files</h2>
          <span className="text-[13px] font-bold bg-[#f5f4ef] px-3 py-1 rounded-md">{DOWNLOADS.length} Items</span>
        </div>

        <div className="divide-y divide-black/5">
          {DOWNLOADS.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#f5f4ef]/50 transition-colors">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center flex-shrink-0 text-[#0a0a0a]">
                  <FileArchive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-1 flex items-center gap-2">
                    {item.title}
                    {item.hasUpdate && (
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Update Available</span>
                    )}
                  </h3>
                  <div className="flex items-center gap-3 text-[12px] font-medium text-[rgba(10,10,10,0.5)]">
                    <span className="flex items-center gap-1"><FileCode2 className="w-3.5 h-3.5" /> {item.version}</span>
                    <span>•</span>
                    <span>{item.size}</span>
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
                        Downloading... {progress}%
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
                      <CheckCircle2 className="w-4 h-4" /> Downloaded
                    </motion.div>
                  ) : (
                    <motion.button 
                      key="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => handleDownload(item.id)}
                      className="w-full md:w-48 bg-white border border-black/10 text-[#0a0a0a] h-10 rounded-xl font-bold text-[13px] hover:bg-black/5 hover:border-black/20 transition-all flex items-center justify-center gap-2"
                    >
                      {item.date.includes("Today") ? (
                        <><Download className="w-4 h-4" /> Download Now</>
                      ) : (
                        <><RefreshCcw className="w-4 h-4" /> Re-download</>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>

                {item.hasUpdate && (
                  <button className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> View v1.5.0 Changelog
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
