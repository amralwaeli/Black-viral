-- Create course groups table
CREATE TABLE IF NOT EXISTS course_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id)
);

-- Create group messages table
CREATE TABLE IF NOT EXISTS group_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES course_groups(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group message reads tracking
CREATE TABLE IF NOT EXISTS group_message_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES group_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_group_messages_group_id ON group_messages(group_id);
CREATE INDEX IF NOT EXISTS idx_group_messages_sender_id ON group_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_group_messages_created_at ON group_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_group_message_reads_message_id ON group_message_reads(message_id);
CREATE INDEX IF NOT EXISTS idx_group_message_reads_user_id ON group_message_reads(user_id);

-- Enable RLS
ALTER TABLE course_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_message_reads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view groups for their enrolled courses" ON course_groups;
DROP POLICY IF EXISTS "Users can view messages in their groups" ON group_messages;
DROP POLICY IF EXISTS "Users can send messages in their groups" ON group_messages;
DROP POLICY IF EXISTS "Users can view their own read status" ON group_message_reads;
DROP POLICY IF EXISTS "Users can mark messages as read" ON group_message_reads;

-- RLS Policies for course_groups
CREATE POLICY "Users can view groups for their enrolled courses"
  ON course_groups FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = course_groups.course_id
        AND enrollments.trainee_id = auth.uid()
        AND enrollments.status = 'approved'
    )
    OR EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_groups.course_id
        AND courses.instructor_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid()
        AND user_profiles.role = 'super_admin'
    )
  );

-- RLS Policies for group_messages
CREATE POLICY "Users can view messages in their groups"
  ON group_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM course_groups
      JOIN enrollments ON enrollments.course_id = course_groups.course_id
      WHERE course_groups.id = group_messages.group_id
        AND enrollments.trainee_id = auth.uid()
        AND enrollments.status = 'approved'
    )
    OR EXISTS (
      SELECT 1 FROM course_groups
      JOIN courses ON courses.id = course_groups.course_id
      WHERE course_groups.id = group_messages.group_id
        AND courses.instructor_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid()
        AND user_profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Users can send messages in their groups"
  ON group_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM course_groups
      JOIN enrollments ON enrollments.course_id = course_groups.course_id
      WHERE course_groups.id = group_messages.group_id
        AND enrollments.trainee_id = auth.uid()
        AND enrollments.status = 'approved'
    )
    OR EXISTS (
      SELECT 1 FROM course_groups
      JOIN courses ON courses.id = course_groups.course_id
      WHERE course_groups.id = group_messages.group_id
        AND courses.instructor_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid()
        AND user_profiles.role = 'super_admin'
    )
  );

-- RLS Policies for group_message_reads
CREATE POLICY "Users can view their own read status"
  ON group_message_reads FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can mark messages as read"
  ON group_message_reads FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Function to auto-create groups for courses
CREATE OR REPLACE FUNCTION create_group_for_course()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO course_groups (course_id, name)
  VALUES (NEW.id, NEW.title)
  ON CONFLICT (course_id) DO UPDATE SET name = EXCLUDED.name;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create groups when courses are created/updated
DROP TRIGGER IF EXISTS trigger_create_group_for_course ON courses;
CREATE TRIGGER trigger_create_group_for_course
  AFTER INSERT OR UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION create_group_for_course();

-- Create groups for existing courses
INSERT INTO course_groups (course_id, name)
SELECT id, title FROM courses
ON CONFLICT (course_id) DO NOTHING;

COMMENT ON TABLE course_groups IS 'Groups for course-based messaging';
COMMENT ON TABLE group_messages IS 'Messages sent in course groups';
COMMENT ON TABLE group_message_reads IS 'Tracks which users have read which messages';