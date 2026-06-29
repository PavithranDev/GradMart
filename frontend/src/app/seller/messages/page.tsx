"use client";

import { apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";
import { Search, Send, MessageSquare, HeadphonesIcon, HelpCircle, User, Loader2 } from "lucide-react";

export default function SellerMessagesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const fetchConversations = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/messages`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setConversations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const loadFullConversation = (convId: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/messages/${convId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setActiveChat(data);
      })
      .catch(console.error);
  };

  const handleSelectChat = (conv: any) => {
    setActiveChat({ ...conv, messages: [] }); // optimistic UI
    loadFullConversation(conv.id);
  };

  const handleSend = async () => {
    if (!replyText.trim() || !activeChat) return;
    setIsSending(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/messages/${activeChat.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText })
      });

      if (res.ok) {
        setReplyText("");
        loadFullConversation(activeChat.id);
        fetchConversations(); // refresh sidebar to update latest msg
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  // Mock filtering for UI since we don't strictly separate student vs support yet
  const filteredChats = activeTab === "all" ? conversations : conversations;

  if (loading) {
    return (
      <div className="flex-1 w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-[calc(100vh-80px)] lg:h-screen p-6 overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Messages</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Communicate with students and support.</p>
      </div>

      <div className="flex-1 bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden flex">
        
        {/* Left Sidebar (Chats List) */}
        <div className="w-full md:w-[350px] lg:w-[400px] border-r border-black/5 flex flex-col bg-[#fcfcfc] flex-shrink-0">
          
          <div className="p-6 border-b border-black/5 flex-shrink-0">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(10,10,10,0.4)]" />
              <input 
                type="text"
                placeholder="Search messages..."
                className="w-full bg-white border border-black/5 rounded-full py-2.5 pl-11 pr-4 text-[13px] font-medium focus:outline-none focus:border-[#0a0a0a]/20 focus:ring-1 focus:ring-[#0a0a0a]/20"
              />
            </div>
            
            <div className="flex overflow-x-auto hide-scrollbar gap-2">
              {[
                { id: "all", label: "All" },
                { id: "student", label: "Questions" },
                { id: "custom", label: "Custom Requests" },
                { id: "support", label: "Support" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? "bg-[#0a0a0a] text-white" 
                      : "bg-white border border-black/5 text-[rgba(10,10,10,0.6)] hover:bg-black/5 hover:text-[#0a0a0a]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 && (
              <div className="p-8 text-center text-black/40 text-[13px] font-medium">
                No messages found.
              </div>
            )}
            {filteredChats.map(conv => {
              const latestMsg = conv.messages?.[0]?.content || "No messages yet";
              // Display name: usually the buyer is the person you're talking to if you're the seller.
              const otherPersonName = conv.buyer?.name || "User";
              
              return (
                <div 
                  key={conv.id}
                  onClick={() => handleSelectChat(conv)}
                  className={`p-4 border-b border-black/5 cursor-pointer transition-colors ${
                    activeChat?.id === conv.id ? "bg-[#0a0a0a]/5" : "hover:bg-[#0a0a0a]/[0.02]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-[rgba(10,10,10,0.6)]" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#0a0a0a] line-clamp-1">{otherPersonName}</div>
                        <div className="text-[12px] font-bold text-[rgba(10,10,10,0.5)]">{conv.subject}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-[13px] text-[rgba(10,10,10,0.6)] line-clamp-1 flex-1">
                      {latestMsg}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Active Conversation */}
        {activeChat ? (
          <div className="flex-1 flex flex-col hidden md:flex">
            
            {/* Chat Header */}
            <div className="h-20 border-b border-black/5 flex items-center justify-between px-8 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <User className="w-5 h-5 text-[rgba(10,10,10,0.6)]" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0a0a0a]">{activeChat.buyer?.name || "User"}</h2>
                  <p className="text-[13px] font-medium text-[rgba(10,10,10,0.5)]">{activeChat.subject}</p>
                </div>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#fcfcfc]">
              <div className="flex flex-col gap-6">
                {activeChat.messages?.map((msg: any) => (
                  <div key={msg.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-[rgba(10,10,10,0.6)]" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[14px] font-bold text-[#0a0a0a]">{msg.sender?.name || "User"}</span>
                        <span className="text-[11px] font-bold text-[rgba(10,10,10,0.4)]">
                          {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <div className="bg-white border border-black/5 p-4 rounded-2xl rounded-tl-none shadow-sm text-[14px] text-[rgba(10,10,10,0.8)] leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-black/5 bg-white flex-shrink-0">
              <div className="flex items-end gap-4 relative">
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="w-full bg-[#fcfcfc] border border-black/5 rounded-2xl p-4 pr-16 resize-none focus:outline-none focus:border-[#0a0a0a]/20 focus:ring-1 focus:ring-[#0a0a0a]/20 text-[14px]"
                  rows={3}
                  placeholder="Type your reply here..."
                />
                <button 
                  onClick={handleSend}
                  disabled={isSending || !replyText.trim()}
                  className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] font-medium text-[rgba(10,10,10,0.4)] mt-2 ml-2">
                Press Enter to send, Shift + Enter for new line.
              </p>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col hidden md:flex items-center justify-center text-black/40">
            <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-[14px] font-medium">Select a conversation to start messaging</p>
          </div>
        )}

      </div>
    </div>
  );
}
