"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export function WhyGradMart() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why Choose <span className="font-serif italic text-accent-blue font-normal">GradMart</span>
          </h2>
          <p className="text-muted text-lg">
            See how we stack up against the alternatives. We provide complete solutions, not just code snippets.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-2 sm:p-8 shadow-xl border border-neutral-100 max-w-5xl mx-auto overflow-x-auto"
        >
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="p-6 text-lg font-medium text-muted w-1/4">Features</th>
                <th className="p-6 text-xl font-bold text-accent-blue w-1/4 bg-blue-50/50 rounded-t-2xl">GradMart</th>
                <th className="p-6 text-lg font-medium text-foreground w-1/4">GitHub</th>
                <th className="p-6 text-lg font-medium text-foreground w-1/4">Random Sellers</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Source Code", gm: true, gh: true, rs: true },
                { feature: "Project Report", gm: true, gh: false, rs: false },
                { feature: "PPT Presentation", gm: true, gh: false, rs: false },
                { feature: "Setup Guide", gm: true, gh: "Varies", rs: false },
                { feature: "Dedicated Support", gm: true, gh: false, rs: "Varies" },
                { feature: "Verified Quality", gm: true, gh: "Varies", rs: false },
              ].map((row, index) => (
                <tr key={index} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                  <td className="p-6 font-medium text-foreground">{row.feature}</td>
                  <td className="p-6 bg-blue-50/30">
                    <CheckCircle2 className="w-6 h-6 text-accent-blue" />
                  </td>
                  <td className="p-6 text-muted">
                    {row.gh === true ? <CheckCircle2 className="w-6 h-6 text-neutral-400" /> : 
                     row.gh === false ? <XCircle className="w-6 h-6 text-neutral-300" /> : 
                     <span className="text-sm font-medium bg-neutral-100 px-3 py-1 rounded-full">{row.gh}</span>}
                  </td>
                  <td className="p-6 text-muted">
                    {row.rs === true ? <CheckCircle2 className="w-6 h-6 text-neutral-400" /> : 
                     row.rs === false ? <XCircle className="w-6 h-6 text-neutral-300" /> : 
                     <span className="text-sm font-medium bg-neutral-100 px-3 py-1 rounded-full">{row.rs}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
