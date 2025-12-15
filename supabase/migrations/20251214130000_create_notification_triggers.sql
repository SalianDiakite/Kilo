-- =============================================
-- Notification Triggers
-- =============================================
-- This migration adds database triggers to automatically
-- create notifications for key events in the application.
-- =============================================

-- =============================================
-- 1. New Booking Notification
-- =============================================
CREATE OR REPLACE FUNCTION public.create_new_booking_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  trip_details RECORD;
  sender_profile RECORD;
  settings RECORD;
BEGIN
  -- Get the trip owner's ID and trip details
  SELECT t.user_id, t.departure, t.arrival INTO trip_details
  FROM public.trips t
  WHERE t.id = NEW.trip_id;
  
  -- Get the sender's name
  SELECT name INTO sender_profile
  FROM public.profiles
  WHERE id = NEW.sender_id;

  -- Get the trip owner's notification settings
  SELECT notifications_new_bookings, notifications_email, notifications_push 
  INTO settings
  FROM public.user_settings
  WHERE id = trip_details.user_id;

  -- Check if the user wants this type of notification
  IF settings.notifications_new_bookings THEN
    INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
    VALUES (
      trip_details.user_id,
      'booking',
      'Nouvelle demande de réservation !',
      sender_profile.name || ' souhaite réserver ' || NEW.kg_requested || ' kg pour votre trajet ' || trip_details.departure || ' → ' || trip_details.arrival || '.',
      '/dashboard/bookings',
      jsonb_build_object(
        'booking_id', NEW.id,
        'trip_id', NEW.trip_id,
        'sender_id', NEW.sender_id
      )
    );
  END IF;

  -- Here you would also trigger push/email notifications if enabled
  -- For now, we just create the in-app notification

  RETURN NEW;
END;
$$;

-- Drop trigger if it exists to ensure a clean setup
DROP TRIGGER IF EXISTS on_new_booking ON public.bookings;

-- Create the trigger
CREATE TRIGGER on_new_booking
AFTER INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.create_new_booking_notification();


-- =============================================
-- 2. New Message Notification
-- =============================================
CREATE OR REPLACE FUNCTION public.create_new_message_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recipient_id UUID;
  sender_name TEXT;
  settings RECORD;
BEGIN
  -- Get the sender's name
  SELECT name INTO sender_name
  FROM public.profiles
  WHERE id = NEW.sender_id;

  -- Find the other participant in the conversation
  SELECT user_id INTO recipient_id
  FROM public.conversation_participants
  WHERE conversation_id = NEW.conversation_id
    AND user_id != NEW.sender_id
  LIMIT 1;

  -- If a recipient is found
  IF recipient_id IS NOT NULL THEN
    -- Get the recipient's notification settings
    SELECT notifications_messages, notifications_email, notifications_push 
    INTO settings
    FROM public.user_settings
    WHERE id = recipient_id;

    -- Check if the user wants this type of notification
    IF settings.notifications_messages THEN
      INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
      VALUES (
        recipient_id,
        'message',
        'Nouveau message de ' || sender_name,
        NEW.content,
        '/messages?conversation=' || NEW.conversation_id,
        jsonb_build_object(
          'message_id', NEW.id,
          'conversation_id', NEW.conversation_id,
          'sender_id', NEW.sender_id
        )
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_new_message ON public.messages;

-- Create the trigger
CREATE TRIGGER on_new_message
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.create_new_message_notification();
