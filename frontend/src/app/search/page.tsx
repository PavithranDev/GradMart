import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SearchHeader } from "@/components/sections/search-header";
import { SearchFilters } from "@/components/sections/search-filters";
import { SearchResults } from "@/components/sections/search-results";

export const metadata = {
  title: "Search Projects | GradMart",
  description: "Search across thousands of premium final year projects.",
};

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full">
        <SearchHeader />
        
        <div className="max-w-7xl mx-auto w-full px-4 md:px-12 py-10 flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <SearchFilters />

          {/* Results Area */}
          <SearchResults />
        </div>
      </div>

      <Footer />
    </main>
  );
}
