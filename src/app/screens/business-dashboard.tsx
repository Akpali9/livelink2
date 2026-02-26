import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Bell, 
  Mail, 
  User, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  MoreHorizontal, 
  Tv, 
  Ticket, 
  Star, 
  CheckCircle2, 
  X,
  Search,
  Image as LucideImageIcon,
  BarChart3,
  ArrowRight,
  Plus,
  MessageSquare,
  Clock,
  History as HistoryIcon,
  Check,
  Users,
  Briefcase,
  Megaphone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AppHeader } from "../components/app-header";
import { DeclineOfferModal } from "../components/decline-offer-modal";

export function BusinessDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCompletionBanner, setShowCompletionBanner] = useState(true);
  
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const stats = [
    { label: "Active", val: "1", sub: "Live Now" },
    { label: "Pending", val: "2", sub: "Response" },
    { label: "Spent", val: "₦1.2k", sub: "Total" },
    { label: "Promo", val: "156", sub: "Used" }
  ];

  const [campaignFilter, setCampaignFilter] = useState<"LIVE" | "PENDING" | "COMPLETED">("LIVE");
  
  const [pendingCampaigns, setPendingCampaigns] = useState([
    {
      id: "p1",
      name: "Product Launch X",
      creator: "Sarah Stream",
      status: "Offer Received",
      date: "Requested 2h ago",
      type: "Banner + Promo Code",
      amount: "₦150k",
      logo: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop"
    },
    {
      id: "p2",
      name: "Winter Clearance",
      creator: "Jordan Plays",
      status: "Negotiating",
      date: "Requested 1d ago",
      type: "Banner Only",
      amount: "₦80k",
      logo: "https://images.unsplash.com/photo-1571171637448-4a6ef83cd9c7?w=100&h=100&fit=crop"
    }
  ]);

  const handleDeclineClick = (offer: any) => {
    setSelectedOffer(offer);
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = (reason: string) => {
    if (!selectedOffer) return;
    
    setIsDeclineModalOpen(false);
    toast.success(`Offer declined. ${selectedOffer.creator} has been notified.`);
    
    // Smoothly remove the card
    setPendingCampaigns(prev => prev.filter(p => p.id !== selectedOffer.id));
    setSelectedOffer(null);
  };

  const myCampaigns = [
    {
      id: "c1",
      name: "SUMMER SALE BLAST",
      type: "Banner + Code",
      creatorsJoined: 3,
      creatorsTarget: 5,
      status: "ACTIVE",
      streamsCompleted: 18,
      streamsTotal: 60,
      creatorSummary: "3 Active · 1 Pending · 1 Not Started",
      price: "£25 per 4 streams",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=100&h=100&fit=crop",
      isAccepting: false
    },
    {
      id: "c2",
      name: "SPRING LAUNCH",
      type: "Banner Only",
      creatorsJoined: 1,
      creatorsTarget: 3,
      status: "OPEN",
      streamsCompleted: 0,
      streamsTotal: 36,
      creatorSummary: "1 Active · 2 Slots Available",
      price: "£10 per 4 streams",
      image: null,
      isAccepting: true
    },
    {
      id: "c3",
      name: "BRAND AWARENESS Q2",
      type: "Promo Code Only",
      creatorsJoined: 0,
      creatorsTarget: 2,
      status: "PENDING REVIEW",
      streamsCompleted: 0,
      streamsTotal: 0,
      creatorSummary: "Awaiting admin approval before going live",
      price: "£50 per 4 streams",
      image: null,
      isAccepting: false
    }
  ];

  const filteredCampaigns = myCampaigns.filter(camp => {
    if (campaignFilter === "LIVE") return camp.status === "ACTIVE" || camp.status === "OPEN";
    if (campaignFilter === "PENDING") return camp.status === "PENDING REVIEW";
    if (campaignFilter === "COMPLETED") return camp.status === "COMPLETED";
    return false;
  });

  const CampaignCard = ({ campaign }: { campaign: typeof myCampaigns[0] }) => (
    <div 
      className="bg-white border-2 border-[#1D1D1D] rounded-none overflow-hidden transition-transform active:scale-[0.99]"
      onClick={() => navigate(`/business/campaign/${campaign.id}`)}
    >
      {/* Top Section */}
      <div className="p-6 grid grid-cols-[auto_1fr_auto] gap-6 items-start">
        {/* Left Column: Logo/Image */}
        <div className="w-16 h-16 bg-[#F8F8F8] border border-[#1D1D1D]/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
          {campaign.image ? (
            <ImageWithFallback src={campaign.image} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-black text-[#1D1D1D]/20 uppercase">{campaign.name[0]}</span>
          )}
        </div>

        {/* Center Column: Info */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black uppercase tracking-tight italic leading-tight">{campaign.name}</h3>
          <p className="text-[10px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest italic">{campaign.type}</p>
          
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-[#389C9A]" />
              <span className="text-[10px] font-black uppercase tracking-tight">
                {campaign.creatorsJoined} of {campaign.creatorsTarget} creators joined
              </span>
            </div>
            {campaign.isAccepting ? (
              <span className="text-[9px] font-black uppercase tracking-widest text-[#389C9A] italic">Still accepting applications</span>
            ) : campaign.creatorsJoined === campaign.creatorsTarget ? (
              <span className="text-[9px] font-black uppercase tracking-widest text-[#1D1D1D]/40 italic">Creator slots filled ✓</span>
            ) : null}
          </div>
        </div>

        {/* Right Column: Status & Price */}
        <div className="flex flex-col items-end gap-2">
          <div className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest italic border ${
            campaign.status === "ACTIVE" ? "bg-[#389C9A] text-white border-[#389C9A]" :
            campaign.status === "PENDING REVIEW" ? "bg-[#FEDB71] text-[#1D1D1D] border-[#1D1D1D]/10" :
            campaign.status === "OPEN" ? "bg-white text-[#1D1D1D] border-[#1D1D1D]" :
            "bg-gray-100 text-gray-500 border-gray-200"
          }`}>
            {campaign.status}
          </div>
          <span className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-tight italic">
            {campaign.price}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#1D1D1D] px-6 py-4 flex justify-between items-center italic">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tight text-white/90">
          <span className="opacity-60">STREAMS: {campaign.streamsCompleted}/{campaign.streamsTotal}</span>
          <span className="opacity-20 text-[6px]">•</span>
          <span className="tracking-widest opacity-80">{campaign.creatorSummary.toUpperCase()}</span>
        </div>
        <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#FEDB71] hover:translate-x-1 transition-transform">
          VIEW CAMPAIGN <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 text-[#1D1D1D]">
      <Toaster position="top-center" richColors />
      {/* 1. Profile Completion Banner */}
      <AnimatePresence>
        {showCompletionBanner && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#FEDB71] px-8 py-4 flex flex-col gap-3 relative border-b border-[#1D1D1D]/10"
          >
            <button onClick={() => setShowCompletionBanner(false)} className="absolute top-4 right-6">
              <X className="w-4 h-4" />
            </button>
            <p className="text-[10px] font-black uppercase tracking-widest leading-tight pr-8 italic">
              Profile 60% Complete. Add website & bio.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1 bg-[#1D1D1D]/10 rounded-none overflow-hidden">
                <div className="h-full bg-[#1D1D1D] w-[60%]" />
              </div>
              <button onClick={() => navigate("/business/profile")} className="bg-[#1D1D1D] text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest italic">
                Complete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Header (Shared Component) */}
      <AppHeader showLogo userType="business" subtitle="Business Hub" />

      {/* 3. Primary CTA (Pinned) */}
      <div className="sticky top-[84px] z-40 bg-white px-8 py-6 border-b border-[#1D1D1D]">
        <button onClick={() => navigate("/campaign/type")} className="w-full bg-[#1D1D1D] text-white p-6 text-xl font-black uppercase tracking-tight flex items-center justify-center gap-4 active:scale-[0.98] transition-all italic">
          🎯 Create a Campaign
          <ArrowRight className="w-6 h-6 text-[#FEDB71]" />
        </button>
        <p className="text-center text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest mt-4 italic">Partner with a creator in under 10 minutes.</p>
      </div>

      {/* 4. Stats Grid */}
      <div className="px-8 mt-12">
        <div className="grid grid-cols-2 gap-[1px] bg-[#1D1D1D] border-2 border-[#1D1D1D]">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1D]/40 italic">{stat.label}</span>
              <span className="text-2xl font-black italic">{stat.val}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#389C9A]">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. My Campaigns */}
      <div className="px-8 mt-16">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic underline decoration-[#389C9A] decoration-4 underline-offset-4">My Campaigns</h2>
          </div>
          
          <div className="flex gap-8 border-b border-[#1D1D1D]/10">
            {(["LIVE", "PENDING", "COMPLETED"] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setCampaignFilter(tab)}
                className={`pb-4 text-[10px] font-black uppercase tracking-widest italic transition-all relative ${
                  campaignFilter === tab ? "text-[#389C9A]" : "text-[#1D1D1D]/30"
                }`}
              >
                {tab}
                {campaignFilter === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#389C9A]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex flex-col gap-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map(camp => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))
          ) : (
            <div className="py-20 flex flex-col items-center text-center gap-6 bg-[#F8F8F8] border-2 border-dashed border-[#1D1D1D]/10 px-8">
              <div className="p-6 bg-white border-2 border-[#1D1D1D] rounded-full">
                <Megaphone className="w-8 h-8 text-[#389C9A]" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter italic">No campaigns yet</h3>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest italic mt-2 max-w-[240px] mx-auto">
                  Post your first campaign offer to start matching with creators.
                </p>
              </div>
              <button 
                onClick={() => navigate("/campaign/create")}
                className="w-full bg-[#1D1D1D] text-white p-6 text-sm font-black uppercase tracking-widest italic active:scale-[0.98] transition-all"
              >
                Create Your First Campaign
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6. Pending Offers (Received from Creators) */}
      {pendingCampaigns.length > 0 && (
        <div className="px-8 mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-5 h-5 text-[#389C9A]" />
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Incoming Offers</h2>
          </div>
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {pendingCampaigns.map(camp => (
                <motion.div 
                  layout
                  key={camp.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#F8F8F8] border-2 border-[#1D1D1D] p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black uppercase tracking-tight leading-none mb-1 text-lg">{camp.name}</h3>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#389C9A] italic">{camp.creator}</p>
                    </div>
                    <div className="px-2 py-1 bg-[#FEDB71] text-[#1D1D1D] text-[7px] font-black uppercase tracking-widest italic border border-[#1D1D1D]/10">
                      {camp.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-40 italic">{camp.date}</p>
                    <span className="text-sm font-black italic">{camp.amount}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => navigate("/campaign/confirmed")}
                      className="bg-[#1D1D1D] text-white py-3 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all italic border-2 border-[#1D1D1D]"
                    >
                      <Check className="w-4 h-4 text-[#389C9A]" /> Accept Offer
                    </button>
                    <button 
                      onClick={() => handleDeclineClick(camp)}
                      className="bg-white text-[#1D1D1D] py-3 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all italic border-2 border-[#1D1D1D]"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 7. Browse Creators Quick Link */}
      <div className="px-8 mt-8">
        <button 
          onClick={() => navigate("/browse")}
          className="w-full bg-[#F8F8F8] border-2 border-dashed border-[#1D1D1D]/20 p-6 flex items-center justify-between group hover:border-[#389C9A] hover:bg-[#389C9A]/5 transition-all italic"
        >
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 bg-white border border-[#1D1D1D]/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#389C9A]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-widest">Browse Creators</p>
              <p className="text-[9px] font-medium uppercase tracking-widest opacity-40 italic">Find new partners to grow your brand</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#1D1D1D] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 8. Quick Actions */}
      <div className="px-8 mt-16 pb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[#1D1D1D]/40">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { icon: LucideImageIcon, label: "Asset Library", sub: "Manage your banners" },
            { icon: BarChart3, label: "Analytics", sub: "Performance reports" }
          ].map((action, i) => (
            <button key={i} className="bg-[#F8F8F8] border-2 border-[#1D1D1D] p-6 flex items-center justify-between group active:bg-[#1D1D1D] active:text-white transition-all italic">
              <div className="flex items-center gap-6">
                <action.icon className="w-6 h-6 text-[#389C9A]" />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest">{action.label}</p>
                  <p className="text-[8px] font-medium uppercase tracking-widest opacity-40 italic">{action.sub}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-[#FEDB71]" />
            </button>
          ))}
        </div>
      </div>

      {selectedOffer && (
        <DeclineOfferModal 
          isOpen={isDeclineModalOpen}
          onClose={() => setIsDeclineModalOpen(false)}
          onConfirm={handleConfirmDecline}
          offerDetails={{
            partnerName: selectedOffer.creator,
            offerName: selectedOffer.name,
            campaignType: selectedOffer.type || "Banner + Code",
            amount: selectedOffer.amount,
            logo: selectedOffer.logo || "https://images.unsplash.com/photo-1758179759979-c0c2235ae172?w=100&h=100&fit=crop",
            partnerType: "Creator"
          }}
        />
      )}
    </div>
  );
}