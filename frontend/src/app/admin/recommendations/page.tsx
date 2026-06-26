"use client";

import { BrainCircuit, MousePointerClick, TrendingUp, Target, SlidersHorizontal, Package, CheckCircle2 } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

const KPI_STATS = [
  { label: "AI Click-Through Rate", value: 14.5, prefix: "", suffix: "%", icon: MousePointerClick, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Conversion Rate", value: 4.2, prefix: "", suffix: "%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Recommendation Accuracy", value: 92, prefix: "", suffix: "%", icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
];

const MOST_RECOMMENDED = [
  { rank: 1, title: "AI Smart Attendance System", category: "Machine Learning", impressions: "45K", ctr: "18.2%", conversions: 340 },
  { rank: 2, title: "Hospital ERP System", category: "Web Development", impressions: "38K", ctr: "15.4%", conversions: 280 },
  { rank: 3, title: "Blockchain Voting App", category: "Blockchain", impressions: "29K", ctr: "12.1%", conversions: 195 },
  { rank: 4, title: "IoT Smart Home Controller", category: "IoT", impressions: "22K", ctr: "14.8%", conversions: 150 },
];

export default function AdminRecommendationsDashboard() {
  return (
    <div className="flex-1 w-full p-6 lg:p-10 overflow-y-auto bg-[#fcfcfc]">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#0a0a0a] tracking-tight mb-2 flex items-center gap-3">
            AI Engine Analytics <BrainCircuit className="w-8 h-8 text-purple-600" />
          </h1>
          <p className="text-[16px] text-[rgba(10,10,10,0.6)] font-medium">
            Monitor the performance and accuracy of the global recommendation engine.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-100 w-max shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-[13px] font-bold">Engine Status: Online (v2.4.1)</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {KPI_STATS.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">
              {stat.label}
            </div>
            <div className="text-[36px] font-black text-[#0a0a0a] tracking-tight flex items-baseline gap-1">
              {stat.prefix}
              <NumberTicker value={stat.value} delay={0.1 * idx} />
              {stat.suffix}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Most Recommended Table */}
        <div className="lg:col-span-2">
          <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" /> Most Recommended Projects
          </h2>
          
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#fcfcfc] border-b border-black/5">
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Rank & Project</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Category</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-right">Impressions</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-right">CTR</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-right">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOST_RECOMMENDED.map((project, idx) => (
                    <tr key={idx} className="border-b border-black/5 last:border-none hover:bg-black/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[13px] ${
                            idx === 0 ? "bg-amber-100 text-amber-700" :
                            idx === 1 ? "bg-slate-100 text-slate-700" :
                            idx === 2 ? "bg-amber-900/10 text-amber-900" :
                            "bg-black/5 text-[rgba(10,10,10,0.5)]"
                          }`}>
                            #{project.rank}
                          </div>
                          <span className="text-[14px] font-bold text-[#0a0a0a]">{project.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[13px] font-medium text-[rgba(10,10,10,0.6)]">
                        {project.category}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-bold text-[#0a0a0a] text-right">{project.impressions}</td>
                      <td className="py-4 px-6 text-[14px] font-bold text-blue-600 text-right">{project.ctr}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[12px] font-bold">
                          {project.conversions} Sales
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Algorithm Weights Control */}
        <div className="lg:col-span-1">
          <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-[#0a0a0a]" /> Factor Weights
          </h2>
          
          <div className="bg-[#0a0a0a] rounded-[32px] p-8 relative overflow-hidden shadow-xl text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />
            
            <p className="text-[13px] font-medium text-white/60 mb-8">
              Adjust the weightage of different data points used by the recommendation engine (read-only demo).
            </p>

            <div className="space-y-6 relative z-10">
              {[
                { label: "Purchase History", val: 85, color: "bg-purple-500" },
                { label: "Browsing History", val: 60, color: "bg-blue-500" },
                { label: "Wishlist Items", val: 40, color: "bg-pink-500" },
                { label: "Search History", val: 75, color: "bg-emerald-500" },
                { label: "Category Interest", val: 50, color: "bg-amber-500" },
              ].map((factor, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[12px] font-bold mb-2">
                    <span className="text-white">{factor.label}</span>
                    <span className="text-white/60">{factor.val}% Weight</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${factor.color} rounded-full`} style={{ width: `${factor.val}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 bg-white text-[#0a0a0a] py-3.5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
              <CheckCircle2 className="w-4 h-4" /> Save Configuration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
