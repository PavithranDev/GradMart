"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, BrainCircuit, Activity, ShoppingCart, 
  Eye, ThumbsUp, Code, Database, Search
} from "lucide-react";

// MOCK DATA: AI Recommended Projects
const RECOMMENDED_PROJECTS = [
  {
    id: "proj_1",
    title: "AI Smart Attendance System",
    category: "Machine Learning",
    price: 2500,
    image: "bg-purple-500",
    tags: ["Python", "OpenCV", "TensorFlow"],
    ai_scores: {
      interest: 92,
      popularity: 88,
      purchase_prob: 85,
      confidence: 95,
      reason: "Based on your search history for 'Face Recognition'"
    }
  },
  {
    id: "proj_2",
    title: "E-Commerce Microservices",
    category: "Web Development",
    price: 3200,
    image: "bg-blue-500",
    tags: ["React", "Node.js", "Docker"],
    ai_scores: {
      interest: 88,
      popularity: 95,
      purchase_prob: 78,
      confidence: 82,
      reason: "Students who bought 'Hospital ERP' also bought this"
    }
  },
  {
    id: "proj_3",
    title: "Blockchain Voting App",
    category: "Blockchain",
    price: 4500,
    image: "bg-emerald-500",
    tags: ["Solidity", "Ethereum", "Next.js"],
    ai_scores: {
      interest: 75,
      popularity: 70,
      purchase_prob: 60,
      confidence: 88,
      reason: "Trending in your college 'VIT Vellore'"
    }
  },
  {
    id: "proj_4",
    title: "IoT Smart Home Controller",
    category: "IoT",
    price: 1800,
    image: "bg-amber-500",
    tags: ["Arduino", "Raspberry Pi", "C++"],
    ai_scores: {
      interest: 96,
      popularity: 65,
      purchase_prob: 90,
      confidence: 92,
      reason: "Matches your Wishlist categories"
    }
  }
];

export default function UserRecommendationsPage() {
  const [devMode, setDevMode] = useState(false);
  const [activeSection, setActiveSection] = useState("recommended");

  return (
    <div className="min-h-screen bg-[#f5f4ef] flex flex-col font-sans">
      
      {/* Header */}
      <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[24px]">🎓</span>
          <span className="text-[20px] font-bold tracking-tight">GradMart</span>
        </Link>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-[#f5f4ef] px-4 py-2.5 rounded-full w-[400px]">
          <Search className="w-4 h-4 text-[rgba(10,10,10,0.4)] flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="bg-transparent border-none focus:outline-none text-[13px] font-medium w-full placeholder-[rgba(10,10,10,0.4)] text-[#0a0a0a]"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-[14px]">
            RS
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 lg:p-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-[36px] font-black text-[#0a0a0a] tracking-tight mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" /> For You
            </h1>
            <p className="text-[16px] text-[rgba(10,10,10,0.6)] font-medium">
              Projects curated by our AI based on your history and interests.
            </p>
          </div>

          {/* Dev Mode Toggle */}
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-black/5 shadow-sm w-max">
            <button 
              onClick={() => setDevMode(!devMode)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${devMode ? 'bg-purple-600' : 'bg-black/10'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${devMode ? 'left-[26px]' : 'left-[2px]'}`} />
            </button>
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#0a0a0a]">
              <BrainCircuit className={`w-4 h-4 ${devMode ? 'text-purple-600' : 'text-[rgba(10,10,10,0.4)]'}`} />
              AI Scoring Mode
            </div>
          </div>
        </div>

        {/* Sections Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10">
          {[
            { id: "recommended", label: "Recommended For You", icon: Sparkles },
            { id: "trending", label: "Trending Projects", icon: Activity },
            { id: "bought", label: "Students Also Bought", icon: ShoppingCart },
            { id: "similar", label: "Similar Projects", icon: Code },
            { id: "viewed", label: "Recently Viewed", icon: Eye },
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-5 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeSection === sec.id 
                  ? "bg-[#0a0a0a] text-white" 
                  : "bg-white text-[rgba(10,10,10,0.6)] hover:bg-black/5 border border-black/5"
              }`}
            >
              <sec.icon className="w-4 h-4" /> {sec.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECOMMENDED_PROJECTS.map(project => (
            <div key={project.id} className="group relative bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-shadow cursor-pointer h-full">
              
              {/* Project Image Placeholder */}
              <div className={`w-full aspect-video ${project.image} relative overflow-hidden`}>
                {/* AI Dev Mode Overlay */}
                {devMode && (
                  <div className="absolute inset-0 bg-black/80 p-4 backdrop-blur-sm z-20 flex flex-col justify-center gap-3">
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">AI Diagnostics</div>
                    
                    <div>
                      <div className="flex justify-between text-[11px] text-white/80 font-bold mb-1">
                        <span>Interest Score</span>
                        <span className="text-green-400">{project.ai_scores.interest}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400" style={{ width: `${project.ai_scores.interest}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-white/80 font-bold mb-1">
                        <span>Popularity</span>
                        <span className="text-blue-400">{project.ai_scores.popularity}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400" style={{ width: `${project.ai_scores.popularity}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-white/80 font-bold mb-1">
                        <span>Purchase Prob.</span>
                        <span className="text-purple-400">{project.ai_scores.purchase_prob}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400" style={{ width: `${project.ai_scores.purchase_prob}%` }} />
                      </div>
                    </div>

                    <div className="mt-2 text-[10px] text-white/60 font-medium italic border-t border-white/20 pt-2">
                      Model Confidence: {project.ai_scores.confidence}%
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1 relative z-10">
                {/* AI Reason Badge */}
                <div className="bg-purple-50 text-purple-700 text-[11px] font-bold px-3 py-1.5 rounded-lg mb-4 inline-flex items-center gap-1.5 self-start">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  {project.ai_scores.reason}
                </div>

                <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-2 leading-snug">
                  {project.title}
                </h3>
                
                <div className="text-[13px] font-medium text-[rgba(10,10,10,0.5)] mb-4">
                  {project.category}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#f5f4ef] text-[rgba(10,10,10,0.6)] px-2 py-1 rounded text-[11px] font-bold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                  <div className="text-[18px] font-black text-[#0a0a0a]">
                    ₹{project.price.toLocaleString('en-IN')}
                  </div>
                  <button className="bg-[#0a0a0a] text-white p-2 rounded-xl hover:bg-neutral-800 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
