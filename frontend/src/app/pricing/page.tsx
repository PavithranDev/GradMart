import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { PricingCards } from "@/components/sections/pricing-cards";

export const metadata = {
  title: "Pricing | GradMart",
  description: "Simple, transparent pricing for engineering students.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <PricingCards />
      </div>

      <Footer />
    </main>
  );
}
