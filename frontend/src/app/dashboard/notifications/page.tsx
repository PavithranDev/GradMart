"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Code2, 
  Megaphone,
  Trash2,
  Check,
  CheckCheck
} from "lucide-react";

type NotificationType = 'purchase' | 'new_project' | 'coupon' | 'custom_project' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "purchase",
    title: "Payment Successful!",
    message: "Your payment of ₹499 for 'AI Smart Attendance System' was successful. You can now download the files.",
    time: "2 mins ago",
    read: false
  },
  {
    id: "2",
    type: "custom_project",
    title: "Custom Project Update",
    message: "Our team has reviewed your request for 'IoT Smart Farming'. A quote has been provided.",
    time: "1 hour ago",
    read: false
  },
  {
    id: "3",
    type: "new_project",
    title: "New Project Added in ML!",
    message: "A new premium project 'Deep Learning Face Recognition' has been added to the Machine Learning category.",
    time: "5 hours ago",
    read: true
  },
  {
    id: "4",
    type: "coupon",
    title: "Exclusive 50% Off Coupon",
    message: "Use code GRAD50 at checkout to get 50% off your next purchase. Valid for 24 hours only!",
    time: "1 day ago",
    read: true
  },
  {
    id: "5",
    type: "system",
    title: "System Maintenance Scheduled",
    message: "GradMart will undergo scheduled maintenance tonight at 2:00 AM IST. Expect 15 mins of downtime.",
    time: "2 days ago",
    read: true
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'purchase': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'new_project': return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'coupon': return <Tag className="w-5 h-5 text-purple-600" />;
      case 'custom_project': return <Code2 className="w-5 h-5 text-indigo-600" />;
      case 'system': return <Megaphone className="w-5 h-5 text-orange-600" />;
    }
  };

  const getIconBg = (type: NotificationType) => {
    switch (type) {
      case 'purchase': return 'bg-green-100';
      case 'new_project': return 'bg-blue-100';
      case 'coupon': return 'bg-purple-100';
      case 'custom_project': return 'bg-indigo-100';
      case 'system': return 'bg-orange-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            {notifications.length === 0 ? (
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
                  className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors relative group ${notification.read ? 'hover:bg-black/5' : 'bg-purple-50/30 hover:bg-purple-50/50'}`}
                >
                  {!notification.read && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#6c3bff] rounded-r-full" />
                  )}

                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div>
                      <h3 className={`text-[15px] font-bold mb-1 ${notification.read ? 'text-[rgba(10,10,10,0.8)]' : 'text-[#0a0a0a]'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)] mb-2 max-w-2xl">
                        {notification.message}
                      </p>
                      <span className="text-[12px] font-bold text-[rgba(10,10,10,0.4)]">
                        {notification.time}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-row items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
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
