-- =============================================
-- Messaging RPC Functions
-- =============================================

-- =============================================
-- 1. GET OR CREATE CONVERSATION
--    Finds or creates a 1-on-1 conversation 
--    between the current user and another user 
--    related to a specific trip.
-- =============================================

CREATE OR REPLACE FUNCTION public.get_or_create_conversation(
  p_other_user_id UUID,
  p_trip_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_conversation_id UUID;
  v_current_user_id UUID := auth.uid();
BEGIN
  -- An user cannot create a conversation with himself
  IF v_current_user_id = p_other_user_id THEN
    RETURN NULL;
  END IF;

  -- Look for an existing conversation between these two users for this trip
  SELECT cp1.conversation_id INTO v_conversation_id
  FROM conversation_participants AS cp1
  JOIN conversation_participants AS cp2 ON cp1.conversation_id = cp2.conversation_id
  JOIN conversations AS c ON c.id = cp1.conversation_id
  WHERE
    cp1.user_id = v_current_user_id AND
    cp2.user_id = p_other_user_id AND
    c.trip_id = p_trip_id;

  -- If a conversation is found, return its ID
  IF v_conversation_id IS NOT NULL THEN
    RETURN v_conversation_id;
  END IF;

  -- If no conversation is found, create a new one
  -- 1. Create the conversation record linked to the trip
  INSERT INTO conversations (trip_id)
  VALUES (p_trip_id)
  RETURNING id INTO v_conversation_id;

  -- 2. Add both users as participants
  INSERT INTO conversation_participants (conversation_id, user_id)
  VALUES
    (v_conversation_id, v_current_user_id),
    (v_conversation_id, p_other_user_id);

  RETURN v_conversation_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_or_create_conversation(UUID, UUID) TO authenticated;


-- =============================================
-- 2. GET CONVERSATIONS FOR USER
--    Fetches all conversations for a user, 
--    along with participants, last message, 
--    unread count, and trip info.
-- =============================================

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
        JSONB_BUILD_OBJECT(
          'id', p.id,
          'name', p.name,
          'avatar', p.avatar
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
        AND m.read = false
        AND m.sender_id != p_user_id
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

-- Grant execute permission to the specific user who owns the data
GRANT EXECUTE ON FUNCTION public.get_conversations_for_user(UUID) TO authenticated;
