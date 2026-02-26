import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { 
  ChevronLeft, 
  ArrowRight, 
  Lock, 
  AlertTriangle, 
  Check, 
  CreditCard,
  Info
} from "lucide-react";
import { motion } from "motion/react";
import { AppHeader } from "../components/app-header";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CampaignConfirm() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-40 text-[#1D1D1D]">
      <AppHeader showBack title="Confirm Order" />
      
      <div className="px-8 pt-12 pb-8 border-b-2 border-[#1D1D1D]">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-tight mb-2">
          Confirm Your Campaign
        </h1>
        <p className="text-[#1D1D1D]/60 text-sm font-medium italic">
          Review your order before we hold your payment.
        </p>
      </div>

      <div className="px-8 mt-12 flex flex-col gap-8 max-w-[600px] mx-auto w-full">
        {/* Selected Package Summary Card */}
        <section className="bg-[#F8F8F8] border-2 border-[#1D1D1D] p-6 rounded-none">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-none overflow-hidden border border-[#1D1D1D]/10">
              <ImageWithFallback src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" className="w-full h-full object-cover grayscale" />
            </div>
            <div>
              <h3 className="text-[12px] font-black uppercase italic tracking-tight text-[#389C9A]">Jordan Plays</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">Gold — 16 Streams</p>
            </div>
          </div>
          <div className="space-y-4 mb-6 italic">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Campaign Cost</span>
              <span className="text-[12px] font-black uppercase tracking-tight">£216.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Service Fee</span>
                <Info className="w-2.5 h-2.5 text-[#389C9A]" />
              </div>
              <span className="text-[12px] font-black uppercase tracking-tight">£24.00</span>
            </div>
            <div className="pt-4 border-t border-[#1D1D1D]/10 flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-[#1D1D1D]/40">Total Amount</span>
              <span className="text-2xl font-black uppercase tracking-tighter italic">£240.00</span>
            </div>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#1D1D1D]/60 italic bg-white p-3 border border-[#1D1D1D]/10 text-center">
            Your payment will be held securely until the creator confirms this campaign.
          </p>
        </section>

        {/* Payment Hold Explanation Card */}
        <section className="bg-white border-2 border-[#1D1D1D] p-8 rounded-none relative">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-[#1D1D1D] flex items-center justify-center border-2 border-[#389C9A]">
              <Lock className="w-6 h-6 text-[#FEDB71]" />
            </div>
          </div>
          <h2 className="text-[14px] font-black uppercase tracking-tight italic text-center mb-8">How Payment Hold Works</h2>
          <div className="space-y-6">
            {[
              { step: "01", text: "Your payment is held securely by LiveLink — you are not charged until the creator accepts." },
              { step: "02", text: "The creator has 3 days to confirm or decline your campaign request." },
              { step: "03", text: "If the creator declines or does not respond within 3 days your full payment is automatically refunded." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[#389C9A] font-black italic text-lg leading-none">{item.step}</span>
                <p className="text-[11px] font-bold uppercase tracking-tight italic leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[#1D1D1D]/10 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#389C9A]">No hidden fees. Full refund guaranteed if the creator does not accept.</p>
          </div>
        </section>

        {/* Important Warning Card */}
        <section className="bg-[#1D1D1D] text-white p-8 rounded-none border-2 border-[#FEDB71]">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-[#FEDB71]" />
          </div>
          <h2 className="text-[14px] font-black uppercase tracking-tight italic text-center mb-4 text-[#FEDB71]">Important — Please Read</h2>
          <p className="text-[10px] font-medium leading-relaxed italic mb-8 opacity-80 uppercase tracking-tight">
            All communication between businesses and creators must take place exclusively through the LiveLink app. Any attempt to move conversations, payments, or agreements outside of the platform is a direct violation of our Terms of Service. Violations will result in the immediate closure of your account and the permanent forfeiture of any funds held or earned on the platform. This policy exists to protect both you and the creator.
          </p>
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative mt-0.5">
              <input 
                type="checkbox" 
                className="peer hidden" 
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <div className="w-5 h-5 border-2 border-[#FEDB71] bg-transparent peer-checked:bg-[#FEDB71] transition-all flex items-center justify-center">
                <Check className="w-3 h-3 text-[#1D1D1D] opacity-0 peer-checked:opacity-100" />
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest italic text-[#FEDB71]">
              I have read and agree to keep all communication within the LiveLink platform.
            </span>
          </label>
        </section>

        {/* Payment Method Section */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[#1D1D1D]/40 italic">Payment Method</h2>
          <div className="flex items-center justify-between p-5 border-2 border-[#1D1D1D] bg-[#F8F8F8]">
            <div className="flex items-center gap-4">
              <CreditCard className="w-5 h-5 text-[#389C9A]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase italic tracking-widest">VISA ···· 4242</span>
                <span className="text-[9px] font-bold uppercase opacity-40">EXP 04/28</span>
              </div>
            </div>
            <Link to="#" className="text-[9px] font-black uppercase tracking-widest text-[#389C9A] hover:underline">Change</Link>
          </div>
          <button className="mt-4 text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all flex items-center gap-2 italic">
            <Plus className="w-3 h-3" /> Use a different card
          </button>
        </section>

        {/* Total Due Row */}
        <div className="mt-12 pt-8 border-t-2 border-[#1D1D1D]">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[11px] font-black uppercase tracking-widest italic">Total held today</span>
            <span className="text-4xl font-black uppercase tracking-tighter italic">£240.00</span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#1D1D1D]/40 italic">Released to creator after each verified stream cycle</p>
        </div>
      </div>

      {/* Confirm & Hold Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t-2 border-[#1D1D1D] z-50 max-w-[480px] mx-auto">
        <button 
          disabled={!agreed}
          onClick={() => navigate("/payment/held")}
          className={`w-full flex items-center justify-between p-6 font-black uppercase tracking-tight active:scale-[0.98] transition-all rounded-none italic border-2 border-[#1D1D1D] ${agreed ? 'bg-[#1D1D1D] text-white' : 'bg-white text-[#1D1D1D]/20 cursor-not-allowed border-[#1D1D1D]/10'}`}
        >
          <span>Confirm & Hold Payment</span>
          <ArrowRight className={`w-5 h-5 ${agreed ? 'text-[#FEDB71]' : 'text-[#1D1D1D]/10'}`} />
        </button>
        <p className="mt-3 text-[8px] font-bold uppercase tracking-widest text-center opacity-40 italic leading-relaxed px-4">
          You will not be charged if the creator declines. Held funds are fully refundable within 3 days if no response.
        </p>
      </div>
    </div>
  );
}

const Plus = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
