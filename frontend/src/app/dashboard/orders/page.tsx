"use client";

import { apiFetch } from "@/lib/api";

import { useState, useEffect } from "react";
import { Search, Filter, Download, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/user/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.purchases) {
          setPurchases(data.purchases);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-2.5 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> Paid</span>;
      case 'pending':
        return <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case 'refunded':
        return <span className="flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider"><AlertCircle className="w-3.5 h-3.5" /> Refunded</span>;
      default:
        return null;
    }
  };

  const filteredPurchases = purchases.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex-1 lg:pl-10 pb-20 w-full mt-8 lg:mt-0">
      
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-2">Order History</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">View your past transactions and download invoices.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-5 py-2.5 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm whitespace-nowrap">
          <Download className="w-4 h-4" /> Export All (CSV)
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#f5f4ef]/30">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#0a0a0a]/40" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-[14px] text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
              placeholder="Search by Order ID or Project..."
            />
          </div>
          
          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-5 py-2.5 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-12 text-center text-black/50">Loading orders...</div>
          ) : filteredPurchases.length === 0 ? (
             <div className="p-12 text-center text-black/50">No orders found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 bg-[#f5f4ef]/50">
                  <th className="px-6 py-4 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredPurchases.map((order) => (
                  <tr key={order.id} className="hover:bg-[#f5f4ef]/30 transition-colors">
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-bold text-[#0a0a0a]">#{order.id.substring(0,8).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-bold text-[#0a0a0a]">{order.title}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-bold text-[#0a0a0a]">
                        {order.project?.price === 0 ? "FREE" : `₹${order.project?.price || "499"}`}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge("paid")}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-medium text-[rgba(10,10,10,0.6)]">{order.date}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-[13px] font-bold text-[#0a0a0a] hover:text-[#6c3bff] transition-colors flex items-center gap-1.5 bg-black/5 px-3 py-1.5 rounded-lg hover:bg-[#6c3bff]/10">
                          <Download className="w-4 h-4" /> Files
                        </button>
                        <button className="text-[13px] font-bold text-[rgba(10,10,10,0.6)] hover:text-[#0a0a0a] transition-colors flex items-center gap-1.5 bg-black/5 px-3 py-1.5 rounded-lg hover:bg-black/10">
                          <FileText className="w-4 h-4" /> Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-black/5 flex items-center justify-between">
          <span className="text-[13px] font-medium text-[rgba(10,10,10,0.5)]">Showing 1 to 4 of 4 entries</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-black/10 rounded-lg text-[13px] font-bold text-[rgba(10,10,10,0.4)] cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 border border-black/10 rounded-lg text-[13px] font-bold text-[#0a0a0a] hover:bg-black/5 transition-colors">Next</button>
          </div>
        </div>

      </div>

    </div>
  );
}
