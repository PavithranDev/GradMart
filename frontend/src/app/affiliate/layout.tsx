import { AffiliateSidebar } from "@/components/affiliate/affiliate-sidebar";
import { AffiliateHeader } from "@/components/affiliate/affiliate-header";

export const metadata = {
  title: "Affiliate Portal | GradMart",
  description: "Earn commissions by referring students.",
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fcfcfc] font-sans">
      <AffiliateSidebar />
      <main className="flex-1 flex flex-col min-h-screen w-full relative">
        <AffiliateHeader />
        {children}
      </main>
    </div>
  );
}
