"use client";

import { Bell, Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function AffiliateHeader() {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/affiliate": return "Dashboard Overview";
      case "/affiliate/rules": return "Commission Rules";
      case "/affiliate/payouts": return "Payouts & History";
      case "/affiliate/marketing": return "Marketing Tools";
      default: return "Affiliate Portal";
    }
  };

  return (
    <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
      
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 -ml-2 text-[rgba(10,10,10,0.5)] hover:bg-black/5 rounded-xl transition-colors">
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-[18px] font-bold text-[#0a0a0a] hidden sm:block">
          {getPageTitle()}
        </h1>

        <div className="hidden md:flex items-center gap-2 bg-[#f5f4ef] px-4 py-2.5 rounded-full ml-4 w-[300px]">
          <Search className="w-4 h-4 text-[rgba(10,10,10,0.4)] flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="bg-transparent border-none focus:outline-none text-[13px] font-medium w-full placeholder-[rgba(10,10,10,0.4)] text-[#0a0a0a]"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[12px] font-bold">Link Active</span>
        </div>

        <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-black/5 text-[rgba(10,10,10,0.5)] hover:bg-[#0a0a0a] hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-white" />
        </button>
      </div>

    </header>
  );
}
