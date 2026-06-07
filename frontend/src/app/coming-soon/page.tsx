"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f4ef] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Abstract Animated Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#6c3bff]/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 max-w-2xl w-full"
      >
        <div className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider mb-8 border border-black/10 shadow-sm">
          <Sparkles className="w-4 h-4 text-yellow-400" /> Coming Soon
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-[#0a0a0a] mb-6 tracking-tight leading-tight">
          Something <span className="font-serif italic font-normal text-[rgba(10,10,10,0.5)]">Amazing</span> <br /> Is In The Works.
        </h1>
        
        <p className="text-lg text-[rgba(10,10,10,0.6)] font-medium mb-12 max-w-xl mx-auto leading-relaxed">
          We're currently building a revolutionary new feature for GradMart. Be the first to know when we launch and get exclusive early access.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-16">
            <input 
              type="email" 
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 text-[15px] text-[#0a0a0a] placeholder-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#6c3bff] shadow-sm"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-colors whitespace-nowrap shadow-lg"
            >
              Notify Me <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl max-w-md mx-auto mb-16"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" /> 
            <span className="font-bold text-[14px]">You're on the list! We'll be in touch.</span>
          </motion.div>
        )}

        <Link href="/" className="text-[rgba(10,10,10,0.4)] hover:text-[#0a0a0a] font-bold text-[13px] uppercase tracking-wider transition-colors">
          Return to Homepage
        </Link>
      </motion.div>
    </div>
  );
}
