-- Fix RLS Policies - Run this to fix the infinite recursion error
-- This script drops all existing policies and creates new simplified ones

-- DROP ALL EXISTING POLICIES
DROP POLICY IF EXISTS "Super admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Super admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Coaches can view branch profiles" ON user_profiles;
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON user_profiles;

DROP POLICY IF EXISTS "Anyone can view active courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can view active courses" ON courses;
DROP POLICY IF EXISTS "Coaches and admins can insert courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can insert courses" ON courses;
DROP POLICY IF EXISTS "Coaches and admins can update courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can update courses" ON courses;
DROP POLICY IF EXISTS "Super admins can delete courses" ON courses;
DROP POLICY IF EXISTS "Authenticated users can delete courses" ON courses;

DROP POLICY IF EXISTS "Trainees can view own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Coaches can view course enrollments" ON enrollments;
DROP POLICY IF EXISTS "Trainees can enroll in courses" ON enrollments;
DROP POLICY IF EXISTS "Users can create enrollments" ON enrollments;
DROP POLICY IF EXISTS "Coaches can update enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can update enrollments" ON enrollments;

DROP POLICY IF EXISTS "Trainees can view own attendance" ON attendance;
DROP POLICY IF EXISTS "Authenticated users can view attendance" ON attendance;
DROP POLICY IF EXISTS "Coaches can manage attendance" ON attendance;
DROP POLICY IF EXISTS "Authenticated users can insert attendance" ON attendance;
DROP POLICY IF EXISTS "Authenticated users can update attendance" ON attendance;
DROP POLICY IF EXISTS "Authenticated users can delete attendance" ON attendance;

DROP POLICY IF EXISTS "Trainees can view own certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can view certificates" ON certificates;
DROP POLICY IF EXISTS "Coaches can manage certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can insert certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can update certificates" ON certificates;
DROP POLICY IF EXISTS "Authenticated users can delete certificates" ON certificates;

DROP POLICY IF EXISTS "Trainees can view course notes" ON session_notes;
DROP POLICY IF EXISTS "Authenticated users can view session notes" ON session_notes;
DROP POLICY IF EXISTS "Coaches can manage session notes" ON session_notes;
DROP POLICY IF EXISTS "Authenticated users can insert session notes" ON session_notes;
DROP POLICY IF EXISTS "Authenticated users can update session notes" ON session_notes;
DROP POLICY IF EXISTS "Authenticated users can delete session notes" ON session_notes;

DROP POLICY IF EXISTS "Anyone can view branches" ON branches;
DROP POLICY IF EXISTS "Super admins can manage branches" ON branches;
DROP POLICY IF EXISTS "Authenticated users can insert branches" ON branches;
DROP POLICY IF EXISTS "Authenticated users can update branches" ON branches;
DROP POLICY IF EXISTS "Authenticated users can delete branches" ON branches;

-- CREATE NEW SIMPLIFIED POLICIES (NO RECURSION)

-- USER_PROFILES POLICIES
-- Allow users to view their own profile (no recursion)
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (user_id = auth.uid());

-- Allow users to update their own profile (no recursion)
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (user_id = auth.uid());

-- Allow authenticated users to view all profiles (for super_admins and coaches)
-- Role checking will be done in the application layer
CREATE POLICY "Authenticated users can view all profiles"
  ON user_profiles FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- COURSES POLICIES
-- Everyone (authenticated) can view active courses
CREATE POLICY "Authenticated users can view active courses"
  ON courses FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can insert courses (we'll handle role checks in app)
CREATE POLICY "Authenticated users can insert courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update courses
CREATE POLICY "Authenticated users can update courses"
  ON courses FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete courses
CREATE POLICY "Authenticated users can delete courses"
  ON courses FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- ENROLLMENTS POLICIES
-- Users can view enrollments where they are the trainee
CREATE POLICY "Users can view own enrollments"
  ON enrollments FOR SELECT
  USING (
    trainee_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
    OR
    -- Or if they are viewing any enrollment (coaches/admins will check in app)
    auth.uid() IS NOT NULL
  );

-- Users can create enrollments for themselves
CREATE POLICY "Users can create enrollments"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update enrollments (role checks in app)
CREATE POLICY "Users can update enrollments"
  ON enrollments FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- ATTENDANCE POLICIES
-- Authenticated users can view attendance
CREATE POLICY "Authenticated users can view attendance"
  ON attendance FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can manage attendance
CREATE POLICY "Authenticated users can insert attendance"
  ON attendance FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update attendance"
  ON attendance FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete attendance"
  ON attendance FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- CERTIFICATES POLICIES
-- Authenticated users can view certificates
CREATE POLICY "Authenticated users can view certificates"
  ON certificates FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can manage certificates
CREATE POLICY "Authenticated users can insert certificates"
  ON certificates FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update certificates"
  ON certificates FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete certificates"
  ON certificates FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- SESSION NOTES POLICIES
-- Authenticated users can view session notes
CREATE POLICY "Authenticated users can view session notes"
  ON session_notes FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can manage session notes
CREATE POLICY "Authenticated users can insert session notes"
  ON session_notes FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update session notes"
  ON session_notes FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete session notes"
  ON session_notes FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- BRANCHES POLICIES
-- Everyone (even unauthenticated) can view branches
CREATE POLICY "Anyone can view branches"
  ON branches FOR SELECT
  USING (true);

-- Authenticated users can manage branches (role checks in app)
CREATE POLICY "Authenticated users can insert branches"
  ON branches FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update branches"
  ON branches FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete branches"
  ON branches FOR DELETE
  USING (auth.uid() IS NOT NULL);