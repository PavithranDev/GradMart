"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Copy, 
  Link as LinkIcon, 
  MousePointerClick, 
  UserPlus, 
  ShoppingCart, 
  Wallet,
  ArrowUpRight,
  Trophy,
  CheckCircle2,
  DollarSign
} from "lucide-react";

export function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://gradmart.in/ref/john_doe_99";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: "Total Clicks", value: "1,245", trend: "+12%", icon: MousePointerClick, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Signups", value: "84", trend: "+5%", icon: UserPlus, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Sales Generated", value: "32", trend: "+18%", icon: ShoppingCart, color: "text-green-600", bg: "bg-green-100" },
    { label: "Total Commission", value: "₹15,400", trend: "+24%", icon: Wallet, color: "text-[#0a0a0a]", bg: "bg-black/5" },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah M.", earnings: "₹45,200", sales: 112 },
    { rank: 2, name: "Rahul K.", earnings: "₹38,900", sales: 95 },
    { rank: 3, name: "Priya S.", earnings: "₹31,500", sales: 78 },
    { rank: 4, name: "John Doe (You)", earnings: "₹15,400", sales: 32 },
    { rank: 5, name: "Amit T.", earnings: "₹12,100", sales: 25 },
  ];

  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full">
      
      {/* Hero */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-[#0a0a0a] tracking-tight mb-4"
        >
          Refer & <br className="hidden md:block" />
          <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">Earn Money</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[rgba(10,10,10,0.6)] font-medium max-w-2xl mx-auto"
        >
          Share GradMart with your classmates. Earn a flat 20% commission on every successful project purchase made through your link.
        </motion.p>
      </div>

      {/* Referral Link Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0a0a0a] rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden mb-12 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-1 relative z-10 w-full md:w-auto">
          <h2 className="text-2xl font-bold mb-2">Your Referral Link</h2>
          <p className="text-white/60 text-[14px] font-medium mb-6">Share this link on WhatsApp groups, LinkedIn, or YouTube.</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-4 backdrop-blur-sm">
              <LinkIcon className="w-5 h-5 text-white/50" />
              <span className="text-[15px] font-bold text-white truncate">{referralLink}</span>
            </div>
            <button 
              onClick={handleCopy}
              className={`px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-[#0a0a0a] hover:bg-neutral-200'
              }`}
            >
              {copied ? <><CheckCircle2 className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy Link</>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="flex items-center gap-1 text-[12px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3" /> {stat.trend}
              </span>
            </div>
            <div>
              <span className="block text-3xl font-black text-[#0a0a0a] tracking-tight mb-1">{stat.value}</span>
              <span className="block text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Withdraw Earnings */}
        <div className="lg:col-span-2 bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-black/5 pb-6">
            <div>
              <h2 className="text-xl font-bold text-[#0a0a0a] mb-1">Withdraw Earnings</h2>
              <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Transfer your commissions directly to your bank account.</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Available Balance</p>
              <p className="text-3xl font-black text-[#0a0a0a]">₹4,200</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Amount to Withdraw (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <DollarSign className="w-4 h-4 text-[#0a0a0a]/40" />
                  </div>
                  <input type="number" defaultValue="4200" max="4200" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl pl-11 pr-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Payment Method</label>
                <select className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                  <option>UPI Transfer (Instant)</option>
                  <option>Bank Transfer (NEFT/RTGS)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">UPI ID</label>
                <input type="text" placeholder="e.g. johndoe@okaxis" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
            </div>
            <button type="button" className="w-full bg-[#0a0a0a] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg">
              Request Withdrawal
            </button>
          </form>
        </div>

        {/* Leaderboard */}
        <div className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-[#0a0a0a]">Top Affiliates</h2>
          </div>

          <div className="space-y-6">
            {leaderboard.map((user, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${user.rank === 4 ? 'bg-black/5' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-center text-[14px] font-black ${
                    user.rank === 1 ? 'text-yellow-500' : 
                    user.rank === 2 ? 'text-gray-400' : 
                    user.rank === 3 ? 'text-amber-600' : 'text-[rgba(10,10,10,0.3)]'
                  }`}>
                    #{user.rank}
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-[#0a0a0a]">{user.name}</p>
                    <p className="text-[12px] font-medium text-[rgba(10,10,10,0.5)]">{user.sales} Sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-bold text-[#0a0a0a]">{user.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
