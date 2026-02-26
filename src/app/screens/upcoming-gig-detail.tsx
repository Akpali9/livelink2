import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  Video, 
  Tag, 
  Clock, 
  PoundSterling as Pound,
  Shield,
  PhoneOff,
  Megaphone,
  Layout,
  Lock,
  Download,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Camera
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AppHeader } from "../components/app-header";
import { BottomNav } from "../components/bottom-nav";

export function UpcomingGigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the gig
  const gig = {
    id: id || "301",
    business: "NATUREBREW",
    campaignName: "Nature's Energy Boost 2026",
    logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    verified: true,
    startDate: "Feb 24, 2026",
    package: "Silver · 12 Streams",
    type: "Banner + Code",
    deadline: "Complete all streams within 1 month of acceptance",
    earnings: "£180.00 total",
    earningsSubtext: "Paid per every 4 verified qualifying streams",
    acceptanceDate: "Feb 18, 2026",
    daysToStart: 4,
  };

  const payouts = [
    { label: "After Streams 1–4 verified", amount: "£45.00", status: "Upcoming", statusColor: "gray" },
    { label: "After Streams 5–8 verified", amount: "£45.00", status: "Upcoming", statusColor: "gray" },
    { label: "After Streams 9–12 verified", amount: "£45.00", status: "Upcoming", statusColor: "gray" },
  ];

  const responsibilities = [
    {
      icon: Clock,
      title: "Minimum Stream Duration",
      detail: "Every stream must be at least 45 minutes long to count as a qualifying stream toward your package. Streams under 45 minutes will not be counted or paid."
    },
    {
      icon: Layout,
      title: "Banner Must Stay Visible",
      detail: "Your campaign banner must remain clearly visible for the full duration of every qualifying stream. Do not cover, minimise or remove the banner at any point during the stream."
    },
    {
      icon: Megaphone,
      title: "Promo Code Mentions",
      detail: "You must verbally mention the promo code at least once per hour during every qualifying stream. Failing to mention the code may result in that stream not being verified."
    },
    {
      icon: Calendar,
      title: "Stick to Your Schedule",
      detail: "Complete all 12 streams within 1 month of your acceptance date. If you need to reschedule notify NatureBrew via the LiveLink message thread at least 24 hours in advance."
    },
    {
      icon: Shield,
      title: "Content Standards",
      detail: "No offensive, adult, violent or illegal content may appear during any sponsored stream. Any violation will result in immediate campaign termination and forfeiture of all earned funds."
    },
    {
      icon: PhoneOff,
      title: "No External Communication",
      detail: "All communication with NatureBrew must remain exclusively within the LiveLink app. Sharing contact details or moving conversations outside the platform will result in account closure and permanent loss of all funds."
    }
  ];

  const colors = {
    brown: "#8B4513",
    orange: "#D2691E",
    sandy: "#F4A460",
    cornsilk: "#FFF8DC",
    black: "#1D1D1D",
    white: "#FFFFFF",
    amber: "#D2691E", // Using orange for amber to match the palette
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[100px]">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-[#1D1D1D] px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-center flex-1">Upcoming Gig</h1>
        <div className="bg-[#FFF8DC] text-[#D2691E] text-[9px] font-black uppercase px-2 py-0.5 tracking-widest border border-[#D2691E]/20">
          Upcoming
        </div>
      </div>

      <main className="max-w-[480px] mx-auto w-full">
        {/* SECTION 1 — GIG CONFIRMED BANNER */}
        <div className="bg-[#FFF8DC] border-b-2 border-[#1D1D1D] px-6 py-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#D2691E]" />
          <p className="text-[10px] font-black uppercase tracking-tight">
            Gig Confirmed · {gig.business} x Alex
          </p>
        </div>

        {/* SECTION 2 — BUSINESS & CAMPAIGN OVERVIEW CARD */}
        <div className="px-6 py-8">
          <div className="bg-white border-2 border-[#1D1D1D] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <ImageWithFallback src={gig.logo} className="w-16 h-16 border-2 border-[#1D1D1D] grayscale object-cover rounded-none" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">{gig.business}</h2>
                    {gig.verified && <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />}
                  </div>
                  <p className="text-[10px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest">{gig.campaignName}</p>
                </div>
              </div>

              <div className="h-[2px] bg-[#1D1D1D] mb-6" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FFF8DC] flex items-center justify-center border border-[#1D1D1D]/10">
                    <Calendar className="w-5 h-5 text-[#D2691E]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-0.5">Gig Starts</p>
                    <p className="text-sm font-black italic">{gig.startDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FFF8DC] flex items-center justify-center border border-[#1D1D1D]/10">
                    <Video className="w-5 h-5 text-[#D2691E]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-0.5">Package</p>
                    <p className="text-sm font-black italic">{gig.package}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FFF8DC] flex items-center justify-center border border-[#1D1D1D]/10">
                    <Tag className="w-5 h-5 text-[#D2691E]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-0.5">Campaign Type</p>
                    <p className="text-sm font-black italic">{gig.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FFF8DC] flex items-center justify-center border border-[#1D1D1D]/10">
                    <Clock className="w-5 h-5 text-[#D2691E]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-0.5">Stream Deadline</p>
                    <p className="text-xs font-bold leading-tight uppercase tracking-tight max-w-[200px] italic">{gig.deadline}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D2691E] flex items-center justify-center border border-[#1D1D1D]/10">
                    <Pound className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-0.5">Your Earnings</p>
                    <p className="text-xl font-black italic text-[#D2691E]">{gig.earnings}</p>
                    <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest italic">{gig.earningsSubtext}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 — PAYOUT SCHEDULE */}
        <div className="px-6 py-12 bg-[#F8F8F8] border-y-2 border-[#1D1D1D]">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Your Payout Schedule</h3>
          <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest mb-8">Earnings are released after each verified 4-stream cycle.</p>

          <div className="flex flex-col gap-3 mb-8">
            {payouts.map((payout, i) => (
              <div key={i} className="bg-white border border-[#1D1D1D]/10 p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase italic">{payout.label}</p>
                  <p className="text-lg font-black text-[#D2691E] italic">{payout.amount}</p>
                </div>
                <div className="px-3 py-1 border border-[#1D1D1D]/10 text-[8px] font-black uppercase tracking-widest text-[#1D1D1D]/30 italic">
                  Upcoming
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center py-4 border-t-2 border-[#1D1D1D] mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest">Total Earnings</span>
            <span className="text-xl font-black italic">£180.00</span>
          </div>
          
          <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest italic text-center">
            Payouts processed within 3 to 5 business days of each verification.
          </p>
        </div>

        {/* SECTION 4 — YOUR AGREED RESPONSIBILITIES */}
        <div className="px-6 py-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Your Agreed Responsibilities</h3>
          <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest mb-8">These are the terms you agreed to when accepting this gig. Please read before going live.</p>

          <div className="flex flex-col gap-4 mb-8">
            {responsibilities.map((res, i) => (
              <div key={i} className="bg-white border-2 border-[#1D1D1D] p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F8F8F8] flex items-center justify-center flex-shrink-0">
                  <res.icon className="w-5 h-5 text-[#D2691E]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 italic">{res.title}</h4>
                  <p className="text-[10px] font-medium leading-relaxed text-[#1D1D1D]/60 italic">
                    {res.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#D2691E] text-white p-6 flex items-center gap-4">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <p className="text-[10px] font-black uppercase tracking-tight italic">
              You agreed to all of the above when you accepted this gig on {gig.acceptanceDate}.
            </p>
          </div>
        </div>

        {/* SECTION 5 — YOUR CAMPAIGN ASSETS */}
        <div className="px-6 py-12 bg-[#FFF8DC]/30 border-y-2 border-[#1D1D1D]">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Your Assets</h3>
          <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest mb-8">Your assets will be available here from your gig start date. Come back on Feb 24 to access your banner and promo code.</p>

          <div className="flex flex-col gap-6 mb-8 opacity-60 pointer-events-none grayscale">
            {/* Asset 1 — Banner */}
            <div className="bg-white border-2 border-[#1D1D1D] p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest">Campaign Banner</p>
                <Lock className="w-4 h-4 text-[#D2691E]" />
              </div>
              <div className="aspect-video bg-[#F8F8F8] border border-[#1D1D1D]/10 flex flex-col items-center justify-center gap-2 mb-6">
                <Lock className="w-6 h-6 text-[#1D1D1D]/20" />
                <p className="text-[8px] font-black uppercase tracking-widest text-[#1D1D1D]/40">Available from Feb 24, 2026</p>
              </div>
              <button className="w-full bg-[#1D1D1D]/10 text-[#1D1D1D]/20 py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-transparent">
                <Download className="w-4 h-4" /> Download Banner
              </button>
            </div>

            {/* Asset 2 — Promo Code */}
            <div className="bg-white border-2 border-[#1D1D1D] p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest">Promo Code</p>
                <Lock className="w-4 h-4 text-[#D2691E]" />
              </div>
              <div className="bg-[#F8F8F8] border border-[#1D1D1D]/10 p-4 text-center mb-6 font-mono tracking-[0.5em] text-[#1D1D1D]/20 text-xl font-black">
                - - - - - - - - -
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-[#1D1D1D]/40 text-center mb-6">Available from Feb 24, 2026</p>
              <button className="w-full bg-[#1D1D1D]/10 text-[#1D1D1D]/20 py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-transparent">
                <Copy className="w-4 h-4" /> Copy Code
              </button>
            </div>

            {/* Asset 3 — OBS Overlay URL */}
            <div className="bg-white border-2 border-[#1D1D1D] p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest">OBS Overlay URL</p>
                <Lock className="w-4 h-4 text-[#D2691E]" />
              </div>
              <div className="bg-[#F8F8F8] border border-[#1D1D1D]/10 p-4 mb-6">
                <div className="h-4 bg-[#1D1D1D]/5 w-full rounded-none" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-[#1D1D1D]/40 text-center mb-6">Available from Feb 24, 2026</p>
              <button className="w-full bg-[#1D1D1D]/10 text-[#1D1D1D]/20 py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-transparent">
                <ExternalLink className="w-4 h-4" /> Copy URL
              </button>
            </div>
          </div>

          <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest italic text-center">
            You will receive a notification when your assets are ready to use.
          </p>
        </div>

        {/* SECTION 6 — COUNTDOWN TO START */}
        <div className="px-6 py-12">
          <div className="bg-white border-2 border-[#1D1D1D] p-10 text-center overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F8F8F8]">
              <div className="h-full bg-[#D2691E] w-3/4" />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Gig Starts In</h4>
            <div className="text-6xl font-black italic tracking-tighter mb-2 text-[#1D1D1D]">
              {gig.daysToStart} DAYS
            </div>
            <p className="text-[10px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest italic">
              Feb 24, 2026 · Make sure you are ready to go live.
            </p>
          </div>
        </div>

        {/* SECTION 7 — STREAM PROOF REMINDER */}
        <div className="px-6 pb-12">
          <div className="bg-[#F8F8F8] border border-[#1D1D1D]/10 p-8 flex flex-col items-center text-center gap-6">
            <div className="w-12 h-12 bg-white border border-[#1D1D1D]/10 flex items-center justify-center rounded-none shadow-[4px_4px_0px_#1D1D1D]">
              <Camera className="w-6 h-6 text-[#D2691E]" />
            </div>
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-widest mb-3">Remember to Submit Proof</h4>
              <p className="text-[10px] font-medium leading-relaxed text-[#1D1D1D]/60 italic">
                After every qualifying stream you must upload a screenshot of your analytics showing your viewer count and stream duration. This is required to verify your stream and trigger your payout. You can do this from the active campaign page once your gig goes live.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 8 — COMMUNICATION */}
        <div className="px-6 pb-24 flex flex-col gap-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Communication</h3>
          <button 
            onClick={() => navigate("/messages")}
            className="w-full bg-[#1D1D1D] text-white py-6 text-xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-4 active:scale-[0.98] transition-all"
          >
            <MessageSquare className="w-6 h-6 text-[#D2691E]" /> Message NatureBrew
          </button>
          
          <div className="bg-red-50 border border-red-200 p-6 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-[10px] font-bold text-red-600 leading-relaxed uppercase tracking-tight italic">
              All messages must stay on LiveLink. Moving conversations elsewhere will result in payment forfeiture.
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
