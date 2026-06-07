"use client";

import Link from "next/link";
import { MessageCircle, Camera, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-0 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between mb-20 gap-10">
          
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Camera className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="text-[12px] text-white/50 space-y-2">
              <div className="flex items-center gap-2">
                <Link href="#" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="#" className="hover:text-white transition-colors">Templates</Link>
              </div>
              <div className="flex items-center gap-2">
                <Link href="#" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <Link href="#" className="hover:text-white transition-colors">Portfolio Examples</Link>
              </div>
              <div className="flex items-center gap-2">
                <Link href="#" className="hover:text-white transition-colors">Website Examples</Link>
                <span>/</span>
                <Link href="#" className="hover:text-white transition-colors">Built with GradMart</Link>
              </div>
            </div>
          </div>

          <div>
             <h4 className="text-[12px] text-[#3b82f6] font-medium mb-1">Contact Us</h4>
             <a href="mailto:hello@gradmart.in" className="text-[14px] font-medium hover:opacity-80 transition-opacity">
               hello@gradmart.in
             </a>
          </div>

        </div>
      </div>
      
      {/* Huge Watermark Text */}
      <div className="w-full text-center overflow-hidden translate-y-1/4 opacity-10 select-none pointer-events-none">
        <h1 className="text-[15vw] font-bold tracking-tighter leading-none m-0 p-0 text-white">
          GradMart
        </h1>
      </div>
    </footer>
  );
}
