"use client";

import { Download, MessageCircle, Copy, Share2, Image as ImageIcon } from "lucide-react";

export default function AffiliateMarketingPage() {
  const WHATSAPP_TEMPLATE = `Hey! 🚀 I'm sharing an awesome platform called GradMart where you can buy high-quality Mini & Major projects (with source code & documentation) at student-friendly prices. Use my code RAHUL10X or click this link to check it out: https://gradmart.in/ref/rahul10x`;
  
  const INSTA_TEMPLATE = `Looking for the perfect final year project? 🎓 Check out GradMart for premium projects with full source code! Link in bio. Use code RAHUL10X. #EngineeringProjects #GradMart #StudentLife`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Template copied to clipboard!");
  };

  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  );

  return (
    <div className="flex-1 w-full p-6 lg:p-10 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Marketing Tools</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Download posters and copy share templates to maximize your sales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Share Templates */}
        <div>
          <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" /> Share Templates
          </h2>
          <div className="space-y-6">
            
            {/* WhatsApp */}
            <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
              <div className="bg-[#25D366]/10 p-4 border-b border-[#25D366]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#25D366] font-bold text-[14px]">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Message
                </div>
                <button 
                  onClick={() => copyToClipboard(WHATSAPP_TEMPLATE)}
                  className="bg-white text-[#25D366] px-3 py-1.5 rounded-lg border border-[#25D366]/20 font-bold text-[12px] flex items-center gap-1.5 hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Text
                </button>
              </div>
              <div className="p-6 text-[14px] text-[rgba(10,10,10,0.7)] leading-relaxed whitespace-pre-wrap font-medium">
                {WHATSAPP_TEMPLATE}
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#f09433]/10 via-[#e6683c]/10 to-[#bc1888]/10 p-4 border-b border-pink-500/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#bc1888] font-bold text-[14px]">
                  <InstagramIcon /> Instagram Caption
                </div>
                <button 
                  onClick={() => copyToClipboard(INSTA_TEMPLATE)}
                  className="bg-white text-[#bc1888] px-3 py-1.5 rounded-lg border border-pink-500/20 font-bold text-[12px] flex items-center gap-1.5 hover:bg-gradient-to-r hover:from-[#f09433] hover:to-[#bc1888] hover:text-white transition-all"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Text
                </button>
              </div>
              <div className="p-6 text-[14px] text-[rgba(10,10,10,0.7)] leading-relaxed whitespace-pre-wrap font-medium">
                {INSTA_TEMPLATE}
              </div>
            </div>

          </div>
        </div>

        {/* Posters */}
        <div>
          <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-600" /> Referral Posters
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            
            <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-3 group relative cursor-pointer">
              <div className="w-full aspect-[4/5] rounded-xl bg-[#0a0a0a] flex items-center justify-center mb-3 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40" />
                <div className="relative z-10 text-center px-4">
                  <div className="text-[28px] mb-2">🎓</div>
                  <div className="text-white font-black text-[20px] leading-tight mb-2">Need a Project?</div>
                  <div className="text-white/80 font-medium text-[11px]">Use my code RAHUL10X for 10% OFF!</div>
                </div>
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button className="bg-white text-[#0a0a0a] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="px-2 pb-2">
                <div className="text-[13px] font-bold text-[#0a0a0a]">Instagram Story</div>
                <div className="text-[11px] font-medium text-[rgba(10,10,10,0.5)]">1080x1920px (PNG)</div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-3 group relative cursor-pointer">
              <div className="w-full aspect-[4/5] rounded-xl bg-emerald-500 flex items-center justify-center mb-3 overflow-hidden relative">
                <div className="relative z-10 text-center px-4">
                  <div className="text-[28px] mb-2">🚀</div>
                  <div className="text-[#0a0a0a] font-black text-[20px] leading-tight mb-2">Final Year Stress?</div>
                  <div className="bg-[#0a0a0a] text-white px-3 py-1 rounded-full font-bold text-[10px] inline-block">Code: RAHUL10X</div>
                </div>
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button className="bg-white text-[#0a0a0a] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="px-2 pb-2">
                <div className="text-[13px] font-bold text-[#0a0a0a]">WhatsApp Status</div>
                <div className="text-[11px] font-medium text-[rgba(10,10,10,0.5)]">1080x1920px (PNG)</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
