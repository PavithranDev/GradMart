import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { SellerHeader } from "@/components/seller/seller-header";

export const metadata = {
  title: "Seller Dashboard | GradMart",
  description: "Manage your projects and earnings.",
};

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f5f4ef] font-sans">
      <SellerSidebar />
      <main className="flex-1 flex flex-col min-h-screen w-full relative">
        <SellerHeader />
        {children}
      </main>
    </div>
  );
}
