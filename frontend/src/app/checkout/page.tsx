import { Navbar } from "@/components/ui/navbar";
import { CheckoutSummary } from "@/components/sections/checkout-summary";
import { CheckoutForm } from "@/components/sections/checkout-form";

export const metadata = {
  title: "Secure Checkout | GradMart",
  description: "Complete your purchase securely.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-12 pt-32 pb-20 flex flex-col lg:flex-row gap-8 lg:gap-0">
        
        {/* Left Column: Order Summary */}
        <div className="w-full lg:w-[45%] h-full min-h-[600px]">
          <CheckoutSummary />
        </div>

        {/* Right Column: Checkout Form */}
        <div className="w-full lg:w-[55%] h-full">
          <CheckoutForm />
        </div>

      </div>
    </main>
  );
}
