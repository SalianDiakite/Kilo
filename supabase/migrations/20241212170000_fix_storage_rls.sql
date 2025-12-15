-- Create the 'Avatar' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('Avatar', 'Avatar', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on objects if not already enabled (it usually is)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view avatars (Public Access)
DROP POLICY IF EXISTS "Public Access to Avatar" ON storage.objects;
CREATE POLICY "Public Access to Avatar"
ON storage.objects FOR SELECT
USING ( bucket_id = 'Avatar' );

-- Policy: Authenticated users can upload avatars
DROP POLICY IF EXISTS "Authenticated users can upload Avatar" ON storage.objects;
CREATE POLICY "Authenticated users can upload Avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'Avatar' AND
  auth.role() = 'authenticated'
);

-- Policy: Users can update their own avatars
DROP POLICY IF EXISTS "Users can update own Avatar" ON storage.objects;
CREATE POLICY "Users can update own Avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'Avatar' AND
  auth.uid() = owner
);

-- Policy: Users can delete their own avatars
DROP POLICY IF EXISTS "Users can delete own Avatar" ON storage.objects;
CREATE POLICY "Users can delete own Avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'Avatar' AND
  auth.uid() = owner
);
