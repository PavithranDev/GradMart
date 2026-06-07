import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WishlistGrid } from "@/components/sections/wishlist-grid";

export const metadata = {
  title: "Wishlist | GradMart",
  description: "View your saved final year project templates.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <WishlistGrid />
      </div>

      <Footer />
    </main>
  );
}
