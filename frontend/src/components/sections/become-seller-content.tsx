"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  Wallet, 
  BarChart3, 
  ShieldCheck, 
  ChevronDown,
  ArrowRight,
  Code2,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const SELLER_FEATURES = [
  {
    icon: UploadCloud,
    title: "Upload Projects",
    description: "Easily upload your source code, reports, and setup guides through our intuitive creator dashboard."
  },
  {
    icon: Wallet,
    title: "Earn Revenue",
    description: "Set your own prices and earn up to 80% commission on every successful sale you make."
  },
  {
    icon: BarChart3,
    title: "Track Analytics",
    description: "Monitor your views, downloads, and revenue in real-time with comprehensive analytics."
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description: "We handle payments, file hosting, and customer support so you can focus on building."
  }
];

const SELLER_FAQS = [
  {
    question: "How much commission do I earn?",
    answer: "Creators earn a flat 80% commission on every sale. We take a 20% platform fee to cover payment gateways, hosting, and marketing."
  },
  {
    question: "When do I get paid?",
    answer: "You can request a withdrawal anytime your balance exceeds ₹1,000. Payments are processed within 48 hours directly to your bank account."
  },
  {
    question: "What type of projects can I sell?",
    answer: "You can sell complete engineering projects, including Mini Projects and Final Year Projects. They must include working source code and documentation."
  },
  {
    question: "Do I need to provide support?",
    answer: "While basic setup guides are required, our GradMart support team handles first-level customer queries. You only step in for complex code issues."
  }
];

export function BecomeSellerContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplied(true);
    }, 2000);
  };

  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full">
      
      {/* Hero Section */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider mb-8"
        >
          <Code2 className="w-4 h-4" /> Creator Program
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tight mb-6"
        >
          Turn Your Projects <br className="hidden md:block" />
          <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">Into Income</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-[rgba(10,10,10,0.6)] font-medium max-w-2xl mx-auto"
        >
          Join hundreds of top engineering students monetizing their hard work. Upload your academic projects and start earning today.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {SELLER_FEATURES.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm hover:border-black/10 transition-colors"
          >
            <div className="w-12 h-12 bg-[#0a0a0a] text-white rounded-2xl flex items-center justify-center mb-6">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-2">{feature.title}</h3>
            <p className="text-[14px] font-medium text-[rgba(10,10,10,0.6)] leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout: Apply Form & FAQ */}
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Apply Form */}
        <div className="flex-1 w-full bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm h-fit">
          <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">Apply to be a Seller</h2>
          <p className="text-[14px] font-medium text-[rgba(10,10,10,0.6)] mb-8">We review all applications manually to ensure high-quality content on GradMart.</p>
          
          {!isApplied ? (
            <form onSubmit={handleApply} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">LinkedIn Profile / Portfolio Link</label>
                  <input required type="url" placeholder="https://linkedin.com/in/johndoe" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Primary Tech Stack</label>
                  <input required type="text" placeholder="e.g. MERN, Python, Java" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Why do you want to sell on GradMart?</label>
                  <textarea required rows={4} placeholder="Tell us briefly about the projects you plan to upload..." className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#0a0a0a] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">Application Received!</h2>
              <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium">
                We'll review your application and get back to you within 24-48 hours. Keep an eye on your email!
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Side: FAQ */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-[#0a0a0a] mb-8">Seller FAQs</h2>
          <div className="space-y-4">
            {SELLER_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl border transition-colors duration-300 overflow-hidden ${isOpen ? 'border-[#0a0a0a] shadow-sm' : 'border-black/5'}`}
                >
                  <button 
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-[15px] font-bold text-[#0a0a0a]">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${isOpen ? 'bg-[#0a0a0a] text-white' : 'bg-black/5 text-[#0a0a0a]'}`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-[14px] text-[rgba(10,10,10,0.6)] font-medium leading-relaxed border-t border-black/5 mt-2">
                          <div className="pt-4">{faq.answer}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 bg-[#f5f4ef] border border-black/5 rounded-3xl p-8 text-center">
            <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-2">Still have questions?</h3>
            <p className="text-[14px] font-medium text-[rgba(10,10,10,0.6)] mb-4">Contact our creator support team directly.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white border border-black/10 text-[#0a0a0a] px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-black/5 transition-colors">
              Contact Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}
