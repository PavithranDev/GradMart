"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Bot, Send, User, Sparkles, Terminal, FileText, 
  HelpCircle, ChevronRight, BarChart3, TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string | React.ReactNode;
  timestamp: string;
};

const SUGGESTIONS = {
  questions: ["Show revenue this month", "Top selling projects", "Refund requests today", "Inactive users", "Highest performing seller"],
  actions: ["Generate coupon", "Send campaign", "Create report", "Approve seller", "Flag fraud"],
  reports: ["Weekly Summary", "Monthly Revenue", "Growth Analysis", "Project Trends", "User Trends"]
};

export default function AdminAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init_1",
      role: "ai",
      content: "Hello! I am your GradMart AI Assistant. I have full access to our database, CRM, and revenue metrics. How can I help you today?",
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: "Just now"
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      let aiContent: React.ReactNode = "I understand. I'm still learning to process that specific request. Please try another query from the left panel!";
      
      // Hardcoded Mock Response for "Show revenue this month"
      if (text.toLowerCase().includes("revenue this month")) {
        aiContent = (
          <div className="space-y-4">
            <p>Here is the revenue breakdown for <strong>this month (October)</strong>.</p>
            <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[13px] uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" /> Gross Revenue
                </div>
                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">+14.2%</span>
              </div>
              <div className="text-[36px] font-black text-[#0a0a0a] tracking-tight leading-none mb-1">
                ₹8,45,200
              </div>
              <div className="text-[13px] font-medium text-[rgba(10,10,10,0.5)]">
                vs ₹7,40,100 last month
              </div>
              <div className="mt-6 pt-4 border-t border-black/5 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Sales</div>
                  <div className="text-[16px] font-bold text-[#0a0a0a]">342</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[rgba(10,10,10,0.5)] uppercase tracking-wider mb-1">Avg Order</div>
                  <div className="text-[16px] font-bold text-[#0a0a0a]">₹2,471</div>
                </div>
              </div>
            </div>
            <p className="text-[14px]">I've also generated a detailed PDF report and sent it to your email.</p>
          </div>
        );
      } else if (text.toLowerCase().includes("top selling projects")) {
        aiContent = (
          <div className="space-y-4">
            <p>Here are the top 3 selling projects over the last 30 days:</p>
            <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm w-full max-w-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-black/5 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 text-amber-700 font-black flex items-center justify-center rounded-full text-[12px]">#1</div>
                    <span className="font-bold text-[#0a0a0a] text-[14px]">Hospital ERP System</span>
                  </div>
                  <span className="font-bold text-emerald-600">142 Sales</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-black/5 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 text-slate-700 font-black flex items-center justify-center rounded-full text-[12px]">#2</div>
                    <span className="font-bold text-[#0a0a0a] text-[14px]">AI Smart Attendance</span>
                  </div>
                  <span className="font-bold text-emerald-600">98 Sales</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-black/5 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-900/10 text-amber-900 font-black flex items-center justify-center rounded-full text-[12px]">#3</div>
                    <span className="font-bold text-[#0a0a0a] text-[14px]">IoT Home Automation</span>
                  </div>
                  <span className="font-bold text-emerald-600">75 Sales</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      const newAiMsg: Message = {
        id: Math.random().toString(),
        role: "ai",
        content: aiContent,
        timestamp: "Just now"
      };

      setIsTyping(false);
      setMessages(prev => [...prev, newAiMsg]);
    }, 1500);
  };

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-[#f5f4ef] font-sans">
      
      {/* Left Pane: Command Center */}
      <div className="w-[320px] bg-white border-r border-black/5 h-full flex flex-col flex-shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        
        <div className="p-6 border-b border-black/5 flex-shrink-0">
          <div className="w-12 h-12 bg-[#0a0a0a] rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-black/10">
            <Bot className="w-6 h-6" />
          </div>
          <h1 className="text-[20px] font-black text-[#0a0a0a] tracking-tight leading-tight">Admin Assistant</h1>
          <p className="text-[13px] text-[rgba(10,10,10,0.5)] font-medium mt-1">
            Query data, generate reports, and automate tasks instantly.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          
          {/* Questions */}
          <div>
            <h2 className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] uppercase tracking-widest mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Data Queries
            </h2>
            <div className="flex flex-col gap-1.5">
              {SUGGESTIONS.questions.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(q)}
                  className="text-left px-3 py-2.5 rounded-xl hover:bg-black/[0.03] text-[13px] font-bold text-[rgba(10,10,10,0.7)] hover:text-[#0a0a0a] transition-all flex items-center justify-between group"
                >
                  {q} <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h2 className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] uppercase tracking-widest mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Quick Actions
            </h2>
            <div className="flex flex-col gap-1.5">
              {SUGGESTIONS.actions.map((a, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(a)} 
                  className="text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 text-[13px] font-bold text-blue-700 transition-all flex items-center justify-between group"
                >
                  {a} <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Reports */}
          <div>
            <h2 className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] uppercase tracking-widest mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Generate Reports
            </h2>
            <div className="flex flex-col gap-1.5">
              {SUGGESTIONS.reports.map((r, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(`Generate ${r}`)}
                  className="text-left px-3 py-2.5 rounded-xl hover:bg-purple-50 text-[13px] font-bold text-purple-700 transition-all flex items-center justify-between group"
                >
                  {r} <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Pane: Chat Interface */}
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 hide-scrollbar pb-32">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.role === "user" ? "bg-emerald-500 text-[#0a0a0a]" : "bg-white border border-black/5 text-[#0a0a0a]"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`px-5 py-3.5 rounded-2xl max-w-2xl shadow-sm text-[15px] leading-relaxed font-medium ${
                    msg.role === "user" 
                      ? "bg-[#0a0a0a] text-white rounded-tr-sm" 
                      : "bg-white border border-black/5 text-[#0a0a0a] rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[11px] font-bold text-[rgba(10,10,10,0.4)] mt-2 mx-1">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 flex-row"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 text-[#0a0a0a] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white border border-black/5 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[52px]">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-[rgba(10,10,10,0.3)]" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-[rgba(10,10,10,0.3)]" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-[rgba(10,10,10,0.3)]" />
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-10 pb-8 bg-gradient-to-t from-[#f5f4ef] via-[#f5f4ef] to-transparent">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-purple-500/5 blur-xl rounded-[32px] group-focus-within:bg-purple-500/10 transition-colors" />
            <div className="relative bg-white border-2 border-black/5 rounded-[32px] p-2 pr-4 flex items-center shadow-lg focus-within:border-purple-500/30 transition-colors">
              <button className="w-12 h-12 flex items-center justify-center text-[rgba(10,10,10,0.4)] hover:text-[#0a0a0a] transition-colors">
                <Sparkles className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Ask about revenue, sellers, or request a report..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-[15px] font-medium placeholder-[rgba(10,10,10,0.4)] text-[#0a0a0a]"
              />
              <button 
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:hover:bg-[#0a0a0a]"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            <div className="text-center mt-3 text-[11px] font-bold text-[rgba(10,10,10,0.4)]">
              AI Assistant can make mistakes. Verify critical actions before approving.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
