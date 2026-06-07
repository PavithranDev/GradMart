"use client";

import { motion } from "framer-motion";
import { Send, Mail, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Info */}
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tight mb-6"
          >
            Let's Build <br className="hidden md:block" />
            <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">Something Great</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[rgba(10,10,10,0.6)] font-medium mb-12 max-w-md"
          >
            Need a custom project? Have questions about a purchase? We are here to help.
          </motion.p>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Email Us</h3>
                <a href="mailto:support@gradmart.in" className="text-lg font-bold text-[#0a0a0a] hover:underline">support@gradmart.in</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Business Hours</h3>
                <p className="text-lg font-bold text-[#0a0a0a]">Mon - Sat</p>
                <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">9 AM - 7 PM</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Link href="/help" className="inline-flex items-center gap-2 bg-white border border-black/10 px-6 py-3 rounded-full text-[14px] font-bold text-[#0a0a0a] hover:bg-black/5 transition-colors shadow-sm">
              <HelpCircle className="w-4 h-4" /> Visit Help Center
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 w-full bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Your Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Subject</label>
              <select required className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                <option value="custom">Request Custom Project</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing & Refunds</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Message</label>
              <textarea required rows={5} placeholder="How can we help you?" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || isSent}
              className={`w-full py-4 rounded-xl font-bold text-[15px] shadow-lg flex items-center justify-center gap-2 transition-all ${
                isSent 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-[#0a0a0a] text-white hover:bg-neutral-800"
              }`}
            >
              {isSubmitting ? "Sending..." : isSent ? "Message Sent!" : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Embedded Map */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-20 w-full h-96 bg-black/5 rounded-[40px] overflow-hidden border border-black/5"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.57348593182!2d-74.00594130000002!3d40.7127847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Core%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1717743015408!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
}
