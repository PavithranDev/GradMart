"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, Download, Users, TrendingUp } from "lucide-react";

const DATA = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 2100 },
  { name: "Mar", revenue: 1800 },
  { name: "Apr", revenue: 3400 },
  { name: "May", revenue: 4100 },
  { name: "Jun", revenue: 3800 },
  { name: "Jul", revenue: 5200 },
  { name: "Aug", revenue: 6100 },
  { name: "Sep", revenue: 5900 },
  { name: "Oct", revenue: 7800 },
  { name: "Nov", revenue: 8400 },
  { name: "Dec", revenue: 10500 },
];

export default function SellerDashboardPage() {
  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Welcome, Creator</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Here is how your projects are performing.</p>
        </div>
        <button className="hidden sm:flex bg-[#0a0a0a] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg items-center gap-2">
          Withdraw Funds
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Sales", value: 458, prefix: "", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Revenue", value: 105000, prefix: "₹", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { title: "Downloads", value: 1240, prefix: "", icon: Download, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Followers", value: 342, prefix: "", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">{stat.title}</div>
            <div className="text-[28px] font-bold text-[#0a0a0a] tracking-tight">
              {stat.prefix}
              <NumberTicker value={stat.value} delay={0.2} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm">
          <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-8">Sales Analytics</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c3bff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6c3bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)" }} dy={10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0a0a0a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6c3bff" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Projects (Sidebar layout) */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 border border-black/5 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-[#0a0a0a]">Popular Projects</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            <div className="flex flex-col gap-4">
              {[
                { title: "AI Attendance System", sales: 124, rev: "₹61,876", image: "#8b5cf6" },
                { title: "Hospital Management", sales: 86, rev: "₹42,914", image: "#1a3a2a" },
                { title: "Food Delivery App", sales: 65, rev: "₹32,435", image: "#e8430a" },
              ].map((proj, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-black/5 hover:bg-[#f5f4ef]/50 transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg shadow-sm" style={{ background: proj.image }} />
                     <div>
                       <div className="text-[14px] font-bold text-[#0a0a0a] mb-0.5 line-clamp-1">{proj.title}</div>
                       <div className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium">{proj.sales} Sales</div>
                     </div>
                  </div>
                  <div className="text-[13px] font-bold text-[#0a0a0a]">{proj.rev}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
