import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { IncomingRequest } from '../types/dashboard';

interface DashboardProfile {
  id: string;
  total_earned: number;
  pending: number;
  paid_out: number;
  full_name?: string;
  avatar_url?: string;
}

interface StatusCounts {
  requested: number;
  pending: number;
  completed: number;
}

interface LiveCampaign {
  id: string;
  business: string;
  name: string;
  logo: string;
  session_earnings: number;
  stream_time: string;
  progress: number;
  remaining_mins: number;
}

interface Application {
  id: string;
  business: string;
  type: string;
  logo: string;
  amount?: number;
  status: string;
  applied_at: string;
}

interface UpcomingCampaign {
  id: string;
  business: string;
  logo: string;
  start_date: string;
  package: string;
}

interface DashboardErrors {
  profile?: string;
  counts?: string;
  requests?: string;
  live?: string;
  applications?: string;
  upcoming?: string;
}

export function useDashboardData(creatorId: string | null) {
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({ requested: 0, pending: 0, completed: 0 });
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>([]);
  const [liveCampaign, setLiveCampaign] = useState<LiveCampaign | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState<UpcomingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<DashboardErrors>({});

  const fetchAll = useCallback(async () => {
    if (!creatorId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const newErrors: DashboardErrors = {};

    // 1. Fetch profile (earnings)
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('id, total_earned, pending, paid_out, full_name, avatar_url')
        .eq('id', creatorId)
        .single();

      if (error) throw error;
      if (profileData) setProfile(profileData);
    } catch {
      newErrors.profile = 'Could not load earnings';
    }

    // 2. Fetch campaign status counts
    try {
      // Get creator record first
      const { data: creatorRecord } = await supabase
        .from('creators')
        .select('id')
        .eq('user_id', creatorId)
        .single();

      if (creatorRecord) {
        const { data: campaignCreators } = await supabase
          .from('campaign_creators')
          .select('status, campaign_id')
          .eq('creator_id', creatorRecord.id);

        const counts = {
          requested: 0,
          pending: campaignCreators?.filter(c => c.status === 'NOT STARTED').length ?? 0,
          completed: campaignCreators?.filter(c => c.status === 'COMPLETED').length ?? 0,
        };

        // Count pending campaign_requests
        const { count } = await supabase
          .from('campaign_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')
          .gt('expires_at', new Date().toISOString());

        counts.requested = count ?? 0;
        setStatusCounts(counts);
      }
    } catch {
      newErrors.counts = 'Could not load campaign counts';
    }

    // 3. Fetch incoming requests (real-time)
    try {
      const { data: creatorRecord } = await supabase
        .from('creators')
        .select('id')
        .eq('user_id', creatorId)
        .single();

      if (creatorRecord) {
        const { data: reqData, error } = await supabase
          .from('campaign_requests')
          .select('*')
          .eq('creator_id', creatorRecord.id)
          .eq('status', 'pending')
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false });

        if (error) throw error;

        const requests: IncomingRequest[] = (reqData ?? []).map((r: any) => ({
          id: r.id,
          business: r.business_name ?? 'Unknown Business',
          logo: r.logo ?? '',
          name: r.campaign_name ?? 'Campaign',
          type: r.campaign_type ?? 'Banner',
          price: r.price ?? 0,
          streams: r.streams ?? 4,
          days_left: Math.max(0, Math.floor(
            (new Date(r.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )),
        }));

        setIncomingRequests(requests);
      }
    } catch {
      newErrors.requests = 'Could not load incoming requests';
    }

    // 4. Fetch live campaign
    try {
      const { data: creatorRecord } = await supabase
        .from('creators')
        .select('id')
        .eq('user_id', creatorId)
        .single();

      if (creatorRecord) {
        const { data: liveStream } = await supabase
          .from('campaign_streams')
          .select(`
            *,
            campaign_creator:campaign_creator_id (
              creator_id,
              campaign:campaign_id (
                name,
                image,
                businesses (name, logo)
              )
            )
          `)
          .eq('status', 'LIVE')
          .eq('campaign_creator.creator_id', creatorRecord.id)
          .single();

        if (liveStream) {
          const camp = liveStream.campaign_creator?.campaign;
          const biz = camp?.businesses;
          setLiveCampaign({
            id: liveStream.id,
            business: biz?.name ?? 'Business',
            name: camp?.name ?? 'Campaign',
            logo: biz?.logo ?? camp?.image ?? '',
            session_earnings: liveStream.session_earnings ?? 0,
            stream_time: liveStream.stream_time ?? '0:00',
            progress: liveStream.progress ?? 0,
            remaining_mins: liveStream.remaining_mins ?? 60,
          });
        } else {
          setLiveCampaign(null);
        }
      }
    } catch {
      // No live campaign is fine, not an error
      setLiveCampaign(null);
    }

    // 5. Fetch applications to business campaigns
    try {
      const { data: appData, error } = await supabase
        .from('applications')
        .select(`
          id, status, created_at,
          campaign:campaign_id (
            name, logo, partnership_type, pay_rate
          )
        `)
        .eq('user_id', creatorId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const apps: Application[] = (appData ?? []).map((a: any) => ({
        id: a.id,
        business: a.campaign?.name ?? 'Campaign',
        type: a.campaign?.partnership_type ?? 'Partnership',
        logo: a.campaign?.logo ?? '',
        status: a.status,
        applied_at: a.created_at,
      }));

      setApplications(apps);
    } catch {
      newErrors.applications = 'Could not load applications';
    }

    // 6. Fetch upcoming campaigns
    try {
      const { data: creatorRecord } = await supabase
        .from('creators')
        .select('id')
        .eq('user_id', creatorId)
        .single();

      if (creatorRecord) {
        const { data: upcoming, error } = await supabase
          .from('campaign_streams')
          .select(`
            id, stream_date, status,
            campaign_creator:campaign_creator_id (
              creator_id,
              campaign:campaign_id (
                name, image, type,
                businesses (name, logo)
              )
            )
          `)
          .eq('status', 'UPCOMING')
          .eq('campaign_creator.creator_id', creatorRecord.id)
          .order('stream_date', { ascending: true })
          .limit(5);

        if (error) throw error;

        const upcomingList: UpcomingCampaign[] = (upcoming ?? []).map((s: any) => {
          const camp = s.campaign_creator?.campaign;
          const biz = camp?.businesses;
          return {
            id: s.id,
            business: biz?.name ?? camp?.name ?? 'Campaign',
            logo: biz?.logo ?? camp?.image ?? '',
            start_date: s.stream_date ?? new Date().toISOString(),
            package: camp?.type ?? 'Banner',
          };
        });

        setUpcomingCampaigns(upcomingList);
      }
    } catch {
      newErrors.upcoming = 'Could not load upcoming campaigns';
    }

    setErrors(newErrors);
    setLoading(false);
  }, [creatorId]);

  useEffect(() => {
    fetchAll();

    if (!creatorId) return;

    // Subscribe to real-time campaign request updates
    const channel = supabase
      .channel('dashboard-realtime-' + creatorId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'campaign_requests' },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'campaign_streams' },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${creatorId}` },
        (payload) => {
          if (payload.new) {
            setProfile(payload.new as DashboardProfile);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [creatorId, fetchAll]);

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
