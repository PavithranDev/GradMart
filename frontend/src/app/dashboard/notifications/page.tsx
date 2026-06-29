"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Code2, 
  Megaphone,
  Trash2,
  Check,
  CheckCheck,
  Info,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/notifications`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Poll every 10 seconds for real-time feel
    const intervalId = setInterval(fetchNotifications, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'WARNING': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'ERROR': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getIconBg = (type: NotificationType) => {
    switch (type) {
      case 'SUCCESS': return 'bg-green-100';
      case 'WARNING': return 'bg-orange-100';
      case 'ERROR': return 'bg-red-100';
      default: return 'bg-blue-100';
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/notifications/mark-read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/notifications/mark-read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // Empty body for all
        credentials: "include",
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const deleteNotification = (id: string) => {
    // Usually would call an API, but for now just optimistic UI delete
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex-1 lg:pl-10 pb-20 w-full mt-8 lg:mt-0">
      
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-2">Notifications</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Stay updated on your purchases and exclusive offers.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-4 py-2.5 rounded-xl font-bold text-[13px] hover:bg-black/5 transition-colors shadow-sm"
            >
              <CheckCheck className="w-4 h-4" /> Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden min-h-[500px]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between bg-[#f5f4ef]/30">
          <h2 className="text-[16px] font-bold text-[#0a0a0a] flex items-center gap-2">
            Inbox 
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[11px] px-2 py-0.5 rounded-full">{unreadCount} New</span>
            )}
          </h2>
        </div>

        {/* List */}
        <div className="divide-y divide-black/5">
          <AnimatePresence initial={false}>
            {loading ? (
              <div className="p-20 text-center flex flex-col items-center justify-center">
                 <div className="w-8 h-8 border-4 border-[#0a0a0a]/20 border-t-[#0a0a0a] rounded-full animate-spin"></div>
              </div>
            ) : notifications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-20 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[rgba(10,10,10,0.3)]" />
                </div>
                <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-1">You're all caught up!</h3>
                <p className="text-[14px] font-medium text-[rgba(10,10,10,0.5)]">No new notifications right now.</p>
              </motion.div>
            ) : (
              notifications.map((notification) => (
                <motion.div 
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors relative group ${notification.isRead ? 'hover:bg-black/5' : 'bg-purple-50/30 hover:bg-purple-50/50'}`}
                >
                  {!notification.isRead && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#6c3bff] rounded-r-full" />
                  )}

                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div>
                      <h3 className={`text-[15px] font-bold mb-1 ${notification.isRead ? 'text-[rgba(10,10,10,0.8)]' : 'text-[#0a0a0a]'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)] mb-2 max-w-2xl">
                        {notification.message}
                      </p>
                      <span className="text-[12px] font-bold text-[rgba(10,10,10,0.4)]">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-row items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    {!notification.isRead && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 rounded-lg text-[rgba(10,10,10,0.4)] hover:text-[#0a0a0a] hover:bg-black/5 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 rounded-lg text-[rgba(10,10,10,0.4)] hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
