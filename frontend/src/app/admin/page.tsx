"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  IndianRupee, 
  Package, 
  Users, 
  Code2, 
  Activity
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProjects: number;
  revenueByDay: { name: string; revenue: number }[];
  categorySales: { name: string; sales: number }[];
  topProjects: { title: string; category: string; revenue: number; count: number }[];
  activity: { time: string; event: string; type: string }[];
}

export default function AdminAnalyticsDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/stats", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (!data.error) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: "text-green-600", bg: "bg-green-100" },
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Registered Users", value: stats.totalUsers.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Total Projects", value: stats.totalProjects.toString(), icon: Code2, color: "text-indigo-600", bg: "bg-indigo-100" },
  ] : [];

  if (loading) {
    return (
      <div className="space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] tracking-tight mb-2">Analytics Overview</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Monitor your platform's performance, revenue, and user activity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm animate-pulse h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-black/5 rounded-3xl p-8 shadow-sm animate-pulse h-80" />
          <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm animate-pulse h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0a0a0a] tracking-tight mb-2">Analytics Overview</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Monitor your platform's performance, revenue, and user activity.</p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <span className="block text-3xl font-black text-[#0a0a0a] tracking-tight mb-1">{stat.value}</span>
              <span className="block text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[16px] font-bold text-[#0a0a0a]">Weekly Revenue</h2>
            <span className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] bg-black/5 px-3 py-1.5 rounded-lg">Last 7 Days</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenueByDay || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c3bff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6c3bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)", fontWeight: "bold" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)", fontWeight: "bold" }} dx={-10} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0a0a0a", border: "none", borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "13px" }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ stroke: 'rgba(108,59,255,0.2)', strokeWidth: 2, strokeDasharray: '3 3' }}
                  formatter={(val: any) => [`₹${val}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6c3bff" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[16px] font-bold text-[#0a0a0a] flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" /> Live Activity
            </h2>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {(stats?.activity || []).length === 0 ? (
              <p className="text-[13px] text-[rgba(10,10,10,0.4)] font-medium text-center py-8">No recent activity</p>
            ) : (
              (stats?.activity || []).map((activity, index) => (
                <div key={index} className="flex gap-4 relative">
                  {index !== (stats?.activity || []).length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-black/10" />
                  )}
                  <div className="w-6 h-6 rounded-full flex-shrink-0 border-4 border-white shadow-sm relative z-10 bg-green-500" />
                  <div className="pb-1">
                    <p className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] mb-1 leading-none">{activity.time}</p>
                    <p className="text-[14px] font-bold text-[#0a0a0a] leading-tight">{activity.event}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Bar Chart */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-[16px] font-bold text-[#0a0a0a]">Projects By Category</h2>
          </div>
          <div className="h-[300px] w-full">
            {(stats?.categorySales || []).length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-[13px] text-[rgba(10,10,10,0.4)] font-medium">No data yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.categorySales || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)", fontWeight: "bold" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)", fontWeight: "bold" }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ backgroundColor: "#0a0a0a", border: "none", borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "13px" }}
                  />
                  <Bar dataKey="sales" fill="#0a0a0a" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Top Projects Table */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-[#0a0a0a]">Top Selling Projects</h2>
          </div>
          
          {(stats?.topProjects || []).length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[13px] text-[rgba(10,10,10,0.4)] font-medium">No purchases yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="pb-3 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Project</th>
                    <th className="pb-3 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Sales</th>
                    <th className="pb-3 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {(stats?.topProjects || []).map((item, i) => (
                    <tr key={i} className="hover:bg-[#f5f4ef]/50 transition-colors">
                      <td className="py-4 text-[14px] font-bold text-[#0a0a0a]">{item.title}</td>
                      <td className="py-4 text-[13px] font-bold text-[rgba(10,10,10,0.6)]">{item.count} sale{item.count !== 1 ? "s" : ""}</td>
                      <td className="py-4 text-[14px] font-black text-green-600 text-right">₹{item.revenue.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
