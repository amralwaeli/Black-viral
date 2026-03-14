import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, MessageCircle, Calendar, BookOpen, Check, X, Inbox, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'message' | 'event' | 'course' | 'enrollment' | 'system';
  title: string;
  message: string;
  link: string | null;
  reference_id: string | null;
  read_at: string | null;
  created_at: string;
}

const TYPE_CONFIG: Record<Notification['type'], { icon: React.ReactNode; color: string; bg: string }> = {
  message:    { icon: <MessageCircle className="w-4 h-4" />, color: 'text-cyan-500',   bg: 'bg-cyan-500/10' },
  event:      { icon: <Calendar className="w-4 h-4" />,     color: 'text-blue-500',    bg: 'bg-blue-500/10' },
  course:     { icon: <BookOpen className="w-4 h-4" />,     color: 'text-violet-500',  bg: 'bg-violet-500/10' },
  enrollment: { icon: <BookOpen className="w-4 h-4" />,     color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  system:     { icon: <Bell className="w-4 h-4" />,         color: 'text-gray-400',    bg: 'bg-gray-500/10' },
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // set from AuthContext
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ── Auth — use shared context, no separate listener ─────────────────────
  const { profile: authProfile } = useAuth();
  useEffect(() => {
    if (authProfile?.id) {
      setCurrentUserId(authProfile.id);
    } else {
      setCurrentUserId(null);
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [authProfile?.id]);

  // ── Load & subscribe ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!currentUserId) return;
    loadNotifications();
    const ch = supabase
      .channel(`notif:${currentUserId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${currentUserId}` },
        (payload) => {
          const n = payload.new as Notification;
          setNotifications(prev => [n, ...prev].slice(0, 30));
          setUnreadCount(prev => prev + 1);
          toast.info(n.title, { description: n.message.slice(0, 80) });
        })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [currentUserId]);

  const loadNotifications = useCallback(async () => {
    if (!currentUserId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications').select('*').eq('user_id', currentUserId)
        .order('created_at', { ascending: false }).limit(30);
      if (error) throw error;
      if (data) { setNotifications(data); setUnreadCount(data.filter(n => !n.read_at).length); }
    } catch (_) {}
    finally { setLoading(false); }
  }, [currentUserId]);

  // ── Click outside ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // ── Actions ───────────────────────────────────────────────────────────────
  async function markAsRead(id: string) {
    await supabase.from('notifications').update({ read_at: new Date().toISOString() }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  }

  async function markAllAsRead() {
    if (!currentUserId || unreadCount === 0) return;
    await supabase.from('notifications').update({ read_at: new Date().toISOString() }).eq('user_id', currentUserId).is('read_at', null);
    setNotifications(prev => prev.map(n => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })));
    setUnreadCount(0);
    toast.success('All notifications marked as read');
  }

  async function deleteNotification(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    await supabase.from('notifications').delete().eq('id', id);
    const n = notifications.find(x => x.id === id);
    setNotifications(prev => prev.filter(x => x.id !== id));
    if (n && !n.read_at) setUnreadCount(prev => Math.max(0, prev - 1));
  }

  async function clearAll() {
    if (!currentUserId || notifications.length === 0) return;
    await supabase.from('notifications').delete().eq('user_id', currentUserId);
    setNotifications([]); setUnreadCount(0);
    toast.success('All notifications cleared');
  }

  function handleClick(n: Notification) {
    if (!n.read_at) markAsRead(n.id);
    setIsOpen(false);
    if (n.link) navigate(n.link);
  }

  if (!currentUserId) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="relative p-2 text-gray-400 hover:text-cyan-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute top-0.5 right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute right-0 mt-2 w-[360px] bg-white dark:bg-gray-900 border border-white/10 rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.25)] overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-100">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-cyan-500 text-white text-[10px] font-bold rounded-full">{unreadCount}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="flex items-center gap-1 text-xs text-cyan-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded-lg hover:bg-cyan-500/10">
                    <Check className="w-3 h-3" /> All read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button onClick={clearAll} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-500/10">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="max-h-[420px] overflow-y-auto">
              {loading ? (
                <div className="py-10 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-12 flex flex-col items-center gap-2 text-gray-400">
                  <Inbox className="w-10 h-10 opacity-30" />
                  <span className="text-sm font-medium">All caught up!</span>
                  <span className="text-xs opacity-70">No notifications</span>
                </div>
              ) : (
                <div>
                  {notifications.map((n, i) => {
                    const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.system;
                    return (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        onClick={() => handleClick(n)}
                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors group hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-white/5 last:border-0 relative ${!n.read_at ? 'bg-cyan-500/3' : ''}`}
                      >
                        {/* Unread dot */}
                        {!n.read_at && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        )}

                        {/* Icon */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-xl ${cfg.bg} flex items-center justify-center ${cfg.color} mt-0.5`}>
                          {cfg.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pr-2">
                          <p className={`text-xs leading-snug ${!n.read_at ? 'font-semibold text-gray-800 dark:text-gray-100' : 'font-medium text-gray-600 dark:text-gray-300'}`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{formatTime(n.created_at)}</p>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={(e) => deleteNotification(e, n.id)}
                          className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/10 transition-all"
                          title="Dismiss"
                        >
                          <X className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}