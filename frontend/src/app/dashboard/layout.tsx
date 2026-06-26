import { Navbar } from "@/components/ui/navbar";
import { DashboardSidebar } from "@/components/sections/dashboard-sidebar";

export const metadata = {
  title: "Dashboard | GradMart",
  description: "Manage your premium templates and downloads.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col overflow-hidden">
      <div className="pt-6 px-4 md:px-8">
        <Navbar />
      </div>

      <div className="flex-1 w-full pt-12 pb-0 flex flex-col lg:flex-row h-[calc(100vh-100px)]">
        {/* Left Sidebar */}
        <DashboardSidebar />

        {/* Nested Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
