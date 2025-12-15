-- =============================================
-- KILOSHARE DATABASE SCHEMA
-- Complete migration file for supabase db push
-- =============================================

-- =============================================
-- 1. PROFILES (lié à auth.users)
-- =============================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  avatar TEXT,
  bio TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  languages TEXT[] DEFAULT '{}',
  response_rate INTEGER DEFAULT 0,
  response_time TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Trigger pour créer un profil automatiquement à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction admin
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 2. CURRENCIES (Devises)
-- =============================================

CREATE TABLE IF NOT EXISTS public.currencies (
  code VARCHAR(3) PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  symbol TEXT NOT NULL,
  rate_to_eur DECIMAL(12,6) NOT NULL DEFAULT 1.0,
  decimal_places INTEGER DEFAULT 2,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "currencies_select_all" ON public.currencies FOR SELECT USING (true);
CREATE POLICY "currencies_admin_update" ON public.currencies FOR UPDATE USING (public.is_admin());
CREATE POLICY "currencies_admin_insert" ON public.currencies FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "currencies_admin_delete" ON public.currencies FOR DELETE USING (public.is_admin());

CREATE OR REPLACE FUNCTION update_currency_timestamp() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS currency_updated ON public.currencies;
CREATE TRIGGER currency_updated BEFORE UPDATE ON public.currencies FOR EACH ROW EXECUTE FUNCTION update_currency_timestamp();

INSERT INTO public.currencies (code, name, name_en, symbol, rate_to_eur, decimal_places) VALUES
  ('EUR', 'Euro', 'Euro', '€', 1.000000, 2),
  ('USD', 'Dollar américain', 'US Dollar', '$', 1.050000, 2),
  ('GBP', 'Livre sterling', 'British Pound', '£', 0.860000, 2),
  ('CHF', 'Franc suisse', 'Swiss Franc', 'CHF', 0.940000, 2),
  ('CAD', 'Dollar canadien', 'Canadian Dollar', 'C$', 1.460000, 2),
  ('XOF', 'Franc CFA BCEAO', 'CFA Franc BCEAO', 'CFA', 655.957000, 0),
  ('XAF', 'Franc CFA BEAC', 'CFA Franc BEAC', 'FCFA', 655.957000, 0),
  ('MAD', 'Dirham marocain', 'Moroccan Dirham', 'DH', 10.850000, 2),
  ('DZD', 'Dinar algérien', 'Algerian Dinar', 'DA', 145.000000, 2),
  ('TND', 'Dinar tunisien', 'Tunisian Dinar', 'DT', 3.350000, 3),
  ('GNF', 'Franc guinéen', 'Guinean Franc', 'GNF', 9200.000000, 0),
  ('MRU', 'Ouguiya', 'Mauritanian Ouguiya', 'UM', 39.500000, 2),
  ('CDF', 'Franc congolais', 'Congolese Franc', 'FC', 2750.000000, 2),
  ('EGP', 'Livre égyptienne', 'Egyptian Pound', 'E£', 52.500000, 2)
ON CONFLICT (code) DO UPDATE SET rate_to_eur = EXCLUDED.rate_to_eur, updated_at = NOW();

-- =============================================
-- 3. COUNTRIES (Pays)
-- =============================================

CREATE TABLE IF NOT EXISTS public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(2) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  flag TEXT NOT NULL,
  phone_code TEXT,
  currency_code VARCHAR(3) REFERENCES public.currencies(code),
  continent TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "countries_select_all" ON public.countries FOR SELECT USING (true);
CREATE POLICY "countries_admin_all" ON public.countries FOR ALL USING (public.is_admin());

INSERT INTO public.countries (code, name, name_en, flag, phone_code, currency_code, continent) VALUES
  ('SN', 'Sénégal', 'Senegal', '🇸🇳', '+221', 'XOF', 'Afrique'),
  ('CI', 'Côte d''Ivoire', 'Ivory Coast', '🇨🇮', '+225', 'XOF', 'Afrique'),
  ('ML', 'Mali', 'Mali', '🇲🇱', '+223', 'XOF', 'Afrique'),
  ('BF', 'Burkina Faso', 'Burkina Faso', '🇧🇫', '+226', 'XOF', 'Afrique'),
  ('GN', 'Guinée', 'Guinea', '🇬🇳', '+224', 'GNF', 'Afrique'),
  ('TG', 'Togo', 'Togo', '🇹🇬', '+228', 'XOF', 'Afrique'),
  ('BJ', 'Bénin', 'Benin', '🇧🇯', '+229', 'XOF', 'Afrique'),
  ('NE', 'Niger', 'Niger', '🇳🇪', '+227', 'XOF', 'Afrique'),
  ('MR', 'Mauritanie', 'Mauritania', '🇲🇷', '+222', 'MRU', 'Afrique'),
  ('CM', 'Cameroun', 'Cameroon', '🇨🇲', '+237', 'XAF', 'Afrique'),
  ('GA', 'Gabon', 'Gabon', '🇬🇦', '+241', 'XAF', 'Afrique'),
  ('CG', 'Congo', 'Congo', '🇨🇬', '+242', 'XAF', 'Afrique'),
  ('CD', 'RD Congo', 'DR Congo', '🇨🇩', '+243', 'CDF', 'Afrique'),
  ('MA', 'Maroc', 'Morocco', '🇲🇦', '+212', 'MAD', 'Afrique'),
  ('DZ', 'Algérie', 'Algeria', '🇩🇿', '+213', 'DZD', 'Afrique'),
  ('TN', 'Tunisie', 'Tunisia', '🇹🇳', '+216', 'TND', 'Afrique'),
  ('EG', 'Égypte', 'Egypt', '🇪🇬', '+20', 'EGP', 'Afrique'),
  ('FR', 'France', 'France', '🇫🇷', '+33', 'EUR', 'Europe'),
  ('BE', 'Belgique', 'Belgium', '🇧🇪', '+32', 'EUR', 'Europe'),
  ('CH', 'Suisse', 'Switzerland', '🇨🇭', '+41', 'CHF', 'Europe'),
  ('DE', 'Allemagne', 'Germany', '🇩🇪', '+49', 'EUR', 'Europe'),
  ('ES', 'Espagne', 'Spain', '🇪🇸', '+34', 'EUR', 'Europe'),
  ('IT', 'Italie', 'Italy', '🇮🇹', '+39', 'EUR', 'Europe'),
  ('PT', 'Portugal', 'Portugal', '🇵🇹', '+351', 'EUR', 'Europe'),
  ('GB', 'Royaume-Uni', 'United Kingdom', '🇬🇧', '+44', 'GBP', 'Europe'),
  ('NL', 'Pays-Bas', 'Netherlands', '🇳🇱', '+31', 'EUR', 'Europe'),
  ('US', 'États-Unis', 'United States', '🇺🇸', '+1', 'USD', 'Amérique'),
  ('CA', 'Canada', 'Canada', '🇨🇦', '+1', 'CAD', 'Amérique')
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- 4. REGIONS
-- =============================================

CREATE TABLE IF NOT EXISTS public.regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  code TEXT,
  name TEXT NOT NULL,
  name_en TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "regions_select_all" ON public.regions FOR SELECT USING (true);
CREATE POLICY "regions_admin_all" ON public.regions FOR ALL USING (public.is_admin());
CREATE INDEX IF NOT EXISTS idx_regions_country ON public.regions(country_id);

-- Régions France
INSERT INTO public.regions (country_id, code, name) SELECT id, 'IDF', 'Île-de-France' FROM public.countries WHERE code = 'FR';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'ARA', 'Auvergne-Rhône-Alpes' FROM public.countries WHERE code = 'FR';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'PAC', 'Provence-Alpes-Côte d''Azur' FROM public.countries WHERE code = 'FR';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'OCC', 'Occitanie' FROM public.countries WHERE code = 'FR';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'NAQ', 'Nouvelle-Aquitaine' FROM public.countries WHERE code = 'FR';

-- Régions Sénégal
INSERT INTO public.regions (country_id, code, name) SELECT id, 'DK', 'Dakar' FROM public.countries WHERE code = 'SN';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'TH', 'Thiès' FROM public.countries WHERE code = 'SN';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'SL', 'Saint-Louis' FROM public.countries WHERE code = 'SN';

-- Régions Maroc
INSERT INTO public.regions (country_id, code, name) SELECT id, 'CAS', 'Casablanca-Settat' FROM public.countries WHERE code = 'MA';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'RAB', 'Rabat-Salé-Kénitra' FROM public.countries WHERE code = 'MA';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'MAR', 'Marrakech-Safi' FROM public.countries WHERE code = 'MA';
INSERT INTO public.regions (country_id, code, name) SELECT id, 'TNG', 'Tanger-Tétouan-Al Hoceïma' FROM public.countries WHERE code = 'MA';

-- =============================================
-- 5. CITIES
-- =============================================

CREATE TABLE IF NOT EXISTS public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  region_id UUID REFERENCES public.regions(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  population INTEGER,
  is_capital BOOLEAN DEFAULT FALSE,
  is_regional_capital BOOLEAN DEFAULT FALSE,
  timezone TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cities_select_all" ON public.cities FOR SELECT USING (true);
CREATE POLICY "cities_admin_all" ON public.cities FOR ALL USING (public.is_admin());
CREATE INDEX IF NOT EXISTS idx_cities_country ON public.cities(country_id);
CREATE INDEX IF NOT EXISTS idx_cities_region ON public.cities(region_id);
CREATE INDEX IF NOT EXISTS idx_cities_name ON public.cities(name);

-- Villes France
INSERT INTO public.cities (country_id, region_id, name, is_capital, population) SELECT c.id, r.id, 'Paris', TRUE, 2161000 FROM public.countries c, public.regions r WHERE c.code = 'FR' AND r.code = 'IDF';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Lyon', TRUE, 516092 FROM public.countries c, public.regions r WHERE c.code = 'FR' AND r.code = 'ARA';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Marseille', TRUE, 870731 FROM public.countries c, public.regions r WHERE c.code = 'FR' AND r.code = 'PAC';
INSERT INTO public.cities (country_id, region_id, name,is_regional_capital, population) SELECT c.id, r.id, 'Nice', FALSE, 342669 FROM public.countries c, public.regions r WHERE c.code = 'FR' AND r.code = 'PAC';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Toulouse', TRUE, 486828 FROM public.countries c, public.regions r WHERE c.code = 'FR' AND r.code = 'OCC';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Bordeaux', TRUE, 259809 FROM public.countries c, public.regions r WHERE c.code = 'FR' AND r.code = 'NAQ';

-- Villes Sénégal
INSERT INTO public.cities (country_id, region_id, name, is_capital, population) SELECT c.id, r.id, 'Dakar', TRUE, 1146053 FROM public.countries c, public.regions r WHERE c.code = 'SN' AND r.code = 'DK';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Thiès', TRUE, 320000 FROM public.countries c, public.regions r WHERE c.code = 'SN' AND r.code = 'TH';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Saint-Louis', TRUE, 209752 FROM public.countries c, public.regions r WHERE c.code = 'SN' AND r.code = 'SL';

-- Villes Maroc
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Casablanca', TRUE, 3359818 FROM public.countries c, public.regions r WHERE c.code = 'MA' AND r.code = 'CAS';
INSERT INTO public.cities (country_id, region_id, name, is_capital, population) SELECT c.id, r.id, 'Rabat', TRUE, 577827 FROM public.countries c, public.regions r WHERE c.code = 'MA' AND r.code = 'RAB';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Marrakech', TRUE, 928850 FROM public.countries c, public.regions r WHERE c.code = 'MA' AND r.code = 'MAR';
INSERT INTO public.cities (country_id, region_id, name, is_regional_capital, population) SELECT c.id, r.id, 'Tanger', TRUE, 947952 FROM public.countries c, public.regions r WHERE c.code = 'MA' AND r.code = 'TNG';

-- Villes Côte d'Ivoire
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Abidjan', TRUE, 4707000 FROM public.countries WHERE code = 'CI';
INSERT INTO public.cities (country_id, name, is_capital,population) SELECT id, 'Yamoussoukro', FALSE, 355573 FROM public.countries WHERE code = 'CI';
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Bouaké', FALSE, 832371 FROM public.countries WHERE code = 'CI';

-- Villes Mali
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Bamako', TRUE, 2529300 FROM public.countries WHERE code = 'ML';

-- Villes Belgique
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Bruxelles', TRUE, 1222637 FROM public.countries WHERE code = 'BE';
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Anvers', FALSE, 530690 FROM public.countries WHERE code = 'BE';
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Liège', FALSE, 197885 FROM public.countries WHERE code = 'BE';

-- Villes Espagne
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Madrid', TRUE, 3223334 FROM public.countries WHERE code = 'ES';
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Barcelone', FALSE, 1620343 FROM public.countries WHERE code = 'ES';
INSERT INTO public.cities (country_id, name, is_capital, population) SELECT id, 'Valence', FALSE, 794288 FROM public.countries WHERE code = 'ES';

-- =============================================
-- 6. TRANSPORT TYPES
-- =============================================

CREATE TABLE IF NOT EXISTS public.transport_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  icon TEXT,
  description TEXT,
  max_kg_default INTEGER DEFAULT 30,
  is_international BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.transport_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "transport_types_select_all" ON public.transport_types FOR SELECT USING (true);
CREATE POLICY "transport_types_admin_all" ON public.transport_types FOR ALL USING (public.is_admin());

INSERT INTO public.transport_types (code, name, name_en, icon, description, max_kg_default, is_international, display_order) VALUES
  ('plane', 'Avion', 'Airplane', '✈️', 'Transport aérien - idéal pour les longues distances', 30, TRUE, 1),
  ('train', 'Train', 'Train', '🚄', 'Transport ferroviaire - trajets nationaux et européens', 40, TRUE, 2),
  ('bus', 'Bus', 'Bus', '🚌', 'Transport en bus - trajets régionaux et interurbains', 25, TRUE, 3),
  ('car', 'Voiture', 'Car', '🚗', 'Covoiturage - flexibilité et porte à porte', 20, TRUE, 4),
  ('boat', 'Bateau', 'Boat', '🚢', 'Transport maritime - grandes quantités possibles', 100, TRUE, 5)
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- 7. TRIPS
-- =============================================

CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  departure TEXT NOT NULL,
  departure_country TEXT NOT NULL,
  departure_city_id UUID REFERENCES public.cities(id),
  arrival TEXT NOT NULL,
  arrival_country TEXT NOT NULL,
  arrival_city_id UUID REFERENCES public.cities(id),
  departure_date TIMESTAMPTZ NOT NULL,
  available_kg DECIMAL(5,2) NOT NULL,
  total_kg DECIMAL(5,2) NOT NULL,
  price_per_kg DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  description TEXT,
  accepted_items TEXT[] DEFAULT '{}',
  rejected_items TEXT[] DEFAULT '{}',
  transport_type_id UUID REFERENCES public.transport_types(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'pending')),
  views INTEGER DEFAULT 0,
  inquiries INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trips_select_all" ON public.trips FOR SELECT USING (true);
CREATE POLICY "trips_insert_own" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "trips_update_own" ON public.trips FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "trips_delete_own" ON public.trips FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

CREATE INDEX IF NOT EXISTS idx_trips_user ON public.trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trips_status ON public.trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_departure_date ON public.trips(departure_date);
CREATE INDEX IF NOT EXISTS idx_trips_transport_type ON public.trips(transport_type_id);
CREATE INDEX IF NOT EXISTS idx_trips_departure_city ON public.trips(departure_city_id);
CREATE INDEX IF NOT EXISTS idx_trips_arrival_city ON public.trips(arrival_city_id);

-- =============================================
-- 8. BOOKINGS
-- =============================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kg_requested DECIMAL(5,2) NOT NULL,
  kg_confirmed DECIMAL(5,2),
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
  item_description TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookings_select_own" ON public.bookings FOR SELECT USING (
  auth.uid() = sender_id OR 
  auth.uid() IN (SELECT user_id FROM public.trips WHERE id = trip_id) OR
  public.is_admin()
);
CREATE POLICY "bookings_insert_own" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "bookings_update_own" ON public.bookings FOR UPDATE USING (
  auth.uid() = sender_id OR 
  auth.uid() IN (SELECT user_id FROM public.trips WHERE id = trip_id) OR
  public.is_admin()
);

CREATE INDEX IF NOT EXISTS idx_bookings_trip ON public.bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_sender ON public.bookings(sender_id);

-- =============================================
-- 9. CONVERSATIONS & MESSAGES
-- =============================================

CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'system')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_select_participant" ON public.conversations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = id AND user_id = auth.uid())
);
CREATE POLICY "participants_select_own" ON public.conversation_participants FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "messages_select_participant" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND user_id = auth.uid())
);
CREATE POLICY "messages_insert_participant" ON public.messages FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND user_id = auth.uid())
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_participants_conversation ON public.conversation_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_participants_user ON public.conversation_participants(user_id);

-- =============================================
-- 10. REVIEWS
-- =============================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewed_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_select_all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_own" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "reviews_update_own" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);
CREATE POLICY "reviews_delete_own" ON public.reviews FOR DELETE USING (auth.uid() = reviewer_id OR public.is_admin());

CREATE INDEX IF NOT EXISTS idx_reviews_reviewer ON public.reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewed ON public.reviews(reviewed_id);

-- =============================================
-- 11. NOTIFICATIONS
-- =============================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('booking', 'message', 'review', 'system', 'payment', 'reminder')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "notifications_delete_own" ON public.notifications FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(user_id, read);

-- =============================================
-- 12. USER SETTINGS
-- =============================================

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

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_select_own" ON public.user_settings FOR SELECT USING (auth.uid() = id);
CREATE POLICY "settings_insert_own" ON public.user_settings FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "settings_update_own" ON public.user_settings FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- 13. ENABLE REALTIME
-- =============================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
