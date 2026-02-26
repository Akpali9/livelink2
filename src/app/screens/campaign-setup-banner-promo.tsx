import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, MessageSquare, Bell, User, Plus, Minus, Calendar, Info } from "lucide-react";
import { motion } from "motion/react";

type CampaignGoal = "awareness" | "traffic" | "product" | "event" | "general" | null;
type PromoGoal = "sales" | "acquisition" | "downloads" | "signups" | "other" | null;
type OfferDuration = "3" | "7" | "14" | "30" | "indefinite" | null;
type StreamDeadline = "1" | "2" | "3" | "4" | null;

export function CampaignSetupBannerPromo() {
  const navigate = useNavigate();
  
  // Banner section state
  const [campaignName, setCampaignName] = useState("");
  const [campaignGoal, setCampaignGoal] = useState<CampaignGoal>(null);
  const [bidAmount, setBidAmount] = useState("25");
  const [offerDuration, setOfferDuration] = useState<OfferDuration>(null);
  const [streamDeadline, setStreamDeadline] = useState<StreamDeadline>(null);
  const [creatorCount, setCreatorCount] = useState(1);

  // Promo section state
  const [promoGoal, setPromoGoal] = useState<PromoGoal>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE OFF");
  const [discountValue, setDiscountValue] = useState("");
  const [usageLimit, setUsageLimit] = useState("Unlimited");
  const [expiryDate, setExpiryDate] = useState("");
  const [instructions, setInstructions] = useState("");

  const estimatedStreams = creatorCount * 4;
  const estimatedBilling = creatorCount * (parseInt(bidAmount) || 0);
  
  // Calculate average viewers based on bid amount
  const getAverageViewers = (bid: number) => {
    if (bid >= 5 && bid <= 20) return 175;
    if (bid >= 15 && bid <= 30) return 325;
    if (bid >= 30 && bid <= 50) return 500;
    if (bid >= 50 && bid <= 80) return 800;
    if (bid >= 80) return 1000;
    return 175; // default
  };
  
  const bidValue = parseInt(bidAmount) || 0;
  const avgViewers = getAverageViewers(bidValue);
  const totalViewers = creatorCount * avgViewers;
  const totalImpressions = totalViewers * estimatedStreams;
  const serviceFee = Math.round(estimatedBilling * 0.08);
  const totalHeld = estimatedBilling + serviceFee;

  const handleContinue = () => {
    navigate("/campaign/create", { 
      state: { 
        campaignType: "banner-promo",
        campaignName,
        campaignGoal,
        bidAmount,
        offerDuration,
        streamDeadline,
        creatorCount,
        promoGoal,
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
          SET UP YOUR COMBINED CAMPAIGN
        </h3>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#1D1D1D]/10 mb-4" />

      {/* SECTION A LABEL */}
      <div className="px-4 mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 italic">
          SECTION A — BANNER DETAILS
        </p>
      </div>

      {/* SECTION A: BANNER FIELDS */}
      <div className="px-4 space-y-6 mb-6">
        {/* FIELD 1: CAMPAIGN NAME */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
            CAMPAIGN NAME
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g. Summer Sale..."
            className="w-full px-4 py-3 border-2 border-[#1D1D1D]/20 text-sm italic focus:border-[#389C9A] outline-none transition-colors"
          />
        </div>

        {/* FIELD 2: CAMPAIGN GOAL */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-3 italic">
            CAMPAIGN GOAL
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "awareness", label: "BRAND AWARENESS" },
              { value: "traffic", label: "DRIVE WEBSITE TRAFFIC" },
              { value: "product", label: "PROMOTE A PRODUCT" },
              { value: "event", label: "PROMOTE AN EVENT" },
              { value: "general", label: "GENERAL ADVERTISING" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setCampaignGoal(option.value as CampaignGoal)}
                className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-wider italic border-2 transition-all ${
                  campaignGoal === option.value
                    ? "bg-[#389C9A] border-[#389C9A] text-white"
                    : "bg-white border-[#1D1D1D]/20 text-[#1D1D1D]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* ELEMENT 1: SUGGESTED PRICE GUIDE CARD */}
        <div className="border-2 border-[#1D1D1D]/10 p-5 rounded-lg bg-white">
          <div className="flex items-start gap-2 mb-2">
            <Info className="w-4 h-4 text-[#389C9A] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider text-[#1D1D1D] italic mb-1">
                SUGGESTED PRICE GUIDE
              </h4>
              <p className="text-[9px] font-bold text-[#1D1D1D]/60 leading-relaxed">
                Based on average viewer counts across our creator network. Use this as a reference when setting your bid.
              </p>
            </div>
          </div>
          
          {/* Price Guide Table */}
          <div className="mt-4">
            {/* Table Headers */}
            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-[#1D1D1D]/10">
              <div className="text-[8px] font-black uppercase tracking-wider text-[#1D1D1D]/40">
                AVG VIEWERS
              </div>
              <div className="text-[8px] font-black uppercase tracking-wider text-[#1D1D1D]/40 text-center">
                SUGGESTED BID
              </div>
              <div className="text-right">
                <div className="text-[8px] font-black uppercase tracking-wider text-[#1D1D1D]/40">
                  EST. IMPRESSIONS
                </div>
                <div className="text-[7px] font-bold text-[#1D1D1D]/40 mt-0.5">
                  across 4 live streams
                </div>
              </div>
            </div>
            
            {/* Table Rows */}
            {[
              { viewers: "100 – 250", bid: "₦5,000 – ₦20,000", impressions: "400 – 1,000" },
              { viewers: "250 – 400", bid: "₦15,000 – ₦30,000", impressions: "1,000 – 1,600" },
              { viewers: "400 – 600", bid: "₦30,000 – ₦50,000", impressions: "1,600 – 2,400" },
              { viewers: "600 – 1,000", bid: "₦50,000 – ₦80,000", impressions: "2,400 – 4,000" },
              { viewers: "1,000+", bid: "₦80,000+", impressions: "4,000+" }
            ].map((row, index) => (
              <div 
                key={index}
                className={`grid grid-cols-3 gap-2 py-2.5 border-b border-[#1D1D1D]/5 ${
                  index % 2 === 0 ? 'bg-[#F8F8F8]' : 'bg-white'
                }`}
              >
                <div className="text-[9px] font-bold text-[#1D1D1D] pl-2">
                  {row.viewers}
                </div>
                <div className="text-[9px] font-black text-[#389C9A] text-center italic">
                  {row.bid}
                </div>
                <div className="text-[9px] font-bold text-[#1D1D1D] text-right pr-2">
                  {row.impressions}
                </div>
              </div>
            ))}
          </div>
          
          {/* Disclaimer */}
          <p className="text-[8px] font-medium text-[#1D1D1D]/60 mt-3 leading-relaxed">
            Suggested prices are guidelines only. EST. Impressions are based on 4 live streams per creator and may vary.
          </p>
        </div>

        {/* FIELD 3: YOUR BID */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#1D1D1D]/70 mb-2 italic">
            YOUR BID (PER 4 STREAMS)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-base font-black text-[#1D1D1D]">₦</span>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full pl-10 pr-24 py-3 border-2 border-[#1D1D1D]/20 text-base font-bold italic focus:border-[#389C9A] outline-none transition-colors"
            />
            <span className="absolute right-4 text-[10px] font-black uppercase tracking-wider text-[#1D1D1D]/40 italic">
              MIN ₦5k
            </span>
          </div>
        </div>

        {/* FIELD 4: OFFER DURATION */}
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

        {/* FIELD 5: STREAM COMPLETION DEADLINE */}
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

        {/* FIELD 6: NUMBER OF CREATORS */}
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

        {/* LIVE ESTIMATE CARD */}
        <div className="bg-[#1D1D1D] p-5 border border-[#1D1D1D]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white italic">
              LIVE ESTIMATE
            </h4>
            <span className="text-[8px] font-black uppercase tracking-wider text-[#389C9A] italic">
              UPDATES AS YOU TYPE
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-white/70 italic">
                ESTIMATED QUALIFYING STREAMS
              </span>
              <span className="text-xl font-black text-white italic">
                {estimatedStreams}
              </span>
            </div>
            
            <div className="w-full h-px bg-white/20" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-white/70 italic">
                ESTIMATED TOTAL BILLING
              </span>
              <span className="text-xl font-black text-[#389C9A] italic">
                ₦{estimatedBilling}k
              </span>
            </div>
            
            <div className="w-full h-px bg-white/20" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-white/70 italic">
                EST. TOTAL VIEWERS
              </span>
              <span className="text-xl font-black text-[#389C9A] italic">
                {totalViewers}
              </span>
            </div>
            
            <div className="w-full h-px bg-white/20" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-white/70 italic">
                EST. TOTAL IMPRESSIONS
              </span>
              <span className="text-xl font-black text-[#389C9A] italic">
                {totalImpressions.toLocaleString()}
              </span>
            </div>
            
            <div className="w-full h-px bg-white/20" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-white/70 italic">
                SERVICE FEE (8%)
              </span>
              <span className="text-xl font-black text-[#389C9A] italic">
                ₦{serviceFee}k
              </span>
            </div>
            
            <div className="w-full h-px bg-white/20" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-white/70 italic">
                TOTAL HELD TODAY
              </span>
              <span className="text-2xl font-black text-[#389C9A] italic">
                ₦{totalHeld}k
              </span>
            </div>
          </div>
          
          <p className="text-[7px] font-bold uppercase text-white/40 italic text-center mt-3 leading-relaxed">
            Estimates update as you change your bid and creator count. Final cost depends on verified streams completed.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#1D1D1D]/10 mb-4" />

      {/* SECTION B LABEL */}
      <div className="px-4 mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/50 italic">
          SECTION B — PROMO CODE DETAILS
        </p>
      </div>

      {/* SECTION B: PROMO CODE FIELDS */}
      <div className="px-4 space-y-6 mb-6">
        {/* FIELD 7: CAMPAIGN GOAL (PROMO) */}
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

        {/* FIELD 8: YOUR PROMO CODE */}
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

        {/* FIELD 9: DISCOUNT TYPE + VALUE */}
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

        {/* FIELD 10: USAGE LIMIT + EXPIRY DATE */}
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

        {/* FIELD 11: INSTRUCTIONS FOR CREATOR */}
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