import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, MessageSquare, Bell, User, Plus, Minus } from "lucide-react";
import { motion } from "motion/react";

type PromoGoal = "sales" | "acquisition" | "downloads" | "signups" | "other" | null;
type OfferDuration = "3" | "7" | "14" | "30" | "indefinite" | null;
type StreamDeadline = "1" | "2" | "3" | "4" | null;

export function CampaignSetupPromoOnly() {
  const navigate = useNavigate();
  
  const [promoGoal, setPromoGoal] = useState<PromoGoal>(null);
  const [offerDuration, setOfferDuration] = useState<OfferDuration>(null);
  const [streamDeadline, setStreamDeadline] = useState<StreamDeadline>(null);
  const [creatorCount, setCreatorCount] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE OFF");
  const [discountValue, setDiscountValue] = useState("");
  const [usageLimit, setUsageLimit] = useState("Unlimited");
  const [expiryDate, setExpiryDate] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleContinue = () => {
    navigate("/campaign/create", { 
      state: { 
        campaignType: "promo-only",
        promoGoal,
        offerDuration,
        streamDeadline,
        creatorCount,
        promoCode,
        discountType,
        discountValue,
        usageLimit,
        expiryDate,
        instructions
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white pb-24 max-w-md mx-auto">
      {/* TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#1D1D1D]/10 z-50 px-4 py-3 max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 -ml-1"
            >
              <ArrowLeft className="w-5 h-5 text-[#1D1D1D]" />
            </button>
            <h1 className="text-base font-black uppercase tracking-tighter italic text-[#1D1D1D]">
              CREATE CAMPAIGN
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative p-1.5">
              <MessageSquare className="w-4.5 h-4.5 text-[#1D1D1D]" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#389C9A] border-2 border-white rounded-full" />
            </button>
            
            <button className="relative p-1.5">
              <Bell className="w-4.5 h-4.5 text-[#1D1D1D]" />
              <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#FEDB71] text-[#1D1D1D] text-[7px] font-black flex items-center justify-center border border-[#1D1D1D]">
                3
              </div>
            </button>
            
            <button className="w-8 h-8 border border-[#1D1D1D] flex items-center justify-center bg-white">
              <User className="w-4 h-4 text-[#1D1D1D]" />
            </button>
          </div>
        </div>
      </header>

      {/* PROGRESS SECTION */}
      <div className="mt-14 px-4 py-4">
        <div className="flex items-start gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-11 h-11 border-2 border-[#1D1D1D] flex items-center justify-center flex-shrink-0"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-[#1D1D1D]" />
          </button>
          
          <div className="flex-1 pt-2">
            <div className="flex gap-1.5 mb-2">
              <div className="h-1.5 flex-1 bg-[#1D1D1D]" />
              <div className="h-1.5 flex-1 bg-[#1D1D1D]" />
              <div className="h-1.5 flex-1 bg-[#1D1D1D]" />
              <div className="h-1.5 flex-1 bg-[#1D1D1D]/20" />
              <div className="h-1.5 flex-1 bg-[#1D1D1D]/20" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/40 text-center italic">
              CAMPAIGN DETAILS
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#1D1D1D]/10 mb-6" />

      {/* PAGE HEADING SECTION */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-black uppercase tracking-tighter italic text-[#1D1D1D] mb-2">
          CREATE A NEW CAMPAIGN
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/50 italic leading-tight">
          IT TAKES LESS THAN 10 MINUTES. YOU ONLY GET CHARGED WHEN A CREATOR ACCEPTS.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#1D1D1D]/10 mb-6" />

      {/* SECTION HEADING */}
      <div className="px-4 mb-5">
        <h3 className="text-lg font-black uppercase tracking-tighter italic text-[#1D1D1D]">
          SET UP YOUR PROMO CODE CAMPAIGN
        </h3>
      </div>

      {/* FORM FIELDS */}
      <div className="px-4 space-y-6 mb-6">
        {/* FIELD 1: CAMPAIGN GOAL */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-3 italic">
            CAMPAIGN GOAL
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "sales", label: "DRIVE SALES" },
              { value: "acquisition", label: "NEW CUSTOMER ACQUISITION" },
              { value: "downloads", label: "APP DOWNLOADS" },
              { value: "signups", label: "EVENT SIGN-UPS" },
              { value: "other", label: "OTHER" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPromoGoal(option.value as PromoGoal)}
                className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-wider italic border-2 transition-all ${
                  promoGoal === option.value
                    ? "bg-[#389C9A] border-[#389C9A] text-white"
                    : "bg-white border-[#1D1D1D]/20 text-[#1D1D1D]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* FIELD 2: OFFER DURATION */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
            HOW LONG SHOULD THIS OFFER STAY OPEN?
          </label>
          <p className="text-xs text-[#1D1D1D]/60 mb-3 leading-relaxed">
            How long creators have to apply before this offer closes.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "3", label: "3 DAYS" },
              { value: "7", label: "7 DAYS" },
              { value: "14", label: "14 DAYS" },
              { value: "30", label: "30 DAYS" },
              { value: "indefinite", label: "INDEFINITELY" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setOfferDuration(option.value as OfferDuration)}
                className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-wider italic border-2 transition-all ${
                  offerDuration === option.value
                    ? "bg-[#389C9A] border-[#389C9A] text-white"
                    : "bg-white border-[#1D1D1D]/20 text-[#1D1D1D]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* FIELD 3: STREAM COMPLETION DEADLINE */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
            WHEN MUST STREAMS BE COMPLETED BY?
          </label>
          <p className="text-xs text-[#1D1D1D]/60 mb-3 leading-relaxed">
            Once a creator accepts how long do they have to complete all 4 streams.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "1", label: "1 WEEK" },
              { value: "2", label: "2 WEEKS" },
              { value: "3", label: "3 WEEKS" },
              { value: "4", label: "1 MONTH" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setStreamDeadline(option.value as StreamDeadline)}
                className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-wider italic border-2 transition-all ${
                  streamDeadline === option.value
                    ? "bg-[#389C9A] border-[#389C9A] text-white"
                    : "bg-white border-[#1D1D1D]/20 text-[#1D1D1D]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* FIELD 4: NUMBER OF CREATORS */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
            HOW MANY CREATORS DO YOU WANT TO WORK WITH?
          </label>
          <p className="text-xs text-[#1D1D1D]/60 mb-3 leading-relaxed">
            We will accept applications until this number is reached.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCreatorCount(Math.max(1, creatorCount - 1))}
              className="w-12 h-12 border-2 border-[#1D1D1D] flex items-center justify-center hover:bg-[#1D1D1D] hover:text-white transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-black italic text-[#1D1D1D]">{creatorCount}</span>
            </div>
            <button
              onClick={() => setCreatorCount(creatorCount + 1)}
              className="w-12 h-12 border-2 border-[#1D1D1D] flex items-center justify-center hover:bg-[#1D1D1D] hover:text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FIELD 5: YOUR PROMO CODE */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
            YOUR PROMO CODE
          </label>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="E.G. LIVE20"
            className="w-full px-4 py-3 border-2 border-[#1D1D1D]/20 text-sm font-bold uppercase italic focus:border-[#389C9A] outline-none transition-colors"
          />
        </div>

        {/* FIELD 6: DISCOUNT TYPE + VALUE */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
              DISCOUNT TYPE
            </label>
            <div className="w-full px-4 py-3 border-2 border-[#1D1D1D]/20 text-[10px] font-black uppercase italic bg-[#F8F8F8]">
              {discountType}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
              DISCOUNT VALUE
            </label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="e.g. 20"
              className="w-full px-4 py-3 border-2 border-[#1D1D1D]/20 text-sm italic focus:border-[#389C9A] outline-none transition-colors"
            />
          </div>
        </div>

        {/* FIELD 7: USAGE LIMIT + EXPIRY DATE */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
              USAGE LIMIT
            </label>
            <div className="w-full px-4 py-3 border-2 border-[#1D1D1D]/20 text-sm italic bg-[#F8F8F8]">
              {usageLimit}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
              EXPIRY DATE
            </label>
            <div className="relative">
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="Select Date"
                className="w-full px-4 py-3 border-2 border-[#1D1D1D]/20 text-sm italic focus:border-[#389C9A] outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* FIELD 8: INSTRUCTIONS FOR CREATOR */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
            INSTRUCTIONS FOR CREATOR
          </label>
          <textarea
            rows={5}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Tell the creator how to present your code..."
            className="w-full px-4 py-3 border-2 border-[#1D1D1D]/20 text-sm italic focus:border-[#389C9A] outline-none transition-colors resize-none"
          />
        </div>

        {/* PLATFORM FEE CARD */}
        <div className="bg-[#1D1D1D] p-5 border border-[#1D1D1D]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-white/70 italic">
              PLATFORM FEE
            </span>
            <span className="text-3xl font-black text-white italic">
              ₦5k
            </span>
          </div>
          <p className="text-[8px] font-black uppercase tracking-[0.15em] text-white/50 italic leading-tight">
            THIS IS A ONE-TIME FEE TO VERIFY AND LAUNCH YOUR PROMO CAMPAIGN.
          </p>
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#1D1D1D]/10 p-4 max-w-md mx-auto">
        <motion.button
          onClick={handleContinue}
          className="w-full py-3.5 px-5 bg-[#1D1D1D] text-white flex items-center justify-between"
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm font-black uppercase tracking-widest italic">CONTINUE</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}