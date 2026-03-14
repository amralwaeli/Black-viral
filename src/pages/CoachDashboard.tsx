import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BookOpen, Users, Clock, Award, TrendingUp, AlertCircle,
  CheckCircle, XCircle, Plus, Calendar, FileText, BarChart3,
  ChevronRight, UserCheck, Star, MapPin, Zap, Bell,
  RefreshCw, Eye, EyeOff, GraduationCap, Flame,
  MessageSquare, Globe, Target, Trophy, X
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { CreateEventModal } from '../components/CreateEventModal';
import { useStuckLoadingRecovery } from '../hooks/usePageVisibility';
import { toast } from 'sonner';

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
  aquatic: 'Aquatic', combat: 'Combat', team: 'Team', individual: 'Individual', rescue: 'Rescue & First Aid',
};
const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  advanced: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  expert: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

interface CoachDashboardProps { profile: any; }
type Tab = 'overview' | 'enrollments' | 'courses' | 'students' | 'events';

// ── Progress update inline component ────────────────────────────
function ProgressEditor({ enrollmentId, current, onSaved }: { enrollmentId: string; current: number; onSaved: () => void }) {
  const [val, setVal] = useState(current);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const { error } = await supabase.from('enrollments').update({ progress: val }).eq('id', enrollmentId);
    setSaving(false);
    if (error) { toast.error('Failed to update progress'); return; }
    toast.success('Progress updated');
    onSaved();
  }

  return (
    <div className="flex items-center space-x-2 mt-3">
      <div className="flex-1">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span><span className="font-semibold text-cyan-500">{val}%</span>
        </div>
        <input type="range" min={0} max={100} value={val} onChange={e => setVal(Number(e.target.value))}
          className="w-full h-1.5 rounded-full accent-cyan-500 cursor-pointer" />
      </div>
      <button onClick={save} disabled={saving || val === current}
        className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-all">
        {saving ? '…' : 'Save'}
      </button>
    </div>
  );
}

// ── Issue certificate modal ───────────────────────────────────────
function IssueCertModal({ enrollment, onClose, onIssued }: { enrollment: any; onClose: () => void; onIssued: () => void }) {
  const [saving, setSaving] = useState(false);

  async function issue() {
    setSaving(true);
    const certNumber = `BVC-${Date.now().toString(36).toUpperCase()}`;
    const { error } = await supabase.from('certificates').insert({
      trainee_id: enrollment.trainee_id,
      course_id: enrollment.course_id,
      certificate_number: certNumber,
      issue_date: new Date().toISOString().split('T')[0],
    });
    setSaving(false);
    if (error) { toast.error(error.message || 'Failed to issue certificate'); return; }
    // Also mark enrollment completed
    await supabase.from('enrollments').update({ status: 'completed', progress: 100 }).eq('id', enrollment.id);
    toast.success(`Certificate ${certNumber} issued!`);
    onIssued();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        className="relative bg-card border border-yellow-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/30">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-1">Issue Certificate</h3>
          <p className="text-muted-foreground text-sm">This will mark the course as completed and issue a certificate.</p>
        </div>
        <div className="bg-background rounded-xl p-4 mb-6 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Trainee</span><span className="font-semibold text-foreground">{enrollment.trainee?.full_name}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Course</span><span className="font-semibold text-foreground">{enrollment.course?.title}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold text-foreground">{new Date().toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
        </div>
        <div className="flex space-x-3">
          <button onClick={onClose} className="flex-1 py-3 border border-border rounded-xl text-foreground font-medium hover:bg-background transition-all">Cancel</button>
          <button onClick={issue} disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 transition-all">
            {saving ? 'Issuing…' : 'Issue Certificate'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function CoachDashboard({ profile }: CoachDashboardProps) {
  const [courses, setCourses]           = useState<any[]>([]);
  const [enrollments, setEnrollments]   = useState<any[]>([]);
  const [events, setEvents]             = useState<any[]>([]);
  const [loading, setLoading]           = useState(true);
  const [refreshing, setRefreshing]     = useState(false);
  const [activeTab, setActiveTab]       = useState<Tab>('overview');
  const [showEventModal, setShowEventModal]     = useState(false);
  const [issueCertFor, setIssueCertFor]         = useState<any>(null);
  const [expandedStudents, setExpandedStudents] = useState<Set<string>>(new Set());

  useStuckLoadingRecovery(loading);
  useEffect(() => { loadData(); }, [profile?.id]); // eslint-disable-line

  async function loadData(silent = false) {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const { data: coursesData } = await supabase.from('courses').select('*').eq('instructor_id', profile.id);
      setCourses(coursesData || []);

      if (coursesData && coursesData.length > 0) {
        const ids = coursesData.map(c => c.id);
        // Two-step fetch avoids FK hint issues across different Supabase project configs
        const { data: enrollData } = await supabase
          .from('enrollments')
          .select('*, course:courses(title, category, level)')
          .in('course_id', ids)
          .order('enrolled_at', { ascending: false });

        const traineeIds = [...new Set((enrollData || []).map((e: any) => e.trainee_id))] as string[];
        let traineeMap: Record<string, { id: string; full_name: string; email: string }> = {};
        if (traineeIds.length > 0) {
          const { data: trainees } = await supabase
            .from('user_profiles').select('id, full_name, email').in('id', traineeIds);
          (trainees || []).forEach((t: any) => { traineeMap[t.id] = t; });
        }
        setEnrollments((enrollData || []).map((e: any) => ({ ...e, trainee: traineeMap[e.trainee_id] || null })));
      } else {
        setEnrollments([]);
      }

      const { data: eventsData } = await supabase.from('events').select('*').eq('created_by', profile.id).order('created_at', { ascending: false });
      setEvents(eventsData || []);
    } catch (err) { console.error('[CoachDashboard]', err); }
    finally { setLoading(false); setRefreshing(false); }
  }

  async function handleEnrollment(id: string, action: 'approve' | 'reject') {
    const { error } = await supabase.from('enrollments').update({
      status: action === 'approve' ? 'approved' : 'rejected',
      approved_at: new Date().toISOString(),
      approved_by: profile.id,
    }).eq('id', id);
    if (error) { toast.error('Failed to update enrollment'); return; }
    toast.success(action === 'approve' ? 'Enrollment approved!' : 'Enrollment rejected');
    loadData(true);
  }

  function toggleStudent(id: string) {
    setExpandedStudents(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const pending  = enrollments.filter(e => e.status === 'pending');
  const approved = enrollments.filter(e => e.status === 'approved');
  const totalStudents = approved.length;
  const avgProgress = approved.length > 0
    ? Math.round(approved.reduce((s, e) => s + (e.progress || 0), 0) / approved.length) : 0;

  const tabs: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview',    label: 'Overview',    icon: BarChart3 },
    { id: 'enrollments', label: 'Requests',    icon: UserCheck,  badge: pending.length },
    { id: 'students',    label: 'Students',    icon: Users,      badge: totalStudents },
    { id: 'courses',     label: 'My Courses',  icon: BookOpen,   badge: courses.length },
    { id: 'events',      label: 'Events',      icon: Calendar,   badge: events.length },
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
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-blue-950 border border-purple-500/20 p-8"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <span className="flex items-center space-x-1.5 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5" /><span>Coach</span>
              </span>
              {profile.branch && (
                <span className="flex items-center space-x-1.5 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" /><span>{profile.branch}</span>
                </span>
              )}
              {pending.length > 0 && (
                <span className="flex items-center space-x-1.5 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold animate-pulse">
                  <Bell className="w-3.5 h-3.5" /><span>{pending.length} pending</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Coach <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{profile.full_name?.split(' ')[0]}</span>
            </h1>
            <p className="text-white/50 text-sm">Manage your courses, students and events</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { label: 'Courses',  value: courses.length,  color: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20' },
              { label: 'Students', value: totalStudents,   color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
              { label: 'Avg Prog', value: `${avgProgress}%`, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
            ].map(s => (
              <div key={s.label} className={`px-4 py-2.5 rounded-xl border ${s.bg} text-center min-w-[72px]`}>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
            <button onClick={() => loadData(true)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div className="flex items-center space-x-1 bg-card border border-border rounded-2xl p-1.5 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20 text-white' :
                tab.id === 'enrollments' && pending.length > 0 ? 'bg-orange-500 text-white' : 'bg-cyan-500/10 text-cyan-500'
              }`}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          OVERVIEW TAB
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen,     label: 'My Courses',      value: courses.length,  color: 'from-cyan-500 to-blue-600',     glow: 'shadow-cyan-500/20',   tab: 'courses' as Tab },
              { icon: Users,        label: 'Active Students', value: totalStudents,   color: 'from-purple-500 to-pink-600',   glow: 'shadow-purple-500/20', tab: 'students' as Tab },
              { icon: AlertCircle,  label: 'Pending',         value: pending.length,  color: 'from-orange-500 to-red-500',    glow: 'shadow-orange-500/20', tab: 'enrollments' as Tab },
              { icon: TrendingUp,   label: 'Avg Progress',    value: `${avgProgress}%`, color: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/20', tab: 'students' as Tab },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => setActiveTab(s.tab)}
                className="bg-card border border-border rounded-2xl p-5 hover:border-cyan-500/30 transition-all group cursor-pointer"
              >
                <div className={`w-11 h-11 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg ${s.glow}`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent enrollment activity */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center space-x-2"><Bell className="w-4 h-4 text-orange-500" /><span className="font-semibold text-foreground">Recent Activity</span></div>
                <button onClick={() => setActiveTab('enrollments')} className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center">See all <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="divide-y divide-border">
                {enrollments.slice(0, 5).map((e, i) => (
                  <motion.div key={e.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center space-x-3 px-6 py-3.5"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      e.status === 'approved' ? 'bg-green-500/10' : e.status === 'pending' ? 'bg-orange-500/10' : 'bg-red-500/10'
                    }`}>
                      {e.status === 'approved' ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                       e.status === 'pending'  ? <Clock className="w-4 h-4 text-orange-500" /> :
                       <XCircle className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{e.trainee?.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{e.course?.title}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                        e.status === 'approved' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                        e.status === 'pending'  ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'
                      }`}>{e.status}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(e.enrolled_at).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                ))}
                {enrollments.length === 0 && (
                  <div className="px-6 py-10 text-center text-muted-foreground text-sm">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />No enrollment activity yet
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
                  { action: () => setActiveTab('enrollments'), icon: UserCheck,     label: 'Review Requests',    color: 'text-orange-500', hover: 'hover:border-orange-500/40 hover:bg-orange-500/5', badge: pending.length },
                  { action: () => setShowEventModal(true),     icon: Plus,          label: 'Create Event',       color: 'text-purple-500', hover: 'hover:border-purple-500/40 hover:bg-purple-500/5' },
                  { action: () => setActiveTab('students'),    icon: GraduationCap, label: 'Update Progress',    color: 'text-green-500',  hover: 'hover:border-green-500/40 hover:bg-green-500/5' },
                  { action: () => setActiveTab('students'),    icon: Award,         label: 'Issue Certificate',  color: 'text-yellow-500', hover: 'hover:border-yellow-500/40 hover:bg-yellow-500/5' },
                  { action: () => { window.dispatchEvent(new CustomEvent('open-chat-contacts')); }, icon: MessageSquare, label: 'Message Students', color: 'text-cyan-500', hover: 'hover:border-cyan-500/40 hover:bg-cyan-500/5' },
                ].map((a, i) => (
                  <button key={i} onClick={a.action}
                    className={`flex items-center justify-between w-full px-4 py-3 bg-background border border-border rounded-xl ${a.hover} transition-all group`}
                  >
                    <div className="flex items-center space-x-3">
                      <a.icon className={`w-4 h-4 ${a.color}`} />
                      <span className="text-sm font-medium text-foreground">{a.label}</span>
                    </div>
                    {a.badge ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-500 text-white rounded-full">{a.badge}</span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course previews */}
          {courses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center space-x-2"><BookOpen className="w-4 h-4 text-cyan-500" /><span>My Courses</span></h3>
                <button onClick={() => setActiveTab('courses')} className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center">All courses <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {courses.slice(0, 3).map((course, i) => (
                  <CoursePreviewCard key={course.id} course={course} studentCount={approved.filter(e => e.course_id === course.id).length} index={i} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════
          ENROLLMENT REQUESTS TAB
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'enrollments' && (
        <motion.div key="enrollments" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {pending.length > 0 ? (
            <section>
              <h3 className="font-bold text-foreground flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span>Pending Requests</span>
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">{pending.length}</span>
              </h3>
              <div className="space-y-4">
                {pending.map(enr => (
                  <motion.div key={enr.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-orange-500/20 rounded-2xl p-5 hover:border-orange-500/40 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {enr.trainee?.full_name?.[0] || '?'}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{enr.trainee?.full_name}</h4>
                          <p className="text-xs text-muted-foreground">{enr.trainee?.email}</p>
                          <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-0.5 font-medium">{enr.course?.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Requested {new Date(enr.enrolled_at).toLocaleDateString('en-AE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <button onClick={() => handleEnrollment(enr.id, 'reject')}
                          className="flex items-center space-x-1.5 px-4 py-2.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-semibold transition-all">
                          <XCircle className="w-4 h-4" /><span>Reject</span>
                        </button>
                        <button onClick={() => handleEnrollment(enr.id, 'approve')}
                          className="flex items-center space-x-1.5 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-green-500/20">
                          <CheckCircle className="w-4 h-4" /><span>Approve</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <CheckCircle className="w-14 h-14 text-green-500/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">All caught up!</h3>
              <p className="text-muted-foreground text-sm">No pending enrollment requests at the moment.</p>
            </div>
          )}

          {/* Approved list */}
          {approved.length > 0 && (
            <section>
              <h3 className="font-bold text-foreground flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full" /><span>Approved Students</span>
                <span className="text-muted-foreground font-normal text-sm">({approved.length})</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {approved.map(enr => (
                  <div key={enr.id} className="bg-card border border-border rounded-xl p-4 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-500 font-bold">
                      {enr.trainee?.full_name?.[0] || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{enr.trainee?.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{enr.course?.title}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-cyan-500">{enr.progress || 0}%</div>
                      <div className="text-[10px] text-muted-foreground">progress</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════
          STUDENTS TAB (progress management + cert issuing)
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'students' && (
        <motion.div key="students" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {approved.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <Users className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No active students yet</h3>
              <p className="text-muted-foreground text-sm">Once you approve enrollments they'll appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Group by course */}
              {courses.map(course => {
                const courseStudents = approved.filter(e => e.course_id === course.id);
                if (courseStudents.length === 0) return null;
                return (
                  <div key={course.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="flex items-center space-x-3 px-6 py-4 bg-background/50 border-b border-border">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[course.category] || CATEGORY_COLORS.default} flex items-center justify-center`}>
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-sm">{course.title}</h4>
                        <p className="text-xs text-muted-foreground">{courseStudents.length} student{courseStudents.length !== 1 ? 's' : ''}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border capitalize ${LEVEL_COLORS[course.level] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>{course.level}</span>
                    </div>
                    <div className="divide-y divide-border">
                      {courseStudents.map(enr => (
                        <div key={enr.id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                {enr.trainee?.full_name?.[0] || '?'}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground text-sm">{enr.trainee?.full_name}</p>
                                <p className="text-xs text-muted-foreground">{enr.trainee?.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-cyan-500">{enr.progress || 0}%</span>
                              <button onClick={() => toggleStudent(enr.id)}
                                className="p-1.5 rounded-lg hover:bg-background border border-transparent hover:border-border transition-all text-muted-foreground hover:text-foreground">
                                {expandedStudents.has(enr.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button onClick={() => setIssueCertFor(enr)}
                                className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400/20 rounded-lg text-xs font-semibold transition-all">
                                <Award className="w-3.5 h-3.5" /><span>Cert</span>
                              </button>
                            </div>
                          </div>
                          {expandedStudents.has(enr.id) && (
                            <ProgressEditor enrollmentId={enr.id} current={enr.progress || 0} onSaved={() => loadData(true)} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════
          COURSES TAB
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'courses' && (
        <motion.div key="courses" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {courses.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <BookOpen className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No courses assigned yet</h3>
              <p className="text-muted-foreground text-sm">Contact your admin to get courses assigned to you.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {courses.map((course, i) => (
                <CoursePreviewCard key={course.id} course={course} studentCount={approved.filter(e => e.course_id === course.id).length} index={i} detailed />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════
          EVENTS TAB
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'events' && (
        <motion.div key="events" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground">Events & Announcements</h3>
            <button onClick={() => setShowEventModal(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all text-sm">
              <Plus className="w-4 h-4" /><span>Create Event</span>
            </button>
          </div>
          {events.length === 0 ? (
            <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
              <Calendar className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground text-sm mb-5">Create competitions, workshops or announcements for your students.</p>
              <button onClick={() => setShowEventModal(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all text-sm">
                <Plus className="w-4 h-4" /><span>Create Your First Event</span>
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {events.map((ev, i) => {
                const color = ev.event_type === 'competition' ? 'from-red-500 to-orange-500' : ev.event_type === 'workshop' ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500';
                const emoji = ev.event_type === 'competition' ? '🏆' : ev.event_type === 'workshop' ? '🛠️' : '📢';
                return (
                  <motion.div key={ev.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all"
                  >
                    {ev.image_url ? (
                      <div className="relative h-40 overflow-hidden">
                        <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <span className="absolute bottom-3 left-4 text-white font-bold">{ev.title}</span>
                      </div>
                    ) : <div className={`h-1.5 bg-gradient-to-r ${color}`} />}
                    <div className="p-5">
                      {!ev.image_url && <h4 className="font-bold text-foreground mb-2 flex items-center space-x-2"><span>{emoji}</span><span>{ev.title}</span></h4>}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{ev.description}</p>
                      <div className="space-y-1.5 mb-4">
                        {ev.start_date && <div className="flex items-center space-x-2 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5 text-cyan-500" /><span>{new Date(ev.start_date).toLocaleDateString('en-AE', { weekday: 'short', month: 'short', day: 'numeric' })}</span></div>}
                        {ev.location && <div className="flex items-center space-x-2 text-xs text-muted-foreground"><MapPin className="w-3.5 h-3.5 text-cyan-500" /><span>{ev.location}</span></div>}
                        {ev.max_participants && <div className="flex items-center space-x-2 text-xs text-muted-foreground"><Users className="w-3.5 h-3.5 text-cyan-500" /><span>Max {ev.max_participants} participants</span></div>}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white capitalize`}>{ev.event_type}</span>
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${ev.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-muted-foreground border border-border'}`}>{ev.status}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* ── Modals ───────────────────────────────────────────────── */}
      <CreateEventModal isOpen={showEventModal} onClose={() => setShowEventModal(false)} onSuccess={() => { loadData(true); setShowEventModal(false); }} />
      {issueCertFor && <IssueCertModal enrollment={issueCertFor} onClose={() => setIssueCertFor(null)} onIssued={() => loadData(true)} />}
    </div>
  );
}

// ── Reusable course preview card ─────────────────────────────────
function CoursePreviewCard({ course, studentCount, index, detailed = false }: { course: any; studentCount: number; index: number; detailed?: boolean }) {
  const cat = course.category || 'default';
  const img = course.image_url || CATEGORY_IMAGES[cat] || CATEGORY_IMAGES.default;
  const color = CATEGORY_COLORS[cat] || CATEGORY_COLORS.default;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 group"
    >
      <div className="relative h-36 overflow-hidden">
        <img src={img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex space-x-1.5">
          {course.level && <span className="text-[10px] font-bold px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white rounded-full capitalize">{course.level}</span>}
          {course.is_online && <span className="text-[10px] font-bold px-2 py-0.5 bg-cyan-500/80 backdrop-blur-sm text-white rounded-full flex items-center space-x-1"><Globe className="w-2.5 h-2.5" /><span>Online</span></span>}
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white font-bold text-sm truncate drop-shadow">{course.title}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="flex items-center space-x-1"><Users className="w-3.5 h-3.5" /><span>{studentCount} students</span></span>
          {course.duration && <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /><span>{course.duration}</span></span>}
          {course.price != null && <span className="font-semibold text-foreground">AED {course.price}</span>}
        </div>
        {detailed && course.description && <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{course.description}</p>}
        <div className={`h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full`}>
          <div className={`h-1 bg-gradient-to-r ${color} rounded-full`} style={{ width: `${Math.min(100, studentCount > 0 ? (studentCount / (course.max_capacity || 20)) * 100 : 0)}%` }} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">{studentCount}/{course.max_capacity || 20} capacity</p>
      </div>
    </motion.div>
  );
}