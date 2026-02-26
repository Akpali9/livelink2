import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Paperclip, Send } from "lucide-react";
import { BottomNav } from "../components/bottom-nav";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function MessageThread() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputText, setInputText] = useState("");
  
  const business = {
    name: "CloudSaaS",
    campaign: "Spring Property Showcase",
    logo: "https://images.unsplash.com/photo-1644088379091-d574269d422f?w=100&h=100&fit=crop"
  };

  const messages = [
    {
      id: 1,
      sender: "business",
      text: "Hi! Really excited to be working with you on this campaign. Please let us know your streaming schedule so we can plan around it.",
      time: "20 Feb, 10:32am"
    },
    {
      id: 2,
      sender: "creator",
      text: "Hi! Likewise, really looking forward to it. I stream Monday, Wednesday and Friday evenings from 7pm. Does that work for you?",
      time: "20 Feb, 11:15am",
      seen: true
    },
    {
      id: 3,
      sender: "business",
      text: "That works perfectly. We'll make sure the banner is ready by Sunday. Let us know if you need anything from us before then.",
      time: "20 Feb, 11:48am"
    },
    {
      id: 4,
      sender: "creator",
      text: "Perfect, I'll also mention the promo code at the start and end of each stream as agreed. See you Monday!",
      time: "20 Feb, 12:05pm",
      seen: true
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-[#1D1D1D]">
      {/* Top Thread Bar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-14 bg-[#1D1D1D] flex items-center px-4 z-50">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex-1 flex items-center gap-3 ml-2">
          <div className="w-8 h-8 rounded-none overflow-hidden border border-white/20 bg-white/10 shrink-0">
            <ImageWithFallback src={business.logo} className="w-full h-full object-cover grayscale" />
          </div>
          <div className="flex flex-col leading-none">
            <h3 className="text-[14px] font-black uppercase tracking-tight text-white">{business.name}</h3>
            <span className="text-[9px] font-bold text-white/60 truncate max-w-[150px] uppercase tracking-widest italic">{business.campaign}</span>
          </div>
        </div>
        
        <button className="text-[10px] font-black uppercase tracking-widest text-white underline italic">
          View Gig
        </button>
      </div>

      {/* Messages Area */}
      <main className="flex-1 pt-14 pb-[120px] overflow-y-auto px-4 flex flex-col">
        <div className="mt-6 mb-8 text-center">
          <div className="inline-block px-4 py-2 bg-[#1D1D1D]/5 rounded-none border border-[#1D1D1D]/5">
            <p className="text-[10px] font-bold italic text-[#1D1D1D]/40 uppercase tracking-tight">
              Campaign accepted 20 Feb 2026 · Use this thread to coordinate your partnership.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.sender === "creator" ? "items-end" : "items-start"}`}
            >
              <div 
                className={`max-w-[75%] p-4 rounded-none text-[13px] leading-relaxed font-medium italic border-2 ${
                  msg.sender === "creator" 
                    ? "bg-[#1D1D1D] text-white border-[#1D1D1D]" 
                    : "bg-[#F8F8F8] text-[#1D1D1D] border-[#1D1D1D]/10"
                }`}
              >
                {msg.text}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[9px] font-bold text-[#1D1D1D]/30 uppercase tracking-widest italic">
                  {msg.time}
                </span>
                {msg.sender === "creator" && msg.seen && (
                  <span className="text-[9px] font-black text-[#389C9A] uppercase tracking-widest italic">Seen</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input Bar */}
      <div className="fixed bottom-[60px] left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[60px] bg-white border-t border-[#1D1D1D]/10 px-4 flex items-center gap-3 z-50">
        <button className="p-2 text-[#1D1D1D]/40 hover:text-[#1D1D1D] transition-colors">
          <Paperclip className="w-5 h-5 text-[#389C9A]" />
        </button>
        
        <div className="flex-1 bg-[#F8F8F8] h-10 rounded-none flex items-center px-4 border border-[#1D1D1D]/10">
          <input 
            type="text" 
            placeholder="Type a message..."
            className="w-full bg-transparent text-xs font-bold uppercase outline-none italic placeholder:text-[#1D1D1D]/20"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        
        <button 
          className={`w-10 h-10 rounded-none flex items-center justify-center transition-all ${
            inputText.trim() 
              ? "bg-[#1D1D1D] text-white scale-100" 
              : "bg-[#1D1D1D]/5 text-[#1D1D1D]/30 scale-95"
          }`}
        >
          <Send className="w-4 h-4 fill-current text-[#FEDB71]" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
