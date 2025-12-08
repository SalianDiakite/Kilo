-- Table bookings (réservations)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kg_requested DECIMAL(5,2) NOT NULL,
  kg_confirmed DECIMAL(5,2),
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
  item_description TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- L'expéditeur peut voir ses propres réservations
CREATE POLICY "bookings_select_sender" ON public.bookings 
  FOR SELECT USING (auth.uid() = sender_id);

-- Le propriétaire du trajet peut voir les réservations de son trajet
CREATE POLICY "bookings_select_trip_owner" ON public.bookings 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE trips.id = bookings.trip_id 
      AND trips.user_id = auth.uid()
    )
  );

-- L'expéditeur peut créer une réservation
CREATE POLICY "bookings_insert_sender" ON public.bookings 
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- L'expéditeur peut annuler sa réservation
CREATE POLICY "bookings_update_sender" ON public.bookings 
  FOR UPDATE USING (auth.uid() = sender_id);

-- Le propriétaire du trajet peut mettre à jour le statut
CREATE POLICY "bookings_update_trip_owner" ON public.bookings 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE trips.id = bookings.trip_id 
      AND trips.user_id = auth.uid()
    )
  );

-- Index
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON public.bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_sender_id ON public.bookings(sender_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
