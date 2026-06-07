"use client";

import { motion } from "framer-motion";
import { Check, Star, Users } from "lucide-react";
import Link from "next/link";

export function PricingCards() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "Forever",
      description: "Perfect for students just starting out.",
      features: ["Browse Projects", "Save to Wishlist", "Basic Support"],
      buttonText: "Get Started Free",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Premium",
      price: "₹299",
      period: "/month",
      description: "Everything you need to ace your final year.",
      features: [
        "Unlimited Downloads",
        "Priority 24/7 Support",
        "Exclusive Projects",
        "Premium Member Badge",
      ],
      buttonText: "Upgrade to Premium",
      buttonVariant: "solid",
      popular: true,
    },
    {
      name: "Team",
      price: "₹999",
      period: "/month",
      description: "For project groups and class cohorts.",
      features: [
        "Multiple Accounts (Up to 5)",
        "Bulk Discounts",
        "Custom Project Solutions",
        "Dedicated Account Manager",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false,
    },
  ];

  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a0a0a] tracking-tight mb-6"
        >
          Choose Your <br />
          <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">Learning Plan</span>
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-[32px] p-8 ${
              plan.popular 
                ? 'border-2 border-[#0a0a0a] shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] scale-105 z-10' 
                : 'border border-black/10 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-white" /> Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#0a0a0a] mb-2">{plan.name}</h3>
              <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium h-10">{plan.description}</p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-black text-[#0a0a0a] tracking-tight">{plan.price}</span>
              <span className="text-[15px] font-bold text-[rgba(10,10,10,0.5)]">{plan.period}</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-purple-100 text-purple-600' : 'bg-black/5 text-[#0a0a0a]'}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[14px] font-bold text-[#0a0a0a]">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/register"
              className={`w-full block text-center py-4 rounded-xl font-bold text-[15px] transition-all ${
                plan.buttonVariant === 'solid'
                  ? 'bg-[#0a0a0a] text-white hover:bg-neutral-800 shadow-lg'
                  : 'bg-transparent text-[#0a0a0a] border-2 border-black/10 hover:border-[#0a0a0a]'
              }`}
            >
              {plan.buttonText}
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-32 bg-[#f5f4ef] border border-black/5 rounded-[40px] p-12 text-center max-w-4xl mx-auto"
      >
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-black/5">
          <Users className="w-8 h-8 text-[#0a0a0a]" />
        </div>
        <h2 className="text-3xl font-bold text-[#0a0a0a] mb-4">Start Learning Today</h2>
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium mb-8 max-w-xl mx-auto">
          Join thousands of engineering students who are already using GradMart to accelerate their development skills.
        </p>
        <Link 
          href="/register"
          className="inline-flex bg-[#0a0a0a] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-neutral-800 transition-colors shadow-lg"
        >
          Create Free Account
        </Link>
      </motion.div>

    </section>
  );
}
