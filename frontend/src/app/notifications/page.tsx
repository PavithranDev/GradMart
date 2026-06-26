"use client";

import { useState } from "react";
import { toast } from "sonner";
import { 
  Bell, Check, Trash2, Mail, Download, DollarSign, Tag, ShieldAlert, LifeBuoy, Zap
} from "lucide-react";
import Link from "next/link";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
};

// MOCK DATA
const INITIAL_NOTIFICATIONS = {
  user: [
    { id: "u1", type: "success", title: "Purchase Success!", message: "Your payment for 'AI Smart Attendance' was successful.", time: "2 mins ago", read: false, icon: DollarSign, color: "text-green-600 bg-green-100" },
    { id: "u2", type: "download", title: "Download Ready", message: "Source code for your project is ready to download.", time: "1 hour ago", read: true, icon: Download, color: "text-blue-600 bg-blue-100" },
    { id: "u3", type: "coupon", title: "Coupon Available", message: "Use code GRAD20 to get 20% off your next purchase.", time: "Yesterday", read: true, icon: Tag, color: "text-amber-600 bg-amber-100" },
  ],
  seller: [
    { id: "s1", type: "sale", title: "New Sale! 🎉", message: "Rahul purchased 'Hospital ERP' for ₹2,500.", time: "10 mins ago", read: false, icon: DollarSign, color: "text-emerald-600 bg-emerald-100" },
    { id: "s2", type: "payout", title: "Payment Released", message: "₹24,500 has been transferred to your Bank Account.", time: "Oct 24", read: true, icon: Check, color: "text-purple-600 bg-purple-100" },
  ],
  admin: [
    { id: "a1", type: "fraud", title: "Fraud Alert Triggered", message: "Multiple failed payment attempts from User #8921.", time: "Just now", read: false, icon: ShieldAlert, color: "text-red-600 bg-red-100" },
    { id: "a2", type: "support", title: "New Support Ticket", message: "Ticket #451: Dispute regarding custom project delivery.", time: "5 mins ago", read: false, icon: LifeBuoy, color: "text-amber-600 bg-amber-100" },
  ]
};

type TabType = "user" | "seller" | "admin";

export default function NotificationsHub() {
  const [activeTab, setActiveTab] = useState<TabType>("user");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Stats
  const currentFeed = notifications[activeTab];
  const unreadCount = currentFeed.filter(n => !n.read).length;

  // Actions
  const markAsRead = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(n => ({ ...n, read: true }))
    }));
    toast.success("All notifications marked as read.");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(n => n.id !== id)
    }));
    toast.success("Notification deleted.");
  };

  // SIMULATE WEBSOCKET EVENT
  const triggerRealtimeEvent = (type: string) => {
    const newId = Math.random().toString(36).substring(7);
    
    let newNotif: any;
    
    if (type === 'user_success') {
      newNotif = { id: newId, type: "success", title: "Order Confirmed!", message: "Thank you for purchasing. Files are being prepared.", time: "Just now", read: false, icon: Check, color: "text-green-600 bg-green-100" };
      toast.success("Order Confirmed!", { description: "Thank you for purchasing. Files are being prepared." });
      setNotifications(prev => ({ ...prev, user: [newNotif, ...prev.user] }));
      setActiveTab("user");
    } 
    else if (type === 'seller_sale') {
      newNotif = { id: newId, type: "sale", title: "Ka-Ching! New Sale 🚀", message: "Someone just bought your project for ₹1,500.", time: "Just now", read: false, icon: Zap, color: "text-emerald-600 bg-emerald-100" };
      toast.success("Ka-Ching! New Sale 🚀", { description: "Someone just bought your project for ₹1,500." });
      setNotifications(prev => ({ ...prev, seller: [newNotif, ...prev.seller] }));
      setActiveTab("seller");
    }
    else if (type === 'admin_fraud') {
      newNotif = { id: newId, type: "fraud", title: "Critical: Fraud Detected", message: "Unusual login activity detected from IP 192.168.1.1", time: "Just now", read: false, icon: ShieldAlert, color: "text-red-600 bg-red-100" };
      toast.error("Critical: Fraud Detected", { description: "Unusual login activity detected from IP 192.168.1.1" });
      setNotifications(prev => ({ ...prev, admin: [newNotif, ...prev.admin] }));
      setActiveTab("admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4ef] flex flex-col font-sans">
      
      {/* Header */}
      <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[24px]">🎓</span>
          <span className="text-[20px] font-bold tracking-tight">GradMart</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-[14px]">
            RS
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 lg:p-12 flex flex-col lg:flex-row gap-10">
        
        {/* Left: Feed Area */}
        <div className="flex-1">
          
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#0a0a0a] tracking-tight mb-2 flex items-center gap-3">
              Notifications <Bell className="w-8 h-8 text-[rgba(10,10,10,0.5)]" />
            </h1>
            <p className="text-[16px] text-[rgba(10,10,10,0.6)] font-medium">Manage your alerts and real-time updates.</p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-black/5 p-1.5 rounded-2xl mb-8 w-max">
            {[
              { id: "user", label: "User Portal" },
              { id: "seller", label: "Seller Dashboard" },
              { id: "admin", label: "Admin Panel" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                  activeTab === tab.id ? "bg-white text-[#0a0a0a] shadow-sm" : "text-[rgba(10,10,10,0.5)] hover:text-[#0a0a0a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feed Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[rgba(10,10,10,0.6)]">
              Unread <span className="bg-[#0a0a0a] text-white px-2 py-0.5 rounded-full text-[12px]">{unreadCount}</span>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden">
            {currentFeed.length === 0 ? (
              <div className="p-12 text-center text-[rgba(10,10,10,0.5)] font-bold">No notifications to show.</div>
            ) : (
              currentFeed.map(notif => (
                <div 
                  key={notif.id}
                  className={`p-6 flex gap-4 transition-colors relative border-b border-black/5 last:border-none ${
                    !notif.read ? "bg-[#fcfcfc]" : "hover:bg-black/[0.02]"
                  }`}
                >
                  {!notif.read && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-600 rounded-r-full" />
                  )}
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className={`text-[15px] ${!notif.read ? 'font-bold text-[#0a0a0a]' : 'font-semibold text-[rgba(10,10,10,0.8)]'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className={`text-[14px] leading-relaxed ${!notif.read ? 'font-medium text-[rgba(10,10,10,0.7)]' : 'text-[rgba(10,10,10,0.5)]'}`}>
                      {notif.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                    {!notif.read && (
                      <button onClick={() => markAsRead(notif.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors" title="Mark as read">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => deleteNotification(notif.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-[rgba(10,10,10,0.3)] hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Dev Settings (WebSocket Simulation) */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-[#0a0a0a] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            
            <h3 className="text-[18px] font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> WebSockets Dev
            </h3>
            <p className="text-[13px] text-white/60 mb-8 leading-relaxed">
              Since Pusher/Ably is not connected, use these buttons to simulate incoming real-time server events via Server-Sent Events (SSE).
            </p>

            <div className="space-y-4">
              <button 
                onClick={() => triggerRealtimeEvent('user_success')}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl flex items-center gap-3 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[14px] font-bold">Simulate User Purchase</div>
                  <div className="text-[11px] text-white/50">Fires a success toast</div>
                </div>
              </button>

              <button 
                onClick={() => triggerRealtimeEvent('seller_sale')}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl flex items-center gap-3 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[14px] font-bold">Simulate Seller Sale</div>
                  <div className="text-[11px] text-white/50">Fires a ka-ching toast</div>
                </div>
              </button>

              <button 
                onClick={() => triggerRealtimeEvent('admin_fraud')}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-2xl flex items-center gap-3 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[14px] font-bold">Simulate Admin Fraud</div>
                  <div className="text-[11px] text-white/50">Fires an error toast</div>
                </div>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-[13px] font-medium text-white/60 mb-3">
                <Mail className="w-4 h-4" /> Email Notifications
              </div>
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[12px] font-bold text-white">Daily Digest</span>
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
