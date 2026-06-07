"use client";

import { motion } from "framer-motion";
import { Brain, Code, Terminal, Database, Wifi, Shield, Smartphone, Link as LinkIcon } from "lucide-react";

const CATEGORIES = [
  { name: "AI & ML", icon: Brain, color: "text-accent-purple", bg: "bg-accent-purple/10" },
  { name: "MERN Stack", icon: Code, color: "text-accent-orange", bg: "bg-accent-orange/10" },
  { name: "Java", icon: Terminal, color: "text-accent-green", bg: "bg-accent-green/10" },
  { name: "Python", icon: Terminal, color: "text-accent-blue", bg: "bg-accent-blue/10" },
  { name: "Cloud", icon: Database, color: "text-accent-pink", bg: "bg-accent-pink/10" },
  { name: "IoT", icon: Wifi, color: "text-accent-purple", bg: "bg-accent-purple/10" },
  { name: "Cyber Security", icon: Shield, color: "text-accent-orange", bg: "bg-accent-orange/10" },
  { name: "Mobile Apps", icon: Smartphone, color: "text-accent-blue", bg: "bg-accent-blue/10" },
  { name: "Blockchain", icon: LinkIcon, color: "text-accent-green", bg: "bg-accent-green/10" },
];

export function Categories() {
  return (
    <section id="categories" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Explore by <span className="font-serif italic text-accent-orange font-normal">Category</span>
          </h2>
          <p className="text-muted text-lg">
            Find the perfect project in your preferred technology stack. We support all major languages and frameworks.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`p-4 rounded-full ${category.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-foreground">{category.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
