"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What is GradMart?",
    answer: "GradMart is a premium marketplace designed specifically for engineering students. We provide high-quality, verified project templates complete with source code, reports, PPTs, and setup guides to help you ace your final year submissions."
  },
  {
    question: "How do I buy a project?",
    answer: "Browse our collection of projects or use the global search. Once you find a project you like, click 'Buy Now' to proceed to our secure checkout page. We support UPI, Cards, Net Banking, and Wallets via Razorpay."
  },
  {
    question: "What files are included?",
    answer: "Every premium project bundle includes the complete Source Code, a detailed Project Report (PDF/Doc), a Presentation (PPT), a Database Script (if applicable), and a comprehensive Setup Guide with step-by-step instructions."
  },
  {
    question: "Will I get source code?",
    answer: "Absolutely! The complete, uncompiled source code is included in every purchase so you can study, run, and modify the project locally."
  },
  {
    question: "Can I edit the project?",
    answer: "Yes, you have full freedom to edit, modify, and customize the source code to fit your specific college requirements or to add your own unique features."
  },
  {
    question: "How do I download after payment?",
    answer: "Immediately after a successful payment, you will be redirected to your Student Dashboard where your purchased project will be available for instant download under the 'My Purchases' section."
  },
  {
    question: "Can I request a custom project?",
    answer: "Yes! If you can't find what you're looking for, you can request a custom project via our Contact page. Our team of verified creators will build it according to your exact specifications."
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the digital nature of our products, we generally do not offer refunds once a project has been downloaded. However, if the source code is fundamentally broken or not as described, please contact support within 3 days for a resolution."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team 24/7 via the Contact Page, or email us directly at support@gradmart.in. We aim to respond to all technical queries within a few hours."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-3xl mx-auto w-full">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] tracking-tight mb-4"
        >
          Frequently Asked <br />
          <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">Questions</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[rgba(10,10,10,0.6)] font-medium"
        >
          Everything you need to know about purchasing and using GradMart projects.
        </motion.p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl border transition-colors duration-300 overflow-hidden ${isOpen ? 'border-[#0a0a0a] shadow-sm' : 'border-black/5 hover:border-black/10'}`}
            >
              <button 
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-[16px] font-bold text-[#0a0a0a] pr-8">{faq.question}</span>
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-[15px] text-[rgba(10,10,10,0.6)] font-medium leading-relaxed border-t border-black/5 mt-2">
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
