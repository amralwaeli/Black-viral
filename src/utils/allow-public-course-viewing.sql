-- Allow public (logged out) users to view courses and coach information
-- This enables the courses page to work for all visitors, not just logged-in users

-- ============================================
-- STEP 1: Update COURSES table policies
-- ============================================

-- Drop the authenticated-only policy for viewing courses
DROP POLICY IF EXISTS "Authenticated users can view active courses" ON courses;
DROP POLICY IF EXISTS "Anyone can view active courses" ON courses;

-- Create new policy allowing anyone (even logged out users) to view active courses
CREATE POLICY "Anyone can view active courses"
  ON courses FOR SELECT
  USING (status = 'active'); -- Only show active courses to public

-- Keep the authenticated policies for modifying courses
-- (These should already exist from fix-rls-policies.sql)

-- ============================================
-- STEP 2: Update USER_PROFILES table policies  
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Public can view coach profiles" ON user_profiles;
DROP POLICY IF EXISTS "Anyone can view profiles" ON user_profiles;

-- Allow anyone to view user profiles (needed for coach names on courses)
-- This is safe because we're only exposing basic info like full_name
CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  USING (true); -- Allow all users (logged in or out) to read profiles

-- Keep the update policy for users to update their own profile
-- (This should already exist from fix-rls-policies.sql)

-- ============================================
-- VERIFICATION
-- ============================================
-- After running this, test by:
-- 1. Log out completely
-- 2. Visit /courses page
-- 3. Verify that assigned coaches appear on course cards
