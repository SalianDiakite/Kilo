-- Migration to improve message read status tracking

-- Step 1: Add the new array-based column to track multiple readers
ALTER TABLE public.messages
ADD COLUMN read_by UUID[] DEFAULT ARRAY[]::UUID[];

-- Step 2: (Optional but good practice) Index the new column for performance
-- Using a GIN index is efficient for searching inside arrays.
CREATE INDEX IF NOT EXISTS idx_messages_read_by ON public.messages USING GIN (read_by);

-- Step 3: Drop the old, ambiguous boolean column
ALTER TABLE public.messages
DROP COLUMN read;
