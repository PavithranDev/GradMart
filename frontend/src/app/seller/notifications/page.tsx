"use client";

import { Download, Star, CheckCircle2, Wallet, Bell, Trash2, Check } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "sale",
    title: "New Sale: AI Smart Attendance",
    message: "Rahul S. purchased your project for ₹499.",
    time: "2 hours ago",
    icon: Download,
    color: "text-blue-600",
    bg: "bg-blue-50",
    unread: true,
  },
  {
    id: 2,
    type: "review",
    title: "5-Star Review Received",
    message: "Priya P. left a 5-star review on 'Hospital Management'.",
    time: "5 hours ago",
    icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-50",
    unread: true,
  },
  {
    id: 3,
    type: "approval",
    title: "Project Approved!",
    message: "Your project 'Food Delivery App' has been approved and is now live on the marketplace.",
    time: "Yesterday",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    unread: false,
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Released",
    message: "Your requested withdrawal of ₹24,500 has been processed to your Bank Account.",
    time: "Oct 24",
    icon: Wallet,
    color: "text-purple-600",
    bg: "bg-purple-50",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Notifications</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Stay updated on your sales and project status.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white text-[#0a0a0a] px-4 py-2 rounded-xl border border-black/5 font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden">
          {NOTIFICATIONS.map((notif, idx) => (
            <div 
              key={notif.id}
              className={`p-6 flex gap-4 transition-colors relative border-b border-black/5 last:border-none ${
                notif.unread ? "bg-[#fcfcfc]" : "hover:bg-black/[0.02]"
              }`}
            >
              {notif.unread && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#0a0a0a] rounded-r-full" />
              )}
              
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notif.bg}`}>
                <notif.icon className={`w-6 h-6 ${notif.color}`} />
              </div>
              
              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className={`text-[15px] ${notif.unread ? 'font-bold text-[#0a0a0a]' : 'font-semibold text-[rgba(10,10,10,0.8)]'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] whitespace-nowrap">
                    {notif.time}
                  </span>
                </div>
                <p className={`text-[14px] leading-relaxed ${notif.unread ? 'font-medium text-[rgba(10,10,10,0.7)]' : 'text-[rgba(10,10,10,0.5)]'}`}>
                  {notif.message}
                </p>
              </div>

              {/* Actions */}
              <div className="opacity-0 hover:opacity-100 flex-shrink-0 pt-1 transition-opacity">
                <button className="p-2 text-[rgba(10,10,10,0.3)] hover:text-red-500 transition-colors" title="Delete notification">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
