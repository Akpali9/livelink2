import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Star, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck,
  X,
  ArrowRight,
  Info,
  AlertCircle,
  ArrowLeft,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { BottomNav } from "../components/bottom-nav";
import { AppHeader } from "../components/app-header";

// --- Types ---
type PartnershipType = "Pay + Code" | "Paying" | "Code Only" | "Open to Offers";

interface BusinessCampaign {
  id: string;
  name: string;
  industry: string;
  logo: string;
  partnershipType: PartnershipType;
  payRate: string;
  minViewers: number;
  location: string;
  description: string;
  nicheTags: string[];
  responseRate: string;
  closingDate?: string;
  isVerified: boolean;
  isFeatured: boolean;
  budgetRange: string;
  about: string;
}

const MOCK_DATA: BusinessCampaign[] = [
  {
    id: "b1",
    name: "AURA FITNESS",
    industry: "Health & Fitness",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    partnershipType: "Pay + Code",
    payRate: "₦90k",
    minViewers: 200,
    location: "London, UK",
    description: "Independent gym brand offering personalised fitness plans for women.",
    nicheTags: ["Fitness", "Lifestyle"],
    responseRate: "24h Response",
    closingDate: "4d",
    isVerified: true,
    isFeatured: true,
    budgetRange: "₦15k-₦25k",
    about: "We are looking for energetic fitness creators to showcase our new line of sustainable activewear. Your audience should be active and interested in healthy living."
  },
  {
    id: "b2",
    name: "PIXEL GEAR",
    industry: "Gaming",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    partnershipType: "Paying",
    payRate: "₦150k",
    minViewers: 1000,
    location: "Toronto, CA",
    description: "Premium mechanical keyboards and gaming peripherals.",
    nicheTags: ["Gaming", "Tech"],
    responseRate: "Fast Response",
    isVerified: true,
    isFeatured: false,
    budgetRange: "₦50k+",
    about: "Launch of our new X-Pro series keyboard. We need creators who stream FPS games and value high-performance gear."
  },
  {
    id: "b3",
    name: "ECOBITE",
    industry: "Food & Drink",
    logo: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop",
    partnershipType: "Code Only",
    payRate: "Promo Only",
    minViewers: 100,
    location: "New York, US",
    description: "Organic, vegan-friendly snack boxes delivered monthly.",
    nicheTags: ["Food", "Healthy"],
    responseRate: "48h Response",
    closingDate: "2d",
    isVerified: false,
    isFeatured: true,
    budgetRange: "Open",
    about: "Sustainable snack boxes for a healthier lifestyle. We offer 20% commission on all sales generated through your unique link."
  },
  {
    id: "b4",
    name: "GLOW BOTANICS",
    industry: "Beauty & Skincare",
    logo: "https://images.unsplash.com/photo-1759563874711-b026ac0b6c6e?w=200&h=200&fit=crop",
    partnershipType: "Paying",
    payRate: "₦120k",
    minViewers: 500,
    location: "Paris, FR",
    description: "Premium botanical skincare for professional content creators.",
    nicheTags: ["Beauty", "Self-care"],
    responseRate: "24h Response",
    closingDate: "6d",
    isVerified: true,
    isFeatured: false,
    budgetRange: "₦30k-₦50k",
    about: "We're launching our new serum line and want creators with high engagement. Must be comfortable doing on-camera skincare routines."
  },
  {
    id: "b5",
    name: "NEXUS AI",
    industry: "Tech & Software",
    logo: "https://images.unsplash.com/photo-1764123108291-0f48d2c7e563?w=200&h=200&fit=crop",
    partnershipType: "Pay + Code",
    payRate: "₦200k",
    minViewers: 1500,
    location: "San Francisco, US",
    description: "Next-gen productivity tool powered by artificial intelligence.",
    nicheTags: ["Tech", "Business"],
    responseRate: "Fast Response",
    isVerified: true,
    isFeatured: true,
    budgetRange: "₦80k+",
    about: "Showcase how Nexus AI streamlines your workflow. Perfect for productivity, tech, or business-focused creators."
  },
  {
    id: "b6",
    name: "URBAN TAILOR",
    industry: "Fashion",
    logo: "https://images.unsplash.com/photo-1674978037981-fef8cbf2b3a2?w=200&h=200&fit=crop",
    partnershipType: "Paying",
    payRate: "₦75k",
    minViewers: 250,
    location: "Manchester, UK",
    description: "Streetwear brand focused on sustainable fabrics and urban design.",
    nicheTags: ["Streetwear", "Sustainable"],
    responseRate: "48h Response",
    closingDate: "1d",
    isVerified: false,
    isFeatured: false,
    budgetRange: "₦20k-₦40k",
    about: "Looking for urban explorers and fashion-forward creators to represent our AW26 collection."
  },
  {
    id: "b7",
    name: "VIBE ENERGY",
    industry: "Beverage",
    logo: "https://images.unsplash.com/photo-1632858280935-d5611683e434?w=200&h=200&fit=crop",
    partnershipType: "Pay + Code",
    payRate: "₦50k",
    minViewers: 100,
    location: "Berlin, DE",
    description: "Natural energy drink for gamers and late-night creators.",
    nicheTags: ["Gaming", "Lifestyle"],
    responseRate: "24h Response",
    isVerified: true,
    isFeatured: false,
    budgetRange: "₦10k-₦30k",
    about: "Join the Vibe team! We need creators who go live at least 3 times a week and want to keep their energy levels up naturally."
  },
  {
    id: "b8",
    name: "LUMINA HOME",
    industry: "Home & Decor",
    logo: "https://images.unsplash.com/photo-1761311985502-8d132eb2ba73?w=200&h=200&fit=crop",
    partnershipType: "Paying",
    payRate: "₦180k",
    minViewers: 800,
    location: "Stockholm, SE",
    description: "Minimalist home office equipment and smart lighting solutions.",
    nicheTags: ["Interior", "Tech"],
    responseRate: "Fast Response",
    closingDate: "10d",
    isVerified: true,
    isFeatured: true,
    budgetRange: "₦60k-₦100k",
    about: "Our new ergonomic desk lamps need showing off in a professional live setup. High quality camera gear required."
  }
];

export function BrowseBusinesses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessCampaign | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ industry: string; type: string }>({ industry: "All", type: "All" });

  const creatorStats = { avgViewers: 250 };

  const industries = ["All", ...Array.from(new Set(MOCK_DATA.map(b => b.industry)))];
  const types = ["All", "Pay + Code", "Paying", "Code Only"];

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(biz => {
      const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           biz.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = activeFilters.industry === "All" || biz.industry === activeFilters.industry;
      const matchesType = activeFilters.type === "All" || biz.partnershipType === activeFilters.type;
      return matchesSearch && matchesIndustry && matchesType;
    });
  }, [searchQuery, activeFilters]);

  const getBadgeColor = (type: PartnershipType) => {
    switch(type) {
      case "Pay + Code": return "bg-[#1D1D1D] text-white border-none";
      case "Paying": return "bg-[#389C9A] text-white border-none";
      case "Code Only": return "bg-[#FEDB71] text-[#1D1D1D] border-none";
      case "Open to Offers": return "bg-white text-[#1D1D1D] border-2 border-[#1D1D1D]";
      default: return "bg-[#1D1D1D] text-white";
    }
  };

  const getEligibilityStyles = (status: "Match" | "Close" | "Ineligible") => {
    switch(status) {
      case "Match": return "bg-[#389C9A] text-white";
      case "Close": return "bg-[#FEDB71] text-[#1D1D1D]";
      case "Ineligible": return "bg-[#FF5252] text-white";
      default: return "bg-gray-100 text-gray-500";
    }
  };

  const getClosingStyles = (days: string | undefined) => {
    if (!days) return "bg-[#F8F8F8] text-[#1D1D1D]/40";
    const num = parseInt(days);
    if (num <= 2) return "bg-[#FF5252]/10 text-[#FF5252] border border-[#FF5252]/20";
    if (num <= 4) return "bg-[#FEDB71]/10 text-[#D2691E] border border-[#FEDB71]/20";
    return "bg-[#1D1D1D]/5 text-[#1D1D1D]/60";
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = new Set(savedIds);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSavedIds(newSaved);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] text-[#1D1D1D] font-sans overflow-x-hidden pb-[100px]">
      <AppHeader showBack title="Browse Brands" />
      <div className="px-5 py-6 sticky top-[84px] bg-[#FDFDFD]/95 backdrop-blur-md z-20">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 opacity-20" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH BRANDS..."
              className="w-full bg-white border-2 border-[#1D1D1D] py-4 pl-12 pr-4 text-[11px] font-black uppercase tracking-[0.2em] outline-none focus:bg-[#1D1D1D] focus:text-white transition-all italic"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`border-2 border-[#1D1D1D] px-5 transition-all active:scale-95 ${isFilterOpen ? 'bg-[#1D1D1D] text-white' : 'bg-white text-[#1D1D1D]'}`}
          >
            <Filter className={`w-5 h-5 ${isFilterOpen ? 'text-white' : 'text-[#389C9A]'}`} />
          </button>
        </div>

        {/* Filter Dropdown */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-40 italic">Industry</span>
                  <div className="flex flex-wrap gap-2">
                    {industries.map(ind => (
                      <button 
                        key={ind}
                        onClick={() => setActiveFilters(prev => ({ ...prev, industry: ind }))}
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border-2 transition-all rounded-none ${activeFilters.industry === ind ? 'bg-[#1D1D1D] text-white border-[#1D1D1D]' : 'bg-white text-[#1D1D1D] border-[#1D1D1D]/10'}`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-40 italic">Type</span>
                  <div className="flex flex-wrap gap-2">
                    {types.map(t => (
                      <button 
                        key={t}
                        onClick={() => setActiveFilters(prev => ({ ...prev, type: t }))}
                        className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border-2 transition-all rounded-none ${activeFilters.type === t ? 'bg-[#1D1D1D] text-white border-[#1D1D1D]' : 'bg-white text-[#1D1D1D] border-[#1D1D1D]/10'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Browse Feed - Redesigned Cards */}
      <main className="flex-1 px-5 pt-4 flex flex-col gap-6">
        {filteredData.map((biz) => {
          return (
            <motion.div 
              key={biz.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedBusiness(biz)}
              className="relative bg-white border-2 border-[#1D1D1D] rounded-xl overflow-visible transition-all cursor-pointer group active:scale-[0.99]"
            >
              {/* Partnership Badge Overlap */}
              <div className={`absolute -top-3 right-6 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest z-10 ${getBadgeColor(biz.partnershipType)}`}>
                {biz.partnershipType}
              </div>

              {/* ZONE 1 — TOP SECTION */}
              <div className="p-6 flex gap-5">
                {/* Business Image Portrait - Larger and cleaner */}
                <div className="relative w-24 h-32 shrink-0 bg-[#F8F8F8] border-2 border-[#1D1D1D] rounded-lg overflow-hidden">
                  <img src={biz.logo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={biz.name} />
                </div>

                {/* Text Content - More spacious */}
                <div className="flex-1 flex flex-col justify-start gap-3 pt-2">
                  <h3 className="text-xl font-black uppercase tracking-tight leading-tight">
                    {biz.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#1D1D1D]/40 italic">
                      {biz.industry.toUpperCase()} <span className="mx-1.5 not-italic">·</span> {biz.location.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed text-[#1D1D1D]/60 italic line-clamp-2">
                    {biz.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-3.5 h-3.5 text-[#389C9A]" />
                    <span className="text-[9px] font-bold text-[#1D1D1D]/50 italic">
                      Min. {biz.minViewers} avg viewers required
                    </span>
                  </div>
                </div>
              </div>

              {/* Full width divider */}
              <div className="h-[2px] bg-[#1D1D1D]" />

              {/* ZONE 2 — BOTTOM SECTION */}
              <div className="bg-[#F8F8F8] p-6 flex items-center justify-between gap-4">
                {/* Left: Price - Two Lines */}
                <div className="flex flex-col gap-1">
                  <p className="text-3xl font-black leading-none text-[#D2691E] tracking-tight">
                    {biz.payRate}
                  </p>
                  <p className="text-[11px] font-medium leading-none text-[#D2691E]/70">
                    for 4 Live Streams
                  </p>
                </div>

                {/* Right: Full Button */}
                <button className="bg-[#1D1D1D] text-white px-6 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:bg-[#389C9A] transition-all active:scale-[0.98] whitespace-nowrap">
                  VIEW DETAILS <ArrowRight className="w-4 h-4 text-[#FEDB71]" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </main>

      {/* 4. Bottom Sheet (Mobile Native Feel) */}
      <AnimatePresence>
        {selectedBusiness && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-0">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedBusiness(null)}
              className="absolute inset-0 bg-[#1D1D1D]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[480px] bg-white border-t-4 border-[#1D1D1D] h-[92vh] flex flex-col rounded-t-[32px] shadow-2xl overflow-hidden"
            >
              {/* Fixed Header within Modal */}
              <div className="shrink-0 bg-white px-6 pt-4 pb-2 border-b border-[#1D1D1D]/5">
                <div className="w-12 h-1.5 bg-[#1D1D1D]/10 rounded-full mx-auto mb-6" />
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-[#F8F8F8] border-2 border-[#1D1D1D] rounded-xl overflow-hidden shrink-0">
                      <img src={selectedBusiness.logo} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1 italic">{selectedBusiness.name}</h2>
                      <div className="flex items-center gap-2 italic">
                        {selectedBusiness.isVerified && <CheckCircle2 className="w-3 h-3 text-[#389C9A]" />}
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">{selectedBusiness.industry}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedBusiness(null)} className="p-3 bg-[#F8F8F8] border-2 border-[#1D1D1D] rounded-xl active:scale-95 transition-transform">
                    <X className="w-5 h-5 text-[#1D1D1D]" />
                  </button>
                </div>
              </div>
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32">
                {/* Offer Grid - Compact */}
                <div className="grid grid-cols-2 gap-px bg-[#1D1D1D] border-2 border-[#1D1D1D] mb-10 rounded-xl overflow-hidden">
                  {[
                    { label: "Pay Rate", val: selectedBusiness.payRate },
                    { label: "Min Viewers", val: selectedBusiness.minViewers },
                    { label: "Type", val: selectedBusiness.partnershipType },
                    { label: "Response", val: selectedBusiness.responseRate }
                  ].map(item => (
                    <div key={item.label} className="bg-white p-5 flex flex-col gap-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-30 italic">{item.label}</span>
                      <span className="text-xs font-black uppercase text-[#389C9A] tracking-tight">{item.val}</span>
                    </div>
                  ))}
                </div>

                {/* Content Sections */}
                <div className="flex flex-col gap-12">
                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 border-b-2 border-[#1D1D1D]/10 pb-3 mb-6 italic">About Campaign</h3>
                    <p className="text-sm font-medium leading-relaxed text-[#1D1D1D]/80 italic">{selectedBusiness.about}</p>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 border-b-2 border-[#1D1D1D]/10 pb-3 mb-6 italic">Match Analysis</h3>
                    <div className="bg-[#1D1D1D] text-white p-8 flex flex-col gap-6 border-2 border-[#1D1D1D] rounded-2xl">
                      <div className="flex justify-between items-center text-[11px] font-black uppercase italic tracking-widest">
                        <span>Min. Viewers</span>
                        <span className={creatorStats.avgViewers >= selectedBusiness.minViewers ? 'text-[#389C9A]' : 'text-[#FEDB71]'}>
                          {creatorStats.avgViewers} / {selectedBusiness.minViewers}
                        </span>
                      </div>
                      <div className="h-[1px] bg-white/10" />
                      <div className="flex justify-between items-center text-[11px] font-black uppercase italic tracking-widest">
                        <span>Niche Fit</span>
                        <span className="text-[#389C9A]">92% Match</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Fixed Bottom CTA for Modal */}
              <div className="shrink-0 p-6 bg-white border-t-2 border-[#1D1D1D] z-[110]">
                {appliedIds.has(selectedBusiness.id) ? (
                  <div className="w-full bg-[#389C9A]/10 text-[#389C9A] p-5 text-center text-[10px] font-black uppercase tracking-[0.3em] border-2 border-[#389C9A]/20 rounded-xl italic">
                    Application Pending
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setAppliedIds(new Set([...appliedIds, selectedBusiness.id]));
                      setTimeout(() => setSelectedBusiness(null), 1200);
                    }}
                    className="w-full bg-[#1D1D1D] text-white p-5 rounded-xl text-lg font-black uppercase italic tracking-tighter flex items-center justify-center gap-4 active:scale-[0.98] transition-all shadow-[0_4px_0_0_#389C9A]"
                  >
                    Send Application <ArrowRight className="w-6 h-6 text-[#FEDB71]" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}