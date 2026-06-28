"use client";

import { Search, History, TrendingUp, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    router.push(`/search`);
  };

  return (
    <section className="px-4 md:px-12 pt-32 pb-10 max-w-7xl mx-auto w-full border-b border-black/5">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Large Search Input */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-[#0a0a0a]/40 group-focus-within:text-[#6c3bff] transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-16 pr-12 py-5 bg-white border-2 border-black/5 rounded-[24px] text-[18px] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#0a0a0a] focus:ring-0 transition-all shadow-sm focus:shadow-md"
            placeholder="Search for 'React Admin Dashboard'..."
            autoFocus
          />
          {query && (
            <button 
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-6 flex items-center"
            >
              <X className="h-5 w-5 text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors" />
            </button>
          )}
        </form>

        {/* Suggestions & Tags */}
        <div className="mt-8 flex flex-col sm:flex-row gap-8">
          {/* Recent Searches */}
          <div className="flex-1">
            <h3 className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <History className="w-4 h-4" /> Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Python Face Recognition", "Hospital Management Java", "MERN Stack E-commerce"].map((term, i) => (
                <button key={i} className="px-4 py-2 bg-black/5 hover:bg-black/10 rounded-xl text-[13px] font-semibold text-[#0a0a0a] transition-colors">
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex-1">
            <h3 className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Django", "IoT", "Machine Learning"].map((tag, i) => (
                <button key={i} className="px-4 py-2 border border-black/10 hover:border-[#6c3bff] hover:text-[#6c3bff] rounded-xl text-[13px] font-semibold text-[#0a0a0a]/70 transition-colors">
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
