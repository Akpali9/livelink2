import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Campaign, StreamProof } from '../types/database'
import { useAuth } from '../contexts/AuthContext'
import { useMessages } from '../hooks/useMessages'
import {
  ArrowLeft, Clock, CheckCircle, XCircle, Send, Upload,
  AlertTriangle, MessageSquare, ExternalLink
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import clsx from 'clsx'

export default function CampaignPage() {
  const { id } = useParams<{ id: string }>()
  const { profile, user } = useAuth()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [proofs, setProofs] = useState<StreamProof[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'overview' | 'messages' | 'proofs'>('overview')
  const [messageInput, setMessageInput] = useState('')
  const [streamUrl, setStreamUrl] = useState('')
  const [durationMinutes, setDurationMinutes] = useState(45)
  const [submittingProof, setSubmittingProof] = useState(false)

  const recipientId = campaign
    ? profile?.role === 'business' ? campaign.creator_id : campaign.business_id
    : ''

  const { messages, sending, sendMessage, bottomRef } = useMessages(id ?? '')

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      const [{ data: camp }, { data: pr }] = await Promise.all([
        supabase.from('campaigns').select(`
          *,
          business:business_profiles!campaigns_business_id_fkey(*, profile:profiles(*)),
          creator:creator_profiles!campaigns_creator_id_fkey(*, profile:profiles(*))
        `).eq('id', id).single(),
        supabase.from('stream_proofs').select('*').eq('campaign_id', id).order('created_at', { ascending: false }),
      ])
      if (camp) setCampaign(camp as Campaign)
      if (pr) setProofs(pr)
      setLoading(false)
    }
    fetchData()

    // Realtime campaign updates
    const channel = supabase.channel(`campaign:${id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'campaigns', filter: `id=eq.${id}` },
        (payload) => setCampaign(prev => ({ ...prev!, ...payload.new }))
      )
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stream_proofs', filter: `campaign_id=eq.${id}` },
        (payload) => setProofs(prev => [payload.new as StreamProof, ...prev])
      )
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'stream_proofs', filter: `campaign_id=eq.${id}` },
        (payload) => setProofs(prev => prev.map(p => p.id === payload.new.id ? payload.new as StreamProof : p))
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id])

  const handleAccept = async () => {
    if (!campaign) return
    await supabase.from('campaigns').update({ status: 'active', started_at: new Date().toISOString() }).eq('id', campaign.id)
  }

  const handleDecline = async () => {
    if (!campaign) return
    await supabase.from('campaigns').update({ status: 'cancelled' }).eq('id', campaign.id)
    // Trigger refund notification
    await supabase.from('notifications').insert({
      user_id: campaign.business_id,
      title: 'Campaign Declined',
      body: `Your campaign "${campaign.title}" was declined. A full refund has been initiated.`,
      type: 'campaign_declined',
      read: false,
    })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !recipientId) return
    await sendMessage(messageInput, recipientId)
    setMessageInput('')
  }

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !campaign || !streamUrl.trim()) return
    setSubmittingProof(true)
    await supabase.from('stream_proofs').insert({
      campaign_id: campaign.id,
      creator_id: user.id,
      stream_url: streamUrl,
      duration_minutes: durationMinutes,
      streamed_at: new Date().toISOString(),
      status: 'submitted',
    })
    setStreamUrl('')
    setDurationMinutes(45)
    setSubmittingProof(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!campaign) return (
    <div className="text-center py-20 text-white/30">Campaign not found</div>
  )

  const isCreator = profile?.role === 'creator'
  const isAdmin = profile?.role === 'admin'
  const progressPct = (campaign.streams_completed / campaign.streams_required) * 100

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button onClick={() => navigate(-1)} className="btn-secondary p-2 mt-1">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={clsx('badge', {
              'badge-green': campaign.status === 'active',
              'badge-yellow': campaign.status === 'pending_creator',
              'badge-blue': campaign.status === 'completed',
              'badge-red': ['cancelled', 'refunded'].includes(campaign.status),
              'badge-gray': campaign.status === 'draft',
            })}>
              {campaign.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />}
              {campaign.status.replace('_', ' ')}
            </span>
            <span className="badge-gray capitalize">{campaign.type.replace(/_/g, ' ')}</span>
          </div>
          <h1 className="section-title">{campaign.title}</h1>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>£{campaign.budget.toLocaleString()}</p>
          <p className="text-xs text-white/40">campaign budget</p>
        </div>
      </div>

      {/* Creator pending decision */}
      {isCreator && campaign.status === 'pending_creator' && (
        <div className="card border-yellow-500/20 bg-yellow-500/5 p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Campaign offer — action required</p>
              <p className="text-sm text-white/50 mt-1">
                You have until {campaign.creator_response_deadline
                  ? format(new Date(campaign.creator_response_deadline), 'MMM d, yyyy')
                  : '3 days'} to respond
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAccept} className="btn-primary flex-1 justify-center">
              <CheckCircle className="w-4 h-4" /> Accept campaign
            </button>
            <button onClick={handleDecline} className="btn-danger flex-1 justify-center">
              <XCircle className="w-4 h-4" /> Decline
            </button>
          </div>
        </div>
      )}

      {/* Progress bar (active campaigns) */}
      {campaign.status === 'active' && (
        <div className="card p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">Stream progress</span>
            <span className="text-sm font-semibold text-brand-400" style={{ fontFamily: 'Syne, sans-serif' }}>
              {campaign.streams_completed} / {campaign.streams_required} streams
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-xs text-white/30 mt-2">Payout releases every 4 verified qualifying streams</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'messages', label: `Messages` },
          { id: 'proofs', label: `Stream Proofs (${proofs.length})`, hide: !isCreator && !isAdmin && profile?.role !== 'business' },
        ].filter(t => !t.hide).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={clsx(
              'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all',
              tab === t.id ? 'bg-brand-500/15 text-brand-400 border border-brand-500/25' : 'text-white/40 hover:text-white'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-5">
            <p className="label mb-3">Campaign Brief</p>
            <p className="text-sm text-white/70 leading-relaxed">{campaign.brief}</p>
          </div>
          <div className="card p-5 space-y-3">
            <p className="label">Campaign Details</p>
            {[
              { label: 'Type', value: campaign.type.replace(/_/g, ' ') },
              { label: 'Streams Required', value: `${campaign.streams_required} (min 45 min each)` },
              { label: 'Promo Code', value: campaign.promo_code ?? 'N/A' },
              { label: 'Created', value: formatDistanceToNow(new Date(campaign.created_at), { addSuffix: true }) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-white/40">{label}</span>
                <span className="text-white capitalize">{value}</span>
              </div>
            ))}
            {campaign.banner_url && (
              <a href={campaign.banner_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 justify-center w-full mt-2">
                View Banner <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}

      {tab === 'messages' && (
        <div className="card flex flex-col" style={{ height: '440px' }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-white/20 text-sm">
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No messages yet. Start the conversation.
                </div>
              </div>
            )}
            {messages.map(msg => {
              const isMine = msg.sender_id === user?.id
              return (
                <div key={msg.id} className={clsx('flex', isMine ? 'justify-end' : 'justify-start')}>
                  <div className={clsx('max-w-xs rounded-2xl px-4 py-2.5', isMine ? 'bg-brand-500/20 border border-brand-500/25' : 'bg-white/5 border border-white/10')}>
                    <p className="text-sm text-white">{msg.content}</p>
                    <p className="text-[10px] text-white/30 mt-1 text-right">
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={handleSendMessage} className="border-t border-white/[0.07] p-3 flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="input flex-1 py-2"
            />
            <button type="submit" disabled={sending || !messageInput.trim()} className="btn-primary px-4 py-2">
              {sending ? <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}

      {tab === 'proofs' && (
        <div className="space-y-4">
          {/* Submit proof form */}
          {isCreator && campaign.status === 'active' && (
            <div className="card p-5">
              <p className="label mb-4">Submit Stream Proof</p>
              <form onSubmit={handleSubmitProof} className="space-y-3">
                <div>
                  <label className="label">Stream URL / VOD Link</label>
                  <input
                    type="url"
                    value={streamUrl}
                    onChange={e => setStreamUrl(e.target.value)}
                    placeholder="https://..."
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Duration (minutes)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(Number(e.target.value))}
                    min={45}
                    required
                    className="input"
                  />
                </div>
                <button type="submit" disabled={submittingProof} className="btn-primary">
                  <Upload className="w-4 h-4" />
                  {submittingProof ? 'Submitting...' : 'Submit proof'}
                </button>
              </form>
            </div>
          )}

          {/* Proof list */}
          {proofs.length === 0 ? (
            <div className="card p-10 text-center text-white/30 text-sm">No proofs submitted yet</div>
          ) : proofs.map(proof => (
            <div key={proof.id} className="card p-4 flex items-start gap-4">
              <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', {
                'bg-yellow-500/10': proof.status === 'submitted',
                'bg-brand-500/10': proof.status === 'verified',
                'bg-red-500/10': proof.status === 'rejected',
              })}>
                {proof.status === 'submitted' && <Clock className="w-4 h-4 text-yellow-400" />}
                {proof.status === 'verified' && <CheckCircle className="w-4 h-4 text-brand-400" />}
                {proof.status === 'rejected' && <XCircle className="w-4 h-4 text-red-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={clsx('badge', {
                    'badge-yellow': proof.status === 'submitted',
                    'badge-green': proof.status === 'verified',
                    'badge-red': proof.status === 'rejected',
                  })}>
                    {proof.status}
                  </span>
                  <span className="text-xs text-white/30">{proof.duration_minutes} minutes</span>
                </div>
                <a href={proof.stream_url} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
                  View stream <ExternalLink className="w-3 h-3" />
                </a>
                {proof.rejection_reason && (
                  <p className="text-xs text-red-400 mt-1">{proof.rejection_reason}</p>
                )}
                <p className="text-xs text-white/30 mt-1">
                  {formatDistanceToNow(new Date(proof.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
