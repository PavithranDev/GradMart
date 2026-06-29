"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Download, User, LogOut, Settings, Bell, Code2 } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/purchases", label: "My Purchases", icon: ShoppingBag },
  { href: "/dashboard/downloads", label: "Downloads", icon: Download },
  { href: "/dashboard/orders", label: "Order History", icon: ShoppingBag },
  { href: "/dashboard/custom-projects", label: "Custom Projects", icon: Code2 },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 lg:border-r border-black/5 bg-white h-auto lg:h-full px-4 py-8 lg:px-6 lg:py-12 flex flex-col justify-between overflow-y-auto hide-scrollbar" data-lenis-prevent="true">
      <div>
        <div className="flex items-center gap-2 mb-10 px-4">
          <div className="w-8 h-8 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-[14px]">G</span>
          </div>
          <span className="text-[18px] font-bold text-[#0a0a0a]">Dashboard</span>
        </div>

        <nav className="flex lg:flex-col gap-2 overflow-x-auto hide-scrollbar pb-4 lg:pb-0">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 rounded-full text-[14px] font-bold transition-all whitespace-nowrap ${
                  isActive 
                    ? "bg-[#0a0a0a] text-white shadow-md" 
                    : "text-[rgba(10,10,10,0.6)] hover:bg-black/5 hover:text-[#0a0a0a]"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[rgba(10,10,10,0.5)]'}`} />
                {item.label}
              </Link>
            );
          })}
        <button
            onClick={() => { localStorage.removeItem('gradmart_token'); window.location.href = '/login'; }}
            className="flex items-center gap-3 px-5 py-3 rounded-full text-[14px] font-bold text-red-600 hover:bg-red-50 transition-all whitespace-nowrap lg:hidden"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </nav>
      </div>

      <div className="hidden lg:block">
        <button
          onClick={() => { localStorage.removeItem('gradmart_token'); window.location.href = '/login'; }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-red-600 hover:bg-red-50 transition-colors mt-8 w-full"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
