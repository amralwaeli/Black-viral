import { useState, useEffect } from 'react';
import { X, Save, Loader2, ShieldCheck, AlertTriangle, Copy, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: any;
  branches: any[];
  adminProfile?: any;
}

// SQL that needs to be run in Supabase to allow super admins to update any profile
const RLS_FIX_SQL = `-- Run this once in Supabase SQL Editor to fix admin role updates
CREATE OR REPLACE FUNCTION public.current_user_is_super_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid() AND role = 'super_admin'
  );
$$;

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users or admins can update profiles"
  ON user_profiles FOR UPDATE
  USING (user_id = auth.uid() OR public.current_user_is_super_admin());`;

export function EditUserModal({ isOpen, onClose, onSuccess, user, branches, adminProfile }: EditUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [rlsBlocked, setRlsBlocked] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    role: 'trainee',
    branch: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || '',
        role: user.role || 'trainee',
        branch: user.branch || '',
        phone: user.phone || '',
      });
      setRlsBlocked(false);
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setRlsBlocked(false);

    // Validate full name length
    if (formData.fullName.trim().length === 0) {
      toast.error('Full name is required');
      setLoading(false);
      return;
    }

    if (formData.fullName.length > 70) {
      toast.error('Full name must be 70 characters or less');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.fullName.trim(),
          role: formData.role,
          branch: formData.branch || null,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Check if the update actually changed anything by re-fetching
      const { data: refetched } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (refetched && refetched.role !== formData.role) {
        // RLS silently blocked the update — the role didn't change
        setRlsBlocked(true);
        return;
      }

      toast.success(`✅ User updated successfully! Role set to "${formData.role}"`);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error updating user:', error);

      // If error mentions permission or RLS, show the SQL fix
      if (error.code === '42501' || error.message?.toLowerCase().includes('policy') || error.message?.toLowerCase().includes('permission')) {
        setRlsBlocked(true);
      } else {
        toast.error(error.message || 'Failed to update user');
      }
    } finally {
      setLoading(false);
    }
  }

  function copySQL() {
    navigator.clipboard.writeText(RLS_FIX_SQL).then(() => {
      setSqlCopied(true);
      setTimeout(() => setSqlCopied(false), 3000);
      toast.success('SQL copied! Paste it in Supabase SQL Editor.');
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-cyan-500/20 rounded-2xl max-w-lg w-full p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Edit User</h2>
            <p className="text-xs text-muted-foreground mt-1">Super Admin — User Management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* RLS Blocked Warning */}
        {rlsBlocked && (
          <div className="mb-5 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">Database Permission Required</p>
                <p className="text-xs text-muted-foreground mt-1">
                  The RLS policy is blocking this update. You need to run a one-time SQL fix in your{' '}
                  <a
                    href={`https://supabase.com/dashboard/project/zhqwlgqsghsbevrgflcu/sql/new`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:underline"
                  >
                    Supabase SQL Editor ↗
                  </a>
                </p>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400 overflow-x-auto whitespace-pre-wrap break-all">
              {RLS_FIX_SQL}
            </div>
            <button
              onClick={copySQL}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-all text-sm font-medium"
            >
              {sqlCopied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Copied! Paste in SQL Editor then retry.</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy SQL to Clipboard</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* User info banner */}
        <div className="flex items-center space-x-3 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {user?.full_name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.full_name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${
            user?.role === 'super_admin' ? 'bg-red-500/20 text-red-400' :
            user?.role === 'coach' ? 'bg-purple-500/20 text-purple-400' :
            user?.role === 'support' ? 'bg-green-500/20 text-green-400' :
            'bg-cyan-500/20 text-cyan-400'
          }`}>
            {user?.role}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              required
              maxLength={70}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              placeholder="John Doe"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.fullName.length}/70 characters
            </p>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
              Role <span className="text-cyan-500">*</span>
            </label>
            <select
              id="role"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
            >
              <option value="trainee">Trainee</option>
              <option value="coach">Coach / Instructor</option>
              <option value="support">Support</option>
              <option value="super_admin">Super Admin</option>
            </select>
            {formData.role !== user?.role && (
              <p className="text-xs text-amber-500 mt-1 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Role will change: "{user?.role}" → "{formData.role}"</span>
              </p>
            )}
          </div>

          {(formData.role === 'coach' || formData.role === 'super_admin') && (
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-foreground mb-2">
                Branch {formData.role === 'coach' && <span className="text-red-500">*</span>}
              </label>
              <select
                id="branch"
                required={formData.role === 'coach'}
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
              placeholder="+971 XX XXX XXXX"
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{rlsBlocked ? 'Retry Save' : 'Save Changes'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 bg-background border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}