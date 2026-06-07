"use client";

import { CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

interface ProjectStickySidebarProps {
  project: any;
}

export function ProjectStickySidebar({ project }: ProjectStickySidebarProps) {
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
            {project.price === "Free" ? "FREE" : "₹499"}
          </div>
          <div className="text-[13px] text-[rgba(10,10,10,0.5)] font-medium mt-1">
            One-time payment. Lifetime access.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link 
            href="/checkout"
            className="w-full bg-[#0a0a0a] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Buy Now
          </Link>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-[#0a0a0a] border border-[#0a0a0a]/10 py-3 rounded-xl font-semibold text-[14px] hover:bg-[#0a0a0a]/5 transition-colors">
              Live Preview
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#0a0a0a]/10 rounded-xl text-[#0a0a0a] hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-colors">
              <Heart className="w-5 h-5" />
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
            {[
              "Complete Source Code Included",
              "Pre-written Project Report",
              "Database Schemas & Scripts",
              "Setup Assistance via Email"
            ].map((item) => (
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
