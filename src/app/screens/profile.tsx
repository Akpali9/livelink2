import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { 
  ChevronLeft, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitch, 
  Video as VideoIcon,
  Info,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
  Users,
  BarChart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BottomNav } from "../components/bottom-nav";
import { AppHeader } from "../components/app-header";

// Mock creator data based on the spec
const creatorData = {
  id: "1",
  name: "Alex Rivers",
  username: "arivers_stream",
  avatar: "https://images.unsplash.com/photo-1758179759979-c0c2235ae172?w=400&h=400&fit=crop",
  verified: true,
  location: "Manchester, UK",
  platforms: [
    { name: "Twitch", icon: Twitch },
    { name: "TikTok", icon: VideoIcon },
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube }
  ],
  niches: ["Fitness", "Lifestyle", "Health"],
  bio: "Fitness creator streaming live workouts 4 times a week. My audience are women aged 18 to 35 based in the UK who are serious about their health and love discovering new products.",
  availability: "Available for campaigns", // "Available for campaigns", "Limited availability", "Not currently taking campaigns"
  stats: {
    avgViewers: "850",
    peakViewers: "2.4k",
    streamsPerWeek: "5",
    campaignsDone: "42"
  },
  packages: [
    {
      id: "bronze",
      label: "BRONZE",
      streams: 4,
      descriptor: "Great for testing the partnership",
      price: 70
    },
    {
      id: "silver",
      label: "SILVER",
      streams: 12,
      descriptor: "The most popular choice for consistent brand exposure",
      price: 180,
      recommended: true
    },
    {
      id: "gold",
      label: "GOLD",
      streams: 16,
      descriptor: "Maximum exposure for serious brand growth",
      price: 240
    }
  ]
};

export function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [offerSent, setOfferSent] = useState(false);
  const [customOffer, setCustomOffer] = useState({
    streams: "",
    rate: "",
    type: "Banner Only",
    message: ""
  });

  const creator = creatorData; // In a real app, fetch by ID

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
  };

  const selectedPackage = creator.packages.find(p => p.id === selectedPackageId);

  // Estimates calculation logic
  const getEstimates = (streams: number) => {
    return {
      uniqueViewers: Math.round(parseInt(creator.stats.avgViewers) * 0.4 * streams + 500),
      hours: streams * 1.5,
      impressions: Math.round(parseInt(creator.stats.avgViewers) * 1.4 * streams)
    };
  };

  const estimates = selectedPackage ? getEstimates(selectedPackage.streams) : null;

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setOfferSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[80px]">
      <AppHeader showBack title="Creator Profile" />
      <main className="max-w-[480px] mx-auto w-full">
        {/* Profile Header Area */}
        <div className="bg-white border-b border-[#1D1D1D]">
          <div className="px-6 py-12 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-none border-4 border-[#1D1D1D] overflow-hidden bg-[#F8F8F8] flex items-center justify-center">
                {creator.avatar ? (
                  <ImageWithFallback 
                    src={creator.avatar} 
                    alt={creator.name} 
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <div className="p-8 opacity-20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Name & Username */}
            <div className="flex flex-col items-center mb-4">
              <h1 className="text-3xl font-black uppercase tracking-tighter leading-none italic mb-1">
                {creator.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">
                @{creator.username}
              </span>
            </div>

            {/* Platform Badges & Verified */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {creator.platforms.map(p => (
                <div key={p.name} className="flex items-center gap-1.5 bg-[#389C9A]/10 px-2 py-1 border border-[#389C9A]/20">
                  <p.icon className="w-3 h-3 text-[#389C9A]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#389C9A] italic">{p.name}</span>
                </div>
              ))}
              {creator.verified && (
                <div className="flex items-center gap-1.5 bg-[#FEDB71]/10 px-2 py-1 border border-[#FEDB71]/20">
                  <CheckCircle2 className="w-3 h-3 text-[#1D1D1D]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#1D1D1D]">Verified</span>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 mb-4 text-[10px] font-bold uppercase tracking-widest italic">
              <MapPin className="w-3 h-3 text-[#1D1D1D]/40" />
              <span>{creator.location}</span>
            </div>

            {/* Niches */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {creator.niches.map(n => (
                <span key={n} className="text-[9px] font-bold uppercase tracking-widest bg-[#F8F8F8] px-2 py-0.5 border border-[#1D1D1D]/10 italic">
                  {n}
                </span>
              ))}
            </div>

            {/* Bio */}
            <div className="w-full max-w-sm mb-6">
              <p className={`text-sm leading-relaxed text-[#1D1D1D]/80 ${!isBioExpanded ? 'line-clamp-3' : ''}`}>
                {creator.bio || "This creator hasn't added a bio yet."}
              </p>
              {creator.bio && creator.bio.length > 120 && (
                <button 
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                  className="mt-2 text-[10px] font-black uppercase tracking-widest text-[#389C9A] flex items-center gap-1 mx-auto underline"
                >
                  {isBioExpanded ? (
                    <>Show less <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Read more <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              )}
            </div>

            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1D1D1D] text-[9px] font-black uppercase tracking-widest rounded-none italic">
              <span className={`w-2 h-2 rounded-none ${
                creator.availability === "Available for campaigns" ? "bg-[#389C9A]" :
                creator.availability === "Limited availability" ? "bg-[#FEDB71]" : "bg-red-500"
              }`} />
              {creator.availability}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#1D1D1D] border-b border-[#1D1D1D]">
          <div className="bg-white p-6 flex flex-col gap-1 items-center text-center">
            <span className="text-2xl font-black italic">{creator.stats.avgViewers}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">Avg Viewers</span>
          </div>
          <div className="bg-white p-6 flex flex-col gap-1 items-center text-center">
            <span className="text-2xl font-black italic text-[#389C9A]">{creator.stats.peakViewers}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">Peak Viewers</span>
          </div>
          <div className="bg-white p-6 flex flex-col gap-1 items-center text-center">
            <span className="text-2xl font-black italic">{creator.stats.streamsPerWeek}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">Streams/Wk</span>
          </div>
          <div className="bg-white p-6 flex flex-col gap-1 items-center text-center">
            <span className="text-2xl font-black italic text-[#FEDB71]">{creator.stats.campaignsDone}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">Campaigns Done</span>
          </div>
        </div>

        <div className="px-6 py-12">
          {/* Partnership Packages Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic mb-1">Partnership Packages</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1D1D1D]/40 mb-8 italic">
              Choose a package or make the creator a custom offer below.
            </p>

            <div className="flex flex-col gap-6">
              {creator.packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`relative cursor-pointer transition-all border-2 flex flex-col rounded-none ${
                    selectedPackageId === pkg.id 
                      ? "border-[#1D1D1D] bg-white scale-[1.02]" 
                      : "border-[#1D1D1D]/10 bg-[#F8F8F8] hover:border-[#389C9A]/40"
                  } ${pkg.recommended ? 'pt-12 pb-10' : 'py-8'}`}
                >
                  {pkg.recommended && (
                    <div className="absolute top-0 left-0 right-0 h-10 bg-[#FEDB71] flex items-center justify-center border-b-2 border-[#1D1D1D]">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D] italic">Most Popular</span>
                    </div>
                  )}
                  
                  <div className="px-8 flex flex-col items-center text-center">
                    <span className="text-[10px] font-black tracking-widest mb-4 opacity-40 italic">{pkg.label}</span>
                    <span className="text-4xl font-black uppercase tracking-tighter italic mb-1">{pkg.streams} Streams</span>
                    <p className="text-[10px] font-medium text-[#1D1D1D]/60 mb-6 px-4 leading-relaxed italic">{pkg.descriptor}</p>
                    <span className="text-3xl font-black mb-8 italic text-[#389C9A]">₦{pkg.price}k</span>
                    
                    <button 
                      className={`w-full py-4 text-[10px] font-black uppercase tracking-widest transition-all italic ${
                        pkg.recommended 
                        ? "bg-[#1D1D1D] text-white" 
                        : "border-2 border-[#1D1D1D] text-[#1D1D1D] hover:bg-[#1D1D1D] hover:text-white"
                      } ${selectedPackageId === pkg.id && !pkg.recommended ? "bg-[#1D1D1D] text-white" : ""}`}
                    >
                      {selectedPackageId === pkg.id ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Viewership Block */}
          <AnimatePresence>
            {selectedPackage && estimates && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-12"
              >
                <div className="bg-white border-2 border-[#1D1D1D] p-8 rounded-none text-[#1D1D1D]">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">Estimated Viewership for This Package</h3>
                  
                  <div className="flex flex-col gap-6 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#389C9A]"><Users className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tight italic">Approx. {estimates.uniqueViewers.toLocaleString()} unique viewers</p>
                        <p className="text-[10px] text-[#1D1D1D]/40 uppercase tracking-widest">over {selectedPackage.streams} streams</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#389C9A]"><VideoIcon className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tight italic">Approx. {estimates.hours} hours</p>
                        <p className="text-[10px] text-[#1D1D1D]/40 uppercase tracking-widest">of live brand exposure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#389C9A]"><BarChart className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tight italic">Approx. {estimates.impressions.toLocaleString()} banner impressions</p>
                        <p className="text-[10px] text-[#1D1D1D]/40 uppercase tracking-widest">based on avg concurrent viewers</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[9px] text-[#1D1D1D]/30 italic mb-8 uppercase tracking-widest">
                    Estimates are based on this creator's historical average. Actual figures may vary.
                  </p>

                  <button 
                    onClick={() => navigate("/campaign/create", { 
                      state: { 
                        packageId: selectedPackage.id,
                        price: selectedPackage.price,
                        streams: selectedPackage.streams,
                        creatorId: id
                      } 
                    })}
                    className="w-full bg-[#1D1D1D] text-white py-6 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 italic active:scale-[0.98] transition-all"
                  >
                    Proceed to Campaign Setup <ArrowRight className="w-4 h-4 text-[#FEDB71]" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Make a Custom Offer Section */}
          <div className="mb-12 pt-12 border-t border-[#1D1D1D]/10">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic mb-1">Want to Make a Custom Offer?</h2>
            <p className="text-xs text-[#1D1D1D]/60 mb-8 italic">
              If none of the packages above fit your budget or needs, you can send this creator a direct offer and propose your own terms.
            </p>

            {offerSent ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-[#1D1D1D] p-8 text-center"
              >
                <div className="w-12 h-12 bg-[#389C9A]/10 rounded-none flex items-center justify-center mx-auto mb-4 border border-[#389C9A]/20">
                  <CheckCircle2 className="w-6 h-6 text-[#389C9A]" />
                </div>
                <h3 className="font-black uppercase tracking-widest mb-4 italic">Offer Sent!</h3>
                <p className="text-xs text-[#1D1D1D]/60 leading-relaxed italic">
                  Your offer has been sent to {creator.name}. They will review it and respond within 48 hours. You can track this in your My Campaigns tab.
                </p>
                <button 
                  onClick={() => setOfferSent(false)}
                  className="mt-8 text-[10px] font-black uppercase tracking-widest underline italic text-[#389C9A]"
                >
                  Send another offer
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSendOffer} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40 mb-2 italic">Number of streams</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 8"
                    className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-4 text-xs font-bold outline-none focus:border-[#1D1D1D] transition-all rounded-none italic"
                    value={customOffer.streams}
                    onChange={(e) => setCustomOffer({...customOffer, streams: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40 mb-2 italic">Your offered rate</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#389C9A]">₦</span>
                    <input 
                      type="number" 
                      placeholder="per every 4 qualifying lives"
                      className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-4 pl-8 text-xs font-bold outline-none focus:border-[#1D1D1D] transition-all rounded-none italic"
                      value={customOffer.rate}
                      onChange={(e) => setCustomOffer({...customOffer, rate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40 mb-2 italic">Campaign type</label>
                  <div className="flex flex-wrap gap-2">
                    {["Banner Only", "Promo Code Only", "Banner + Promo Code"].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCustomOffer({...customOffer, type})}
                        className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all rounded-none italic ${
                          customOffer.type === type ? "bg-[#1D1D1D] text-white border-[#1D1D1D]" : "bg-white border-[#1D1D1D]/10"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40 mb-2 italic">Message to the creator</label>
                  <textarea 
                    rows={4}
                    placeholder="Introduce your business, explain what you are looking for..."
                    className="w-full bg-[#F8F8F8] border border-[#1D1D1D]/10 p-4 text-xs font-medium outline-none focus:border-[#1D1D1D] resize-none transition-all rounded-none italic"
                    value={customOffer.message}
                    onChange={(e) => setCustomOffer({...customOffer, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-6 bg-[#1D1D1D] text-white font-black uppercase tracking-widest text-xs hover:bg-[#389C9A] transition-all italic active:scale-[0.98]"
                >
                  Send Offer
                </button>
              </form>
            )}
          </div>

          {/* Important Notes Block */}
          <div className="bg-[#F8F8F8] border border-[#1D1D1D]/10 p-8 mb-12 rounded-none">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-[#389C9A] mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tight italic">
                  All streams must be a minimum of 45 minutes to qualify toward your package
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-[#389C9A] mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tight italic">
                  Packages are billed per every 4 qualifying lives completed
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-[#389C9A] mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tight italic">
                  Payment is held securely and only released to the creator once streams are verified
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <BottomNav />
    </div>
  );
}