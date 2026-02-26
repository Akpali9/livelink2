import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Bell, 
  ArrowUpRight, 
  Inbox, 
  Clock, 
  CheckCircle2, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  Briefcase,
  Wallet,
  User,
  List,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BottomNav } from "../components/bottom-nav";
import { AppHeader } from "../components/app-header";
import { DeclineOfferModal } from "../components/decline-offer-modal";

export function Dashboard() {
  const navigate = useNavigate();
  const earningsRef = useRef<HTMLDivElement>(null);
  const [requestsExpanded, setRequestsExpanded] = useState(false);
  const [applicationsExpanded, setApplicationsExpanded] = useState(false);
  const [rejectedIds, setRejectedIds] = useState<number[]>([]);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const user = {
    name: "Alex",
    avatar: "https://images.unsplash.com/photo-1758179759979-c0c2235ae172?w=100&h=100&fit=crop",
    totalEarned: 1240.00,
    pending: 145.00,
    paidOut: 1095.00,
  };

  const statusCounts = {
    requested: 3,
    pending: 2,
    completed: 8
  };

  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 1,
      business: "CloudSaaS",
      name: "API Tool Promo",
      type: "Banner + Promo Code",
      streams: 12,
      price: 180,
      daysLeft: 3,
      logo: "https://images.unsplash.com/photo-1644088379091-d574269d422f?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      business: "GreenEnergy",
      name: "Eco-Stream Weekend",
      type: "Banner Only",
      streams: 4,
      price: 70,
      daysLeft: 1,
      logo: "https://images.unsplash.com/photo-1622131815452-cc00d8d89f02?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      business: "TechFlow",
      name: "Dev Tool Spotlight",
      type: "Banner + Promo Code",
      streams: 8,
      price: 120,
      daysLeft: 5,
      logo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=100&h=100&fit=crop",
    }
  ]);

  const liveCampaign = {
    id: 101,
    business: "PrimeNest",
    name: "Spring Property Showcase",
    logo: "https://images.unsplash.com/photo-1622651132634-a7ed1fbb86dd?w=100&h=100&fit=crop",
    sessionEarnings: "45.00",
    streamTime: "23:45",
    progress: 52, // 23 mins of 45
    remainingMins: 22
  };

  const handleDeclineClick = (req: any) => {
    setSelectedRequest(req);
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = (reason: string) => {
    if (!selectedRequest) return;
    
    setIsDeclineModalOpen(false);
    toast.success(`Offer declined. ${selectedRequest.business} has been notified.`);
    
    // Smoothly remove the card
    setIncomingRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    setSelectedRequest(null);
  };

  const applications = [
    {
      id: 201,
      business: "Glow Health",
      logo: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop",
      type: "Pay + Code",
      amount: 150,
      status: "Awaiting Response",
      appliedAt: "2 days ago"
    },
    {
      id: 202,
      business: "Peak Supps",
      logo: "https://images.unsplash.com/photo-1571171637448-4a6ef83cd9c7?w=100&h=100&fit=crop",
      type: "Banner Only",
      amount: 80,
      status: "Under Review",
      appliedAt: "4 days ago"
    },
    {
      id: 203,
      business: "Swift Logistics",
      logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop",
      type: "Code Only",
      status: "Declined",
      appliedAt: "1 week ago"
    },
    {
      id: 204,
      business: "Z-Tech",
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop",
      type: "Banner Only",
      amount: 200,
      status: "Under Review",
      appliedAt: "1 day ago"
    }
  ];

  const upcomingCampaigns = [
    {
      id: 301,
      business: "NatureBrew",
      logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
      startDate: "Feb 24, 2026",
      package: "Silver (12 Streams)"
    }
  ];

  const earningsRatio = (user.paidOut / user.totalEarned) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[60px]">
      <AppHeader showLogo subtitle="Creator Hub" />
      <Toaster position="top-center" richColors />
      
      <main className="max-w-[480px] mx-auto w-full">
        {/* Section 1 — Earnings Card */}
        <div className="p-6" ref={earningsRef}>
          <div className="bg-[#1D1D1D] p-8 text-white relative overflow-hidden border-2 border-[#1D1D1D]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Total Earnings</span>
              <button className="p-1">
                <ArrowUpRight className="w-4 h-4 text-white/40" />
              </button>
            </div>
            <h2 className="text-4xl font-black tracking-tighter leading-none mb-8 text-center italic">£{user.totalEarned.toFixed(2)}</h2>
            
            <div className="h-[1px] bg-white/10 mb-8" />
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pending</span>
                <span className="text-xl font-bold text-[#FEDB71]">£{user.pending.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Paid Out</span>
                <span className="text-xl font-bold text-[#389C9A]">£{user.paidOut.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-1 bg-white/10 w-full rounded-none overflow-hidden">
                <div 
                  className="h-full bg-[#389C9A] transition-all duration-1000" 
                  style={{ width: `${earningsRatio}%` }}
                />
              </div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                {Math.round(earningsRatio)}% of earnings paid out
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 — Primary CTA Button */}
        <div className="px-6 pb-6">
          <Link 
            to="/browse-businesses" 
            className="w-full bg-[#1D1D1D] text-white py-8 px-8 text-xl font-black uppercase italic tracking-tighter flex items-center justify-between active:scale-[0.98] transition-all"
          >
            Browse Opportunities
            <ArrowUpRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Section 3 — Campaign Status Row */}
        <div className="px-6 pb-12">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Inbox, count: statusCounts.requested, label: "Requested Campaigns" },
              { icon: Clock, count: statusCounts.pending, label: "Pending Campaigns" },
              { icon: CheckCircle2, count: statusCounts.completed, label: "Completed Campaigns" },
            ].map((card, i) => (
              <button 
                key={i} 
                onClick={() => navigate("/campaigns")}
                className="bg-white border-2 border-[#1D1D1D] p-4 flex flex-col items-center gap-2 active:bg-[#1D1D1D] active:text-white transition-all cursor-pointer"
              >
                <card.icon className="w-4 h-4 text-[#389C9A]" />
                <span className="text-xl font-black italic">{card.count}</span>
                <span className="text-[7px] font-black uppercase tracking-widest text-center leading-tight opacity-40">{card.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4 — Incoming Requests */}
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40">Incoming Requests</h3>
            <span className="bg-[#FEDB71] text-[#1D1D1D] text-[9px] font-black uppercase px-2 py-0.5 tracking-widest italic">{incomingRequests.length} new</span>
          </div>
          
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {(requestsExpanded ? incomingRequests : incomingRequests.slice(0, 2)).map(req => (
                <motion.div 
                  layout
                  key={req.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-2 border-[#1D1D1D] p-6 flex flex-col gap-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <ImageWithFallback src={req.logo} className="w-12 h-12 border border-[#1D1D1D]/10 grayscale object-cover" />
                      <div>
                        <h4 className="font-black text-lg uppercase tracking-tight leading-none mb-1">{req.business}</h4>
                        <p className="text-[10px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest">{req.type}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-2xl font-black italic leading-none mb-2 text-[#389C9A]">£{req.price}</p>
                      <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-none flex items-center gap-1.5 ${
                        req.daysLeft <= 1 ? "bg-red-100 text-red-600 border border-red-200" : 
                        req.daysLeft <= 2 ? "bg-orange-100 text-orange-600 border border-orange-200" : "bg-[#FEDB71]/10 text-[#FEDB71] border border-[#FEDB71]/20"
                      }`}>
                        <Clock className="w-2.5 h-2.5" /> {req.daysLeft} days left
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[10px] font-medium text-[#1D1D1D]/60 italic">
                    {req.name} — {req.type} · {req.streams} streams
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => navigate("/gig-accepted")}
                      className="bg-[#1D1D1D] text-white py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      <Check className="w-4 h-4 text-[#389C9A]" /> Accept
                    </button>
                    <button 
                      onClick={() => handleDeclineClick(req)}
                      className="border-2 py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-[#1D1D1D] text-[#1D1D1D] active:scale-95"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {incomingRequests.length > 2 && (
              <button 
                onClick={() => setRequestsExpanded(!requestsExpanded)}
                className="w-full py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 text-[#1D1D1D]/40 hover:text-[#1D1D1D] transition-colors"
              >
                {requestsExpanded ? (
                  <>Show less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show {incomingRequests.length - 2} more requests <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
        {/* Section 5 — Live Now */}
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40">Live Now</h3>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#1D1D1D]">
              <span className="w-1.5 h-1.5 bg-[#389C9A] rounded-full animate-pulse" />
              Active
            </div>
          </div>
          
          {liveCampaign ? (
            <div className="bg-[#1D1D1D] p-6 flex flex-col gap-6 relative overflow-hidden border-2 border-[#1D1D1D]">
              <div className="flex items-center gap-6 relative z-10">
                <ImageWithFallback src={liveCampaign.logo} className="w-12 h-12 border border-white/20 grayscale object-cover" />
                <div className="flex-1 text-white">
                  <h4 className="font-black text-lg uppercase tracking-tight leading-none mb-1">{liveCampaign.business}</h4>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{liveCampaign.name}</p>
                </div>
                <div className="text-right text-white">
                  <p className="text-xl font-black italic leading-none mb-1 text-[#FEDB71]">£{liveCampaign.sessionEarnings}</p>
                  <p className="text-[10px] font-black text-[#389C9A] uppercase tracking-widest italic">{liveCampaign.streamTime}</p>
                </div>
              </div>
              
              <div className="space-y-2 relative z-10">
                <div className="h-1 bg-white/10 w-full rounded-none overflow-hidden">
                  <div 
                    className="h-full bg-[#389C9A]" 
                    style={{ width: `${liveCampaign.progress}%` }}
                  />
                </div>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">
                  {liveCampaign.remainingMins} mins to qualify
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end relative z-10">
                <Link 
                  to="/campaign/live-update/1" 
                  className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 group hover:gap-3 transition-all italic"
                >
                  Update Campaign <ArrowUpRight className="w-3.5 h-3.5 group-hover:scale-110 transition-all text-[#FEDB71]" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-[#1D1D1D] p-12 text-center">
              <p className="text-xs text-[#1D1D1D]/40 mb-4">No active campaign running right now. Start a stream with an active campaign banner to see it here.</p>
              <Link to="/campaigns" className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D] underline italic">View Active Campaigns →</Link>
            </div>
          )}
        </div>

        {/* Section 6 — My Applications */}
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40">My Applications</h3>
            <span className="text-[9px] font-black uppercase text-[#1D1D1D]/40">{applications.length} pending</span>
          </div>
          <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest mb-6">Businesses you have applied to partner with</p>
          
          <div className="flex flex-col gap-3">
            {(applicationsExpanded ? applications : applications.slice(0, 3)).map(app => (
              <div key={app.id} className="bg-[#F8F8F8] border border-[#1D1D1D]/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ImageWithFallback src={app.logo} className="w-10 h-10 border border-[#1D1D1D]/10 grayscale object-cover" />
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-tight mb-1">{app.business}</h4>
                    <span className="text-[8px] font-black uppercase tracking-widest bg-[#1D1D1D]/5 px-1.5 py-0.5">{app.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  {app.amount && <p className="text-sm font-black italic mb-1 text-[#389C9A]">£{app.amount}</p>}
                  <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 ${
                    app.status === "Awaiting Response" ? "text-[#FEDB71]" :
                    app.status === "Under Review" ? "text-blue-500" :
                    app.status === "Accepted" ? "text-[#389C9A]" : "text-[#1D1D1D]/30"
                  }`}>
                    {app.status}
                  </div>
                  <p className="text-[7px] font-bold text-[#1D1D1D]/20 uppercase tracking-widest italic">{app.appliedAt}</p>
                </div>
              </div>
            ))}

            {applications.length > 3 && (
              <button 
                onClick={() => setApplicationsExpanded(!applicationsExpanded)}
                className="w-full py-2 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 text-[#1D1D1D]/30"
              >
                {applicationsExpanded ? (
                  <>Show less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show {applications.length - 3} more applications <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
            
            <Link to="/browse-businesses" className="text-[9px] font-black uppercase tracking-widest text-[#1D1D1D]/40 underline mt-4 text-center italic">Browse More Opportunities →</Link>
          </div>
        </div>

        {/* Section 7 — Upcoming Campaigns */}
        <div className="px-6 pb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40 mb-6">Coming Up</h3>
          {upcomingCampaigns.length > 0 ? (
            <div className="flex flex-col gap-3">
              {upcomingCampaigns.map(camp => (
                <div key={camp.id} className="bg-white border-2 border-[#1D1D1D] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ImageWithFallback src={camp.logo} className="w-10 h-10 border border-[#1D1D1D]/10 grayscale object-cover" />
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-tight">{camp.business}</h4>
                      <p className="text-[8px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest italic">{camp.startDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest mb-1">{camp.package}</p>
                    <button 
                      onClick={() => navigate(`/creator/upcoming-gig/${camp.id}`)}
                      className="text-[8px] font-black uppercase tracking-widest text-[#1D1D1D] underline italic cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#1D1D1D]/40">No upcoming campaigns scheduled. Browse opportunities to find your next partnership.</p>
          )}
        </div>

        {/* Section 8 — Quick Actions Row */}
        <div className="px-6 pb-24">
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => navigate("/campaigns")}
              className="bg-white border-2 border-[#1D1D1D] p-6 flex flex-col items-center gap-3 active:bg-[#1D1D1D] active:text-white transition-all group"
            >
              <div className="p-3 bg-[#F8F8F8] rounded-none group-active:bg-white/20">
                <List className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">My Campaigns</span>
            </button>
            <button 
              onClick={() => earningsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border-2 border-[#1D1D1D] p-6 flex flex-col items-center gap-3 active:bg-[#1D1D1D] active:text-white transition-all group"
            >
              <div className="p-3 bg-[#F8F8F8] rounded-none group-active:bg-white/20">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">Earnings</span>
            </button>
            <button 
              onClick={() => navigate("/profile/1")}
              className="bg-white border-2 border-[#1D1D1D] p-6 flex flex-col items-center gap-3 active:bg-[#1D1D1D] active:text-white transition-all group"
            >
              <div className="p-3 bg-[#F8F8F8] rounded-none group-active:bg-white/20">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">My Profile</span>
            </button>
          </div>
        </div>
      </main>
      <BottomNav />

      {selectedRequest && (
        <DeclineOfferModal 
          isOpen={isDeclineModalOpen}
          onClose={() => setIsDeclineModalOpen(false)}
          onConfirm={handleConfirmDecline}
          offerDetails={{
            partnerName: selectedRequest.business,
            offerName: selectedRequest.name,
            campaignType: selectedRequest.type,
            amount: `£${selectedRequest.price}`,
            logo: selectedRequest.logo,
            partnerType: "Business"
          }}
        />
      )}
    </div>
  );
}
