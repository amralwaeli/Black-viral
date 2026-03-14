-- ============================================================
-- SUPER ADMIN ROLE UPDATE FIX
-- Run this in Supabase SQL Editor to allow super admins to
-- update any user's role/profile without RLS blocking them.
-- ============================================================

-- Step 1: Create a SECURITY DEFINER function to check super admin role.
-- This function runs as the database owner, bypassing RLS when called,
-- which prevents infinite recursion.
CREATE OR REPLACE FUNCTION public.current_user_is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_profiles
    WHERE user_id = auth.uid()
      AND role = 'super_admin'
  );
$$;

-- Step 2: Drop the old restrictive UPDATE policy
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Step 3: Create a new UPDATE policy that allows:
--   a) Users to update their own profile
--   b) Super admins to update ANY profile
CREATE POLICY "Users can update own profile or admin can update any"
  ON user_profiles FOR UPDATE
  USING (
    user_id = auth.uid()
    OR
    public.current_user_is_super_admin()
  );

-- Step 4: Also ensure super admins can INSERT (for adding coaches etc.)
DROP POLICY IF EXISTS "Super admins can insert profiles" ON user_profiles;
CREATE POLICY "Super admins can insert profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    OR
    public.current_user_is_super_admin()
  );

-- ============================================================
-- VERIFICATION
-- After running, test by:
-- 1. Logging in as super_admin
-- 2. Going to Super Admin Dashboard > Users tab
-- 3. Clicking Edit on a trainee and changing their role to 'coach'
-- 4. The change should persist after page refresh
-- ============================================================
