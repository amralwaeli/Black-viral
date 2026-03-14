import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle, X, Send, Minimize2, Loader2, BookOpen,
  User, Users, ChevronLeft, Maximize2, Smile, Check, CheckCheck,
  Search, Headphones,
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { useStuckLoadingRecovery } from '../hooks/usePageVisibility';

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_MSG_LENGTH = 500;

// ─── Profanity filter ─────────────────────────────────────────────────────────

const BANNED_EN = [
  'fuck','f+u+c+k','sh[i1]t','b[i1]tch','a+s+s+h+o+l+e','bastard','cunt',
  'd[i1]ck','p[i1]ss','cock','pussy','wh[o0]re','sl+ut','n[i1]gg+[ae]r',
  'f+[a4]g+[o0]t','ret[a4]rd','m[o0]th+erf+uck','bulls+h[i1]t','wank+er',
  'tw[a4]t','b[o0]ll[o0]cks','pr[i1]ck','[a4]rse',
];
const BANNED_AR = [
  'كس','زب','شرموط','عاهرة','منيوك','كلب','حمار','خنزير',
  'ابن الشرموطة','يلعن','لعنة','متناك','كسمك','زبي','أبن العاهرة',
  'kos','zeb','sharmouta','aahira','manyak','kelb','hmar','khanzir',
  'yil3an','kosomak','ibn el sharmouta','ibn sharmouta',
];

function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase().replace(/\s+/g, ' ').trim();
  for (const pattern of BANNED_EN) {
    if (new RegExp(pattern, 'i').test(lower)) return true;
  }
  for (const word of BANNED_AR) {
    if (lower.includes(word.toLowerCase())) return true;
  }
  return false;
}

// ─── Quick emoji bar ──────────────────────────────────────────────────────────

const QUICK_EMOJIS = ['👍','❤️','😂','😮','😢','🔥','👏','🎯','💪','⭐'];

// ─── Types ────────────────────────────────────────────────────────────────────

interface GroupMessage {
  id: string; group_id: string; sender_id: string; message: string;
  created_at: string; is_read?: boolean;
  sender?: { id: string; full_name: string; role: string };
}

interface PrivateMessage {
  id: string; sender_id: string; receiver_id: string; message: string;
  created_at: string; read_at: string | null;
  sender?: { id: string; full_name: string; role: string };
}

interface CourseGroup {
  id: string; course_id: string; name: string; unreadCount: number;
  lastMessage?: string; lastMessageTime?: string;
  course?: { title: string; category: string };
}

interface ContactPerson {
  id: string; full_name: string; role: string;
  isSupport?: boolean;
  courseTitle?: string; unreadCount: number;
  lastMessage?: string; lastMessageTime?: string;
}

type ViewState = 'groups' | 'group-chat' | 'contacts' | 'private-chat';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  const d = new Date(iso);
  if (diff < 86_400_000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diff < 604_800_000) return d.toLocaleDateString([], { weekday: 'short' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function formatChatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getDateLabel(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return 'Today';
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
}

function groupByDate<T extends { created_at: string }>(
  messages: T[],
): Array<{ label: string; messages: T[] }> {
  const map: Record<string, T[]> = {};
  for (const msg of messages) {
    const label = getDateLabel(msg.created_at);
    (map[label] ??= []).push(msg);
  }
  return Object.entries(map).map(([label, messages]) => ({ label, messages }));
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

type AvatarGradient = 'cyan' | 'purple' | 'amber' | 'green';

function Avatar({ name, size = 'md', gradient = 'cyan' }: {
  name: string; size?: 'sm' | 'md'; gradient?: AvatarGradient;
}) {
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  const gr: Record<AvatarGradient, string> = {
    cyan:   'bg-gradient-to-br from-cyan-500 to-blue-600',
    purple: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
    amber:  'bg-gradient-to-br from-amber-400 to-orange-500',
    green:  'bg-gradient-to-br from-emerald-400 to-teal-600',
  };
  return (
    <div className={`${sz} ${gr[gradient]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm`}>
      {getInitials(name)}
    </div>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────

function RoleBadge({ role, isSupport }: { role: string; isSupport?: boolean }) {
  if (isSupport) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500 text-white shadow-sm leading-none border border-emerald-400/40">
      <Headphones className="w-2.5 h-2.5" /> Support
    </span>
  );
  if (role === 'coach') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-white shadow-sm leading-none border border-amber-400/40">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      Coach
    </span>
  );
  if (role === 'super_admin') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-violet-600 text-white shadow-sm leading-none border border-violet-500/40">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.753 8.472H23l-7.18 5.22L18.573 23 12 18.78 5.427 23l2.753-8.308L1 9.472h8.247z"/></svg>
      Admin
    </span>
  );
  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FloatingChatWidget() {
  // UI
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('contacts');
  const [activeTab, setActiveTab] = useState<'groups' | 'direct'>('direct');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Data
  const [selectedGroup, setSelectedGroup] = useState<CourseGroup | null>(null);
  const [groups, setGroups] = useState<CourseGroup[]>([]);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactPerson | null>(null);
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([]);

  // Input
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  // Separate counters so tab dots stay accurate even when the other tab's list
  // hasn't been loaded yet (e.g. a group message arrives while on Direct tab).
  const [groupUnreadTotal, setGroupUnreadTotal] = useState(0);
  const [directUnreadTotal, setDirectUnreadTotal] = useState(0);

  useStuckLoadingRecovery(loading);

  // Auth
  const { profile: authProfile } = useAuth();
  const currentUserId = authProfile?.id ?? null;
  const userRole = authProfile?.role ?? null;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on sign-out
  useEffect(() => {
    if (!currentUserId) {
      setGroups([]); setGroupMessages([]); setContacts([]); setPrivateMessages([]);
      setUnreadCount(0); setIsOpen(false);
    }
  }, [currentUserId]);

  // Listen for external triggers to open the chat widget
  useEffect(() => {
    // "Message Students" button in CoachDashboard
    function handleOpenContacts() {
      if (!currentUserId) return;
      setIsOpen(true);
      setIsMinimized(false);
      setCurrentView('contacts');
      setActiveTab('direct');
      loadContacts();
    }
    // "Chat with Support" button in Contact page — opens and auto-selects first support agent
    async function handleOpenSupport() {
      if (!currentUserId) return;
      setIsOpen(true);
      setIsMinimized(false);
      setActiveTab('direct');
      // Find first support agent and open their chat directly
      const { data } = await supabase
        .from('user_profiles')
        .select('id, full_name, role')
        .eq('is_support_agent', true)
        .limit(1)
        .maybeSingle();
      if (data) {
        const supportContact = { id: data.id, full_name: data.full_name, role: data.role, isSupport: true, unreadCount: 0 };
        setSelectedContact(supportContact);
        setCurrentView('private-chat');
      } else {
        setCurrentView('contacts');
        loadContacts();
      }
    }
    window.addEventListener('open-chat-contacts', handleOpenContacts);
    window.addEventListener('open-chat-support', handleOpenSupport);
    return () => {
      window.removeEventListener('open-chat-contacts', handleOpenContacts);
      window.removeEventListener('open-chat-support', handleOpenSupport);
    };
  }, [currentUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Unread badge (global watcher) ────────────────────────────────────────────

  const loadUnreadCount = useCallback(async () => {
    if (!currentUserId || !userRole) return;
    try {
      // Resolve which group IDs this user can see
      let groupIds: string[] = [];
      if (userRole === 'trainee') {
        const { data: enr } = await supabase.from('enrollments').select('course_id')
          .eq('trainee_id', currentUserId).eq('status', 'approved');
        if (enr?.length) {
          const { data: g } = await supabase.from('course_groups').select('id')
            .in('course_id', enr.map(e => e.course_id));
          groupIds = g?.map(x => x.id) ?? [];
        }
      } else if (userRole === 'coach') {
        // Coach only sees groups for their assigned courses
        const { data: c } = await supabase.from('courses').select('id')
          .eq('instructor_id', currentUserId);
        if (c?.length) {
          const { data: g } = await supabase.from('course_groups').select('id')
            .in('course_id', c.map(x => x.id));
          groupIds = g?.map(x => x.id) ?? [];
        }
      } else {
        // super_admin sees all groups
        const { data: g } = await supabase.from('course_groups').select('id');
        groupIds = g?.map(x => x.id) ?? [];
      }

      let groupUnread = 0;
      if (groupIds.length) {
        const { data: msgs } = await supabase.from('group_messages').select('id')
          .in('group_id', groupIds).neq('sender_id', currentUserId);
        if (msgs?.length) {
          const { data: reads } = await supabase.from('group_message_reads')
            .select('message_id').eq('user_id', currentUserId)
            .in('message_id', msgs.map(m => m.id));
          const readSet = new Set(reads?.map(r => r.message_id) ?? []);
          groupUnread = msgs.filter(m => !readSet.has(m.id)).length;
        }
      }

      const { data: pms } = await supabase.from('messages').select('id')
        .eq('receiver_id', currentUserId).is('read_at', null);
      const dmUnread = pms?.length ?? 0;
      setGroupUnreadTotal(groupUnread);
      setDirectUnreadTotal(dmUnread);
      setUnreadCount(groupUnread + dmUnread);
    } catch (_) {}
  }, [currentUserId, userRole]);

  useEffect(() => {
    if (!currentUserId) return;
    loadUnreadCount();
    const ch = supabase.channel(`unread:${currentUserId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'group_messages' }, loadUnreadCount)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, loadUnreadCount)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [currentUserId, loadUnreadCount]);

  // ── Load on open / view change ────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen || !currentUserId) return;
    if (currentView === 'groups') loadGroups();
    if (currentView === 'contacts') loadContacts();
  }, [isOpen, currentView, currentUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Group realtime ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!selectedGroup || currentView !== 'group-chat') return;
    loadGroupMessages();
    const ch = supabase.channel(`grp_msg:${selectedGroup.id}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'group_messages', filter: `group_id=eq.${selectedGroup.id}` },
        async (payload) => {
          const msg = payload.new as GroupMessage;
          if (msg.sender_id === currentUserId) {
            // Confirm optimistic message with real DB id
            setGroupMessages(prev => {
              const idx = prev.findIndex(m => m.id.startsWith('optimistic-') && m.message === msg.message);
              if (idx !== -1) {
                const updated = [...prev];
                updated[idx] = { ...updated[idx], id: msg.id };
                return updated;
              }
              return prev.some(m => m.id === msg.id) ? prev : prev;
            });
            return;
          }
          const { data: s } = await supabase.from('user_profiles')
            .select('id, full_name, role').eq('id', msg.sender_id).single();
          setGroupMessages(prev => {
            if (prev.some(m => m.id === msg.id)) return prev;
            return [...prev, { ...msg, sender: s ?? undefined }];
          });
          markGroupMsgRead(msg.id);
        })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [selectedGroup?.id, currentView]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Private realtime ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!selectedContact || currentView !== 'private-chat') return;
    loadPrivateMessages();
    const chanId = [currentUserId, selectedContact.id].sort().join('_');
    const ch = supabase.channel(`pm:${chanId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          const msg = payload.new as PrivateMessage;
          const relevant =
            (msg.sender_id === currentUserId && msg.receiver_id === selectedContact.id) ||
            (msg.sender_id === selectedContact.id && msg.receiver_id === currentUserId);
          if (!relevant) return;
          if (msg.sender_id === currentUserId) {
            setPrivateMessages(prev => {
              const idx = prev.findIndex(m => m.id.startsWith('optimistic-') && m.message === msg.message);
              if (idx !== -1) {
                const updated = [...prev]; updated[idx] = { ...updated[idx], id: msg.id }; return updated;
              }
              return prev.some(m => m.id === msg.id) ? prev : prev;
            });
            return;
          }
          const { data: s } = await supabase.from('user_profiles')
            .select('id, full_name, role').eq('id', msg.sender_id).single();
          setPrivateMessages(prev => {
            if (prev.some(m => m.id === msg.id)) return prev;
            return [...prev, { ...msg, sender: s ?? undefined }];
          });
        })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [selectedContact?.id, currentView]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scroll to bottom ──────────────────────────────────────────────────────

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [groupMessages, privateMessages]);

  // ── Focus input ──────────────────────────────────────────────────────────

  useEffect(() => {
    if ((currentView === 'group-chat' || currentView === 'private-chat') && !loading) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentView, loading]);

  // ── Load groups ───────────────────────────────────────────────────────────

  async function loadGroups() {
    setLoading(true);
    try {
      let courseIds: string[] = [];

      if (userRole === 'trainee') {
        const { data: enr } = await supabase.from('enrollments').select('course_id')
          .eq('trainee_id', currentUserId!).eq('status', 'approved');
        if (!enr?.length) { setGroups([]); return; }
        courseIds = enr.map(e => e.course_id);
      } else if (userRole === 'coach') {
        // Coach only sees groups where they are the assigned instructor
        const { data: c } = await supabase.from('courses').select('id')
          .eq('instructor_id', currentUserId!);
        if (!c?.length) { setGroups([]); return; }
        courseIds = c.map(x => x.id);
      } else {
        // super_admin — all groups
        const { data: g } = await supabase.from('course_groups').select('id, name, course_id');
        if (!g?.length) { setGroups([]); return; }
        courseIds = [...new Set(g.map(x => x.course_id))];
      }

      const { data: rawGroups } = await supabase.from('course_groups')
        .select('id, name, course_id').in('course_id', courseIds);
      if (!rawGroups?.length) { setGroups([]); return; }

      const { data: courses } = await supabase.from('courses')
        .select('id, title, category').in('id', courseIds);

      // Batch — avoid N+1
      const groupIds = rawGroups.map(g => g.id);
      const { data: allMsgs } = await supabase.from('group_messages')
        .select('id, group_id, message, created_at')
        .in('group_id', groupIds).neq('sender_id', currentUserId!)
        .order('created_at', { ascending: false });

      const { data: reads } = allMsgs?.length
        ? await supabase.from('group_message_reads').select('message_id')
            .eq('user_id', currentUserId!).in('message_id', allMsgs.map(m => m.id))
        : { data: [] };
      const readSet = new Set(reads?.map(r => r.message_id) ?? []);

      const result: CourseGroup[] = rawGroups.flatMap(g => {
        const course = courses?.find(c => c.id === g.course_id);
        if (!course) return [];
        const gMsgs = (allMsgs ?? []).filter(m => m.group_id === g.id);
        const lastMsg = gMsgs[0];
        return [{
          id: g.id, course_id: g.course_id, name: g.name,
          unreadCount: gMsgs.filter(m => !readSet.has(m.id)).length,
          lastMessage: lastMsg?.message,
          lastMessageTime: lastMsg?.created_at,
          course: { title: course.title, category: course.category },
        }];
      });

      result.sort((a, b) => {
        if (b.unreadCount !== a.unreadCount) return b.unreadCount - a.unreadCount;
        if (a.lastMessageTime && b.lastMessageTime)
          return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
        return a.name.localeCompare(b.name);
      });
      setGroups(result);
    } catch {
      toast.error('Failed to load course groups');
    } finally {
      setLoading(false);
    }
  }

  // ── Load contacts ─────────────────────────────────────────────────────────
  //
  // Visibility rules:
  //  • Support agents  → visible to EVERYONE (pinned at the top)
  //  • Trainee         → sees coaches of their enrolled courses
  //  • Coach           → sees trainees enrolled in their courses
  //  • super_admin     → sees all users (via support agent flag + normal visibility)

  async function loadContacts() {
    setLoading(true);
    try {
      // 1. Always fetch support agents for everyone
      const { data: supportAgents } = await supabase.from('user_profiles')
        .select('id, full_name, role').eq('is_support_agent', true).neq('id', currentUserId!);

      let people: Omit<ContactPerson, 'unreadCount'>[] = [];

      if (userRole === 'trainee') {
        // Coaches of enrolled courses
        const { data: enr } = await supabase.from('enrollments').select('course_id')
          .eq('trainee_id', currentUserId!).eq('status', 'approved');
        if (enr?.length) {
          const { data: courses } = await supabase.from('courses')
            .select('id, title, instructor_id').in('id', enr.map(e => e.course_id))
            .not('instructor_id', 'is', null);
          if (courses?.length) {
            const ids = [...new Set(courses.map(c => c.instructor_id))];
            const { data: coaches } = await supabase.from('user_profiles')
              .select('id, full_name, role').in('id', ids);
            people = (coaches ?? []).map(c => {
              const course = courses.find(x => x.instructor_id === c.id);
              return { id: c.id, full_name: c.full_name, role: c.role, courseTitle: course?.title };
            });
          }
        }
      } else if (userRole === 'coach') {
        // Trainees enrolled in coach's courses
        const { data: courses } = await supabase.from('courses').select('id, title')
          .eq('instructor_id', currentUserId!);
        if (courses?.length) {
          const { data: enr } = await supabase.from('enrollments')
            .select('trainee_id, course_id').in('course_id', courses.map(c => c.id))
            .eq('status', 'approved');
          if (enr?.length) {
            const ids = [...new Set(enr.map(e => e.trainee_id))];
            const { data: trainees } = await supabase.from('user_profiles')
              .select('id, full_name, role').in('id', ids);
            people = (trainees ?? []).map(t => {
              const e = enr.find(x => x.trainee_id === t.id);
              const course = courses.find(c => c.id === e?.course_id);
              return { id: t.id, full_name: t.full_name, role: t.role, courseTitle: course?.title };
            });
          }
        }
      } else {
        // super_admin — all users except self
        const { data: all } = await supabase.from('user_profiles')
          .select('id, full_name, role').neq('id', currentUserId!);
        people = (all ?? []).map(u => ({ id: u.id, full_name: u.full_name, role: u.role }));
      }

      // Merge support agents (de-dupe by id, mark them)
      const supportIds = new Set((supportAgents ?? []).map(s => s.id));
      const supportEntries: Omit<ContactPerson, 'unreadCount'>[] = (supportAgents ?? [])
        .filter(s => !people.some(p => p.id === s.id))
        .map(s => ({ id: s.id, full_name: s.full_name, role: s.role, isSupport: true }));
      // Mark support agents that are already in the people list
      people = people.map(p => supportIds.has(p.id) ? { ...p, isSupport: true } : p);
      const allPeople = [...supportEntries, ...people];

      if (!allPeople.length) { setContacts([]); return; }

      // Batch unread + last message queries
      const personIds = allPeople.map(p => p.id);
      const { data: unreadMsgs } = await supabase.from('messages')
        .select('id, sender_id').eq('receiver_id', currentUserId!)
        .in('sender_id', personIds).is('read_at', null);
      const { data: lastMsgs } = await supabase.from('messages')
        .select('id, sender_id, receiver_id, message, created_at')
        .or(`and(sender_id.eq.${currentUserId},receiver_id.in.(${personIds.join(',')})),and(sender_id.in.(${personIds.join(',')}),receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: false });

      const result: ContactPerson[] = allPeople.map(p => {
        const unread = (unreadMsgs ?? []).filter(m => m.sender_id === p.id).length;
        const lastMsg = (lastMsgs ?? []).find(m => m.sender_id === p.id || m.receiver_id === p.id);
        return { ...p, unreadCount: unread, lastMessage: lastMsg?.message, lastMessageTime: lastMsg?.created_at };
      });

      // Sort: support agents first, then by unread, then by last message time
      result.sort((a, b) => {
        if (a.isSupport && !b.isSupport) return -1;
        if (!a.isSupport && b.isSupport) return 1;
        if (b.unreadCount !== a.unreadCount) return b.unreadCount - a.unreadCount;
        if (a.lastMessageTime && b.lastMessageTime)
          return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
        return a.full_name.localeCompare(b.full_name);
      });
      setContacts(result);
    } catch {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }

  // ── Load group messages ───────────────────────────────────────────────────

  async function loadGroupMessages() {
    if (!selectedGroup) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from('group_messages')
        .select('*, sender:user_profiles!sender_id(id, full_name, role)')
        .eq('group_id', selectedGroup.id)
        .order('created_at', { ascending: true });
      if (error) throw error;

      const ids = data?.map(m => m.id) ?? [];
      const { data: reads } = ids.length
        ? await supabase.from('group_message_reads').select('message_id')
            .eq('user_id', currentUserId!).in('message_id', ids)
        : { data: [] };
      const rs = new Set(reads?.map(r => r.message_id) ?? []);
      const withStatus = (data ?? []).map(m => ({
        ...m,
        is_read: rs.has(m.id) || m.sender_id === currentUserId,
      }));
      setGroupMessages(withStatus);
      const unreadMsgs = withStatus.filter(m => !m.is_read && m.sender_id !== currentUserId);
      if (unreadMsgs.length) {
        await Promise.all(unreadMsgs.map(m => markGroupMsgRead(m.id)));
        // Refresh counters so the Groups tab dot clears immediately
        loadUnreadCount();
      }
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  async function markGroupMsgRead(id: string) {
    try {
      await supabase.from('group_message_reads')
        .insert({ message_id: id, user_id: currentUserId }).select().single();
    } catch (_) {}
  }

  // ── Load private messages ────────────────────────────────────────────────

  async function loadPrivateMessages() {
    if (!selectedContact) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from('messages')
        .select('*, sender:user_profiles!sender_id(id, full_name, role)')
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: true });
      if (error) throw error;

      // ── Support agent auto-reply on first contact ────────────────────────
      // If the user is opening a support chat for the very first time (no messages
      // exist yet), insert a welcome message from the support agent's account so
      // the conversation doesn't start cold.
      if (selectedContact.isSupport && (!data || data.length === 0)) {
        const greeting = `👋 Hello! Thanks for reaching out to Black Viral AC support.\n\nWe're here to help with any questions about your courses, enrollments, or academy services. A member of our support team will respond as soon as possible.\n\nIn the meantime, feel free to describe your issue and we'll get back to you shortly! 🏊`;
        await supabase.from('messages').insert({
          sender_id: selectedContact.id,
          receiver_id: currentUserId,
          message: greeting,
          read_at: new Date().toISOString(), // pre-mark as read so it doesn't inflate the badge
        });
        // Reload to get the inserted message with full sender info
        const { data: fresh } = await supabase.from('messages')
          .select('*, sender:user_profiles!sender_id(id, full_name, role)')
          .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${currentUserId})`)
          .order('created_at', { ascending: true });
        setPrivateMessages(fresh ?? []);
        return;
      }

      setPrivateMessages(data ?? []);
      const unread = (data ?? []).filter(m => m.receiver_id === currentUserId && !m.read_at);
      if (unread.length) {
        await supabase.from('messages')
          .update({ read_at: new Date().toISOString() })
          .in('id', unread.map(m => m.id));
        // Refresh counters so the Direct tab dot clears immediately
        loadUnreadCount();
      }
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  // ── Send message ─────────────────────────────────────────────────────────

  async function sendMessage() {
    const trimmed = newMessage.trim();
    if (!trimmed || sending) return;
    if (trimmed.length > MAX_MSG_LENGTH) {
      toast.error(`Message too long (max ${MAX_MSG_LENGTH} chars)`);
      return;
    }
    if (containsProfanity(trimmed)) {
      toast.error('Your message contains inappropriate language. Please keep the chat respectful. 🚫');
      return;
    }

    const optimisticId = `optimistic-${Date.now()}`;
    const now = new Date().toISOString();
    setSending(true);
    setNewMessage('');
    setShowEmojiPicker(false);

    try {
      if (currentView === 'group-chat' && selectedGroup) {
        setGroupMessages(prev => [...prev, {
          id: optimisticId, group_id: selectedGroup.id, sender_id: currentUserId!,
          message: trimmed, created_at: now, is_read: true,
          sender: { id: currentUserId!, full_name: 'You', role: userRole ?? '' },
        }]);
        const { data, error } = await supabase.from('group_messages')
          .insert({ group_id: selectedGroup.id, sender_id: currentUserId, message: trimmed })
          .select('id').single();
        if (error) throw error;
        if (data) setGroupMessages(prev => prev.map(m => m.id === optimisticId ? { ...m, id: data.id } : m));

      } else if (currentView === 'private-chat' && selectedContact) {
        setPrivateMessages(prev => [...prev, {
          id: optimisticId, sender_id: currentUserId!, receiver_id: selectedContact.id,
          message: trimmed, created_at: now, read_at: null,
          sender: { id: currentUserId!, full_name: 'You', role: userRole ?? '' },
        }]);
        const { data, error } = await supabase.from('messages')
          .insert({ sender_id: currentUserId, receiver_id: selectedContact.id, message: trimmed })
          .select('id').single();
        if (error) throw error;
        if (data) setPrivateMessages(prev => prev.map(m => m.id === optimisticId ? { ...m, id: data.id } : m));
      }
    } catch {
      setGroupMessages(prev => prev.filter(m => m.id !== optimisticId));
      setPrivateMessages(prev => prev.filter(m => m.id !== optimisticId));
      setNewMessage(trimmed);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  function insertEmoji(emoji: string) {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  }

  // ── Navigation ───────────────────────────────────────────────────────────

  function handleGroupClick(g: CourseGroup) {
    setSelectedGroup(g); setCurrentView('group-chat'); setSearchQuery('');
  }
  function handleContactClick(c: ContactPerson) {
    setSelectedContact(c); setCurrentView('private-chat'); setSearchQuery('');
  }
  function handleBack() {
    setShowEmojiPicker(false);
    if (currentView === 'group-chat') {
      setSelectedGroup(null); setGroupMessages([]); setCurrentView('groups'); setActiveTab('groups'); loadGroups();
    } else if (currentView === 'private-chat') {
      setSelectedContact(null); setPrivateMessages([]); setCurrentView('contacts'); setActiveTab('direct'); loadContacts();
    } else if (currentView === 'contacts') {
      setCurrentView('groups'); setActiveTab('groups');
    }
  }
  function handleTabChange(tab: 'groups' | 'direct') {
    setActiveTab(tab);
    setSearchQuery('');
    setCurrentView(tab === 'direct' ? 'contacts' : 'groups');
  }

  // ── Derived state ────────────────────────────────────────────────────────

  const isInChat = currentView === 'group-chat' || currentView === 'private-chat';
  const activeMessages: any[] = currentView === 'group-chat' ? groupMessages : privateMessages;
  const groupedMessages = isInChat ? groupByDate(activeMessages) : [];
  const charsLeft = MAX_MSG_LENGTH - newMessage.length;

  const filteredGroups = groups.filter(g =>
    !searchQuery ||
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.course?.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const filteredContacts = contacts.filter(c =>
    !searchQuery ||
    c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.courseTitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const headerTitle = () => {
    if (currentView === 'group-chat' && selectedGroup) return selectedGroup.name;
    if (currentView === 'private-chat' && selectedContact) return selectedContact.full_name;
    return 'Messages';
  };
  const headerSub = () => {
    if (currentView === 'group-chat' && selectedGroup) return selectedGroup.course?.category;
    if (currentView === 'private-chat' && selectedContact) {
      if (selectedContact.isSupport) return 'Support Agent';
      if (selectedContact.role === 'coach') return selectedContact.courseTitle ? `Coach · ${selectedContact.courseTitle}` : 'Coach';
      return selectedContact.courseTitle || selectedContact.role;
    }
    return null;
  };

  const windowW = isExpanded ? 'w-[480px]' : 'w-96';
  const windowH = isExpanded ? '700px' : '600px';
  const innerH  = isExpanded ? 'h-[640px]' : 'h-[540px]';

  if (!currentUserId) return null;

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => { setIsOpen(o => !o); setIsMinimized(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-[0_8px_32px_rgba(6,182,212,0.5)] flex items-center justify-center text-white hover:shadow-[0_8px_40px_rgba(6,182,212,0.7)] transition-shadow"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-5 h-5" />
              </motion.div>
            : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="relative">
                <MessageCircle className="w-5 h-5" />
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold px-1 shadow-sm"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: isMinimized ? '58px' : windowH }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`fixed bottom-24 right-6 z-50 ${windowW} bg-[var(--background)] dark:bg-gray-900 border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col`}
            style={{ backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 text-white min-w-0">
                {currentView !== 'groups'
                  ? <button onClick={handleBack} className="p-1 rounded-lg hover:bg-white/20 transition-colors flex-shrink-0 active:scale-95">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  : <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                }
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm leading-tight truncate">{headerTitle()}</h3>
                  {headerSub() && (
                    <p className="text-xs text-white/70 capitalize truncate leading-none mt-0.5">{headerSub()}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => setIsExpanded(v => !v)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/90 hover:text-white" title={isExpanded ? 'Shrink' : 'Expand'}>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setIsMinimized(v => !v)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/90 hover:text-white">
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/90 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <div className={`${innerH} flex flex-col overflow-hidden`}>

                {/* Tabs (list views only) */}
                {(currentView === 'groups' || currentView === 'contacts') && (
                  <div className="flex border-b border-white/10 flex-shrink-0 bg-gray-50 dark:bg-gray-800/50">
                    {(['direct', 'groups'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold tracking-wide uppercase transition-all ${
                          activeTab === tab
                            ? 'text-cyan-500 border-b-2 border-cyan-500 bg-white dark:bg-gray-900'
                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                        }`}
                      >
                        {tab === 'groups'
                          ? <><Users className="w-3.5 h-3.5" />Groups</>
                          : <><User className="w-3.5 h-3.5" />Direct</>
                        }
                        {/* Live unread dots — driven by the realtime watcher, not stale list state */}
                        {tab === 'groups' && groupUnreadTotal > 0 && (
                          <span className="min-w-[16px] h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold px-1 ml-0.5">
                            {groupUnreadTotal > 9 ? '9+' : groupUnreadTotal}
                          </span>
                        )}
                        {tab === 'direct' && directUnreadTotal > 0 && (
                          <span className="min-w-[16px] h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold px-1 ml-0.5">
                            {directUnreadTotal > 9 ? '9+' : directUnreadTotal}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search bar */}
                {(currentView === 'groups' || currentView === 'contacts') && (
                  <div className="px-3 py-2 flex-shrink-0 border-b border-white/5">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={currentView === 'groups' ? 'Search groups…' : 'Search contacts…'}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-gray-700 dark:text-gray-200 placeholder-gray-400"
                      />
                    </div>
                  </div>
                )}

                {/* ── Groups list ────────────────────────────────────── */}
                {currentView === 'groups' && (
                  <div className="flex-1 overflow-y-auto">
                    {loading
                      ? <LoadingSpinner />
                      : filteredGroups.length === 0
                        ? <EmptyState
                            icon={<BookOpen className="w-10 h-10" />}
                            title={searchQuery ? 'No results' : 'No course groups yet'}
                            subtitle={searchQuery ? 'Try a different search' : 'Groups appear here once you are assigned to a course'}
                          />
                        : <div className="divide-y divide-gray-200 dark:divide-white/5">
                            {filteredGroups.map(g => (
                              <ConversationRow
                                key={g.id}
                                name={g.name}
                                subtitle={g.course?.category ?? ''}
                                lastMessage={g.lastMessage}
                                lastMessageTime={g.lastMessageTime}
                                unreadCount={g.unreadCount}
                                icon={<BookOpen className="w-4 h-4" />}
                                avatarGradient="cyan"
                                onClick={() => handleGroupClick(g)}
                              />
                            ))}
                          </div>
                    }
                  </div>
                )}

                {/* ── Contacts list ──────────────────────────────────── */}
                {currentView === 'contacts' && (
                  <div className="flex-1 overflow-y-auto">
                    {loading
                      ? <LoadingSpinner />
                      : filteredContacts.length === 0
                        ? <EmptyState
                            icon={<User className="w-10 h-10" />}
                            title={searchQuery ? 'No results' : 'No contacts yet'}
                            subtitle={
                              searchQuery ? 'Try a different search'
                              : userRole === 'trainee' ? 'Enroll in a course to message your coach'
                              : 'Your enrolled trainees will appear here'
                            }
                          />
                        : <div className="divide-y divide-gray-200 dark:divide-white/5">
                            {filteredContacts.map(c => (
                              <ConversationRow
                                key={c.id}
                                name={c.full_name}
                                subtitle={c.isSupport ? 'Support Agent' : (c.courseTitle ?? c.role)}
                                lastMessage={c.lastMessage}
                                lastMessageTime={c.lastMessageTime}
                                unreadCount={c.unreadCount}
                                avatarName={c.full_name}
                                avatarGradient={c.isSupport ? 'green' : c.role === 'coach' ? 'amber' : 'purple'}
                                isSupport={c.isSupport}
                                role={c.role}
                                onClick={() => handleContactClick(c)}
                              />
                            ))}
                          </div>
                    }
                  </div>
                )}

                {/* ── Chat view ──────────────────────────────────────── */}
                {isInChat && (
                  <>
                    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 bg-gray-50 dark:bg-gray-950/50">
                      {loading
                        ? <LoadingSpinner />
                        : activeMessages.length === 0
                          ? <EmptyState icon={<MessageCircle className="w-10 h-10" />} title="No messages yet" subtitle="Say hello! 👋" />
                          : groupedMessages.map(({ label, messages }) => (
                              <div key={label}>
                                {/* Date divider */}
                                <div className="flex items-center gap-2 my-3">
                                  <div className="flex-1 h-px bg-white/10" />
                                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider px-2">{label}</span>
                                  <div className="flex-1 h-px bg-white/10" />
                                </div>

                                {messages.map((msg: any, i: number) => {
                                  const isSender = msg.sender_id === currentUserId;
                                  const prev = i > 0 ? messages[i - 1] : null;
                                  const showName = !isSender && (!prev || (prev as any).sender_id !== msg.sender_id);
                                  const isGrouped = prev &&
                                    (prev as any).sender_id === msg.sender_id &&
                                    new Date(msg.created_at).getTime() - new Date((prev as any).created_at).getTime() < 60_000;
                                  const senderRole = msg.sender?.role;
                                  const avatarGrad: AvatarGradient =
                                    senderRole === 'coach' ? 'amber' :
                                    senderRole === 'super_admin' ? 'purple' : 'cyan';

                                  return (
                                    <div key={msg.id} className={`flex ${isSender ? 'justify-end' : 'justify-start'} ${isGrouped ? 'mt-0.5' : 'mt-2'}`}>
                                      {!isSender && (
                                        <div className="w-7 mr-1.5 flex-shrink-0 self-end mb-1 relative">
                                          {!isGrouped && (
                                            <Avatar name={msg.sender?.full_name ?? '?'} size="sm" gradient={avatarGrad} />
                                          )}
                                        </div>
                                      )}
                                      <div className={`max-w-[78%] flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
                                        {showName && (
                                          <div className="flex items-center gap-1.5 mb-0.5 ml-1">
                                            <span className="text-[10px] text-cyan-500 font-semibold">
                                              {msg.sender?.full_name}
                                            </span>
                                            <RoleBadge role={senderRole} />
                                          </div>
                                        )}
                                        <div className={`rounded-2xl px-3 py-2 text-sm shadow-sm ${
                                          isSender
                                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-md'
                                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-md border border-white/5'
                                        }`}>
                                          {msg.message}
                                        </div>
                                        <div className={`flex items-center gap-1 mt-0.5 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
                                          <span className="text-[10px] text-gray-400">{formatChatTime(msg.created_at)}</span>
                                          {isSender && (
                                            <span className="text-[10px] text-cyan-400/80">
                                              {msg.is_read
                                                ? <CheckCheck className="w-3 h-3 inline" />
                                                : <Check className="w-3 h-3 inline" />
                                              }
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ))
                      }
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-white/10 p-3">
                      <AnimatePresence>
                        {showEmojiPicker && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                            className="flex gap-1.5 mb-2 flex-wrap"
                          >
                            {QUICK_EMOJIS.map(e => (
                              <button key={e} onClick={() => insertEmoji(e)} className="text-lg hover:scale-125 transition-transform active:scale-90">{e}</button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-end gap-2">
                        <button
                          onClick={() => setShowEmojiPicker(v => !v)}
                          className={`p-2 rounded-xl transition-colors flex-shrink-0 ${showEmojiPicker ? 'bg-cyan-500/20 text-cyan-500' : 'text-gray-400 hover:text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                        <div className="flex-1 relative">
                          <input
                            ref={inputRef}
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value.slice(0, MAX_MSG_LENGTH))}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message…"
                            disabled={sending}
                            className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-xl focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-gray-700 transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 pr-10"
                          />
                          {newMessage.length > MAX_MSG_LENGTH * 0.8 && (
                            <span className={`absolute right-2 bottom-2 text-[10px] ${charsLeft < 20 ? 'text-red-400' : 'text-gray-400'}`}>
                              {charsLeft}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={sendMessage}
                          disabled={!newMessage.trim() || sending}
                          className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-[0_4px_16px_rgba(6,182,212,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
                        >
                          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
      <Loader2 className="w-7 h-7 animate-spin text-cyan-500" />
      <span className="text-xs">Loading…</span>
    </div>
  );
}

function EmptyState({ icon, title, subtitle }: {
  icon: React.ReactNode; title: string; subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 p-6 text-center">
      <div className="opacity-30">{icon}</div>
      <p className="font-medium text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

function ConversationRow({
  name, subtitle, lastMessage, lastMessageTime, unreadCount,
  icon, avatarName, avatarGradient, isSupport, role, onClick,
}: {
  name: string; subtitle: string; lastMessage?: string; lastMessageTime?: string;
  unreadCount: number; icon?: React.ReactNode; avatarName?: string;
  avatarGradient?: AvatarGradient; isSupport?: boolean; role?: string; onClick: () => void;
}) {
  const gradMap: Record<AvatarGradient, string> = {
    cyan:   'from-cyan-500 to-blue-600',
    purple: 'from-violet-500 to-fuchsia-500',
    amber:  'from-amber-400 to-orange-500',
    green:  'from-emerald-400 to-teal-600',
  };

  return (
    <button onClick={onClick} className="w-full px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors text-left group">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 relative">
          {avatarName
            ? <Avatar name={avatarName} gradient={avatarGradient} />
            : <div className={`w-10 h-10 bg-gradient-to-br ${gradMap[avatarGradient ?? 'cyan']} rounded-full flex items-center justify-center text-white flex-shrink-0`}>{icon}</div>
          }
          {/* Support agent indicator dot */}
          {isSupport && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-sm">
              <Headphones className="w-2 h-2 text-white" />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`text-sm truncate ${unreadCount > 0 ? 'font-semibold text-gray-800 dark:text-gray-100' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                {name}
              </span>
              {(isSupport || role === 'coach') && (
                <span className="flex-shrink-0 translate-y-px">
                  <RoleBadge role={role ?? ''} isSupport={isSupport} />
                </span>
              )}
            </div>
            {lastMessageTime && (
              <span className="text-[10px] text-gray-400 flex-shrink-0">{formatTime(lastMessageTime)}</span>
            )}
          </div>
          <div className="flex items-center justify-between gap-1 mt-0.5">
            <p className="text-xs text-gray-400 truncate capitalize">
              {lastMessage ?? subtitle}
            </p>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="flex-shrink-0 min-w-[18px] h-[18px] bg-cyan-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold px-1"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}