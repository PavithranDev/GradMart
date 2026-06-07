import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { CategoriesHero } from "@/components/sections/categories-hero";
import { FeaturedCategory } from "@/components/sections/featured-category";
import { CategoriesCTA } from "@/components/sections/categories-cta";

export const metadata = {
  title: "Categories | GradMart",
  description: "Browse premium final year project templates by category.",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1">
        <CategoriesHero />
        <FeaturedCategory />
        <CategoriesCTA />
      </div>

      <Footer />
    </main>
  );
}
