import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import type { 
  UserProfile, 
  StatusCounts, 
  IncomingRequest, 
  LiveCampaign, 
  Application, 
  UpcomingCampaign 
} from '../types/dashboard';

export function useDashboardData(creatorId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [statusCounts, setStatusCounts] = useState<StatusCounts | null>(null);
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>([]);
  const [liveCampaign, setLiveCampaign] = useState<LiveCampaign | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState<UpcomingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchAll = async () => {
    if (!creatorId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};

    try {
      // 1. Profile & earnings
      const { data: profileData, error: profileErr } = await supabase
        .from("creator_profiles")
        .select("*")
        .eq("id", creatorId)
        .single();

      if (profileErr) {
        console.error('Profile error:', profileErr);
        newErrors.profile = "Could not load profile";
      } else {
        setProfile(profileData);
      }

      // 2. Status counts
      const { data: countsData, error: countsErr } = await supabase
        .from("campaign_status_counts")
        .select("requested, pending, completed")
        .eq("creator_id", creatorId)
        .maybeSingle();

      if (!countsErr && countsData) {
        setStatusCounts(countsData);
      } else {
        setStatusCounts({ requested: 0, pending: 0, completed: 0 });
      }

      // 3. Incoming requests
      const { data: reqData, error: reqErr } = await supabase
        .from("campaign_requests")
        .select("*")
        .eq("creator_id", creatorId)
        .eq("status", "pending")
        .order("days_left", { ascending: true });

      if (!reqErr) {
        setIncomingRequests(reqData ?? []);
      } else {
        console.error('Requests error:', reqErr);
        newErrors.requests = "Could not load incoming requests";
      }

      // 4. Live campaign
      const { data: liveData, error: liveErr } = await supabase
        .from("live_campaigns")
        .select("*")
        .eq("creator_id", creatorId)
        .eq("is_live", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!liveErr) {
        setLiveCampaign(liveData);
      }

      // 5. Applications
      const { data: appData, error: appErr } = await supabase
        .from("creator_applications")
        .select("*")
        .eq("creator_id", creatorId)
        .order("applied_at", { ascending: false });

      if (!appErr) {
        setApplications(appData ?? []);
      } else {
        console.error('Applications error:', appErr);
        newErrors.applications = "Could not load applications";
      }

      // 6. Upcoming campaigns
      const { data: upData, error: upErr } = await supabase
        .from("upcoming_campaigns")
        .select("*")
        .eq("creator_id", creatorId)
        .gt("start_date", new Date().toISOString())
        .order("start_date", { ascending: true });

      if (!upErr) {
        setUpcomingCampaigns(upData ?? []);
      } else {
        console.error('Upcoming error:', upErr);
        newErrors.upcoming = "Could not load upcoming campaigns";
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      newErrors.general = "Failed to load dashboard data";
    }

    setErrors(newErrors);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [creatorId]);

  // Real-time subscriptions
  useEffect(() => {
    if (!creatorId) return;

    const requestsSub = supabase
      .channel('dashboard-requests')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'campaign_requests', 
          filter: `creator_id=eq.${creatorId}` 
        },
        (payload) => {
          console.log('Request update:', payload);
          fetchAll();
          if (payload.eventType === 'INSERT') {
            toast.info('New campaign request received!');
          }
        }
      )
      .subscribe();

    const liveSub = supabase
      .channel('dashboard-live')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'live_campaigns', 
          filter: `creator_id=eq.${creatorId}` 
        },
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
