# Debugging Group Messaging "No Groups Yet"

If the chat widget shows "No course groups yet" even though you have enrollments, follow these debugging steps:

## Step 1: Verify SQL Script Was Run

Check if the tables exist in Supabase:
1. Go to Supabase Dashboard → Table Editor
2. Look for these tables:
   - `course_groups`
   - `group_messages`
   - `group_message_reads`

If they don't exist, run `/utils/create-group-messaging.sql` in SQL Editor.

## Step 2: Check if Course Groups Were Created

Run this query in Supabase SQL Editor:

```sql
SELECT * FROM course_groups;
```

If empty, manually create groups:

```sql
INSERT INTO course_groups (course_id, name)
SELECT id, title FROM courses
ON CONFLICT (course_id) DO NOTHING;
```

## Step 3: Verify Enrollment Status

Check your enrollments have 'approved' status:

```sql
SELECT 
  e.id,
  e.status,
  t.full_name as trainee_name,
  c.title as course_name
FROM enrollments e
JOIN user_profiles t ON t.id = e.trainee_id
JOIN courses c ON c.id = e.course_id
WHERE e.status != 'approved';
```

If status is 'pending', approve it:

```sql
UPDATE enrollments 
SET status = 'approved' 
WHERE trainee_id = 'YOUR_TRAINEE_ID';
```

## Step 4: Check Browser Console

Open browser console (F12) and look for errors when opening chat widget.

Common errors:
- **"column does not exist"** → SQL script not run
- **"permission denied"** → RLS policies not set up
- **No errors but empty list** → No approved enrollments

## Step 5: Manual Test Query

Test if the query structure works in Supabase SQL Editor:

### For Trainees:
```sql
-- Replace 'TRAINEE_ID' with actual trainee's user_profiles.id
SELECT 
  cg.id,
  cg.name,
  c.title,
  c.category
FROM course_groups cg
JOIN courses c ON c.id = cg.course_id
WHERE cg.course_id IN (
  SELECT course_id 
  FROM enrollments 
  WHERE trainee_id = 'TRAINEE_ID' 
  AND status = 'approved'
);
```

### For Coaches:
```sql
-- Replace 'COACH_ID' with actual coach's user_profiles.id
SELECT 
  cg.id,
  cg.name,
  c.title,
  c.category
FROM course_groups cg
JOIN courses c ON c.id = cg.course_id
WHERE c.instructor_id = 'COACH_ID';
```

If these queries return results but the widget doesn't show them, there's an issue with the React component logic or RLS policies.

## Step 6: Check RLS Policies

Verify RLS policies allow users to see their groups:

```sql
-- Check if policy exists
SELECT * FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'course_groups';
```

If no policies exist, re-run `/utils/create-group-messaging.sql`.

## Quick Fix: Start Fresh

If nothing works, reset everything:

```sql
-- Drop all group messaging tables
DROP TABLE IF EXISTS group_message_reads CASCADE;
DROP TABLE IF EXISTS group_messages CASCADE;
DROP TABLE IF EXISTS course_groups CASCADE;
DROP FUNCTION IF EXISTS create_group_for_course CASCADE;
```

Then re-run `/utils/create-group-messaging.sql` from scratch.

## Still Not Working?

Check the console log output from `loadGroups()` function:
- Open browser DevTools → Console
- Open chat widget
- Look for logs showing what data is returned
- Share the logs if requesting support
