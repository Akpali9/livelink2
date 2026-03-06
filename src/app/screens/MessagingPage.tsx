import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Campaign } from '../types/database'
import { MessageSquare } from 'lucide-react'
import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'

export default function MessagingPage() {
  const { profile, user } = useAuth()
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const q = profile?.role === 'business'
      ? supabase.from('campaigns').select(`*, creator:creator_profiles!campaigns_creator_id_fkey(*, profile:profiles(*))`).eq('business_id', user.id).neq('status', 'draft')
      : supabase.from('campaigns').select(`*, business:business_profiles!campaigns_business_id_fkey(*, profile:profiles(*))`).eq('creator_id', user.id).neq('status', 'draft')

    q.order('updated_at', { ascending: false }).then(({ data }) => {
      if (data) setCampaigns(data as Campaign[])
      setLoading(false)
    })
  }, [user, profile])

  return (
    <div className="animate-fade-in h-full">
      <h1 className="section-title mb-6">Messages</h1>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="card p-16 text-center">
          <MessageSquare className="w-10 h-10 text-white/10 mx-auto mb-4" />
          <p className="text-white/30">No active campaigns yet</p>
          <p className="text-xs text-white/20 mt-1">Start a campaign to message a creator or business</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 h-[calc(100%-5rem)]">
          {/* Campaign list */}
          <div className="space-y-2">
            {campaigns.map(campaign => {
              const other = profile?.role === 'business'
                ? (campaign.creator as any)?.profile
                : (campaign.business as any)?.profile
              return (
                <button
                  key={campaign.id}
                  onClick={() => navigate(`/messages/${campaign.id}`)}
                  className={clsx(
                    'w-full text-left card p-4 transition-all',
                    campaignId === campaign.id ? 'border-brand-500/40 bg-brand-500/5' : 'card-hover'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-brand-400">{other?.full_name?.charAt(0)}</span>
                    </div>
                    <p className="text-sm font-semibold text-white truncate">{other?.full_name}</p>
                  </div>
                  <p className="text-xs text-white/40 truncate">{campaign.title}</p>
                  <p className="text-[10px] text-white/25 mt-1">
                    {formatDistanceToNow(new Date(campaign.updated_at), { addSuffix: true })}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Message pane — redirects to full campaign chat */}
          <div className="md:col-span-2">
            {campaignId ? (
              <div className="card h-full flex flex-col items-center justify-center gap-4 text-white/20">
                <MessageSquare className="w-10 h-10 opacity-30" />
                <div className="text-center">
                  <p className="text-sm text-white/40 mb-3">Open the campaign to chat</p>
                  <button
                    onClick={() => navigate(`/campaigns/${campaignId}`)}
                    className="btn-primary text-sm"
                  >
                    Open Campaign Chat
                  </button>
                </div>
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center text-white/20">
                <div className="text-center">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Select a campaign to view messages</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
