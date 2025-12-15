-- =============================================
-- RLS Hardening & Logic Fixes
-- =============================================

-- =============================================
-- 1. Secure the 'profiles' table
-- =============================================

-- Drop all previous policies on profiles to ensure a clean slate.
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;

-- Re-create the correct policies.
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL USING (public.is_admin());

-- Drop the function first to allow changing its return signature.
DROP FUNCTION IF EXISTS public.get_public_profile_by_id(UUID);

-- Create or replace the function to get public profile data safely.
CREATE OR REPLACE FUNCTION public.get_public_profile_by_id(user_id_in UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  avatar TEXT,
  bio TEXT,
  rating DECIMAL,
  review_count INTEGER,
  verified BOOLEAN,
  created_at TIMESTAMPTZ,
  languages TEXT[],
  response_rate INTEGER,
  response_time TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
    SELECT p.id, p.name, p.avatar, p.bio, p.rating, p.review_count, p.verified, p.created_at, p.languages, p.response_rate, p.response_time
    FROM profiles p
    WHERE p.id = user_id_in;
END;
$$;


-- =============================================
-- 2. Refine 'bookings' RLS policies
-- =============================================

-- Drop the old policies.
DROP POLICY IF EXISTS "bookings_update_own" ON public.bookings;
DROP POLICY IF EXISTS "bookings_sender_cancel" ON public.bookings;
DROP POLICY IF EXISTS "bookings_sender_confirm_delivery" ON public.bookings;
DROP POLICY IF EXISTS "bookings_traveler_manage_pending" ON public.bookings;
DROP POLICY IF EXISTS "bookings_traveler_set_in_transit" ON public.bookings;

-- Re-create the granular policies.
CREATE POLICY "bookings_sender_cancel" ON public.bookings
  FOR UPDATE USING (auth.uid() = sender_id)
  WITH CHECK ( status = 'cancelled' );

CREATE POLICY "bookings_sender_confirm_delivery" ON public.bookings
  FOR UPDATE USING (auth.uid() = sender_id)
  WITH CHECK ( status = 'delivered' );

CREATE POLICY "bookings_traveler_manage_pending" ON public.bookings
  FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM public.trips WHERE id = bookings.trip_id))
  WITH CHECK ( status IN ('confirmed', 'cancelled') );

CREATE POLICY "bookings_traveler_set_in_transit" ON public.bookings
  FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM public.trips WHERE id = bookings.trip_id))
  WITH CHECK ( status = 'in_transit' );


-- =============================================
-- 3. Strengthen 'reviews' RLS policy
-- =============================================

-- Drop the old insert policy.
DROP POLICY IF EXISTS "reviews_insert_own" ON public.reviews;

-- Re-create the stronger policy.
CREATE POLICY "reviews_insert_own" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = reviewer_id 
    AND
    EXISTS (
      SELECT 1
      FROM public.bookings b
      JOIN public.trips t ON b.trip_id = t.id
      WHERE
        b.status = 'delivered' AND
        (
          (b.sender_id = reviewer_id AND t.user_id = reviewed_id)
          OR
          (t.user_id = reviewer_id AND b.sender_id = reviewed_id)
        )
    )
  );
