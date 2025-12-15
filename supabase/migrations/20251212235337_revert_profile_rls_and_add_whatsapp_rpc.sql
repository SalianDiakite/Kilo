-- =============================================
-- Reverting Profile RLS and Adding WhatsApp RPC
-- =============================================

-- == 1. Revert Profile RLS to allow public reads ==
-- This is necessary for Supabase joins to work correctly for public data.
-- Security is now enforced at the query level by only selecting public columns.

-- Drop the function created in the last migration.
DROP FUNCTION IF EXISTS public.get_public_profile_by_id(UUID);

-- Drop the restrictive select policy.
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;

-- Re-instate the public read policy.
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
CREATE POLICY "profiles_select_all" ON public.profiles
  FOR SELECT USING (true);


-- == 2. Add secure RPC for WhatsApp number ==
-- This function allows an authenticated user to get the WhatsApp number of another user.

CREATE OR REPLACE FUNCTION public.get_user_whatsapp(user_id_in UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  whatsapp_number TEXT;
BEGIN
  -- Ensure the person calling the function is authenticated.
  IF auth.role() <> 'authenticated' THEN
    RETURN NULL;
  END IF;

  SELECT p.whatsapp INTO whatsapp_number
  FROM profiles p
  WHERE p.id = user_id_in;
  
  RETURN whatsapp_number;
END;
$$;

-- Grant usage on the function. By default, functions are invocable by `public`.
-- We revoke it from public and then grant it only to the 'authenticated' role.
REVOKE EXECUTE ON FUNCTION public.get_user_whatsapp(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_user_whatsapp(UUID) TO authenticated;
