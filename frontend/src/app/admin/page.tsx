"use client";

import { motion } from "framer-motion";
import { 
  IndianRupee, 
  Package, 
  Users, 
  Code2, 
  Star, 
  Crown,
  ArrowUpRight,
  ArrowDownRight,
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

const TOP_STATS = [
  { label: "Total Revenue", value: "₹2,45,000", trend: "+12.5%", isUp: true, icon: IndianRupee, color: "text-green-600", bg: "bg-green-100" },
  { label: "Total Orders", value: "685", trend: "+8.2%", isUp: true, icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Registered Students", value: "1,250", trend: "+15.4%", isUp: true, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  { label: "Total Projects", value: "120", trend: "+5.1%", isUp: true, icon: Code2, color: "text-indigo-600", bg: "bg-indigo-100" },
  { label: "Average Rating", value: "4.8", trend: "-0.2%", isUp: false, icon: Star, color: "text-yellow-600", bg: "bg-yellow-100" },
  { label: "Premium Users", value: "185", trend: "+22.4%", isUp: true, icon: Crown, color: "text-amber-600", bg: "bg-amber-100" },
];

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 8900 },
  { name: 'Sat', revenue: 12390 },
  { name: 'Sun', revenue: 10490 },
];

const CATEGORY_DATA = [
  { name: 'AI/ML', sales: 400 },
  { name: 'MERN', sales: 300 },
  { name: 'Python', sales: 550 },
  { name: 'IoT', sales: 200 },
  { name: 'Blockchain', sales: 150 },
];

const RECENT_ACTIVITY = [
  { time: "10:30 AM", event: "Rahul purchased 'AI Attendance System'", type: "purchase" },
  { time: "11:15 AM", event: "New Seller 'Sarah M.' registered", type: "user" },
  { time: "12:20 PM", event: "Project 'Hospital Management' uploaded for review", type: "project" },
  { time: "01:45 PM", event: "Withdrawal request of ₹12,000 processed", type: "finance" },
  { time: "02:30 PM", event: "Support Ticket #492 resolved", type: "support" },
];

export default function AdminAnalyticsDashboard() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0a0a0a] tracking-tight mb-2">Analytics Overview</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Monitor your platform's performance, revenue, and user activity.</p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {TOP_STATS.map((stat, i) => (
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
              <span className={`flex items-center gap-1 text-[12px] font-bold px-2 py-1 rounded-md ${stat.isUp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
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
            <select className="bg-[#f5f4ef] border-none text-[12px] font-bold text-[#0a0a0a] rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer outline-none">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c3bff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6c3bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)", fontWeight: "bold" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "rgba(10,10,10,0.5)", fontWeight: "bold" }} dx={-10} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0a0a0a", border: "none", borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "13px" }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ stroke: 'rgba(108,59,255,0.2)', strokeWidth: 2, strokeDasharray: '3 3' }}
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
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {RECENT_ACTIVITY.map((activity, index) => (
              <div key={index} className="flex gap-4 relative">
                {/* Timeline Line */}
                {index !== RECENT_ACTIVITY.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-black/10" />
                )}
                
                {/* Status Dot */}
                <div className={`w-6 h-6 rounded-full flex-shrink-0 border-4 border-white shadow-sm flex items-center justify-center relative z-10 ${
                  activity.type === 'purchase' ? 'bg-green-500' :
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'project' ? 'bg-purple-500' :
                  activity.type === 'finance' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                
                <div className="pb-1">
                  <p className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] mb-1 leading-none">{activity.time}</p>
                  <p className="text-[14px] font-bold text-[#0a0a0a] leading-tight">{activity.event}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-[13px] font-bold text-[#6c3bff] pt-6 mt-auto hover:underline underline-offset-4">
            View All Activity
          </button>
        </div>

      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Bar Chart */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-[16px] font-bold text-[#0a0a0a]">Sales By Category</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          </div>
        </div>

        {/* Top Projects Table Summary */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-[#0a0a0a]">Top Selling Projects</h2>
            <button className="text-[13px] font-bold text-[#6c3bff] hover:underline underline-offset-4">View Report</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="pb-3 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Project</th>
                  <th className="pb-3 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Category</th>
                  <th className="pb-3 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {[
                  { name: "Python Face Recognition", cat: "Machine Learning", rev: "₹45,200" },
                  { name: "MERN E-Commerce", cat: "Web Dev", rev: "₹38,500" },
                  { name: "IoT Smart Agriculture", cat: "IoT", rev: "₹31,100" },
                  { name: "Blockchain Voting", cat: "Blockchain", rev: "₹25,800" },
                  { name: "Android Chat App", cat: "Mobile Apps", rev: "₹18,400" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-[#f5f4ef]/50 transition-colors">
                    <td className="py-4 text-[14px] font-bold text-[#0a0a0a]">{item.name}</td>
                    <td className="py-4 text-[13px] font-bold text-[rgba(10,10,10,0.6)]">{item.cat}</td>
                    <td className="py-4 text-[14px] font-black text-green-600 text-right">{item.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
