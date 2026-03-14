-- Create profiles for auth users that don't have a user_profiles entry
-- This fixes the issue when the signup trigger didn't run

INSERT INTO public.user_profiles (user_id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email) as full_name,
  'trainee' as role
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.user_id
WHERE up.id IS NULL;

-- Verify the profiles were created
SELECT 
  au.email,
  up.full_name,
  up.role,
  up.created_at
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.user_id
ORDER BY au.created_at DESC;
