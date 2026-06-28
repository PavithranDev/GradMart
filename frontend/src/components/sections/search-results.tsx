"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, SearchX, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(searchParams.toString());
        const url = `http://localhost:4000/api/projects?${queryParams.toString()}`;
        const res = await fetch(url);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [searchParams]);

  const clearFilters = () => {
    router.push("/search");
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <div className="w-8 h-8 border-4 border-[#0a0a0a] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[15px] font-medium text-[rgba(10,10,10,0.6)]">Searching projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-[rgba(10,10,10,0.4)]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-4">No Projects Found</h2>
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium max-w-md mb-8">
          We couldn't find any exact matches for your search. Try checking for typos or using more general keywords.
        </p>
        <button onClick={clearFilters} className="bg-white border border-black/10 text-[#0a0a0a] px-8 py-3 rounded-xl font-bold text-[14px] hover:bg-black/5 transition-colors">
          Clear Filters & Search Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <div className="text-[15px] font-medium text-[rgba(10,10,10,0.6)]">
          Showing <span className="font-bold text-[#0a0a0a]">{projects.length}</span> results {q && <>for <span className="font-bold text-[#0a0a0a]">"{q}"</span></>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.05, 0.5) }}
            className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/projects/${project.id}`} className="block">
              {/* Thumbnail */}
              <div className="w-full h-48 relative overflow-hidden bg-[#f5f4ef]">
                {project.thumbnailUrl ? (
                  <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6c3bff]/20 to-[#0a0a0a]/20">
                    <span className="text-[13px] font-bold text-[#0a0a0a]/40">{project.category}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-[11px] font-bold text-[#0a0a0a]">{project.rating || "4.8"}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-1 group-hover:text-[#6c3bff] transition-colors line-clamp-1">{project.title}</h3>
                    <p className="text-[13px] font-medium text-[rgba(10,10,10,0.5)] line-clamp-1">{project.techStack?.join(" • ") || "Technology Stack"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="px-2 py-1 bg-[#f5f4ef] rounded-md text-[11px] font-bold text-[#0a0a0a] uppercase tracking-wider line-clamp-1">{project.category}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="text-[18px] font-black text-[#0a0a0a] tracking-tight">₹{project.price}</span>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
