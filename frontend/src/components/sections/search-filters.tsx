"use client";

import { Filter } from "lucide-react";

export function SearchFilters() {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-[#0a0a0a]" />
        <h2 className="text-[16px] font-bold text-[#0a0a0a]">Filters</h2>
      </div>

      <div className="space-y-8">
        
        {/* Sort */}
        <div>
          <h3 className="text-[13px] font-bold text-[#0a0a0a] uppercase tracking-wider mb-3">Sort By</h3>
          <select className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[14px] font-medium text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
            <option>Most Popular</option>
            <option>Newest Arrivals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {/* Pricing */}
        <div>
          <h3 className="text-[13px] font-bold text-[#0a0a0a] uppercase tracking-wider mb-3">Pricing</h3>
          <div className="space-y-2">
            {["All Items", "Free Projects", "Premium Projects"].map((label, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="pricing" defaultChecked={i===0} className="w-4 h-4 border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a]" />
                <span className="text-[14px] font-medium text-[rgba(10,10,10,0.7)] group-hover:text-[#0a0a0a] transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-[13px] font-bold text-[#0a0a0a] uppercase tracking-wider mb-3">Category</h3>
          <div className="space-y-2">
            {["AI & ML", "Web Development", "Mobile Apps", "IoT", "Cyber Security"].map((label, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a]" />
                <span className="text-[14px] font-medium text-[rgba(10,10,10,0.7)] group-hover:text-[#0a0a0a] transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div>
          <h3 className="text-[13px] font-bold text-[#0a0a0a] uppercase tracking-wider mb-3">Technology Stack</h3>
          <div className="space-y-2">
            {["React", "Python", "Node.js", "Java", "Flutter"].map((label, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a]" />
                <span className="text-[14px] font-medium text-[rgba(10,10,10,0.7)] group-hover:text-[#0a0a0a] transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
