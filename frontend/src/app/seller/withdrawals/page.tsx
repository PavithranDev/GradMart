"use client";

import { useState, useEffect } from "react";
import { Wallet, CheckCircle2, Clock, Landmark, Smartphone, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function WithdrawalsPage() {
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [dashRes, wthRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/seller/dashboard`, { credentials: "include" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/seller/withdrawals`, { credentials: "include" })
      ]);

      if (dashRes.ok) {
        const d = await dashRes.json();
        setBalance(d.totalRevenue || 0); // Simplified balance
      }

      if (wthRes.ok) {
        const w = await wthRes.json();
        setHistory(Array.isArray(w) ? w : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (numAmount < 1000) {
      toast.error("Minimum withdrawal amount is ₹1000");
      return;
    }

    if (numAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/seller/withdrawals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numAmount })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to request withdrawal");
      }

      toast.success("Withdrawal requested successfully!");
      setAmount("");
      fetchData(); // refresh list
    } catch (err: any) {
      toast.error(err.message || "Failed to request withdrawal");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  // Calculate pending from history
  const pendingAmount = history.filter(h => h.status === "PENDING").reduce((acc, curr) => acc + curr.amount, 0);
  const availableToWithdraw = Math.max(0, balance - pendingAmount);

  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Withdrawals</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Manage your earnings and request payouts.</p>
      </div>

      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Available Balance */}
        <div className="bg-[#0a0a0a] rounded-3xl p-8 relative overflow-hidden text-white shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/70 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-[14px] font-bold uppercase tracking-wider">Available Balance</span>
            </div>
            <div className="text-[48px] font-bold tracking-tight mb-6">₹{availableToWithdraw.toLocaleString()}</div>
            <button 
              onClick={() => setAmount(availableToWithdraw.toString())}
              className="bg-white text-[#0a0a0a] px-8 py-3 rounded-full font-bold text-[14px] hover:bg-neutral-100 transition-colors shadow-lg"
            >
              Withdraw All
            </button>
          </div>
        </div>

        {/* Pending Balance */}
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[rgba(10,10,10,0.5)] mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-[14px] font-bold uppercase tracking-wider">Pending Clearance</span>
            </div>
            <div className="text-[48px] font-bold tracking-tight text-[#0a0a0a] mb-2">₹{pendingAmount.toLocaleString()}</div>
            <div className="flex items-start gap-2 bg-amber-50 text-amber-700 p-3 rounded-xl border border-amber-100 mt-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] font-medium leading-relaxed">
                Funds from sales take 7 days to clear to protect against refunds. Minimum withdrawal is ₹1000.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Request Withdrawal Form */}
        <div className="lg:col-span-1">
          <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Request Payout</h2>
          <div className="bg-white rounded-[24px] p-6 border border-black/5 shadow-sm">
            
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Amount to Withdraw</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-bold text-[rgba(10,10,10,0.5)]">₹</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-[#f5f4ef] border border-black/5 rounded-xl font-bold text-[18px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]/20 transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-3">Withdrawal Method</label>
              <div className="flex flex-col gap-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${withdrawalMethod === 'bank' ? 'border-[#0a0a0a] bg-black/5' : 'border-black/5 hover:bg-[#f5f4ef]'}`}>
                  <input type="radio" name="method" value="bank" checked={withdrawalMethod === 'bank'} onChange={() => setWithdrawalMethod('bank')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${withdrawalMethod === 'bank' ? 'border-[#0a0a0a]' : 'border-[rgba(10,10,10,0.3)]'}`}>
                    {withdrawalMethod === 'bank' && <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full" />}
                  </div>
                  <Landmark className={`w-5 h-5 ${withdrawalMethod === 'bank' ? 'text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.5)]'}`} />
                  <div>
                    <div className="text-[14px] font-bold text-[#0a0a0a]">Bank Transfer</div>
                    <div className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium">Takes 2-3 business days</div>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${withdrawalMethod === 'upi' ? 'border-[#0a0a0a] bg-black/5' : 'border-black/5 hover:bg-[#f5f4ef]'}`}>
                  <input type="radio" name="method" value="upi" checked={withdrawalMethod === 'upi'} onChange={() => setWithdrawalMethod('upi')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${withdrawalMethod === 'upi' ? 'border-[#0a0a0a]' : 'border-[rgba(10,10,10,0.3)]'}`}>
                    {withdrawalMethod === 'upi' && <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full" />}
                  </div>
                  <Smartphone className={`w-5 h-5 ${withdrawalMethod === 'upi' ? 'text-[#0a0a0a]' : 'text-[rgba(10,10,10,0.5)]'}`} />
                  <div>
                    <div className="text-[14px] font-bold text-[#0a0a0a]">UPI</div>
                    <div className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium">Instant transfer (Max ₹1L)</div>
                  </div>
                </label>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={submitting || !amount}
              className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="lg:col-span-2">
          <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Recent History</h2>
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {history.length === 0 ? (
                <div className="p-8 text-center text-black/40 text-[14px] font-medium">No withdrawals found.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f5f4ef] border-b border-black/5">
                      <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Transaction ID</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Amount</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, idx) => (
                      <tr key={item.id} className="border-b border-black/5 last:border-none hover:bg-black/[0.02] transition-colors">
                        <td className="py-4 px-6 text-[14px] font-bold text-[#0a0a0a]">WTH-{item.id.slice(-6).toUpperCase()}</td>
                        <td className="py-4 px-6 text-[14px] font-medium text-[rgba(10,10,10,0.6)]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-[14px] font-bold text-[#0a0a0a]">₹{item.amount.toLocaleString()}</td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold tracking-wide ${
                            item.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                            item.status === 'APPROVED' ? 'bg-green-50 text-green-600' :
                            'bg-red-50 text-red-600'
                          }`}>
                            {item.status === 'APPROVED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {item.status === 'PENDING' && <Clock className="w-3.5 h-3.5" />}
                            {item.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
