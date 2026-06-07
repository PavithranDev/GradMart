"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, HeartCrack, ShoppingCart, Trash2 } from "lucide-react";

const INITIAL_WISHLIST = [
  { id: 1, title: "AI Smart Attendance", category: "AI & ML", price: "₹499", image: "#8b5cf6" },
  { id: 2, title: "Campus ERP System", category: "Web Dev", price: "₹499", image: "#e8430a" },
  { id: 3, title: "Food Delivery App", category: "Mobile Apps", price: "Free", image: "#6c3bff" },
];

export function WishlistGrid() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const removeItem = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 lg:py-32 text-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6"
        >
          <HeartCrack className="w-10 h-10 text-red-400" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-4">Your wishlist is empty</h2>
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium max-w-md mb-8">
          You haven't saved any projects yet. Start exploring our premium templates and add them to your wishlist.
        </p>
        <Link 
          href="/projects"
          className="bg-[#0a0a0a] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2"
        >
          Browse Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-12 py-12 lg:py-20">
      
      <div className="mb-10 flex items-center gap-3">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
          <Heart className="w-6 h-6 fill-red-500" />
        </div>
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Saved Projects</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">You have {wishlist.length} items in your wishlist.</p>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlist.map((project) => (
            <motion.div 
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="w-full h-48 relative overflow-hidden" style={{ background: project.image }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                
                {/* Remove Button (Floating) */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(project.id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <Link href={`/projects/${project.id}`}>
                  <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-1 group-hover:text-[#6c3bff] transition-colors line-clamp-1">{project.title}</h3>
                  <p className="text-[13px] font-medium text-[rgba(10,10,10,0.5)] mb-4">{project.category}</p>
                  <div className="text-[18px] font-black text-[#0a0a0a] tracking-tight mb-6">{project.price}</div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-[#0a0a0a] text-white py-3 rounded-xl font-bold text-[13px] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Move to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
