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
import { supabase } from "../lib/supabase"; // 👈 your supabase client


interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  total_earned: number;
  pending: number;
  paid_out: number;
}

interface StatusCounts {
  requested: number;
  pending: number;
  completed: number;
}

interface IncomingRequest {
  id: number;
  business: string;
  name: string;
  type: string;
  streams: number;
  price: number;
  days_left: number;
  logo: string;
}

interface LiveCampaign {
  id: number;
  business: string;
  name: string;
  logo: string;
  session_earnings: string;
  stream_time: string;
  progress: number;
  remaining_mins: number;
}

interface Application {
  id: number;
  business: string;
  logo: string;
  type: string;
  amount?: number;
  status: string;
  applied_at: string;
}

interface UpcomingCampaign {
  id: number;
  business: string;
  logo: string;
  start_date: string;
  package: string;
}

// ─────────────────────────────────────────────
// Small reusable loading / error states
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Hook — fetch all dashboard data from Supabase
// ─────────────────────────────────────────────

/**
 * Expected Supabase tables / views:
 *
 *  creator_profiles        — one row per authenticated user
 *    id, name, avatar, total_earned, pending, paid_out
 *
 *  campaign_requests       — incoming brand requests for this creator
 *    id, creator_id, business, name, type, streams, price, days_left, logo, status
 *    (filter: status = 'pending', creator_id = user.id)
 *
 *  campaign_status_counts  — a Postgres VIEW or RPC returning counts
 *    creator_id, requested, pending, completed
 *
 *  live_campaigns          — currently streaming campaigns
 *    id, creator_id, business, name, logo, session_earnings, stream_time, progress, remaining_mins
 *    (filter: creator_id = user.id, is_live = true)
 *
 *  creator_applications    — applications the creator sent
 *    id, creator_id, business, logo, type, amount, status, applied_at
 *    (filter: creator_id = user.id)
 *
 *  upcoming_campaigns      — accepted + scheduled campaigns
 *    id, creator_id, business, logo, start_date, package
 *    (filter: creator_id = user.id, start_date > now())
 */

function useDashboardData(creatorId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [statusCounts, setStatusCounts] = useState<StatusCounts | null>(null);
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>([]);
  const [liveCampaign, setLiveCampaign] = useState<LiveCampaign | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState<UpcomingCampaign[]>([]);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchAll = async () => {
    if (!creatorId) return;
    setLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};

    // 1. Profile & earnings
    const { data: profileData, error: profileErr } = await supabase
      .from("creator_profiles")
      .select("id, name, avatar, total_earned, pending, paid_out")
      .eq("id", creatorId)
      .single();

    if (profileErr) newErrors.profile = "Could not load profile";
    else setProfile(profileData);

    // 2. Status counts (via a Postgres view or RPC)
    //    If you prefer an RPC: supabase.rpc("get_campaign_status_counts", { p_creator_id: creatorId })
    const { data: countsData, error: countsErr } = await supabase
      .from("campaign_status_counts")
      .select("requested, pending, completed")
      .eq("creator_id", creatorId)
      .single();

    if (countsErr) newErrors.counts = "Could not load campaign counts";
    else setStatusCounts(countsData);

    // 3. Incoming requests
    const { data: reqData, error: reqErr } = await supabase
      .from("campaign_requests")
      .select("id, business, name, type, streams, price, days_left, logo")
      .eq("creator_id", creatorId)
      .eq("status", "pending")
      .order("days_left", { ascending: true });

    if (reqErr) newErrors.requests = "Could not load incoming requests";
    else setIncomingRequests(reqData ?? []);

    // 4. Live campaign (only the most recent active one)
    const { data: liveData, error: liveErr } = await supabase
      .from("live_campaigns")
      .select("id, business, name, logo, session_earnings, stream_time, progress, remaining_mins")
      .eq("creator_id", creatorId)
      .eq("is_live", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (liveErr) newErrors.live = "Could not load live campaign";
    else setLiveCampaign(liveData);

    // 5. Applications
    const { data: appData, error: appErr } = await supabase
      .from("creator_applications")
      .select("id, business, logo, type, amount, status, applied_at")
      .eq("creator_id", creatorId)
      .order("applied_at", { ascending: false });

    if (appErr) newErrors.applications = "Could not load applications";
    else setApplications(appData ?? []);

    // 6. Upcoming campaigns
    const { data: upData, error: upErr } = await supabase
      .from("upcoming_campaigns")
      .select("id, business, logo, start_date, package")
      .eq("creator_id", creatorId)
      .gt("start_date", new Date().toISOString())
      .order("start_date", { ascending: true });

    if (upErr) newErrors.upcoming = "Could not load upcoming campaigns";
    else setUpcomingCampaigns(upData ?? []);

    setErrors(newErrors);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [creatorId]);

  // ── Realtime subscription: keep requests & live campaign fresh ──
  useEffect(() => {
    if (!creatorId) return;

    const requestsSub = supabase
      .channel("dashboard-requests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "campaign_requests", filter: `creator_id=eq.${creatorId}` },
        () => fetchAll()        // re-fetch the full dashboard on any change
      )
      .subscribe();

    const liveSub = supabase
      .channel("dashboard-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "live_campaigns", filter: `creator_id=eq.${creatorId}` },
        () => fetchAll()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(requestsSub);
      supabase.removeChannel(liveSub);
    };
  }, [creatorId]);

  return {
    profile,
    statusCounts,
    incomingRequests,
    setIncomingRequests,
    liveCampaign,
    applications,
    upcomingCampaigns,
    loading,
    errors,
    refetch: fetchAll,
  };
}

// ─────────────────────────────────────────────
// Main Dashboard Component
// ─────────────────────────────────────────────

export function Dashboard() {
  const navigate = useNavigate();
  const earningsRef = useRef<HTMLDivElement>(null);

  // ── Auth: get the current user's ID ──────────
  const [creatorId, setCreatorId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCreatorId(data.user?.id ?? null);
    });
  }, []);

  // ── Data ─────────────────────────────────────
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

  // ── UI state ──────────────────────────────────
  const [requestsExpanded, setRequestsExpanded] = useState(false);
  const [applicationsExpanded, setApplicationsExpanded] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IncomingRequest | null>(null);

  // ── Actions ───────────────────────────────────

  /** Accept a campaign request — update Supabase, then reflect in UI */
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

  /** Decline a campaign request — update Supabase, store reason, remove from UI */
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

  // ── Derived values ────────────────────────────
  const earningsRatio = profile
    ? (profile.paid_out / (profile.total_earned || 1)) * 100
    : 0;

  // ── Full-page loading state ───────────────────
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#389C9A]" />
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D]/40">Loading your dashboard…</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1D] pb-[60px]">
      <AppHeader showLogo subtitle="Creator Hub" />
      <Toaster position="top-center" richColors />

      <main className="max-w-[480px] mx-auto w-full">

        {/* ── Section 1 — Earnings Card ─────────── */}
        <div className="p-6" ref={earningsRef}>
          {errors.profile ? (
            <SectionError message={errors.profile} onRetry={refetch} />
          ) : (
            <div className="bg-[#1D1D1D] p-8 text-white relative overflow-hidden border-2 border-[#1D1D1D]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Total Earnings</span>
                <button className="p-1">
                  <ArrowUpRight className="w-4 h-4 text-white/40" />
                </button>
              </div>
              <h2 className="text-4xl font-black tracking-tighter leading-none mb-8 text-center italic">
                N{(profile?.total_earned ?? 0).toFixed(2)}
              </h2>

              <div className="h-[1px] bg-white/10 mb-8" />

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pending</span>
                  <span className="text-xl font-bold text-[#FEDB71]">N{(profile?.pending ?? 0).toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Paid Out</span>
                  <span className="text-xl font-bold text-[#389C9A]">N{(profile?.paid_out ?? 0).toFixed(2)}</span>
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
          )}
        </div>

        {/* ── Section 2 — Primary CTA ───────────── */}
        <div className="px-6 pb-6">
          <Link
            to="/browse-businesses"
            className="w-full bg-[#1D1D1D] text-white py-8 px-8 text-xl font-black uppercase italic tracking-tighter flex items-center justify-between active:scale-[0.98] transition-all"
          >
            Browse Opportunities
            <ArrowUpRight className="w-6 h-6" />
          </Link>
        </div>

        {/* ── Section 3 — Campaign Status Row ──── */}
        <div className="px-6 pb-12">
          {errors.counts ? (
            <SectionError message={errors.counts} onRetry={refetch} />
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Inbox, count: statusCounts?.requested ?? 0, label: "Requested Campaigns" },
                { icon: Clock, count: statusCounts?.pending ?? 0, label: "Pending Campaigns" },
                { icon: CheckCircle2, count: statusCounts?.completed ?? 0, label: "Completed Campaigns" },
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
          )}
        </div>

        {/* ── Section 4 — Incoming Requests ─────── */}
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40">Incoming Requests</h3>
            <span className="bg-[#FEDB71] text-[#1D1D1D] text-[9px] font-black uppercase px-2 py-0.5 tracking-widest italic">
              {incomingRequests.length} new
            </span>
          </div>

          {errors.requests ? (
            <SectionError message={errors.requests} onRetry={refetch} />
          ) : incomingRequests.length === 0 ? (
            <div className="border-2 border-[#1D1D1D]/10 p-8 text-center">
              <p className="text-xs text-[#1D1D1D]/40">No incoming requests right now.</p>
            </div>
          ) : (
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
                        <p className="text-2xl font-black italic leading-none mb-2 text-[#389C9A]">N{req.price}</p>
                        <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 flex items-center gap-1.5 ${
                          req.days_left <= 1 ? "bg-red-100 text-red-600 border border-red-200" :
                          req.days_left <= 2 ? "bg-orange-100 text-orange-600 border border-orange-200" :
                          "bg-[#FEDB71]/10 text-[#FEDB71] border border-[#FEDB71]/20"
                        }`}>
                          <Clock className="w-2.5 h-2.5" /> {req.days_left} days left
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] font-medium text-[#1D1D1D]/60 italic">
                      {req.name} — {req.type} · {req.streams} streams
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleAccept(req)}
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
          )}
        </div>

        {/* ── Section 5 — Live Now ──────────────── */}
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40">Live Now</h3>
            {liveCampaign && (
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#1D1D1D]">
                <span className="w-1.5 h-1.5 bg-[#389C9A] rounded-full animate-pulse" />
                Active
              </div>
            )}
          </div>

          {errors.live ? (
            <SectionError message={errors.live} onRetry={refetch} />
          ) : liveCampaign ? (
            <div className="bg-[#1D1D1D] p-6 flex flex-col gap-6 relative overflow-hidden border-2 border-[#1D1D1D]">
              <div className="flex items-center gap-6 relative z-10">
                <ImageWithFallback src={liveCampaign.logo} className="w-12 h-12 border border-white/20 grayscale object-cover" />
                <div className="flex-1 text-white">
                  <h4 className="font-black text-lg uppercase tracking-tight leading-none mb-1">{liveCampaign.business}</h4>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{liveCampaign.name}</p>
                </div>
                <div className="text-right text-white">
                  <p className="text-xl font-black italic leading-none mb-1 text-[#FEDB71]">N{liveCampaign.session_earnings}</p>
                  <p className="text-[10px] font-black text-[#389C9A] uppercase tracking-widest italic">{liveCampaign.stream_time}</p>
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <div className="h-1 bg-white/10 w-full rounded-none overflow-hidden">
                  <div className="h-full bg-[#389C9A]" style={{ width: `${liveCampaign.progress}%` }} />
                </div>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">
                  {liveCampaign.remaining_mins} mins to qualify
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end relative z-10">
                <Link
                  to={`/campaign/live-update/${liveCampaign.id}`}
                  className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 group hover:gap-3 transition-all italic"
                >
                  Update Campaign <ArrowUpRight className="w-3.5 h-3.5 group-hover:scale-110 transition-all text-[#FEDB71]" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-[#1D1D1D] p-12 text-center">
              <p className="text-xs text-[#1D1D1D]/40 mb-4">
                No active campaign running right now. Start a stream with an active campaign banner to see it here.
              </p>
              <Link to="/campaigns" className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1D] underline italic">
                View Active Campaigns →
              </Link>
            </div>
          )}
        </div>

        {/* ── Section 6 — My Applications ──────── */}
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40">My Applications</h3>
            <span className="text-[9px] font-black uppercase text-[#1D1D1D]/40">{applications.length} total</span>
          </div>
          <p className="text-[9px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest mb-6">
            Businesses you have applied to partner with
          </p>

          {errors.applications ? (
            <SectionError message={errors.applications} onRetry={refetch} />
          ) : (
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
                    {app.amount !== undefined && (
                      <p className="text-sm font-black italic mb-1 text-[#389C9A]">N{app.amount}</p>
                    )}
                    <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 ${
                      app.status === "Awaiting Response" ? "text-[#FEDB71]" :
                      app.status === "Under Review" ? "text-blue-500" :
                      app.status === "Accepted" ? "text-[#389C9A]" : "text-[#1D1D1D]/30"
                    }`}>
                      {app.status}
                    </div>
                    <p className="text-[7px] font-bold text-[#1D1D1D]/20 uppercase tracking-widest italic">{app.applied_at}</p>
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

              <Link
                to="/browse-businesses"
                className="text-[9px] font-black uppercase tracking-widest text-[#1D1D1D]/40 underline mt-4 text-center italic"
              >
                Browse More Opportunities →
              </Link>
            </div>
          )}
        </div>

        {/* ── Section 7 — Upcoming Campaigns ───── */}
        <div className="px-6 pb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1D]/40 mb-6">Coming Up</h3>

          {errors.upcoming ? (
            <SectionError message={errors.upcoming} onRetry={refetch} />
          ) : upcomingCampaigns.length > 0 ? (
            <div className="flex flex-col gap-3">
              {upcomingCampaigns.map(camp => (
                <div key={camp.id} className="bg-white border-2 border-[#1D1D1D] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ImageWithFallback src={camp.logo} className="w-10 h-10 border border-[#1D1D1D]/10 grayscale object-cover" />
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-tight">{camp.business}</h4>
                      <p className="text-[8px] font-bold text-[#1D1D1D]/40 uppercase tracking-widest italic">{camp.start_date}</p>
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
            <p className="text-xs text-[#1D1D1D]/40">
              No upcoming campaigns scheduled. Browse opportunities to find your next partnership.
            </p>
          )}
        </div>

        {/* ── Section 8 — Quick Actions ─────────── */}
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
              onClick={() => earningsRef.current?.scrollIntoView({ behavior: "smooth" })}
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
            amount: `N${selectedRequest.price}`,
            logo: selectedRequest.logo,
            partnerType: "Business",
          }}
        />
      )}
    </div>
  );
}