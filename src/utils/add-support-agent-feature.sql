-- Add support agent field to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS is_support_agent BOOLEAN DEFAULT FALSE;

-- Add comment
COMMENT ON COLUMN user_profiles.is_support_agent IS 'Indicates if this user is a support agent (can be assigned by super admin)';

-- Update RLS policies to allow support agents to be visible to all users
-- (existing policies will handle other permissions)
