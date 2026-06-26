"use client";

import { Trophy, Star, Target, CheckCircle2, TrendingUp, Zap } from "lucide-react";

const LEADERBOARD = [
  { rank: 1, name: "Sneha Reddy", college: "VIT Vellore", sales: 145, revenue: "₹1,45,000", avatar: "SR" },
  { rank: 2, name: "Arun Kumar", college: "SRM Chennai", sales: 112, revenue: "₹1,12,000", avatar: "AK" },
  { rank: 3, name: "Priya Patel", college: "PSG Tech", sales: 98, revenue: "₹98,000", avatar: "PP" },
  { rank: 4, name: "Rahul Sharma", college: "Anna University", sales: 84, revenue: "₹84,000", avatar: "RS", isMe: true },
  { rank: 5, name: "Karthik M.", college: "SSN College", sales: 65, revenue: "₹65,000", avatar: "KM" },
];

const MILESTONES = [
  { target: 10, reward: "₹1,000 Bonus", achieved: true },
  { target: 50, reward: "GradMart T-Shirt", achieved: true },
  { target: 100, reward: "₹5,000 Cash Bonus", achieved: false },
  { target: 500, reward: "iPhone 15", achieved: false },
  { target: 1000, reward: "MacBook Air M3", achieved: false },
];

export default function AffiliateRulesPage() {
  return (
    <div className="flex-1 w-full p-6 lg:p-10 overflow-y-auto">
      
      {/* Commission Rules Banner */}
      <div className="bg-[#0a0a0a] rounded-[32px] p-8 md:p-12 mb-10 relative overflow-hidden text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-wider uppercase text-[13px] mb-3">
              <Zap className="w-5 h-5" /> Flat Commission Structure
            </div>
            <h2 className="text-[36px] md:text-[48px] font-black tracking-tight mb-4 leading-tight">
              Earn <span className="text-emerald-400">10%</span> on every single sale.
            </h2>
            <p className="text-[16px] font-medium text-white/70 leading-relaxed">
              When a student purchases a project using your referral link or code, you instantly get 10% of the project value added to your wallet. No caps, no limits.
            </p>
          </div>
          
          <div className="w-full md:w-[300px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center">
            <div className="text-[14px] font-bold text-white/60 uppercase tracking-wider mb-2">Example</div>
            <div className="text-[20px] font-bold mb-4">Project: ₹5,000</div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-[14px] font-bold text-white/60 uppercase tracking-wider mb-2">Your Cut</div>
            <div className="text-[32px] font-black text-emerald-400">₹500</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Bonus Milestones */}
        <div>
          <h3 className="text-[20px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" /> Bonus Milestones
          </h3>
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6 relative">
            {/* Connecting line */}
            <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-black/5" />
            
            <div className="space-y-8 relative">
              {MILESTONES.map((milestone, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-full border-[3px] flex flex-shrink-0 items-center justify-center bg-white relative z-10 transition-colors ${
                    milestone.achieved ? "border-emerald-500 text-emerald-500" : "border-black/10 text-[rgba(10,10,10,0.3)]"
                  }`}>
                    {milestone.achieved ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-black/10" />}
                  </div>
                  <div className={`flex-1 bg-[#fcfcfc] p-4 rounded-2xl border transition-all ${
                    milestone.achieved ? "border-emerald-500/20 shadow-sm" : "border-black/5 opacity-60"
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">
                          {milestone.target} Sales Target
                        </div>
                        <div className={`text-[16px] font-bold ${milestone.achieved ? "text-[#0a0a0a]" : "text-[rgba(10,10,10,0.6)]"}`}>
                          {milestone.reward}
                        </div>
                      </div>
                      {milestone.achieved && (
                        <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-bold uppercase tracking-wider">
                          Unlocked
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h3 className="text-[20px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" /> Top Affiliates
          </h3>
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
            
            <div className="bg-amber-50 border-b border-amber-100 p-6 flex items-center justify-between">
              <div>
                <div className="text-[14px] font-bold text-amber-700 mb-1">Weekly Prize Pool</div>
                <div className="text-[24px] font-black text-amber-600">₹25,000</div>
              </div>
              <Star className="w-10 h-10 text-amber-400 opacity-50" />
            </div>

            <div className="p-2">
              {LEADERBOARD.map((user, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                    user.isMe ? "bg-[#0a0a0a] text-white shadow-lg" : "hover:bg-black/[0.02]"
                  }`}
                >
                  <div className={`w-8 font-black text-[20px] text-center ${
                    user.rank === 1 ? "text-amber-500" :
                    user.rank === 2 ? "text-slate-400" :
                    user.rank === 3 ? "text-amber-700" :
                    user.isMe ? "text-white/50" : "text-[rgba(10,10,10,0.3)]"
                  }`}>
                    #{user.rank}
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] flex-shrink-0 ${
                    user.isMe ? "bg-white text-[#0a0a0a]" : "bg-black/5 text-[#0a0a0a]"
                  }`}>
                    {user.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`text-[14px] font-bold ${user.isMe ? "text-white" : "text-[#0a0a0a]"}`}>
                      {user.name} {user.isMe && "(You)"}
                    </div>
                    <div className={`text-[12px] font-medium ${user.isMe ? "text-white/60" : "text-[rgba(10,10,10,0.5)]"}`}>
                      {user.college}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-[14px] font-bold ${user.isMe ? "text-emerald-400" : "text-[#0a0a0a]"}`}>
                      {user.sales} Sales
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
