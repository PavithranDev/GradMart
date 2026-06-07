import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { DashboardSidebar } from "@/components/sections/dashboard-sidebar";

export const metadata = {
  title: "Dashboard | GradMart",
  description: "Manage your premium templates and downloads.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto pt-24 pb-0 flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <DashboardSidebar />

        {/* Nested Content */}
        {children}
      </div>

      <Footer />
    </main>
  );
}
