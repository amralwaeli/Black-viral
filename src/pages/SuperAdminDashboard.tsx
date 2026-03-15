import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, BookOpen, Award, Building2, UserPlus, Trash2, Edit, AlertCircle, UserCircle2
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { AddCoachModal } from '../components/AddCoachModal';
import { AddCourseModal } from '../components/AddCourseModal';
import { EditCourseModal } from '../components/EditCourseModal';
import { EditUserModal } from '../components/EditUserModal';
import { toast } from 'sonner';
import { useStuckLoadingRecovery } from '../hooks/usePageVisibility';

interface SuperAdminDashboardProps {
  profile: any;
}

export function SuperAdminDashboard({ profile }: SuperAdminDashboardProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'branches' | 'support'>('overview');
  const [showAddCoachModal, setShowAddCoachModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showAssignCoachModal, setShowAssignCoachModal] = useState(false);
  const [assignCourseTarget, setAssignCourseTarget] = useState<any>(null);
  const [selectedCoachId, setSelectedCoachId] = useState<string>('');

  useStuckLoadingRecovery(loading);

  useEffect(() => { loadAdminData(); }, []);

  async function loadAdminData() {
    try {
      const { data: usersData, error: usersError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      
      const hasColumnSupport = usersData && usersData.length > 0 && 'is_support_agent' in usersData[0];
      
      const processedUsers = usersData?.map(user => ({
        ...user,
        is_support_agent: hasColumnSupport ? user.is_support_agent : false
      })) || [];
      
      setUsers(processedUsers);

      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*, instructor:user_profiles(full_name)')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      const { data: branchesData, error: branchesError } = await supabase
        .from('branches')
        .select('*');

      if (branchesError) throw branchesError;
      setBranches(branchesData || []);
    } catch (error) {
      console.error('[SuperAdminDashboard] loadData:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteUser(user: any) {
    if (!confirm(`Are you sure you want to delete ${user.full_name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', user.id);

      if (error) throw error;

      toast.success('User deleted successfully');
      loadAdminData();
    } catch (error: any) {
      console.error('[SuperAdminDashboard] deleteUser:', error);
      toast.error(error.message || 'Failed to delete user');
    }
  }

  const stats = [
    { 
      icon: Users, 
      label: 'Total Users', 
      value: users.length.toString(), 
      color: 'from-cyan-500 to-blue-600' 
    },
    { 
      icon: Users, 
      label: 'Coaches', 
      value: users.filter(u => u.role === 'coach').length.toString(), 
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      icon: BookOpen, 
      label: 'Total Courses', 
      value: courses.length.toString(), 
      color: 'from-orange-500 to-red-600' 
    },
    { 
      icon: Building2, 
      label: 'Branches', 
      value: branches.length.toString(), 
      color: 'from-green-500 to-emerald-600' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-border">
        {(['overview', 'users', 'courses', 'branches', 'support'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-all capitalize ${
              activeTab === tab
                ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Recent Users</h3>
            <div className="space-y-3">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{user.full_name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'super_admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    user.role === 'coach' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">System Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Trainees</span>
                <span className="text-xl font-bold text-foreground">
                  {users.filter(u => u.role === 'trainee').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Courses</span>
                <span className="text-xl font-bold text-foreground">
                  {courses.filter(c => c.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Branches</span>
                <span className="text-xl font-bold text-foreground">
                  {branches.filter(b => b.status === 'active').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">All Users</h3>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center space-x-2" onClick={() => setShowAddCoachModal(true)}>
              <UserPlus className="w-5 h-5" />
              <span>Add Coach</span>
            </button>
          </div>
          
          <div className="bg-card border border-cyan-500/20 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-cyan-500/5 border-b border-cyan-500/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Branch</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-cyan-500/5">
                    <td className="px-6 py-4 text-sm text-foreground">{user.full_name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === 'super_admin' ? 'bg-red-500/20 text-red-400' :
                        user.role === 'coach' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.branch || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditUserModal(true);
                          }}
                          className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.role !== 'super_admin' && (
                          <button 
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">All Courses</h3>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center space-x-2" onClick={() => setShowAddCourseModal(true)}>
              <BookOpen className="w-5 h-5" />
              <span>Add Course</span>
            </button>
          </div>

          {courses.length === 0 && (
            <div className="mb-6 flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 font-medium text-sm">No courses in database yet</p>
                <p className="text-amber-400/70 text-xs mt-1">
                  Run <code className="bg-amber-500/10 px-1 rounded font-mono">/utils/seed-courses.sql</code> in your Supabase SQL Editor to add all 12 courses from the courses page into the database. After that, you can assign coaches to each course here.
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <h4 className="text-lg font-bold text-foreground leading-snug">{course.title}</h4>
                    <span className="text-xs text-muted-foreground capitalize">{course.category} · {course.level}</span>
                  </div>
                  <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-2 mb-4 text-sm">
                  <UserCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  {course.instructor?.full_name ? (
                    <span className="text-cyan-600 dark:text-cyan-400 font-medium">{course.instructor.full_name}</span>
                  ) : (
                    <span className="text-amber-400 italic">No coach assigned yet</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                  <span className="text-muted-foreground font-medium">
                    AED {Number(course.price || 0).toLocaleString()} · {course.duration}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowEditCourseModal(true);
                      }}
                      className="p-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 rounded"
                      title="Edit course"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const coaches = users.filter(u => u.role === 'coach');
                        if (coaches.length === 0) {
                          toast.error('No coaches found. Add a coach first.');
                          return;
                        }
                        setAssignCourseTarget(course);
                        setSelectedCoachId(course.instructor_id || '');
                        setShowAssignCoachModal(true);
                      }}
                      className="px-3 py-1.5 text-xs text-purple-600 dark:text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 rounded-lg transition-all"
                      title="Assign coach"
                    >
                      Assign Coach
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete "${course.title}"? This cannot be undone.`)) return;
                        const { error } = await supabase.from('courses').delete().eq('id', course.id);
                        if (error) { toast.error('Failed to delete course'); }
                        else { toast.success('Course deleted'); loadAdminData(); }
                      }}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded"
                      title="Delete course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Branches Tab */}
      {activeTab === 'branches' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Branches</h3>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Add Branch</span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-foreground">{branch.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    branch.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {branch.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{branch.address}</p>
                  <p>{branch.phone}</p>
                  <p>{branch.email}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center space-x-2">
                  <button className="flex-1 px-4 py-2 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-all">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support Agents Tab */}
      {activeTab === 'support' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Support Agents</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Support agents are visible to all users in the messaging system
              </p>
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-cyan-600 dark:text-cyan-400">Note:</strong> First, run the SQL script{' '}
              <code className="bg-cyan-500/10 px-2 py-0.5 rounded text-xs font-mono">
                /utils/add-support-agent-feature.sql
              </code>{' '}
              in Supabase SQL Editor to add the support agent feature to the database.
            </p>
          </div>
          
          <div className="bg-card border border-cyan-500/20 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-cyan-500/5 border-b border-cyan-500/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Support Agent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-cyan-500/5">
                    <td className="px-6 py-4 text-sm text-foreground">{user.full_name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === 'super_admin' ? 'bg-red-500/20 text-red-400' :
                        user.role === 'coach' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.is_support_agent ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={async () => {
                          const newStatus = !user.is_support_agent;
                          const { error } = await supabase
                            .from('user_profiles')
                            .update({ is_support_agent: newStatus })
                            .eq('id', user.id);

                          if (error) {
                            console.error('Error updating support agent status:', error);
                            toast.error('Failed to update support agent status');
                          } else {
                            toast.success(
                              newStatus 
                                ? `${user.full_name} is now a support agent` 
                                : `${user.full_name} removed as support agent`
                            );
                            loadAdminData();
                          }
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          user.is_support_agent
                            ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20'
                            : 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20'
                        }`}
                      >
                        {user.is_support_agent ? 'Remove' : 'Make Support Agent'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Coach Modal */}
      {showAssignCoachModal && assignCourseTarget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-foreground mb-2">Assign Coach</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Select a coach for <span className="text-foreground font-medium">"{assignCourseTarget.title}"</span>
            </p>
            <select
              value={selectedCoachId}
              onChange={(e) => setSelectedCoachId(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">-- No Coach (Unassign) --</option>
              {users.filter(u => u.role === 'coach').map((coach: any) => (
                <option key={coach.id} value={coach.id}>
                  {coach.full_name}
                </option>
              ))}
            </select>
            <div className="flex space-x-3">
              <button
                onClick={async () => {
                  const coachId = selectedCoachId === '' ? null : selectedCoachId;
                  const { error } = await supabase
                    .from('courses')
                    .update({ instructor_id: coachId })
                    .eq('id', assignCourseTarget.id);
                  if (error) {
                    toast.error('Failed to update coach');
                  } else {
                    toast.success(coachId ? 'Coach assigned!' : 'Coach removed');
                    setShowAssignCoachModal(false);
                    loadAdminData();
                  }
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setShowAssignCoachModal(false)}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Coach Modal */}
      {showAddCoachModal && (
        <AddCoachModal 
          isOpen={showAddCoachModal}
          onClose={() => setShowAddCoachModal(false)} 
          onSuccess={loadAdminData}
          branches={branches}
        />
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <AddCourseModal 
          isOpen={showAddCourseModal}
          onClose={() => setShowAddCourseModal(false)} 
          onSuccess={loadAdminData}
          coaches={users.filter(u => u.role === 'coach')}
          branches={branches}
        />
      )}

      {/* Edit Course Modal */}
      {showEditCourseModal && (
        <EditCourseModal 
          isOpen={showEditCourseModal}
          onClose={() => setShowEditCourseModal(false)} 
          onSuccess={loadAdminData}
          course={selectedCourse}
          coaches={users.filter(u => u.role === 'coach')}
          branches={branches}
        />
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <EditUserModal 
          isOpen={showEditUserModal}
          onClose={() => setShowEditUserModal(false)} 
          onSuccess={loadAdminData}
          user={selectedUser}
          branches={branches}
          adminProfile={profile}
        />
      )}
    </div>
  );
}