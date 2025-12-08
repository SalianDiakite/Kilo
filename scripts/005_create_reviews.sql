-- Table reviews (avis)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewed_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les avis
CREATE POLICY "reviews_select_all" ON public.reviews 
  FOR SELECT USING (true);

-- Un utilisateur peut créer un avis
CREATE POLICY "reviews_insert_own" ON public.reviews 
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Un utilisateur peut modifier son propre avis
CREATE POLICY "reviews_update_own" ON public.reviews 
  FOR UPDATE USING (auth.uid() = reviewer_id);

-- Un utilisateur peut supprimer son propre avis
CREATE POLICY "reviews_delete_own" ON public.reviews 
  FOR DELETE USING (auth.uid() = reviewer_id);

-- Index
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON public.reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewed_id ON public.reviews(reviewed_id);
CREATE INDEX IF NOT EXISTS idx_reviews_trip_id ON public.reviews(trip_id);
