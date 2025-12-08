-- Table user_settings
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  notifications_email BOOLEAN DEFAULT TRUE,
  notifications_push BOOLEAN DEFAULT TRUE,
  notifications_sms BOOLEAN DEFAULT FALSE,
  notifications_new_bookings BOOLEAN DEFAULT TRUE,
  notifications_messages BOOLEAN DEFAULT TRUE,
  notifications_reviews BOOLEAN DEFAULT TRUE,
  notifications_promotions BOOLEAN DEFAULT FALSE,
  notifications_reminders BOOLEAN DEFAULT TRUE,
  privacy_show_phone BOOLEAN DEFAULT FALSE,
  privacy_show_email BOOLEAN DEFAULT FALSE,
  privacy_show_last_seen BOOLEAN DEFAULT TRUE,
  privacy_allow_search_engines BOOLEAN DEFAULT TRUE,
  preferences_language TEXT DEFAULT 'fr',
  preferences_currency TEXT DEFAULT 'EUR',
  preferences_timezone TEXT DEFAULT 'Europe/Paris',
  preferences_dark_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Un utilisateur peut voir ses propres paramètres
CREATE POLICY "user_settings_select_own" ON public.user_settings 
  FOR SELECT USING (auth.uid() = id);

-- Un utilisateur peut créer ses paramètres
CREATE POLICY "user_settings_insert_own" ON public.user_settings 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Un utilisateur peut modifier ses propres paramètres
CREATE POLICY "user_settings_update_own" ON public.user_settings 
  FOR UPDATE USING (auth.uid() = id);

-- Trigger pour créer les paramètres automatiquement
CREATE OR REPLACE FUNCTION public.handle_new_user_settings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_settings (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_settings();
