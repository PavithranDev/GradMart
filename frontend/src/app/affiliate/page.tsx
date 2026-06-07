import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { AffiliateDashboard } from "@/components/sections/affiliate-dashboard";

export const metadata = {
  title: "Affiliate Dashboard | GradMart",
  description: "Refer students and earn flat 20% commission on every sale.",
};

export default function AffiliatePage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <AffiliateDashboard />
      </div>

      <Footer />
    </main>
  );
}
