# Database Setup Instructions

**IMPORTANT**: Before running SQL, configure Supabase Auth settings:

## Step 0: Configure Supabase Auth Settings

1. Go to your Supabase Dashboard → Authentication → Settings
2. **Disable Email Confirmations** (for development):
   - Toggle OFF "Enable email confirmations"
   - This allows users to sign in immediately after signup without email verification
3. **Set Site URL**:
   - Set to your app URL (e.g., `http://localhost:5173` for local dev)
4. **Add Redirect URLs**:
   - Add your dashboard URL (e.g., `http://localhost:5173/dashboard`)

## Step 1: Run SQL Setup

Run these SQL commands in your Supabase SQL Editor to set up the role-based system:

```sql
-- 1. Create user_profiles table with role support
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'trainee' CHECK (role IN ('trainee', 'coach', 'super_admin')),
  branch TEXT, -- For coaches: 'Al Twar', 'Al Qusais', 'Oud Metha'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT,
  price DECIMAL(10,2),
  instructor_id UUID REFERENCES user_profiles(id),
  branch TEXT,
  max_capacity INTEGER DEFAULT 20,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainee_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'dropped')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES user_profiles(id),
  UNIQUE(trainee_id, course_id)
);

-- 4. Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE NOT NULL,
  session_date DATE NOT NULL,
  session_number INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  notes TEXT,
  marked_by UUID REFERENCES user_profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainee_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  issued_by UUID REFERENCES user_profiles(id) NOT NULL,
  certification_body TEXT, -- e.g., 'IWSF', 'ILS', 'CMAS'
  expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create session_notes table
CREATE TABLE IF NOT EXISTS session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  session_number INTEGER NOT NULL,
  session_date DATE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES user_profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create branches table
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  manager_id UUID REFERENCES user_profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Insert default branches
INSERT INTO branches (name, address, phone, email) VALUES
  ('Al Twar', 'Al Twar, Dubai, UAE', '+971 4 XXX XXXX', 'altwar@blackviral.club'),
  ('Al Qusais', 'Al Qusais, Dubai, UAE', '+971 4 XXX XXXX', 'alqusais@blackviral.club'),
  ('Oud Metha', 'Oud Metha, Dubai, UAE', '+971 4 XXX XXXX', 'oudmetha@blackviral.club')
ON CONFLICT (name) DO NOTHING;

-- 9. Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;

-- USER_PROFILES POLICIES
-- Allow users to view their own profile (no recursion)
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (user_id = auth.uid());

-- Allow users to update their own profile (no recursion)
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (user_id = auth.uid());

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

-- 10. Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'trainee' -- Default role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_notes_updated_at BEFORE UPDATE ON session_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Manual Steps Required:

1. **Run the SQL above in Supabase SQL Editor**

2. **Create a Super Admin manually** (replace with your email):
```sql
UPDATE user_profiles 
SET role = 'super_admin' 
WHERE email = 'your-admin-email@example.com';
```

3. **Verify RLS is working** - test with different user accounts

4. **Note**: The system will automatically create a 'trainee' profile for any new user who signs up via the /signup page.