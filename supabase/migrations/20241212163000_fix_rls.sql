-- =============================================
-- FIX RLS POLICIES FOR ADMIN ACCESS
-- =============================================

-- 1. PROFILES
-- Allow admins to view, update, and delete any profile
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL USING (public.is_admin());

-- 2. MESSAGING SYSTEM
-- Allow admins to monitor conversations for moderation purposes
CREATE POLICY "conversations_admin_all" ON public.conversations FOR ALL USING (public.is_admin());

CREATE POLICY "participants_admin_all" ON public.conversation_participants FOR ALL USING (public.is_admin());

CREATE POLICY "messages_admin_all" ON public.messages FOR ALL USING (public.is_admin());

-- 3. REVIEWS
-- Allow admins to delete inappropriate reviews (already in initial_schema but verifying full access if needed)
-- "reviews_delete_own" already covers admin deletion.
-- Adding select_all for admin is redundant as select_all is true for everyone.

-- 4. BOOKINGS
-- "bookings_select_own" and "bookings_update_own" already include admin check.

-- 5. NOTIFICATIONS
-- Allow admins to send system notifications (insert)
CREATE POLICY "notifications_admin_insert" ON public.notifications FOR INSERT WITH CHECK (public.is_admin());
