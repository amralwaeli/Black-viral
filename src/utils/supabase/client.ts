import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

export type UserRole = 'trainee' | 'coach' | 'super_admin';

/**
 * Global Supabase client — single instance for the entire app.
 *
 * Key decisions:
 * - `lock` is bypassed to prevent Web Locks API deadlocks when the browser
 *   resumes a backgrounded tab and fires concurrent auth + DB requests.
 * - A 10-second fetch timeout aborts stalled requests instead of hanging forever.
 */
export const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: 'implicit',
    storageKey: `sb-${projectId}-auth-token`,
    lock: (_name, _acquireTimeout, fn) => fn(),
  },
  global: {
    fetch: (url, options = {}) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10_000);
      return fetch(url, { ...options, signal: controller.signal }).finally(() =>
        clearTimeout(timer),
      );
    },
  },
});

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user ?? null;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function hasRole(role: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  const profile = await getUserProfile(user.id);
  const roles = Array.isArray(role) ? role : [role];
  return roles.includes(profile?.role);
}

export const isSuperAdmin = () => hasRole('super_admin');
export const isCoachOrAdmin = () => hasRole(['coach', 'super_admin']);

/** @deprecated No-op kept for compatibility */
export function clearUserCache() {}