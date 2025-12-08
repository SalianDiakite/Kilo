-- Table trips (trajets)
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  departure TEXT NOT NULL,
  departure_country TEXT NOT NULL,
  arrival TEXT NOT NULL,
  arrival_country TEXT NOT NULL,
  departure_date TIMESTAMPTZ NOT NULL,
  available_kg DECIMAL(5,2) NOT NULL,
  total_kg DECIMAL(5,2) NOT NULL,
  price_per_kg DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT '€',
  description TEXT,
  accepted_items TEXT[] DEFAULT '{}',
  rejected_items TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'pending')),
  views INTEGER DEFAULT 0,
  inquiries INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "trips_select_all" ON public.trips 
  FOR SELECT USING (true);

CREATE POLICY "trips_insert_own" ON public.trips 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "trips_update_own" ON public.trips 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "trips_delete_own" ON public.trips 
  FOR DELETE USING (auth.uid() = user_id);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_trips_departure ON public.trips(departure);
CREATE INDEX IF NOT EXISTS idx_trips_arrival ON public.trips(arrival);
CREATE INDEX IF NOT EXISTS idx_trips_departure_date ON public.trips(departure_date);
CREATE INDEX IF NOT EXISTS idx_trips_status ON public.trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON public.trips(user_id);
