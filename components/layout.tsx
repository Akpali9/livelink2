import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, MessageSquare, Bell, User, LogOut, Shield, Zap } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../hooks/useNotifications'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

export default function Layout() {
  const { profile, signOut } = useAuth()
  const { unreadCount, notifications, markRead } = useNotifications()
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()
  const notifRef = useRef<HTMLDivElement>(null)

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/marketplace', icon: Users, label: 'Marketplace', hide: profile?.role === 'creator' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/admin', icon: Shield, label: 'Admin', hide: profile?.role !== 'admin' },
  ].filter(item => !item.hide)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/[0.06] flex flex-col bg-ink-soft/50 backdrop-blur-xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-ink" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              LiveLink
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => clsx('nav-link', isActive && 'active')}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-brand-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                {profile?.full_name?.charAt(0)?.toUpperCase() ?? '?'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{profile?.full_name}</p>
              <p className="text-xs text-white/40 capitalize">{profile?.role}</p>
            </div>
            <button onClick={handleSignOut} className="text-white/30 hover:text-red-400 transition-colors" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-white/[0.06] flex items-center justify-end px-6 gap-4 bg-ink/60 backdrop-blur-sm flex-shrink-0">
          {/* Live indicator */}
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="live-dot" />
            Real-time
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Bell className="w-4 h-4 text-white/60" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 rounded-full text-[10px] font-bold text-ink flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 card shadow-2xl z-50 overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="badge-green text-[10px]">{unreadCount} new</span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-white/30">All caught up!</div>
                  ) : notifications.map(n => (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={clsx(
                        'w-full text-left px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors',
                        !n.read && 'bg-brand-500/5'
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {!n.read && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />}
                        <div className={!n.read ? '' : 'ml-3.5'}>
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{n.body}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
