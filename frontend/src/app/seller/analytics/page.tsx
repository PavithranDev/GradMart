"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { AreaChart, Area, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from "recharts";
import { Eye, MousePointerClick, ShoppingBag, DollarSign, Download, Percent, Globe } from "lucide-react";

const TIME_SERIES_DATA = [
  { name: "Mon", views: 4000, clicks: 2400, revenue: 2400 },
  { name: "Tue", views: 3000, clicks: 1398, revenue: 2210 },
  { name: "Wed", views: 2000, clicks: 9800, revenue: 2290 },
  { name: "Thu", views: 2780, clicks: 3908, revenue: 2000 },
  { name: "Fri", views: 1890, clicks: 4800, revenue: 2181 },
  { name: "Sat", views: 2390, clicks: 3800, revenue: 2500 },
  { name: "Sun", views: 3490, clicks: 4300, revenue: 2100 },
];

const TRAFFIC_SOURCES = [
  { name: "Direct", value: 400, color: "#6c3bff" },
  { name: "Search", value: 300, color: "#10b981" },
  { name: "Social", value: 300, color: "#f59e0b" },
  { name: "Referral", value: 200, color: "#ef4444" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Project Analytics</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Deep dive into your traffic and conversion metrics.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Views", value: 24500, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Clicks", value: 12400, icon: MousePointerClick, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Purchases", value: 458, icon: ShoppingBag, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "Downloads", value: 1240, icon: Download, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Conversion %", value: 8.4, suffix: "%", isFloat: true, icon: Percent, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Revenue", value: 105000, prefix: "₹", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-4`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <div className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className="text-[24px] font-bold text-[#0a0a0a] tracking-tight flex items-baseline">
              {kpi.prefix}
              {kpi.isFloat ? (
                <span>{kpi.value}{kpi.suffix}</span>
              ) : (
                <><NumberTicker value={kpi.value} delay={0.1} />{kpi.suffix}</>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm">
          <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-8">Traffic & Engagement (Last 7 Days)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIME_SERIES_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c3bff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6c3bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)" }} dy={10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0a0a0a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="views" stroke="#6c3bff" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Globe className="w-5 h-5 text-[#0a0a0a]" />
            <h2 className="text-[16px] font-bold text-[#0a0a0a]">Traffic Sources</h2>
          </div>
          
          <div className="h-[200px] w-full flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TRAFFIC_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {TRAFFIC_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0a0a0a', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {TRAFFIC_SOURCES.map((source, idx) => (
              <div key={idx} className="flex items-center justify-between text-[14px]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="font-bold text-[rgba(10,10,10,0.6)]">{source.name}</span>
                </div>
                <span className="font-bold text-[#0a0a0a]">{source.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
