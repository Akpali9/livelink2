import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { 
  Lock, 
  MessageCircle, 
  ArrowRight, 
  Calendar, 
  Video as VideoIcon, 
  Tag, 
  PoundSterling,
  AlertTriangle,
  ChevronRight,
  Clock
} from "lucide-react";
import { motion } from "motion/react";
import { AppHeader } from "../components/app-header";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function PaymentHeld() {
  const navigate = useNavigate();
  const creatorName = "Jordan Plays";
  const today = new Date();
  const respondByDate = new Date(today);
  respondByDate.setDate(today.getDate() + 3);

  const formattedRespondBy = respondByDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col min-h-screen bg-white pb-40 text-[#1D1D1D]">
      <AppHeader title="Success" />
      
      <main className="flex-1 flex flex-col items-center justify-center px-8 pt-12">
        {/* Animated Lock Icon */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#389C9A] rounded-full -m-4"
          />
          <div className="w-24 h-24 bg-[#1D1D1D] flex items-center justify-center border-4 border-[#389C9A] relative z-10">
            <Lock className="w-10 h-10 text-[#FEDB71]" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-center leading-tight">
          Payment Held Successfully
        </h1>
        <p className="text-sm text-[#1D1D1D]/60 mb-12 text-center font-medium italic">
          Your campaign request has been sent to {creatorName}. They have 3 days to respond.
        </p>

        {/* Status Card */}
        <section className="w-full bg-[#F8F8F8] border-2 border-[#1D1D1D] p-8 mb-8 rounded-none">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-none overflow-hidden border border-[#1D1D1D]/10">
              <ImageWithFallback src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" className="w-full h-full object-cover grayscale" />
            </div>
            <div>
              <h3 className="font-black text-[#1D1D1D] uppercase italic tracking-tight">{creatorName}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#389C9A]">Gold — 16 Streams</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between italic">
              <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Campaign Cost</span>
              <span className="text-[12px] font-black uppercase">£216.00</span>
            </div>
            <div className="flex justify-between italic">
              <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Service Fee</span>
              <span className="text-[12px] font-black uppercase">£24.00</span>
            </div>
            <div className="flex justify-between italic pt-4 border-t border-[#1D1D1D]/10">
              <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Total Held</span>
              <span className="text-[14px] font-black uppercase tracking-tighter italic">£240.00</span>
            </div>
            <div className="flex justify-between italic">
              <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Respond By</span>
              <span className="text-[12px] font-black uppercase text-[#389C9A] underline decoration-2 underline-offset-4">{formattedRespondBy}</span>
            </div>
          </div>

          <div className="bg-[#1D1D1D] p-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FEDB71] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FEDB71] italic">⏳ Awaiting Creator Response</span>
          </div>
        </section>

        {/* Countdown Display */}
        <div className="w-full mb-12">
          <div className="flex justify-between items-end mb-3 italic">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40">Creator Response Window</span>
            <span className="text-[12px] font-black uppercase text-[#389C9A]">3 days remaining</span>
          </div>
          <div className="h-2 w-full bg-[#1D1D1D]/5 border border-[#1D1D1D]/10">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "100%" }}
              className="h-full bg-[#389C9A]"
            />
          </div>
        </div>

        {/* What Happens Next Section */}
        <section className="w-full mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[#1D1D1D]/40 italic">What Happens Next</h2>
          <div className="space-y-10 relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-[#1D1D1D]/10 border-dashed border-l" />
            {[
              { text: `${creatorName} will review your campaign request and respond within 3 days.` },
              { text: `If accepted — your campaign goes live on your chosen start date and a message thread opens between you and the creator.` },
              { text: `If declined or no response — your full payment of £240 is automatically refunded within 3 to 5 business days.` }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start relative z-10">
                <div className="w-8 h-8 rounded-none bg-white border-2 border-[#1D1D1D] flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-black italic">{i + 1}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-tight italic leading-relaxed pt-1 opacity-70">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Communication Warning Reminder */}
        <section className="w-full bg-[#1D1D1D] p-6 mb-8 border-2 border-[#FEDB71]">
          <div className="flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-[#FEDB71] flex-shrink-0" />
            <p className="text-[10px] font-bold uppercase tracking-tight italic text-white leading-relaxed opacity-80">
              Remember — all communication with your creator must happen inside LiveLink. Sharing contact details or moving conversations outside the app will result in account closure and loss of funds.
            </p>
          </div>
        </section>
      </main>

      {/* Action Buttons */}
      <div className="px-6 pb-12 flex flex-col gap-4 max-w-[480px] mx-auto w-full">
        <button 
          onClick={() => navigate("/messages/new")}
          className="w-full py-6 bg-[#1D1D1D] text-white font-black uppercase tracking-widest text-[10px] flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98] rounded-none italic border-2 border-[#1D1D1D]"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-[#389C9A]" /> 
            <span>Message {creatorName}</span>
          </div>
          <span className="text-[8px] font-bold opacity-40 lowercase tracking-tight">Introduce yourself while you wait for their confirmation</span>
        </button>
        <button 
          onClick={() => navigate("/business/dashboard")}
          className="w-full py-6 bg-white border-2 border-[#1D1D1D] text-[#1D1D1D] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:bg-[#F8F8F8] transition-all rounded-none italic"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
