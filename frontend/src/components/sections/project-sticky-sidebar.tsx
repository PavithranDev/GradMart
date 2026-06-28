"use client";

import { CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth/AuthContext";

interface ProjectStickySidebarProps {
  project: any;
}

export function ProjectStickySidebar({ project }: ProjectStickySidebarProps) {
  const router = useRouter();
  const { status } = useSession();

  const [hasPurchased, setHasPurchased] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && project?.id) {
      fetch(`http://localhost:4000/api/purchases/check/${project.id}`, {
        credentials: "include",
      })
      .then(res => res.json())
      .then(data => {
        setHasPurchased(data.hasPurchased);
        setIsChecking(false);
      })
      .catch(err => {
        console.error(err);
        setIsChecking(false);
      });
    } else if (status !== 'loading') {
      setIsChecking(false);
    }
  }, [status, project?.id]);

  const handleBuyNow = () => {
    if (hasPurchased) {
      router.push('/dashboard');
      return;
    }
    if (status === 'authenticated') {
      router.push(`/checkout?projectId=${project.id}`);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(`/checkout?projectId=${project.id}`)}`);
    }
  };

  const features = [];
  if (project.zipUrl) features.push("Complete Source Code (.zip)");
  if (project.pdfUrl) features.push("Detailed Project Report (.pdf/.docx)");
  if (project.pptUrl) features.push("Presentation Deck (.pptx)");
  if (project.sqlUrl) features.push("Database Schemas (.sql)");
  if (project.readmeUrl) features.push("Step-by-step Setup Guide");
  
  if (features.length === 0 && Array.isArray(project.features) && project.features.length > 0) {
    features.push(...project.features);
  } else if (features.length === 0) {
    features.push("Premium Project Files", "Setup Assistance via Email");
  }

  return (
    <div className="w-full lg:w-[380px] flex-shrink-0">
      <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col gap-6">
        
        {/* Header */}
        <div>
          <div className="text-[12px] font-bold text-orange-600 uppercase tracking-widest mb-2">
            Top Rated
          </div>
          <h1 className="text-2xl font-bold text-[#0a0a0a] mb-2 leading-tight">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 text-[14px] text-[rgba(10,10,10,0.6)] font-medium">
            <span className="text-yellow-500">★★★★★</span>
            <span>({project.rating})</span>
          </div>
        </div>

        <hr className="border-black/5" />

        {/* Price */}
        <div>
          <div className="text-[32px] font-bold text-[#0a0a0a]">
            {project.price === 0 ? "FREE" : `₹${project.price}`}
          </div>
          <div className="text-[13px] text-[rgba(10,10,10,0.5)] font-medium mt-1">
            One-time payment. Lifetime access.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleBuyNow}
            disabled={isChecking || (project.sales > 0 && !hasPurchased)}
            className={`w-full text-white py-4 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 ${
              hasPurchased 
                ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5' 
                : (project.sales > 0 && !hasPurchased)
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#0a0a0a] hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5'
            } disabled:opacity-70`}
          >
            {isChecking ? 'Checking...' : (hasPurchased ? 'Already Purchased - Go to Dashboard' : (project.sales > 0 ? 'Sold Out' : 'Buy Now'))}
          </button>
          
          <div className="flex gap-3">
            {project.livePreviewUrl && (
              <button onClick={() => window.open(project.livePreviewUrl, '_blank')} className="flex-1 bg-white text-[#0a0a0a] border border-[#0a0a0a]/10 py-3 rounded-xl font-semibold text-[14px] hover:bg-[#0a0a0a]/5 transition-colors">
                Live Preview
              </button>
            )}
            <button className={`${project.livePreviewUrl ? 'w-12' : 'flex-1'} h-12 flex items-center justify-center bg-white border border-[#0a0a0a]/10 rounded-xl text-[#0a0a0a] hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-colors`}>
              <Heart className="w-5 h-5" />
              {!project.livePreviewUrl && <span className="ml-2 font-semibold text-[14px]">Save for Later</span>}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[12px] text-[rgba(10,10,10,0.5)] font-medium">
           <ShieldCheck className="w-4 h-4 text-green-600" />
           Secure SSL encrypted payment
        </div>

        <hr className="border-black/5" />

        {/* Quick Highlights */}
        <div>
          <h4 className="text-[14px] font-bold text-[#0a0a0a] mb-4">Project Highlights</h4>
          <div className="space-y-3">
            {features.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-[13px] text-[rgba(10,10,10,0.7)] font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
