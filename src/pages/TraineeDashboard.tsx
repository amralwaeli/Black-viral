import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Award, Calendar, Clock, Play, Download,
  AlertCircle, MapPin, Users, ChevronRight, Star,
  CheckCircle2, Flame, MessageSquare, Trophy, Zap, Target,
  GraduationCap, BarChart3, X, ExternalLink, RefreshCw,
  Globe, Dumbbell
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { useStuckLoadingRecovery } from '../hooks/usePageVisibility';

const CATEGORY_IMAGES: Record<string, string> = {
  aquatic:    'https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  combat:     'https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  team:       'https://images.unsplash.com/photo-1587166088004-bbd20854280f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  individual: 'https://images.unsplash.com/photo-1621046590909-be3de07237a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  rescue:     'https://images.unsplash.com/photo-1770215252183-da5f44f2851c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  default:    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80',
};
const CATEGORY_COLORS: Record<string, string> = {
  aquatic: 'from-cyan-500 to-blue-600', combat: 'from-red-500 to-orange-600',
  team: 'from-green-500 to-emerald-600', individual: 'from-purple-500 to-pink-600',
  rescue: 'from-rose-500 to-red-600', default: 'from-cyan-500 to-blue-600',
};
const CATEGORY_LABELS: Record<string, string> = {
  aquatic: 'Aquatic Sports', combat: 'Combat Sports',
  team: 'Team Sports', individual: 'Individual Sports', rescue: 'Rescue & First Aid',
};

interface TraineeDashboardProps { profile: any; }
type Tab = 'overview' | 'courses' | 'certificates' | 'events';

function CertModal({ cert, onClose }: { cert: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        className="relative bg-card border border-yellow-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
        <div className="relative rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-6 mb-6 overflow-hidden text-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent)]" />
          <Trophy className="w-12 h-12 text-white mx-auto mb-2 drop-shadow" />
          <p className="text-white/80 text-xs uppercase tracking-widest font-semibold">Certificate of Achievement</p>
          <h3 className="text-white text-xl font-bold mt-1">{cert.course?.title || 'Course Certificate'}</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Certificate #</span>
            <span className="font-mono font-semibold text-foreground">{cert.certificate_number}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Issued</span>
            <span className="font-semibold text-foreground">{new Date(cert.issue_date).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {cert.expiry_date && (
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Valid Until</span>
              <span className="font-semibold text-foreground">{new Date(cert.expiry_date).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          )}
        </div>
        <button className="mt-6 w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center space-x-2">
          <Download className="w-4 h-4" /><span>Download Certificate</span>
        </button>
      </motion.div>
    </div>
  );
}

function CourseCard({ enrollment, index, expanded = false }: { enrollment: any; index: number; expanded?: boolean }) {
  const course = enrollment.course;
  const cat = course?.category || 'default';
  const img = course?.image_url || CATEGORY_IMAGES[cat] || CATEGORY_IMAGES.default;
  const color = CATEGORY_COLORS[cat] || CATEGORY_COLORS.default;
  const progress = enrollment.progress || 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 group"
    >
      <div className="relative h-40 overflow-hidden">
        <img src={img} alt={course?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {course?.level && <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full capitalize">{course.level}</span>}
        {course?.is_online && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-1.5 py-0.5 bg-cyan-500/80 backdrop-blur-sm text-white rounded-full flex items-center space-x-1">
            <Globe className="w-2.5 h-2.5" /><span>Online</span>
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <div className="flex justify-between text-white text-xs mb-1">
            <span className="font-semibold drop-shadow truncate pr-2">{course?.title}</span>
            <span className="font-bold text-cyan-300 flex-shrink-0">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/20 rounded-full">
            <div className={`h-1 bg-gradient-to-r ${color} rounded-full transition-all duration-500`} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      {expanded && (
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
            {course?.duration && <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /><span>{course.duration}</span></span>}
            {course?.branch && <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /><span>{course.branch}</span></span>}
            {course?.category && <span className="flex items-center space-x-1"><Star className="w-3.5 h-3.5 text-yellow-500" /><span>{CATEGORY_LABELS[course.category] || course.category}</span></span>}
          </div>
          <button className={`w-full py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-r ${color} hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2`}>
            <Play className="w-4 h-4" /><span>Continue Learning</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function TraineeDashboard({ profile }: TraineeDashboardProps) {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  useStuckLoadingRecovery(loading);
  useEffect(() => { loadData(); }, [profile?.id]); // eslint-disable-line

  async function loadData(silent = false) {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const [enrollRes, certRes, eventRes] = await Promise.all([
        supabase.from('enrollments').select('*, course:courses(*)').eq('trainee_id', profile.id).in('status', ['approved', 'pending', 'completed', 'rejected']),
        supabase.from('certificates').select('*, course:courses(title)').eq('trainee_id', profile.id),
        supabase.from('events').select('*').eq('status', 'active').gte('start_date', new Date().toISOString()).order('start_date', { ascending: true }).limit(6),
      ]);
      setEnrollments(enrollRes.data || []);
      setCertificates(certRes.data || []);
      setEvents(eventRes.data || []);
    } catch (err) { console.error('[TraineeDashboard]', err); }
    finally { setLoading(false); setRefreshing(false); }
  }

  const active    = enrollments.filter(e => e.status === 'approved');
  const pending   = enrollments.filter(e => e.status === 'pending');
  const completed = enrollments.filter(e => e.status === 'completed');
  const avgProgress = active.length > 0
    ? Math.round(active.reduce((s, e) => s + (e.progress || 0), 0) / active.length) : 0;

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: 'overview',     label: 'Overview',      icon: BarChart3 },
    { id: 'courses',      label: 'My Courses',    icon: BookOpen,  count: active.length + pending.length },
    { id: 'certificates', label: 'Certificates',  icon: Award,     count: certificates.length },
    { id: 'events',       label: 'Events',        icon: Calendar,  count: events.length },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full border-2 border-t-cyan-500 border-cyan-500/20 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Loading your dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-24">

      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 border border-cyan-500/20 p-8"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <span className="flex items-center space-x-1.5 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" /><span>Active Trainee</span>
              </span>
              {certificates.length > 0 && (
                <span className="flex items-center space-x-1.5 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5" /><span>{certificates.length} Cert{certificates.length !== 1 ? 's' : ''}</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{profile.full_name?.split(' ')[0]}</span>!
            </h1>
            <p className="text-white/50 text-sm">Continue your journey to excellence at Black Viral AC</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { label: 'Active',     value: active.length,    color: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20' },
              { label: 'Completed',  value: completed.length, color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
              { label: 'Progress',   value: `${avgProgress}%`, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
            ].map(s => (
              <div key={s.label} className={`px-4 py-2.5 rounded-xl border ${s.bg} text-center min-w-[72px]`}>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
            <button onClick={() => loadData(true)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all" title="Refresh">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        {active.length > 0 && (
          <div className="relative mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between text-xs text-white/40 mb-2">
              <span>Overall training progress</span>
              <span className="text-cyan-400 font-semibold">{avgProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full">
              <motion.div className="h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: 0 }} animate={{ width: `${avgProgress}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }} />
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div className="flex items-center space-x-1 bg-card border border-border rounded-2xl p-1.5 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-cyan-500/10 text-cyan-500'}`}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ─────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen,      label: 'Active Courses',  value: active.length,       color: 'from-cyan-500 to-blue-600',     glow: 'shadow-cyan-500/20' },
              { icon: GraduationCap, label: 'Completed',       value: completed.length,    color: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/20' },
              { icon: Award,         label: 'Certificates',    value: certificates.length, color: 'from-yellow-400 to-orange-500', glow: 'shadow-yellow-500/20' },
              { icon: Clock,         label: 'Pending',         value: pending.length,      color: 'from-orange-500 to-red-500',    glow: 'shadow-orange-500/20' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl p-5 hover:border-cyan-500/30 transition-all group cursor-default"
              >
                <div className={`w-11 h-11 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg ${s.glow}`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Upcoming events list */}
            <div className="md:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-cyan-500" /><span className="font-semibold text-foreground">Upcoming Events</span></div>
                <button onClick={() => setActiveTab('events')} className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center">See all <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="divide-y divide-border">
                {events.slice(0, 4).map((ev, i) => (
                  <motion.div key={ev.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center space-x-4 px-6 py-4 hover:bg-background/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
                      ev.event_type === 'competition' ? 'from-red-500 to-orange-500' :
                      ev.event_type === 'workshop'    ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'
                    }`}>
                      <span className="text-lg">{ev.event_type === 'competition' ? '🏆' : ev.event_type === 'workshop' ? '🛠️' : '📢'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{ev.title}</p>
                      <div className="flex items-center space-x-3 mt-0.5">
                        {ev.start_date && <span className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" />{new Date(ev.start_date).toLocaleDateString('en-AE', { month: 'short', day: 'numeric' })}</span>}
                        {ev.location && <span className="text-xs text-muted-foreground flex items-center truncate"><MapPin className="w-3 h-3 mr-1 flex-shrink-0" /><span className="truncate">{ev.location}</span></span>}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full capitalize bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex-shrink-0">{ev.event_type}</span>
                  </motion.div>
                ))}
                {events.length === 0 && (
                  <div className="px-6 py-10 text-center text-muted-foreground text-sm">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />No upcoming events
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center space-x-2 px-6 py-4 border-b border-border">
                <Zap className="w-4 h-4 text-yellow-500" /><span className="font-semibold text-foreground">Quick Actions</span>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { to: '/courses',        icon: BookOpen,      label: 'Browse Courses',    color: 'text-cyan-500',   hover: 'hover:border-cyan-500/40 hover:bg-cyan-500/5' },
                  { to: '/certifications', icon: Award,         label: 'Certifications',    color: 'text-yellow-500', hover: 'hover:border-yellow-500/40 hover:bg-yellow-500/5' },
                  { to: '/our-team',       icon: Users,         label: 'Meet Our Coaches',  color: 'text-green-500',  hover: 'hover:border-green-500/40 hover:bg-green-500/5' },
                  { to: '/contact',        icon: MessageSquare, label: 'Contact Support',   color: 'text-purple-500', hover: 'hover:border-purple-500/40 hover:bg-purple-500/5' },
                  { to: '/settings',       icon: Target,        label: 'My Settings',       color: 'text-orange-500', hover: 'hover:border-orange-500/40 hover:bg-orange-500/5' },
                ].map(a => (
                  <Link key={a.to} to={a.to} className={`flex items-center justify-between w-full px-4 py-3 bg-background border border-border rounded-xl ${a.hover} transition-all group`}>
                    <div className="flex items-center space-x-3"><a.icon className={`w-4 h-4 ${a.color}`} /><span className="text-sm font-medium text-foreground">{a.label}</span></div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Continue learning */}
          {active.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center space-x-2"><Play className="w-4 h-4 text-cyan-500" /><span>Continue Learning</span></h3>
                <button onClick={() => setActiveTab('courses')} className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center">All courses <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {active.slice(0, 3).map((enr, i) => <CourseCard key={enr.id} enrollment={enr} index={i} />)}
              </div>
            </div>
          )}

          {enrollments.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 p-12 text-center"
            >
              <Dumbbell className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Start Your Training Journey</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">Browse our world-class courses and enroll today to begin your path to excellence.</p>
              <Link to="/courses" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all">
                <BookOpen className="w-4 h-4" /><span>Explore Courses</span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ── COURSES ──────────────────────────────────────────────── */}
      {activeTab === 'courses' && (
        <motion.div key="courses" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {pending.length > 0 && (
            <div className="flex items-start space-x-3 bg-orange-500/10 border border-orange-500/30 rounded-2xl px-5 py-4">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">{pending.length} enrollment{pending.length > 1 ? 's' : ''} awaiting approval</p>
                <p className="text-muted-foreground text-xs mt-0.5">Your coach will review and approve your request shortly.</p>
              </div>
            </div>
          )}
          {active.length > 0 && (
            <section>
              <h3 className="flex items-center space-x-2 font-bold text-foreground mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><span>Active Courses</span>
                <span className="text-muted-foreground font-normal text-sm">({active.length})</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-5">{active.map((enr, i) => <CourseCard key={enr.id} enrollment={enr} index={i} expanded />)}</div>
            </section>
          )}
          {pending.length > 0 && (
            <section>
              <h3 className="flex items-center space-x-2 font-bold text-foreground mb-4">
                <span className="w-2 h-2 bg-orange-500 rounded-full" /><span>Pending Approval</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pending.map(enr => (
                  <div key={enr.id} className="bg-card border border-orange-500/20 rounded-2xl p-5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0"><Clock className="w-6 h-6 text-orange-500" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{enr.course?.title || 'Course'}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Awaiting coach approval · Enrolled {new Date(enr.enrolled_at).toLocaleDateString()}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full flex-shrink-0">Pending</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {completed.length > 0 && (
            <section>
              <h3 className="flex items-center space-x-2 font-bold text-foreground mb-4">
                <span className="w-2 h-2 bg-blue-500 rounded-full" /><span>Completed</span>
              </h3>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {completed.map(enr => (
                  <div key={enr.id} className="bg-card border border-green-500/20 rounded-2xl p-5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-6 h-6 text-green-500" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{enr.course?.title || 'Course'}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{enr.course?.category ? CATEGORY_LABELS[enr.course.category] || enr.course.category : 'Course'}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full flex-shrink-0">Done</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {enrollments.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No courses yet</h3>
              <p className="text-sm text-muted-foreground mb-5">Start your journey by enrolling in a course</p>
              <Link to="/courses" className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
                <BookOpen className="w-4 h-4" /><span>Explore Courses</span>
              </Link>
            </div>
          )}
        </motion.div>
      )}

      {/* ── CERTIFICATES ─────────────────────────────────────────── */}
      {activeTab === 'certificates' && (
        <motion.div key="certs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {certificates.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No certificates yet</h3>
              <p className="text-sm text-muted-foreground mb-5">Complete a course to earn your first certificate</p>
              <Link to="/about#credentials" className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all">
                <Award className="w-4 h-4" /><span>View Certifications</span>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {certificates.map((cert, i) => (
                <motion.div key={cert.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="group bg-card border border-yellow-500/20 rounded-2xl overflow-hidden hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent)]" />
                    <Trophy className="w-10 h-10 text-white drop-shadow mb-2" />
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">Certificate of Achievement</p>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground mb-1 line-clamp-2">{cert.course?.title || 'Certificate'}</h3>
                    <p className="text-xs text-muted-foreground mb-1">Issued {new Date(cert.issue_date).toLocaleDateString('en-AE', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <p className="text-xs font-mono text-muted-foreground/70 mb-4"># {cert.certificate_number}</p>
                    <button className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl text-xs font-semibold hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all flex items-center justify-center space-x-1.5 group-hover:scale-[1.02]">
                      <Download className="w-3.5 h-3.5" /><span>View & Download</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
        </motion.div>
      )}

      {/* ── EVENTS ───────────────────────────────────────────────── */}
      {activeTab === 'events' && (
        <motion.div key="events" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No upcoming events</h3>
              <p className="text-sm text-muted-foreground">Check back soon for competitions, workshops and announcements</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {events.map((ev, i) => {
                const color = ev.event_type === 'competition' ? 'from-red-500 to-orange-500' : ev.event_type === 'workshop' ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500';
                const emoji = ev.event_type === 'competition' ? '🏆' : ev.event_type === 'workshop' ? '🛠️' : '📢';
                return (
                  <motion.div key={ev.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300"
                  >
                    {ev.image_url ? (
                      <div className="relative h-40 overflow-hidden">
                        <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <span className="absolute bottom-3 left-4 text-white font-bold text-lg">{ev.title}</span>
                      </div>
                    ) : <div className={`h-1.5 bg-gradient-to-r ${color}`} />}
                    <div className="p-5">
                      {!ev.image_url && <h4 className="font-bold text-foreground mb-2 flex items-center space-x-2"><span>{emoji}</span><span>{ev.title}</span></h4>}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{ev.description}</p>
                      <div className="space-y-1.5 mb-4">
                        {ev.start_date && <div className="flex items-center space-x-2 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" /><span>{new Date(ev.start_date).toLocaleDateString('en-AE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></div>}
                        {ev.location && <div className="flex items-center space-x-2 text-xs text-muted-foreground"><MapPin className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" /><span>{ev.location}</span></div>}
                        {ev.max_participants && <div className="flex items-center space-x-2 text-xs text-muted-foreground"><Users className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" /><span>Max {ev.max_participants} participants</span></div>}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white capitalize`}>{ev.event_type}</span>
                        <button className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"><span>Register</span><ExternalLink className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}