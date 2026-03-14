-- ============================================
-- FIX DATABASE SCHEMA - Black Viral AC
-- Run this in Supabase SQL Editor to fix column mismatches
-- ============================================

-- STEP 1: Fix EVENTS table - rename event_date to start_date
-- Check if event_date column exists and rename it
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'events' 
    AND column_name = 'event_date'
  ) THEN
    -- Rename event_date to start_date
    ALTER TABLE events RENAME COLUMN event_date TO start_date;
    RAISE NOTICE '✓ Renamed events.event_date to events.start_date';
  ELSE
    RAISE NOTICE '✓ events.start_date already exists';
  END IF;
END $$;

-- Update the index name
DROP INDEX IF EXISTS idx_events_event_date;
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

-- STEP 2: Fix MESSAGES table - replace is_read with read_at
-- Check if is_read column exists and replace it
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'messages' 
    AND column_name = 'is_read'
  ) THEN
    -- Add read_at column if it doesn't exist
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'messages' 
      AND column_name = 'read_at'
    ) THEN
      ALTER TABLE messages ADD COLUMN read_at TIMESTAMPTZ;
      RAISE NOTICE '✓ Added messages.read_at column';
    END IF;
    
    -- Migrate data: set read_at to NOW() where is_read = true
    UPDATE messages 
    SET read_at = created_at 
    WHERE is_read = true AND read_at IS NULL;
    
    -- Drop the old is_read column
    ALTER TABLE messages DROP COLUMN is_read;
    RAISE NOTICE '✓ Migrated is_read to read_at and dropped old column';
  ELSE
    -- Make sure read_at exists
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'messages' 
      AND column_name = 'read_at'
    ) THEN
      ALTER TABLE messages ADD COLUMN read_at TIMESTAMPTZ;
      RAISE NOTICE '✓ Added messages.read_at column';
    ELSE
      RAISE NOTICE '✓ messages.read_at already exists';
    END IF;
  END IF;
END $$;

-- STEP 3: Fix NOTIFICATIONS table - replace is_read with read_at
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'notifications' 
    AND column_name = 'is_read'
  ) THEN
    -- Add read_at column if it doesn't exist
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'notifications' 
      AND column_name = 'read_at'
    ) THEN
      ALTER TABLE notifications ADD COLUMN read_at TIMESTAMPTZ;
      RAISE NOTICE '✓ Added notifications.read_at column';
    END IF;
    
    -- Migrate data: set read_at to NOW() where is_read = true
    UPDATE notifications 
    SET read_at = created_at 
    WHERE is_read = true AND read_at IS NULL;
    
    -- Drop the old is_read column
    ALTER TABLE notifications DROP COLUMN is_read;
    RAISE NOTICE '✓ Migrated notifications is_read to read_at and dropped old column';
  ELSE
    -- Make sure read_at exists
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'notifications' 
      AND column_name = 'read_at'
    ) THEN
      ALTER TABLE notifications ADD COLUMN read_at TIMESTAMPTZ;
      RAISE NOTICE '✓ Added notifications.read_at column';
    ELSE
      RAISE NOTICE '✓ notifications.read_at already exists';
    END IF;
  END IF;
END $$;

-- STEP 4: Ensure events table has all required columns
DO $$
BEGIN
  -- Add created_by column if missing (old schema had created_by, new has posted_by)
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'events' 
    AND column_name = 'posted_by'
  ) AND EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'events' 
    AND column_name = 'created_by'
  ) THEN
    ALTER TABLE events RENAME COLUMN created_by TO posted_by;
    RAISE NOTICE '✓ Renamed events.created_by to events.posted_by';
  END IF;
  
  -- Ensure image_url column exists
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'events' 
    AND column_name = 'image_url'
  ) THEN
    ALTER TABLE events ADD COLUMN image_url TEXT;
    RAISE NOTICE '✓ Added events.image_url column';
  END IF;
  
  -- Ensure category column exists
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'events' 
    AND column_name = 'category'
  ) THEN
    ALTER TABLE events ADD COLUMN category VARCHAR(100);
    RAISE NOTICE '✓ Added events.category column';
  END IF;
END $$;

-- STEP 5: Verify final schema
DO $$
DECLARE
  events_ok BOOLEAN;
  messages_ok BOOLEAN;
  notifications_ok BOOLEAN;
BEGIN
  RAISE NOTICE '============================================';
  RAISE NOTICE 'SCHEMA VERIFICATION';
  RAISE NOTICE '============================================';
  
  -- Check events table
  SELECT 
    EXISTS(SELECT FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'start_date')
    AND EXISTS(SELECT FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'posted_by')
  INTO events_ok;
  
  IF events_ok THEN
    RAISE NOTICE '✓ Events table schema is correct';
  ELSE
    RAISE NOTICE '✗ Events table has issues - check manually';
  END IF;
  
  -- Check messages table
  SELECT 
    EXISTS(SELECT FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'read_at')
    AND NOT EXISTS(SELECT FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'is_read')
  INTO messages_ok;
  
  IF messages_ok THEN
    RAISE NOTICE '✓ Messages table schema is correct';
  ELSE
    RAISE NOTICE '✗ Messages table has issues - check manually';
  END IF;
  
  -- Check notifications table
  SELECT 
    EXISTS(SELECT FROM information_schema.columns WHERE table_name = 'notifications' AND column_name = 'read_at')
    AND NOT EXISTS(SELECT FROM information_schema.columns WHERE table_name = 'notifications' AND column_name = 'is_read')
  INTO notifications_ok;
  
  IF notifications_ok THEN
    RAISE NOTICE '✓ Notifications table schema is correct';
  ELSE
    RAISE NOTICE '✗ Notifications table has issues - check manually';
  END IF;
  
  RAISE NOTICE '============================================';
  IF events_ok AND messages_ok AND notifications_ok THEN
    RAISE NOTICE '✓✓✓ ALL SCHEMA FIXES APPLIED SUCCESSFULLY! ✓✓✓';
  ELSE
    RAISE NOTICE 'Some issues remain - check the messages above';
  END IF;
  RAISE NOTICE '============================================';
END $$;
