-- Migration to revert read_by column and remove the 'read' column from messages table
-- as read status will be managed via conversation_participants.last_read_at

-- Step 1: Drop the read_by column if it exists (from previous faulty migration attempt)
ALTER TABLE public.messages
DROP COLUMN IF EXISTS read_by;

-- Step 2: Drop the ambiguous 'read' boolean column
ALTER TABLE public.messages
DROP COLUMN IF EXISTS read;
