"use client";

import { Trophy, Star, Shield, Zap, CheckCircle2, Lock } from "lucide-react";

const LEVELS = [
  {
    id: "bronze",
    name: "Bronze",
    salesRequired: 0,
    color: "from-amber-700 to-amber-900",
    badgeColor: "bg-amber-100 text-amber-800",
    iconColor: "text-amber-500",
    benefits: ["Standard project visibility", "80% revenue share", "Basic support"],
    unlocked: true,
  },
  {
    id: "silver",
    name: "Silver",
    salesRequired: 50,
    color: "from-slate-300 to-slate-500",
    badgeColor: "bg-slate-100 text-slate-700",
    iconColor: "text-slate-500",
    benefits: ["Boosted search ranking", "85% revenue share", "Priority email support", "Custom project pricing"],
    unlocked: true,
  },
  {
    id: "gold",
    name: "Gold",
    salesRequired: 250,
    color: "from-yellow-400 to-amber-500",
    badgeColor: "bg-yellow-100 text-yellow-800",
    iconColor: "text-yellow-500",
    benefits: ["'Top Rated' badge on projects", "90% revenue share", "Dedicated account manager", "Instant withdrawals"],
    unlocked: false,
  },
  {
    id: "platinum",
    name: "Platinum",
    salesRequired: 1000,
    color: "from-indigo-900 to-purple-900",
    badgeColor: "bg-purple-100 text-purple-800",
    iconColor: "text-purple-400",
    benefits: ["Homepage feature placement", "95% revenue share", "24/7 direct phone support", "Zero withdrawal fees"],
    unlocked: false,
  },
];

export default function SellerLevelsPage() {
  const currentSales = 124;
  const currentLevel = LEVELS[1]; // Silver
  const nextLevel = LEVELS[2]; // Gold

  const progressToNext = Math.min(100, Math.max(0, ((currentSales - currentLevel.salesRequired) / (nextLevel.salesRequired - currentLevel.salesRequired)) * 100));

  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Seller Levels</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Unlock exclusive benefits automatically as you sell more.</p>
      </div>

      {/* Progress Section */}
      <div className="bg-[#0a0a0a] rounded-[32px] p-8 md:p-10 mb-12 relative overflow-hidden text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-slate-300" />
                </div>
              </div>
              <div>
                <div className="text-[14px] font-bold text-white/60 uppercase tracking-wider mb-0.5">Current Level</div>
                <div className="text-[24px] font-bold tracking-tight">Silver Creator</div>
              </div>
            </div>
            <p className="text-[15px] font-medium text-white/70 max-w-md">
              You are currently enjoying Silver benefits. Keep selling to unlock Gold and increase your revenue share to 90%!
            </p>
          </div>

          <div className="w-full md:w-[400px] bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-[13px] font-bold text-white/60 mb-1">Total Sales</div>
                <div className="text-[28px] font-bold leading-none">{currentSales}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-bold text-white/60 mb-1">Next Level</div>
                <div className="text-[16px] font-bold text-yellow-400 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  {nextLevel.salesRequired} Sales
                </div>
              </div>
            </div>

            <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progressToNext}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <div className="mt-3 text-[13px] font-medium text-white/60 text-right">
              {nextLevel.salesRequired - currentSales} more sales needed for Gold
            </div>
          </div>
        </div>
      </div>

      {/* Tiers Grid */}
      <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-6">Level Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LEVELS.map((level) => (
          <div 
            key={level.id} 
            className={`rounded-3xl p-6 border transition-all ${
              level.id === currentLevel.id 
                ? "bg-white border-[#0a0a0a] shadow-lg scale-[1.02] relative" 
                : "bg-[#f5f4ef]/50 border-black/5 hover:bg-white hover:shadow-md"
            }`}
          >
            {level.id === currentLevel.id && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                Current Level
              </div>
            )}

            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center shadow-lg mb-6`}>
              <Trophy className="w-6 h-6 text-white" />
            </div>

            <div className="mb-6">
              <h3 className="text-[22px] font-bold text-[#0a0a0a] mb-1">{level.name}</h3>
              <div className="text-[13px] font-bold text-[rgba(10,10,10,0.5)]">
                {level.salesRequired === 0 ? "Default Level" : `${level.salesRequired}+ Sales`}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {level.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {level.unlocked ? (
                      <CheckCircle2 className={`w-4 h-4 ${level.iconColor}`} />
                    ) : (
                      <Lock className="w-4 h-4 text-[rgba(10,10,10,0.3)]" />
                    )}
                  </div>
                  <span className={`text-[13px] font-medium leading-relaxed ${level.unlocked ? 'text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.5)]'}`}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {!level.unlocked && (
              <div className="w-full py-3 rounded-xl bg-black/5 text-[rgba(10,10,10,0.5)] text-[13px] font-bold text-center flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Locked
              </div>
            )}
            {level.unlocked && level.id !== currentLevel.id && (
              <div className="w-full py-3 rounded-xl bg-green-50 text-green-700 text-[13px] font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Unlocked
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
