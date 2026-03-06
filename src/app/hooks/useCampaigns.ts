import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Campaign } from '../types/database'
import { useAuth } from '../contexts/AuthContext'

export function useCampaigns(role: 'business' | 'creator' | 'admin') {
  const { user } = useAuth()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCampaigns = useCallback(async () => {
    if (!user) return
    let query = supabase
      .from('campaigns')
      .select(`
        *,
        business:business_profiles!campaigns_business_id_fkey(*, profile:profiles(*)),
        creator:creator_profiles!campaigns_creator_id_fkey(*, profile:profiles(*))
      `)
      .order('created_at', { ascending: false })

    if (role === 'business') query = query.eq('business_id', user.id)
    if (role === 'creator') query = query.eq('creator_id', user.id)

    const { data } = await query
    if (data) setCampaigns(data as Campaign[])
    setLoading(false)
  }, [user, role])

  const updateCampaignStatus = async (campaignId: string, status: Campaign['status']) => {
    const { error } = await supabase
      .from('campaigns')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', campaignId)
    if (error) throw error
  }

  useEffect(() => {
    if (!user) return
    fetchCampaigns()

    const filter = role === 'business'
      ? `business_id=eq.${user.id}`
      : role === 'creator'
        ? `creator_id=eq.${user.id}`
        : undefined

    const channel = supabase
      .channel(`campaigns:${user.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'campaigns',
        ...(filter ? { filter } : {}),
      }, () => {
        fetchCampaigns()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user, role, fetchCampaigns])

  return { campaigns, loading, refetch: fetchCampaigns, updateCampaignStatus }
}
