"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Users, 
  Target,
  Gem,
  Lightbulb,
  Heart
} from "lucide-react";

export function AboutHero() {
  return (
    <section className="px-4 md:px-12 pt-32 pb-20 max-w-7xl mx-auto w-full text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-[13px] font-bold text-[#0a0a0a] uppercase tracking-wider mb-6"
      >
        <span>Our Story</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-[#0a0a0a] tracking-tight mb-6"
      >
        Built By Students. <br className="hidden md:block" />
        <span className="font-serif italic font-normal text-[rgba(10,10,10,0.6)]">For Students.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-[rgba(10,10,10,0.6)] max-w-2xl mx-auto font-medium"
      >
        GradMart helps engineering students find high-quality, verified project resources to accelerate their learning and ace their final year submissions.
      </motion.p>
    </section>
  );
}

export function AboutMission() {
  return (
    <section className="px-4 md:px-12 py-20 max-w-7xl mx-auto w-full">
      <div className="bg-[#0a0a0a] rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Target className="w-12 h-12 text-white/50 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Our mission is to provide affordable and verified project bundles to every engineering student.
          </h2>
        </div>
      </div>
    </section>
  );
}

export function AboutValues() {
  const values = [
    { title: "Quality", icon: Gem, desc: "Every project is manually reviewed to ensure code quality and documentation standards." },
    { title: "Affordability", icon: Target, desc: "Priced perfectly for student budgets without compromising on the depth of the project." },
    { title: "Innovation", icon: Lightbulb, desc: "We focus on trending technologies like AI, Blockchain, and IoT to keep you ahead." },
    { title: "Community", icon: Users, desc: "A growing ecosystem of creators and learners sharing knowledge and building together." },
  ];

  return (
    <section className="px-4 md:px-12 py-20 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4">Our Values</h2>
        <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium">The principles that guide everything we build.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
              <v.icon className="w-6 h-6 text-[#0a0a0a]" />
            </div>
            <h3 className="text-xl font-bold text-[#0a0a0a] mb-3">{v.title}</h3>
            <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutTimeline() {
  const steps = [
    { title: "The Idea", desc: "Started in a dorm room when we couldn't find reliable reference projects." },
    { title: "Development", desc: "Built the MVP over weekends using Next.js and standard UI libraries." },
    { title: "Launch", desc: "Opened the platform to our first 100 beta testers from local colleges." },
    { title: "Growth", desc: "Now serving thousands of students across the country with premium templates." },
  ];

  return (
    <section className="px-4 md:px-12 py-20 bg-white border-y border-black/5 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4">The Journey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-black/10" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#f5f4ef] rounded-full border-4 border-white flex items-center justify-center font-bold text-[#0a0a0a] shadow-sm mb-6">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-2">{step.title}</h3>
                <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium px-4">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutTrust() {
  const features = [
    { title: "Verified Projects", icon: CheckCircle2 },
    { title: "Secure Payments", icon: ShieldCheck },
    { title: "Instant Downloads", icon: Zap },
    { title: "24/7 Support Team", icon: Heart },
  ];

  return (
    <section className="px-4 md:px-12 py-20 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-6">Why Trust Us?</h2>
          <p className="text-[15px] text-[rgba(10,10,10,0.6)] font-medium leading-relaxed mb-8">
            We understand the stress of final year submissions. That's why we've built a platform that removes the guesswork, providing you with everything you need to succeed instantly and securely.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <f.icon className="w-5 h-5 text-green-600" />
                <span className="font-bold text-[#0a0a0a]">{f.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full bg-white rounded-3xl p-8 border border-black/5 shadow-sm text-center">
           <div className="w-full h-64 bg-[#f5f4ef] rounded-2xl mb-6 flex items-center justify-center">
              <span className="font-bold text-[rgba(10,10,10,0.3)]">Platform UI Preview</span>
           </div>
           <p className="text-[14px] font-bold text-[rgba(10,10,10,0.5)]">Serving 10,000+ Students Worldwide</p>
        </div>
      </div>
    </section>
  );
}

export function AboutCTA() {
  return (
    <section className="px-4 md:px-12 mb-20 max-w-7xl mx-auto w-full">
      <div className="bg-[#f5f4ef] border-2 border-[#0a0a0a] rounded-[40px] p-12 md:p-20 text-center shadow-[8px_8px_0px_0px_rgba(10,10,10,1)]">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0a0a0a] mb-6">
          Ready to Ace Your Project?
        </h2>
        <p className="text-lg text-[rgba(10,10,10,0.6)] font-medium mb-10 max-w-2xl mx-auto">
          Join thousands of students who have successfully submitted their final year projects using GradMart templates.
        </p>
        <Link 
          href="/register"
          className="inline-flex items-center justify-center bg-[#0a0a0a] text-white px-10 py-5 rounded-full font-bold text-[16px] hover:bg-neutral-800 transition-colors shadow-lg"
        >
          Join Thousands of Students
        </Link>
      </div>
    </section>
  );
}
