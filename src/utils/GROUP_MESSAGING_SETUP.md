# Group Messaging Setup Instructions

## Step 1: Run the Group Messaging SQL Script

In your Supabase SQL Editor, run the following script:

```sql
/utils/create-group-messaging.sql
```

This will:
- Create `course_groups` table (one group per course)
- Create `group_messages` table (messages in each group)
- Create `group_message_reads` table (tracks who has read each message)
- Set up RLS policies for secure access
- Auto-create groups for all existing courses
- Set up a trigger to auto-create groups for new courses

## Step 2: (Optional) Enable Support Agent Feature

If you want to enable the support agent feature for the old 1-on-1 messaging system, run:

```sql
/utils/add-support-agent-feature.sql
```

Note: The new group messaging system is course-based and doesn't require support agents.

## How Group Messaging Works

### For Trainees:
- See all courses they're enrolled in (with approved status)
- Can send and receive messages in their course groups
- See course name, category, and unread message count
- Messages show sender's name

### For Coaches:
- See all courses they teach
- Can communicate with all trainees in their courses
- Messages are visible to all course participants

### For Super Admins:
- See all course groups
- Can monitor and participate in any conversation

## Features

1. **Course-Based Groups**: Each course has its own group chat
2. **Real-time Updates**: Messages appear instantly using Supabase Realtime
3. **Unread Tracking**: Per-message read status for each user
4. **Unread Badges**: Shows unread count on chat widget and per group
5. **Auto-sorted**: Groups with unread messages appear at the top

## Testing the System

1. **Create a test course** (or use existing ones from seed data)
2. **Enroll a trainee** in the course (status must be 'approved')
3. **Sign in as the trainee** - you should see the course group
4. **Send a message** - it will appear for everyone in the group
5. **Sign in as the coach** - you should see the trainee's message
6. **Reply as the coach** - the trainee will see it in real-time

## Troubleshooting

### "Failed to load course groups"
- Ensure you've run the SQL script in Supabase
- Check that courses exist in the database
- Verify enrollments have 'approved' status

### "No course groups yet"
- Trainees: Enroll in a course first
- Coaches: Make sure you're assigned as instructor to at least one course
- Check enrollment status is 'approved'

### Messages not appearing
- Check browser console for errors
- Verify RLS policies are set up correctly
- Ensure Supabase Realtime is enabled for the project

## Character Limits

- **Full Name**: Maximum 70 characters (enforced in signup form)
- **Messages**: No enforced limit (consider adding one if needed)

## Authentication Fix

The sign-in/sign-out flow has been updated to use React Router navigation instead of full page reloads:
- Sign in: Navigates to `/dashboard` using `navigate('/dashboard', { replace: true })`
- Logout: Navigates to `/` using `navigate('/', { replace: true })`
- No more page refresh issues! ✅
