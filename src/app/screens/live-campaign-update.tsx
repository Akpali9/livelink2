import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { 
  ArrowLeft, 
  Download, 
  Calendar, 
  Tag, 
  Tv, 
  PoundSterling as Pound, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  AlertTriangle, 
  ChevronRight, 
  RefreshCcw,
  X,
  Upload,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AppHeader } from "../components/app-header";
import { BottomNav } from "../components/bottom-nav";

export function LiveCampaignUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const campaign = {
    id: id || "1",
    business: "CLOUDSAAS",
    name: "API TOOL PROMO",
    status: "ACTIVE",
    completedStreams: 4,
    totalStreams: 12,
    totalBudget: 720,
    earnedSoFar: 240,
    promoCode: "ALEX-STREAM-20",
    startDate: "Feb 24, 2026",
    type: "Banner + Code",
    logo: "https://images.unsplash.com/photo-1644088379091-d574269d422f?w=200&h=200&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&h=400&fit=crop",
    requirements: [
      "Minimum stream duration: 45 minutes",
      "Banner must be clearly visible throughout the stream",
      "Promo code must be mentioned at least once per hour",
      "No offensive content during the sponsored stream"
    ]
  };

  const progress = (campaign.completedStreams / campaign.totalStreams) * 100;

  const streamUpdates = [
    { 
      id: 1, 
      num: 1, 
      status: "Verified", 
      date: "24 FEB 2026", 
      duration: "1H 12MINS",
      proofStatus: "PROOF SUBMITTED AND VERIFIED"
    },
    { 
      id: 2, 
      num: 2, 
      status: "Under Review", 
      date: "26 FEB 2026", 
      duration: "58MINS",
      proofStatus: "PROOF SUBMITTED — AWAITING ADMIN VERIFICATION"
    },
    { 
      id: 3, 
      num: 3, 
      status: "Upload Required", 
      date: "28 FEB 2026", 
      duration: "NOT YET STREAMED",
      proofStatus: null
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[80px]">
      <AppHeader showBack title="CAMPAIGN DETAILS" backPath="/dashboard" />

      <main className="flex-1 max-w-[480px] mx-auto w-full px-6 pt-10 pb-20">
        {/* Active Campaign Badge */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#1D1D1D] text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] italic">
            ACTIVE CAMPAIGN
          </div>
        </div>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 border-2 border-[#1D1D1D] bg-white p-2 mb-6 shadow-none">
            <ImageWithFallback src={campaign.logo} className="w-full h-full object-contain grayscale" />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none italic mb-2">
            {campaign.business}
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 italic">
            {campaign.name}
          </p>
        </div>

        {/* Streams Progress Card */}
        <div className="bg-white border-2 border-[#1D1D1D] p-10 mb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 italic">STREAMS PROGRESS</p>
              <h3 className="text-4xl font-black italic tracking-tighter leading-none">
                {campaign.completedStreams} / {campaign.totalStreams}
              </h3>
            </div>
            <p className="text-2xl font-black italic text-[#389C9A] tracking-tighter">
              £{campaign.earnedSoFar.toFixed(2)}
            </p>
          </div>
          
          <div className="h-2.5 bg-[#1D1D1D]/5 w-full rounded-none overflow-hidden mb-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#389C9A]"
            />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.1em] opacity-30 text-center italic">
            {Math.round(progress)}% OF CAMPAIGN COMPLETED
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-[1px] bg-[#1D1D1D] border-2 border-[#1D1D1D] mb-12">
          <div className="bg-white p-6">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-30 block mb-2 italic text-[#1D1D1D]">TOTAL BUDGET</span>
            <span className="text-sm font-black italic">£{campaign.totalBudget}</span>
          </div>
          <div className="bg-white p-6">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-30 block mb-2 italic text-[#1D1D1D]">PROMO CODE</span>
            <span className="text-sm font-black italic tracking-tight">{campaign.promoCode}</span>
          </div>
          <div className="bg-white p-6">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-30 block mb-2 italic text-[#1D1D1D]">START DATE</span>
            <span className="text-sm font-black italic">{campaign.startDate}</span>
          </div>
          <div className="bg-white p-6">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-30 block mb-2 italic text-[#1D1D1D]">TYPE</span>
            <span className="text-sm font-black italic">{campaign.type}</span>
          </div>
        </div>

        {/* Active Asset Section */}
        <div className="mb-14">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40 italic">ACTIVE ASSET</h4>
          <div className="relative group">
            <div className="aspect-video border-2 border-[#1D1D1D] bg-black overflow-hidden relative">
              <ImageWithFallback src={campaign.bannerImage} className="w-full h-full object-cover opacity-60 grayscale" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white p-5 border-2 border-[#1D1D1D] text-[10px] font-black uppercase tracking-widest flex items-center gap-3 active:scale-95 transition-all italic">
                  <Download className="w-4 h-4 text-[#FEDB71]" /> DOWNLOAD BANNER
                </button>
              </div>
            </div>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#1D1D1D]/40 mt-5 leading-relaxed italic">
            Note: This banner is dynamic. Our tracking system detects this specific graphic in your stream.
          </p>
        </div>

        {/* Stream Updates Section */}
        <div className="mb-14">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40 italic">STREAM UPDATES</h4>
          <div className="flex flex-col gap-6">
            {streamUpdates.map((stream) => (
              <div key={stream.id} className="bg-white border-2 border-[#1D1D1D] p-8 flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <span className="font-black text-lg uppercase italic tracking-tighter leading-none">STREAM {stream.num}</span>
                  <div className={`px-2.5 py-1 text-[7px] font-black uppercase tracking-widest border italic ${
                    stream.status === 'Verified' ? 'bg-[#389C9A]/10 text-[#389C9A] border-[#389C9A]/20' :
                    stream.status === 'Under Review' ? 'bg-[#FEDB71]/10 text-[#D2691E] border-[#FEDB71]/20' : 
                    'bg-[#F8F8F8] text-[#1D1D1D]/40 border-[#1D1D1D]/10'
                  }`}>
                    {stream.status === 'Verified' && '✓ VERIFIED'}
                    {stream.status === 'Under Review' && '⏳ UNDER REVIEW'}
                    {stream.status === 'Upload Required' && 'UPLOAD REQUIRED'}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/40 italic">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{stream.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{stream.duration}</span>
                  </div>
                </div>

                {stream.proofStatus && (
                  <div className={`flex items-center gap-3 text-[9px] font-black uppercase tracking-widest italic ${
                    stream.status === 'Verified' ? 'text-[#389C9A]' : 'text-[#D2691E]'
                  }`}>
                    {stream.status === 'Verified' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    <span>{stream.proofStatus}</span>
                  </div>
                )}

                {stream.status === 'Upload Required' && (
                  <div className="flex flex-col gap-5">
                    <button 
                      onClick={() => setIsUploadModalOpen(true)}
                      className="w-full bg-[#1D1D1D] text-white py-5 px-6 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all italic border-2 border-[#1D1D1D]"
                    >
                      <Upload className="w-4 h-4 text-[#FEDB71]" /> UPLOAD STREAM PROOF
                    </button>
                    <p className="text-[8px] font-black uppercase tracking-widest text-[#1D1D1D]/30 text-center italic">
                      SCREENSHOT OF YOUR ANALYTICS SHOWING VIEWERS AND STREAM DURATION
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Earnings Bar */}
            <div className="mt-4 bg-[#1D1D1D] p-10 text-white border-b-4 border-[#389C9A]">
              <div className="grid grid-cols-2 gap-10 mb-8">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2 italic">VERIFIED STREAMS</p>
                  <p className="text-3xl font-black italic tracking-tighter">1</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2 italic text-[#FEDB71]">EARNINGS UNLOCKED</p>
                  <p className="text-3xl font-black italic tracking-tighter">£60.00</p>
                </div>
              </div>
              <div className="h-[1px] bg-white/10 mb-8" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center italic opacity-80">
                NEXT PAYOUT TRIGGERS AFTER STREAM 6 IS VERIFIED
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Rules */}
        <div className="mb-14 px-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40 italic">PARTNERSHIP RULES</h4>
          <div className="space-y-4">
            {campaign.requirements.map((req, i) => (
              <div key={i} className="flex gap-5 p-6 bg-white border border-[#1D1D1D]/10 items-start italic group hover:border-[#389C9A] transition-colors">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#389C9A] shrink-0 mt-0.5" />
                <p className="text-[10px] font-black uppercase tracking-tight leading-relaxed opacity-60 group-hover:opacity-100">
                  {req}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help? Section */}
        <div className="px-4 mb-20">
          <div className="bg-[#1D1D1D]/5 p-12 border-2 border-[#1D1D1D] text-center">
            <h4 className="text-xl font-black uppercase italic mb-3 tracking-tighter leading-none">NEED HELP?</h4>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#1D1D1D]/40 mb-10 italic leading-relaxed">
              Contact the brand representative directly for any questions regarding assets or technical issues.
            </p>
            <button 
              className="w-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest border-2 border-[#1D1D1D] bg-white py-6 px-8 hover:bg-[#1D1D1D] hover:text-white transition-all italic active:scale-[0.98]"
            >
              <MessageSquare className="w-5 h-5 text-[#389C9A]" /> MESSAGE {campaign.business}
            </button>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Reused Upload Modal Logic from CreatorCampaignDetail for consistency */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsUploadModalOpen(false)} className="absolute inset-0 bg-[#1D1D1D]/80 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full max-w-[480px] bg-white border-t-4 border-[#1D1D1D] max-h-[95vh] overflow-y-auto">
              <div className="w-12 h-1 bg-[#1D1D1D]/10 rounded-full mx-auto my-6" />
              <div className="px-8 pt-4 pb-12 flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none mb-2">SUBMIT PROOF</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1D1D1D]/40 leading-relaxed italic">Upload a screenshot showing your viewer count and duration.</p>
                  </div>
                  <button onClick={() => setIsUploadModalOpen(false)} className="p-3 bg-white border border-[#1D1D1D]/10">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="w-full aspect-video border-2 border-dashed border-[#1D1D1D] bg-[#F8F8F8] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-[#1D1D1D] hover:text-white transition-all group p-8">
                  <div className="p-5 bg-white border-2 border-[#1D1D1D] group-hover:bg-[#FEDB71] transition-colors">
                    <Upload className="w-8 h-8 text-[#1D1D1D]" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] italic">TAP TO UPLOAD SCREENSHOT</p>
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mt-1">JPG OR PNG · MAX 5MB</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="w-full bg-[#1D1D1D] text-white py-6 text-xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-4 active:scale-[0.98] transition-all"
                >
                  SUBMIT STREAM PROOF <ArrowRight className="w-6 h-6 text-[#FEDB71]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
