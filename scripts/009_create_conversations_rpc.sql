-- SQL Migration to create a function that fetches all conversation data for a user in a single query.
-- This function is designed to be called via Supabase RPC.

-- 1. Create a composite type to define the structure of the returned objects.
-- This makes it easier to work with the data on the client side.
create type public.conversation_details as (
  id uuid,
  created_at timestamptz,
  updated_at timestamptz,
  trip_id uuid,
  -- Trip Details
  trip_departure_city text,
  trip_arrival_city text,
  trip_available_kg int,
  trip_price_per_kg int,
  -- Last Message
  last_message_content text,
  last_message_created_at timestamptz,
  last_message_sender_id uuid,
  -- Unread Count
  unread_count bigint,
  -- Participant Details
  participants jsonb
);

-- 2. Drop the old function if it exists to ensure a clean slate.
drop function if exists public.get_conversations_for_user(p_user_id uuid);

-- 3. Create the main function.
create or replace function public.get_conversations_for_user(p_user_id uuid)
returns setof public.conversation_details
language plpgsql
security definer -- To allow access to tables that the calling user might not have direct access to.
set search_path = public
as $$
begin
  -- The main query that joins all necessary tables and calculates the required fields.
  return query
  with user_convs as (
    -- First, get all conversations the user is a part of.
    select id, updated_at from conversations
    where id in (select conversation_id from conversation_participants where user_id = p_user_id)
  ),
  -- Aggregate participant data for each conversation into a JSON array.
  participants_json as (
    select
      cp.conversation_id,
      jsonb_agg(
        jsonb_build_object(
          'user_id', p.id,
          'user', jsonb_build_object(
            'id', p.id,
            'full_name', p.name, -- Changed from full_name to name to match profiles table
            'avatar_url', p.avatar, -- Changed from avatar_url to avatar
            'is_verified', p.verified, -- Changed from is_verified to verified
            'rating', p.rating
          )
        )
      ) as participants
    from conversation_participants cp
    join profiles p on cp.user_id = p.id
    where cp.conversation_id in (select id from user_convs)
    group by cp.conversation_id
  ),
  -- Get the last message for each conversation using a window function for efficiency.
  last_messages as (
    select
      conversation_id,
      content,
      created_at,
      sender_id
    from (
      select
        conversation_id,
        content,
        created_at,
        sender_id,
        row_number() over(partition by conversation_id order by created_at desc) as rn
      from messages
      where conversation_id in (select id from user_convs)
    ) as sub
    where rn = 1
  ),
  -- Count unread messages for the specified user in each conversation.
  unread_counts as (
    select
      conversation_id,
      count(*) as unread_count
    from messages
    where
      conversation_id in (select id from user_convs)
      and sender_id != p_user_id
      and read = false
    group by conversation_id
  )
  -- Final SELECT to join all the CTEs and return the complete data structure.
  select
    c.id,
    c.created_at,
    c.updated_at,
    c.trip_id,
    t.departure as trip_departure_city, -- Changed from departure_city to departure
    t.arrival as trip_arrival_city, -- Changed from arrival_city to arrival
    t.available_kg as trip_available_kg,
    t.price_per_kg as trip_price_per_kg,
    lm.content as last_message_content,
    lm.created_at as last_message_created_at,
    lm.sender_id as last_message_sender_id,
    coalesce(uc.unread_count, 0) as unread_count,
    pj.participants
  from conversations c
  join user_convs uc_order on c.id = uc_order.id
  left join trips t on c.trip_id = t.id
  left join participants_json pj on c.id = pj.conversation_id
  left join last_messages lm on c.id = lm.conversation_id
  left join unread_counts uc on c.id = uc.conversation_id
  where c.id in (select id from user_convs)
  order by uc_order.updated_at desc;
end;
$$;
