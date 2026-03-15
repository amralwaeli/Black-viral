import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePageTitle } from '../hooks/usePageTitle';
import { Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { TraineeDashboard } from './TraineeDashboard';
import { CoachDashboard } from './CoachDashboard';
import { SupportAgentDashboard } from './SupportAgentDashboard';
import { SuperAdminDashboard } from './SuperAdminDashboard';

export function Dashboard() {
  usePageTitle('Dashboard');
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();

  // Track whether we've ever confirmed the user is logged in this session.
  // This prevents a brief loading flash on tab-return from triggering a redirect.
  const wasAuthenticatedRef = useRef(false);
  if (user) wasAuthenticatedRef.current = true;

  useEffect(() => {
    // Only redirect if:
    // 1. We are NOT loading (initial auth check is complete)
    // 2. There is no user
    // 3. We have NEVER seen a logged-in user in this session
    //    (prevents redirect during a silent background refresh)
    if (!loading && !user && !wasAuthenticatedRef.current) {
      navigate('/signin', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    wasAuthenticatedRef.current = false;
    await signOut();
    navigate('/', { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!user || !profile) {
    // Show spinner while profile is loading (including OAuth redirects)
    if (wasAuthenticatedRef.current || user) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      );
    }
    return null;
  }

  const getRoleDisplay = () => {
    switch (profile.role) {
      case 'super_admin': return 'Super Admin';
      case 'coach': return 'Coach';
      case 'trainee': return 'Trainee';
      default: return 'User';
    }
  };

  return (
    <div className="pt-20 min-h-screen pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Hi, <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                {profile.full_name}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {getRoleDisplay()} Dashboard
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mt-4 md:mt-0"
          >
            <button className="p-3 bg-card border border-cyan-500/20 rounded-lg text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="p-3 bg-card border border-cyan-500/20 rounded-lg text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </motion.div>
        </div>

        {/* Role-based Dashboard Content */}
        {profile.role === 'trainee' && <TraineeDashboard profile={profile} />}
        {profile.role === 'coach' && <CoachDashboard profile={profile} />}
        {profile.role === 'super_admin' && <SuperAdminDashboard profile={profile} />}
      </div>
    </div>
  );
}