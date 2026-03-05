import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { 
  ArrowUpRight, 
  Inbox, 
  Clock, 
  CheckCircle2, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  Wallet,
  User,
  List,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BottomNav } from "../components/bottom-nav";
import { AppHeader } from "../components/app-header";
import { DeclineOfferModal } from "../components/decline-offer-modal";
import { supabase } from "../lib/supabase";
import { useDashboardData } from "../hooks/useDashboardData";
import type { IncomingRequest } from "../types/dashboard";

function SectionSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-24 bg-[#1D1D1D]/5 border-2 border-[#1D1D1D]/5" />
      ))}
    </div>
  );
}

function SectionError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="border-2 border-red-200 bg-red-50 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest">
        <AlertCircle className="w-4 h-4" /> {message}
      </div>
      <button
        onClick={onRetry}
        className="text-[9px] font-black uppercase tracking-widest text-red-500 underline italic"
      >
        Retry
      </button>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const earningsRef = useRef<HTMLDivElement>(null);
  const [creatorId, setCreatorId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [requestsExpanded, setRequestsExpanded] = useState(false);
  const [applicationsExpanded, setApplicationsExpanded] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IncomingRequest | null>(null);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCreatorId(user.id);
      }
      setAuthChecked(true);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCreatorId(session.user.id);
      } else {
        setCreatorId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch dashboard data
  const {
    profile,
    statusCounts,
    incomingRequests,
    setIncomingRequests,
    liveCampaign,
    applications,
    upcomingCampaigns,
    loading,
    errors,
    refetch,
  } = useDashboardData(creatorId);

  // Redirect if not authenticated
  useEffect(() => {
    if (authChecked && !creatorId) {
      navigate('/login');
    }
  }, [authChecked, creatorId, navigate]);

  // Actions
  const handleAccept = async (req: IncomingRequest) => {
    const { error } = await supabase
      .from("campaign_requests")
      .update({ status: "accepted" })
      .eq("id", req.id);

    if (error) {
      toast.error("Could not accept offer. Please try again.");
      return;
    }

    setIncomingRequests(prev => prev.filter(r => r.id !== req.id));
    toast.success(`You accepted the offer from ${req.business}!`);
    navigate("/gig-accepted");
  };

  const handleDeclineClick = (req: IncomingRequest) => {
    setSelectedRequest(req);
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = async (reason: string) => {
    if (!selectedRequest) return;

    const { error } = await supabase
      .from("campaign_requests")
      .update({ status: "declined", decline_reason: reason })
      .eq("id", selectedRequest.id);

    setIsDeclineModalOpen(false);

    if (error) {
      toast.error("Could not decline offer. Please try again.");
      return;
    }

    toast.success(`Offer declined. ${selectedRequest.business} has been notified.`);
    setIncomingRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    setSelectedRequest(null);
  };

  const earningsRatio = profile
    ? (profile.paid_out / (profile.total_earned || 1)) * 100
    : 0;

  if (loading || !authChecked) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#389C9A]" />
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40">
          Loading your dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[60px]">
      <AppHeader showLogo subtitle="Creator Hub" />
      <Toaster position="top-center" richColors />

      <main className="max-w-[480px] mx-auto w-full">
        {/* Section 1 — Earnings Card */}
        <div className="p-6" ref={earningsRef}>
          {errors.profile ? (
            <SectionError message={errors.profile} onRetry={refetch} />
          ) : (
            <div className="bg-[#1D1D1D] p-8 text-white relative overflow-hidden border-2 border-[#1D1D1D]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Total Earnings
                </span>
                <button className="p-1">
                  <ArrowUpRight className="w-4 h-4 text-white/40" />
                </button>
              </div>
              <h2 className="text-4xl font-black tracking-tighter leading-none mb-8 text-center italic">
                ₦{(profile?.total_earned ?? 0).toLocaleString()}
              </h2>

              <div className="h-[1px] bg-white/10 mb-8" />

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Pending
                  </span>
                  <span className="text-xl font-bold text-[#FEDB71]">
                    ₦{(profile?.pending ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Paid Out
                  </span>
                  <span className
