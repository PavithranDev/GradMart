"use client";

import { useState } from "react";
import { Copy, Link as LinkIcon, QrCode, MousePointerClick, UserPlus, ShoppingBag, DollarSign, Wallet, ArrowRight } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import Link from "next/link";

export default function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://gradmart.in/ref/rahul10x";
  const referralCode = "RAHUL10X";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full p-6 lg:p-10 overflow-y-auto">
      
      {/* Welcome & Overview */}
      <div className="mb-10 flex flex-col lg:flex-row gap-8">
        
        {/* Welcome Card */}
        <div className="flex-1 bg-emerald-500 rounded-3xl p-8 text-[#0a0a0a] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10">
            <h2 className="text-[28px] font-bold tracking-tight mb-2">Welcome back, Rahul! 👋</h2>
            <p className="text-[15px] font-medium text-[#0a0a0a]/70 mb-8 max-w-md">
              You&apos;re a Level 2 Affiliate. Share your referral link with juniors and friends to earn a 10% flat commission on every project they buy!
            </p>
            
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 pl-6 flex items-center justify-between border border-[#0a0a0a]/10 max-w-md">
              <div className="flex items-center gap-3 overflow-hidden">
                <LinkIcon className="w-5 h-5 text-[#0a0a0a]/50 flex-shrink-0" />
                <span className="text-[14px] font-bold text-[#0a0a0a] truncate">{referralLink}</span>
              </div>
              <button 
                onClick={handleCopy}
                className="bg-[#0a0a0a] text-white px-6 py-3 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-2 flex-shrink-0 ml-4"
              >
                {copied ? <span className="text-emerald-400">Copied!</span> : <><Copy className="w-4 h-4"/> Copy</>}
              </button>
            </div>
          </div>
        </div>

        {/* QR Code & Direct Code */}
        <div className="w-full lg:w-[350px] bg-white rounded-3xl p-6 border border-black/5 shadow-sm flex flex-col items-center justify-center text-center relative">
          <div className="w-32 h-32 bg-black/5 rounded-2xl p-3 mb-6 relative group cursor-pointer">
            <div className="w-full h-full border-4 border-dashed border-[rgba(10,10,10,0.2)] rounded-xl flex items-center justify-center">
              <QrCode className="w-12 h-12 text-[rgba(10,10,10,0.3)]" />
            </div>
            <div className="absolute inset-0 bg-[#0a0a0a]/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">Download QR</span>
            </div>
          </div>
          <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">Your Invite Code</div>
          <div className="text-[28px] font-black text-[#0a0a0a] tracking-widest bg-[#f5f4ef] px-6 py-2 rounded-xl border border-black/5">
            {referralCode}
          </div>
        </div>

      </div>

      {/* KPI Stats Grid */}
      <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Performance Stats (All Time)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-10">
        {[
          { label: "Total Clicks", value: 1240, icon: MousePointerClick, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Registrations", value: 156, icon: UserPlus, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Purchases", value: 42, icon: ShoppingBag, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "Sales Generated", value: 84000, prefix: "₹", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Your Commission", value: 8400, prefix: "₹", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className="text-[24px] font-bold text-[#0a0a0a] tracking-tight flex items-baseline">
              {stat.prefix}
              <NumberTicker value={stat.value} delay={0.1 * idx} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#fcfcfc] rounded-3xl p-8 border border-black/5 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
          <div>
            <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-2">Request Payout</h3>
            <p className="text-[14px] font-medium text-[rgba(10,10,10,0.6)]">You have ₹8,400 available to withdraw.</p>
          </div>
          <Link href="/affiliate/payouts" className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="bg-[#fcfcfc] rounded-3xl p-8 border border-black/5 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
          <div>
            <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-2">Get Marketing Material</h3>
            <p className="text-[14px] font-medium text-[rgba(10,10,10,0.6)]">Download posters and pre-written texts to share.</p>
          </div>
          <Link href="/affiliate/marketing" className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
