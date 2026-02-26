import React from "react";
import { Link, useNavigate } from "react-router";
import { Check, Calendar, Video as VideoIcon, Tag, PoundSterling, AlertTriangle, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AppHeader } from "../components/app-header";

export function GigAccepted() {
  const navigate = useNavigate();
  const businessName = "CloudSaaS";

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D]">
      <AppHeader showBack showLogo />
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success Icon */}
        <div className="mt-12 w-20 h-20 bg-[#389C9A] rounded-none flex items-center justify-center mb-6 border-2 border-[#1D1D1D]">
          <Check className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-center">Gig Accepted!</h1>
        <p className="text-sm text-[#1D1D1D]/60 mb-12 text-center font-medium italic">You're now partnered with {businessName}</p>
        
        {/* Campaign Card */}
        <div className="w-full bg-[#F8F8F8] border-2 border-[#1D1D1D] p-8 mb-12 rounded-none">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-none overflow-hidden border border-[#1D1D1D]/10">
              <ImageWithFallback src="https://images.unsplash.com/photo-1644088379091-d574269d422f?w=100&h=100&fit=crop" className="w-full h-full object-cover grayscale" />
            </div>
            <div>
              <h3 className="font-black text-[#1D1D1D] flex items-center gap-2 uppercase italic tracking-tight">
                {businessName}
                <CheckCircle2 className="w-4 h-4 text-[#389C9A]" />
              </h3>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-center gap-4 italic">
              <Calendar className="w-4 h-4 text-[#389C9A]" />
              <span className="text-[12px] font-bold uppercase tracking-tight">Starts 24 Feb 2026</span>
            </div>
            <div className="flex items-center gap-4 italic">
              <VideoIcon className="w-4 h-4 text-[#389C9A]" />
              <span className="text-[12px] font-bold uppercase tracking-tight">Silver · 12 Streams</span>
            </div>
            <div className="flex items-center gap-4 italic">
              <Tag className="w-4 h-4 text-[#389C9A]" />
              <span className="text-[12px] font-bold uppercase tracking-tight">Banner + Code</span>
            </div>
            <div className="flex items-center gap-4 italic">
              <PoundSterling className="w-4 h-4 text-[#389C9A]" />
              <span className="text-[12px] font-black uppercase tracking-tight text-[#389C9A]">£180.00 total</span>
            </div>
          </div>
          
          <div className="h-[1px] bg-[#1D1D1D]/10 my-8" />
          
          <div className="flex items-center gap-2 text-[#FEDB71] bg-[#1D1D1D] p-3 italic">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">45 Min streams required</span>
          </div>
        </div>
      </main>
      
      {/* Bottom Buttons */}
      <div className="px-6 pb-12 flex flex-col gap-4">
        <button 
          onClick={() => navigate("/campaign/1")}
          className="w-full py-6 bg-white border-2 border-[#1D1D1D] text-[#1D1D1D] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:bg-[#F8F8F8] transition-all rounded-none italic"
        >
          View Details <ArrowRight className="w-4 h-4 text-[#FEDB71]" />
        </button>
        <button 
          onClick={() => navigate("/messages/1")}
          className="w-full py-6 bg-[#1D1D1D] text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] rounded-none italic border-2 border-[#1D1D1D]"
        >
          <MessageCircle className="w-5 h-5 text-[#389C9A]" /> Message {businessName}
        </button>
        <Link to="/dashboard" className="block text-center text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40 hover:text-[#1D1D1D] underline transition-colors italic mt-4">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
