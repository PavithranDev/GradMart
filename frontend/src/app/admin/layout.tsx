import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = {
  title: "Admin Dashboard | GradMart",
  description: "Advanced Admin Control Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f4ef] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen w-full relative">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
