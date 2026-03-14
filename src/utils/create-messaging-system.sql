-- Create messaging and notifications system for Black Viral AC
-- Run this in your Supabase SQL Editor

-- ============================================
-- STEP 1: DROP EXISTING TRIGGERS AND FUNCTIONS
-- ============================================
DROP TRIGGER IF EXISTS message_notification_trigger ON messages;
DROP TRIGGER IF EXISTS event_notification_trigger ON events;
DROP TRIGGER IF EXISTS course_notification_trigger ON courses;

DROP FUNCTION IF EXISTS create_message_notification();
DROP FUNCTION IF EXISTS create_event_notification();
DROP FUNCTION IF EXISTS create_course_notification();

-- ============================================
-- STEP 2: DROP AND RECREATE TABLES (clean slate)
-- ============================================
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS events CASCADE;

-- ============================================
-- TABLE 1: MESSAGES (Chat between coaches and trainees)
-- ============================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  
  -- Constraint to prevent self-messaging
  CONSTRAINT messages_sender_receiver_check CHECK (sender_id != receiver_id)
);

-- Create indexes for performance
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- ============================================
-- TABLE 2: EVENTS (Coach announcements, camps, etc.)
-- ============================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- 'camp', 'workshop', 'announcement', 'competition'
  location VARCHAR(255),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  posted_by UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  branch VARCHAR(100),
  category VARCHAR(100), -- 'aquatic', 'combat', 'team', etc.
  max_participants INTEGER,
  image_url TEXT,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_events_posted_by ON events(posted_by);
CREATE INDEX idx_events_branch ON events(branch);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_created_at ON events(created_at DESC);

-- ============================================
-- TABLE 3: NOTIFICATIONS (Track all notifications)
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'message', 'event', 'course', 'enrollment', 'system'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(255), -- URL to navigate to when clicked
  reference_id UUID, -- ID of the related message, event, or course
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read_at ON notifications(read_at);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- RLS POLICIES FOR MESSAGES
-- ============================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (
    sender_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    OR receiver_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update their received messages"
  ON messages FOR UPDATE
  USING (
    receiver_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- ============================================
-- RLS POLICIES FOR EVENTS
-- ============================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT
  USING (status = 'active' OR auth.uid() IS NOT NULL);

CREATE POLICY "Coaches and admins can create events"
  ON events FOR INSERT
  WITH CHECK (
    posted_by IN (
      SELECT id FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('coach', 'super_admin')
    )
  );

CREATE POLICY "Coaches can update their own events"
  ON events FOR UPDATE
  USING (
    posted_by IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "Coaches can delete their own events"
  ON events FOR DELETE
  USING (
    posted_by IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- ============================================
-- RLS POLICIES FOR NOTIFICATIONS
-- ============================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (
    user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (
    user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete their own notifications"
  ON notifications FOR DELETE
  USING (
    user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- FUNCTION: Create notification when message is sent
-- ============================================
CREATE OR REPLACE FUNCTION create_message_notification()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, message, reference_id)
  SELECT 
    NEW.receiver_id,
    'message',
    'New message from ' || COALESCE(sender.full_name, 'Unknown'),
    LEFT(NEW.message, 100),
    NEW.id
  FROM user_profiles sender
  WHERE sender.id = NEW.sender_id;
  
  RETURN NEW;
END;
$$;

-- ============================================
-- FUNCTION: Create notification when event is posted
-- ============================================
CREATE OR REPLACE FUNCTION create_event_notification()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  event_title_prefix TEXT;
BEGIN
  -- Create a readable title prefix based on event type
  event_title_prefix := CASE NEW.event_type
    WHEN 'camp' THEN 'New Training Camp'
    WHEN 'workshop' THEN 'New Workshop'
    WHEN 'competition' THEN 'New Competition'
    WHEN 'seminar' THEN 'New Seminar'
    ELSE 'New Announcement'
  END;

  -- Notify all trainees (optionally filter by branch if specified)
  INSERT INTO notifications (user_id, type, title, message, reference_id, link)
  SELECT 
    up.id,
    'event',
    event_title_prefix || ': ' || NEW.title,
    LEFT(NEW.description, 100),
    NEW.id,
    '/dashboard'
  FROM user_profiles up
  WHERE up.role = 'trainee'
    AND (NEW.branch IS NULL OR up.branch = NEW.branch OR NEW.branch = '');
  
  RETURN NEW;
END;
$$;

-- ============================================
-- FUNCTION: Create notification when course is added
-- ============================================
CREATE OR REPLACE FUNCTION create_course_notification()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Notify all trainees about new courses
  INSERT INTO notifications (user_id, type, title, message, reference_id, link)
  SELECT 
    up.id,
    'course',
    'New Course Available: ' || NEW.title,
    LEFT(NEW.description, 100),
    NEW.id,
    '/courses'
  FROM user_profiles up
  WHERE up.role = 'trainee';
  
  RETURN NEW;
END;
$$;

-- ============================================
-- CREATE TRIGGERS
-- ============================================

-- Trigger for message notifications
CREATE TRIGGER message_notification_trigger
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION create_message_notification();

-- Trigger for event notifications
CREATE TRIGGER event_notification_trigger
  AFTER INSERT ON events
  FOR EACH ROW
  EXECUTE FUNCTION create_event_notification();

-- Trigger for course notifications (only if courses table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'courses') THEN
    CREATE TRIGGER course_notification_trigger
      AFTER INSERT ON courses
      FOR EACH ROW
      EXECUTE FUNCTION create_course_notification();
  END IF;
END
$$;

-- ============================================
-- VERIFICATION & SUCCESS MESSAGES
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'BLACK VIRAL AC - MESSAGING SYSTEM SETUP';
  RAISE NOTICE '==============================================';
  
  -- Check tables
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'messages') THEN
    RAISE NOTICE '✓ Messages table created successfully';
  ELSE
    RAISE EXCEPTION '✗ Messages table creation failed';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'events') THEN
    RAISE NOTICE '✓ Events table created successfully';
  ELSE
    RAISE EXCEPTION '✗ Events table creation failed';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'notifications') THEN
    RAISE NOTICE '✓ Notifications table created successfully';
  ELSE
    RAISE EXCEPTION '✗ Notifications table creation failed';
  END IF;
  
  -- Check functions
  IF EXISTS (SELECT FROM pg_proc WHERE proname = 'create_message_notification') THEN
    RAISE NOTICE '✓ Message notification function created';
  END IF;
  
  IF EXISTS (SELECT FROM pg_proc WHERE proname = 'create_event_notification') THEN
    RAISE NOTICE '✓ Event notification function created';
  END IF;
  
  IF EXISTS (SELECT FROM pg_proc WHERE proname = 'create_course_notification') THEN
    RAISE NOTICE '✓ Course notification function created';
  END IF;
  
  RAISE NOTICE '==============================================';
  RAISE NOTICE '✓ ALL SETUP COMPLETED SUCCESSFULLY!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Refresh your app to see the messaging features';
  RAISE NOTICE '2. Test chat between coach and trainee';
  RAISE NOTICE '3. Create an event as a coach';
  RAISE NOTICE '4. Check notifications in the bell icon';
  RAISE NOTICE '==============================================';
END
$$;
