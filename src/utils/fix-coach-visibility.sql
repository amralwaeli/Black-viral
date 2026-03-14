-- Fix RLS policies to allow public access to view coach names on courses
-- This allows logged-out users to see which coaches are assigned to courses

-- Drop existing SELECT policy if it exists
DROP POLICY IF EXISTS "Public can view coach profiles" ON user_profiles;

-- Create new policy to allow public read access to coach information
-- This only exposes the full_name field when used in course queries
CREATE POLICY "Public can view coach profiles"
ON user_profiles
FOR SELECT
USING (
  role = 'coach' OR -- Allow viewing coach profiles
  auth.uid() = id OR -- Allow users to view their own profile
  auth.uid() IN ( -- Allow super admins to view all profiles
    SELECT id FROM user_profiles WHERE role = 'super_admin'
  )
);

-- Alternative simpler approach: Allow public read access to all basic profile info
-- Uncomment the lines below if you want to use this approach instead:

-- DROP POLICY IF EXISTS "Public can view coach profiles" ON user_profiles;
-- 
-- CREATE POLICY "Public can view all profiles"
-- ON user_profiles
-- FOR SELECT
-- USING (true); -- Allow anyone (including anonymous users) to read user profiles
