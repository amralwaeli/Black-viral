-- Additional tables for notifications, messages, and events
-- NOTE: This file is DEPRECATED. Use /utils/create-messaging-system.sql instead
-- This file is kept for reference only and should NOT be run

-- 1. Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('course', 'event', 'message', 'enrollment', 'system')),
  reference_id UUID, -- Can reference courses, events, messages, etc.
  link VARCHAR(255), -- URL to navigate to when clicked
  read_at TIMESTAMPTZ, -- Changed from is_read BOOLEAN to read_at TIMESTAMPTZ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL, -- Changed from event_date to start_date
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  branch TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('competition', 'workshop', 'seminar', 'training', 'certification', 'other', 'camp', 'announcement')),
  category VARCHAR(100), -- Added category field
  max_participants INTEGER,
  image_url TEXT, -- Added image_url field
  posted_by UUID REFERENCES user_profiles(id) NOT NULL, -- Changed from created_by to posted_by
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create event_participants table
CREATE TABLE IF NOT EXISTS event_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'absent', 'cancelled')),
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- 4. Create messages table (for coach-trainee communication)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read_at TIMESTAMPTZ, -- Changed from is_read BOOLEAN to read_at TIMESTAMPTZ
  parent_message_id UUID REFERENCES messages(id) ON DELETE CASCADE, -- For threading
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint to prevent self-messaging
  CONSTRAINT messages_sender_receiver_check CHECK (sender_id != receiver_id)
);

-- Enable RLS on new tables
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- NOTIFICATIONS POLICIES
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (
    user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (
    user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- Authenticated users can insert notifications (for coaches/admins)
CREATE POLICY "Authenticated users can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can delete their own notifications
CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (
    user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- EVENTS POLICIES
-- Everyone (authenticated) can view active events
CREATE POLICY "Authenticated users can view events"
  ON events FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can create events (role checks in app)
CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update events
CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete events
CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- EVENT_PARTICIPANTS POLICIES
-- Users can view event participants
CREATE POLICY "Authenticated users can view event participants"
  ON event_participants FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Users can register for events
CREATE POLICY "Users can register for events"
  ON event_participants FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own event registration
CREATE POLICY "Users can update event registrations"
  ON event_participants FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Users can cancel their event registration
CREATE POLICY "Users can delete event registrations"
  ON event_participants FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- MESSAGES POLICIES
-- Users can view messages where they are sender or receiver
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  USING (
    sender_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    OR
    receiver_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- Users can send messages
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- Users can update messages they received (mark as read)
CREATE POLICY "Users can update received messages"
  ON messages FOR UPDATE
  USING (
    receiver_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- Users can delete their sent messages
CREATE POLICY "Users can delete own sent messages"
  ON messages FOR DELETE
  USING (
    sender_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

-- Add triggers for updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create notifications when new events are created
CREATE OR REPLACE FUNCTION notify_new_event()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify all trainees about new event
  INSERT INTO notifications (user_id, title, message, type, reference_id)
  SELECT 
    id,
    'New Event: ' || NEW.title,
    'A new event has been created: ' || NEW.title || '. Check it out!',
    'event',
    NEW.id
  FROM user_profiles
  WHERE role IN ('trainee', 'coach');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_event_created
  AFTER INSERT ON events
  FOR EACH ROW EXECUTE FUNCTION notify_new_event();

-- Function to create notifications when new courses are created
CREATE OR REPLACE FUNCTION notify_new_course()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify all trainees about new course
  INSERT INTO notifications (user_id, title, message, type, reference_id)
  SELECT 
    id,
    'New Course Available: ' || NEW.title,
    'A new course has been added: ' || NEW.title || '. Enroll now!',
    'course',
    NEW.id
  FROM user_profiles
  WHERE role = 'trainee';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_course_created
  AFTER INSERT ON courses
  FOR EACH ROW EXECUTE FUNCTION notify_new_course();

-- Function to create notifications when new messages are received
CREATE OR REPLACE FUNCTION notify_new_message()
RETURNS TRIGGER AS $$
DECLARE
  sender_name TEXT;
BEGIN
  -- Get sender name
  SELECT full_name INTO sender_name
  FROM user_profiles
  WHERE id = NEW.sender_id;
  
  -- Notify receiver about new message
  INSERT INTO notifications (user_id, title, message, type, reference_id)
  VALUES (
    NEW.receiver_id,
    'New Message from ' || sender_name,
    COALESCE(NEW.subject, 'You have a new message'),
    'message',
    NEW.id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_message_created
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION notify_new_message();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date); -- Changed from event_date to start_date
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);