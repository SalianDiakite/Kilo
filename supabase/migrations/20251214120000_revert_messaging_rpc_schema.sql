-- =============================================
-- REVERT FIX Messaging RPC Schema
-- =============================================
-- This migration reverts the get_conversations_for_user
-- function to return the correct data structure
-- expected by the database schema.
-- =============================================

-- Drop the existing function to redefine it
DROP FUNCTION IF EXISTS public.get_conversations_for_user(UUID);

-- Re-create the function with the correct JSON structure for participants
CREATE OR REPLACE FUNCTION public.get_conversations_for_user(p_user_id UUID)
RETURNS TABLE(
    id UUID,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    unread_count BIGINT,
    trip_id UUID,
    trip_departure_city TEXT,
    trip_arrival_city TEXT,
    trip_available_kg NUMERIC,
    trip_price_per_kg NUMERIC,
    last_message_content TEXT,
    last_message_created_at TIMESTAMPTZ,
    last_message_sender_id UUID,
    participants JSONB[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH last_messages AS (
    SELECT
      m.conversation_id,
      m.content,
      m.created_at,
      m.sender_id,
      ROW_NUMBER() OVER(PARTITION BY m.conversation_id ORDER BY m.created_at DESC) as rn
    FROM messages m
  ),
  conversation_participants_agg AS (
    SELECT
      cp.conversation_id,
      ARRAY_AGG(
        -- This object now matches the database schema
        JSONB_BUILD_OBJECT(
          'id', p.id,
          'name', p.name,
          'avatar', p.avatar,
          'verified', p.verified
        )
      ) FILTER (WHERE cp.user_id != p_user_id) AS participants
    FROM conversation_participants cp
    JOIN profiles p ON cp.user_id = p.id
    GROUP BY cp.conversation_id
  )
  SELECT
    c.id,
    c.created_at,
    c.updated_at,
    (
      SELECT COUNT(*)
      FROM messages m
      WHERE m.conversation_id = c.id
        AND NOT(p_user_id = ANY(m.read_by))
    ) AS unread_count,
    t.id AS trip_id,
    t.departure AS trip_departure_city,
    t.arrival AS trip_arrival_city,
    t.available_kg AS trip_available_kg,
    t.price_per_kg AS trip_price_per_kg,
    lm.content AS last_message_content,
    lm.created_at AS last_message_created_at,
    lm.sender_id AS last_message_sender_id,
    cp_agg.participants
  FROM conversations c
  JOIN conversation_participants cp ON c.id = cp.conversation_id
  LEFT JOIN trips t ON c.trip_id = t.id
  LEFT JOIN last_messages lm ON c.id = lm.conversation_id AND lm.rn = 1
  LEFT JOIN conversation_participants_agg cp_agg ON c.id = cp_agg.conversation_id
  WHERE
    cp.user_id = p_user_id
  ORDER BY
    c.updated_at DESC;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_conversations_for_user(UUID) TO authenticated;
