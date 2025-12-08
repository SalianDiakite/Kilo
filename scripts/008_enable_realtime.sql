-- Enable realtime for messages table
-- This allows clients to subscribe to real-time updates

-- Enable the realtime publication for the messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Enable realtime for conversations table (for updated_at changes)
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;

-- Enable replica identity for full row data on updates/deletes
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.conversations REPLICA IDENTITY FULL;
