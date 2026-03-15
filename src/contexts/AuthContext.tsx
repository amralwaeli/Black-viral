import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase/client';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshAuth: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadingRef = useRef(true);
  const initDoneRef = useRef(false);
  const refreshingRef = useRef(false);
  const profileRef = useRef<any | null>(null);

  useEffect(() => { loadingRef.current = loading; }, [loading]);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error) console.error('[AuthContext] fetchProfile:', error);
    return data ?? null;
  }, []);

  /**
   * Only calls setProfile when the data has meaningfully changed.
   * Comparing by id + updated_at avoids creating new object references for
   * identical data, which would otherwise trigger child dashboard re-fetches.
   */
  const applyProfile = useCallback((next: any | null) => {
    const prev = profileRef.current;
    const unchanged =
      next !== null &&
      prev !== null &&
      next.id === prev.id &&
      next.updated_at === prev.updated_at;
    if (unchanged) return;
    profileRef.current = next;
    setProfile(next);
  }, []);

  // ── Public API ──────────────────────────────────────────────────────────────

  const refreshAuth = useCallback(async () => {
    if (refreshingRef.current) return;
    refreshingRef.current = true;
    try {
      const { data: { session: s }, error } = await supabase.auth.getSession();
      if (error) { console.error('[AuthContext] refreshAuth:', error); return; }
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        applyProfile(await fetchProfile(s.user.id));
      } else {
        applyProfile(null);
      }
    } catch (err) {
      console.error('[AuthContext] refreshAuth:', err);
    } finally {
      refreshingRef.current = false;
    }
  }, [fetchProfile, applyProfile]);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('[AuthContext] signOut:', err);
    } finally {
      profileRef.current = null;
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  }, []);

  // ── Initialisation + auth listener ──────────────────────────────────────────

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { data: { session: s }, error } = await supabase.auth.getSession();
        if (!mounted) return;
        if (error) { console.error('[AuthContext] init:', error); return; }
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user) applyProfile(await fetchProfile(s.user.id));
      } catch (err) {
        console.error('[AuthContext] init:', err);
      } finally {
        if (mounted) { setLoading(false); initDoneRef.current = true; }
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, s) => {
        if (!mounted) return;

        /**
         * TOKEN_REFRESHED — token rotated silently; only update session object.
         * INITIAL_SESSION  — duplicate of what init() already handles; skip after init.
         * SIGNED_IN        — fires on EVERY tab return (not just real sign-ins).
         *                    We intentionally skip re-fetching the profile here to avoid
         *                    creating a new object reference that would trigger child
         *                    dashboard useEffect([profile.id]) re-renders and re-fetches.
         *                    Profile is only loaded when we don't have one yet.
         * SIGNED_OUT /
         * USER_UPDATED     — always process fully.
         */

        if (event === 'TOKEN_REFRESHED') {
          setSession(s);
          return;
        }

        if (event === 'INITIAL_SESSION') {
          if (loadingRef.current) {
            setSession(s);
            setUser(s?.user ?? null);
            if (s?.user) applyProfile(await fetchProfile(s.user.id));
            if (mounted) setLoading(false);
          }
          return;
        }

        if (event === 'SIGNED_IN') {
          setSession(s);
          setUser(s?.user ?? null);
          if (s?.user && !profileRef.current) {
            let p = await fetchProfile(s.user.id);
            if (!p) {
              // Auto-create profile for Google/social sign-ins
              const { data: newProfile } = await supabase
                .from('user_profiles')
                .insert({
                  user_id: s.user.id,
                  full_name: s.user.user_metadata?.full_name || s.user.email?.split('@')[0] || 'User',
                  email: s.user.email,
                  role: 'trainee',
                })
                .select()
                .single();
              p = newProfile;
            }
            applyProfile(p);
          }
          if (loadingRef.current && mounted) setLoading(false);
          return;
        }

        // SIGNED_OUT | USER_UPDATED
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user) {
          applyProfile(await fetchProfile(s.user.id));
        } else {
          profileRef.current = null;
          setProfile(null);
        }
        if (loadingRef.current && mounted) setLoading(false);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile, applyProfile]);

  // ────────────────────────────────────────────────────────────────────────────

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}