import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { BecomeSellerContent } from "@/components/sections/become-seller-content";

export const metadata = {
  title: "Become a Seller | GradMart",
  description: "Monetize your academic projects. Apply to become a creator on GradMart.",
};

export default function BecomeSellerPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <BecomeSellerContent />
      </div>

      <Footer />
    </main>
  );
}
