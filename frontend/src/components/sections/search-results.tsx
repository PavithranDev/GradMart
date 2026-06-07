"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, SearchX, ArrowRight } from "lucide-react";

// Set to true to see Empty State
const isEmpty = false; 

const MOCK_RESULTS = [
  { id: 1, title: "AI Smart Attendance", category: "AI & ML", tech: "React • Python", price: "₹499", rating: 4.9, image: "#8b5cf6" },
  { id: 2, title: "Campus ERP System", category: "Web Dev", tech: "Next.js • Node", price: "₹499", rating: 4.8, image: "#e8430a" },
  { id: 3, title: "Food Delivery App", category: "Mobile Apps", tech: "Flutter • Firebase", price: "Free", rating: 4.7, image: "#6c3bff" },
  { id: 4, title: "Hospital Management", category: "Java", tech: "Java Spring • MySQL", price: "₹499", rating: 4.5, image: "#1a3a2a" },
  { id: 5, title: "IoT Smart Farming", category: "IoT", tech: "Arduino • React", price: "₹499", rating: 4.9, image: "#ea580c" },
  { id: 6, title: "Library System", category: "Python", tech: "Django • PostgreSQL", price: "Free", rating: 4.6, image: "#059669" },
];

export function SearchResults() {
  if (isEmpty) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-[rgba(10,10,10,0.4)]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-4">No Projects Found</h2>
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium max-w-md mb-8">
          We couldn't find any exact matches for your search. Try checking for typos or using more general keywords.
        </p>
        <button className="bg-white border border-black/10 text-[#0a0a0a] px-8 py-3 rounded-xl font-bold text-[14px] hover:bg-black/5 transition-colors">
          Clear Filters & Search Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <div className="text-[15px] font-medium text-[rgba(10,10,10,0.6)]">
          Showing <span className="font-bold text-[#0a0a0a]">{MOCK_RESULTS.length}</span> results for <span className="font-bold text-[#0a0a0a]">"React"</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RESULTS.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/projects/${project.id}`} className="block">
              {/* Thumbnail */}
              <div className="w-full h-48 relative overflow-hidden" style={{ background: project.image }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-[11px] font-bold text-[#0a0a0a]">{project.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-1 group-hover:text-[#6c3bff] transition-colors">{project.title}</h3>
                    <p className="text-[13px] font-medium text-[rgba(10,10,10,0.5)]">{project.tech}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="px-2 py-1 bg-[#f5f4ef] rounded-md text-[11px] font-bold text-[#0a0a0a] uppercase tracking-wider">{project.category}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="text-[18px] font-black text-[#0a0a0a] tracking-tight">{project.price}</span>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination (Mock) */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0a0a0a] text-white text-[13px] font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-[#0a0a0a] text-[13px] font-bold transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-[#0a0a0a] text-[13px] font-bold transition-colors">3</button>
          <span className="px-2 text-[rgba(10,10,10,0.4)]">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-[#0a0a0a] text-[13px] font-bold transition-colors">8</button>
        </div>
      </div>
    </div>
  );
}
