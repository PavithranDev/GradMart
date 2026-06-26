"use client";

import { useState } from "react";
import { Wallet, CheckCircle2, Landmark, Smartphone } from "lucide-react";

const PAYOUT_HISTORY = [
  { id: "AFF-9823", date: "Oct 24, 2026", amount: "₹4,500", method: "UPI Transfer", status: "Completed" },
  { id: "AFF-9810", date: "Sep 28, 2026", amount: "₹2,200", method: "UPI Transfer", status: "Completed" },
  { id: "AFF-9755", date: "Aug 15, 2026", amount: "₹1,700", method: "Bank Transfer", status: "Completed" },
];

export default function AffiliatePayoutsPage() {
  const [withdrawalMethod, setWithdrawalMethod] = useState("upi");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex-1 w-full p-6 lg:p-10 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Payouts</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Withdraw your earned commissions directly to your bank or UPI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Request Withdrawal Form */}
        <div className="lg:col-span-1">
          
          <div className="bg-emerald-500 rounded-[24px] p-6 mb-6 text-[#0a0a0a] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#0a0a0a]/70 mb-2">
                <Wallet className="w-5 h-5" />
                <span className="text-[13px] font-bold uppercase tracking-wider">Available Balance</span>
              </div>
              <div className="text-[36px] font-black tracking-tight">₹8,400</div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-black/5 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-6">Request Payout</h2>
            
            <div className="mb-6">
              <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-2">Amount to Withdraw</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-bold text-[rgba(10,10,10,0.5)]">₹</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-[#fcfcfc] border border-black/5 rounded-xl font-bold text-[18px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-[#0a0a0a]"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-3">Withdrawal Method</label>
              <div className="flex flex-col gap-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${withdrawalMethod === 'upi' ? 'border-emerald-500 bg-emerald-50' : 'border-black/5 hover:bg-black/[0.02]'}`}>
                  <input type="radio" name="method" value="upi" checked={withdrawalMethod === 'upi'} onChange={() => setWithdrawalMethod('upi')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${withdrawalMethod === 'upi' ? 'border-emerald-500' : 'border-[rgba(10,10,10,0.3)]'}`}>
                    {withdrawalMethod === 'upi' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                  </div>
                  <Smartphone className={`w-5 h-5 ${withdrawalMethod === 'upi' ? 'text-emerald-600' : 'text-[rgba(10,10,10,0.5)]'}`} />
                  <div>
                    <div className="text-[14px] font-bold text-[#0a0a0a]">UPI Transfer</div>
                    <div className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium">Instant transfer</div>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${withdrawalMethod === 'bank' ? 'border-emerald-500 bg-emerald-50' : 'border-black/5 hover:bg-black/[0.02]'}`}>
                  <input type="radio" name="method" value="bank" checked={withdrawalMethod === 'bank'} onChange={() => setWithdrawalMethod('bank')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${withdrawalMethod === 'bank' ? 'border-emerald-500' : 'border-[rgba(10,10,10,0.3)]'}`}>
                    {withdrawalMethod === 'bank' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                  </div>
                  <Landmark className={`w-5 h-5 ${withdrawalMethod === 'bank' ? 'text-emerald-600' : 'text-[rgba(10,10,10,0.5)]'}`} />
                  <div>
                    <div className="text-[14px] font-bold text-[#0a0a0a]">Bank Transfer</div>
                    <div className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium">Takes 2-3 business days</div>
                  </div>
                </label>
              </div>
            </div>

            <button className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              Submit Request
            </button>
          </div>
        </div>

        {/* Payout History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-[18px] font-bold text-[#0a0a0a]">Payout History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#fcfcfc] border-b border-black/5">
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Transaction ID</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider">Method</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-right">Amount</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYOUT_HISTORY.map((item, idx) => (
                    <tr key={idx} className="border-b border-black/5 last:border-none hover:bg-black/[0.02] transition-colors">
                      <td className="py-4 px-6 text-[14px] font-bold text-[#0a0a0a]">{item.id}</td>
                      <td className="py-4 px-6 text-[14px] font-medium text-[rgba(10,10,10,0.6)]">{item.date}</td>
                      <td className="py-4 px-6 text-[14px] font-bold text-[#0a0a0a]">{item.method}</td>
                      <td className="py-4 px-6 text-[14px] font-black text-[#0a0a0a] text-right">{item.amount}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[12px] font-bold tracking-wide">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {item.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
