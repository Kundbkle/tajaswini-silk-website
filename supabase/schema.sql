-- ==============================================================================
-- TEJASWINI SILK - SUPABASE DATABASE & STORAGE INITIALIZATION SCRIPT
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Enable UUID Extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the 'sarees' Table
CREATE TABLE IF NOT EXISTS public.sarees (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  marathi_name TEXT,
  category TEXT NOT NULL,
  fabric TEXT NOT NULL DEFAULT 'Pure Silk',
  price_inr NUMERIC NOT NULL CHECK (price_inr >= 0),
  length TEXT NOT NULL DEFAULT '6.3 m (with blouse piece)',
  colour TEXT NOT NULL,
  description TEXT NOT NULL,
  blouse_details TEXT,
  care_instructions TEXT,
  is_new_arrival BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Indexes for High Performance Queries & Filtering
CREATE INDEX IF NOT EXISTS idx_sarees_category ON public.sarees (category);
CREATE INDEX IF NOT EXISTS idx_sarees_fabric ON public.sarees (fabric);
CREATE INDEX IF NOT EXISTS idx_sarees_price ON public.sarees (price_inr);
CREATE INDEX IF NOT EXISTS idx_sarees_is_new_arrival ON public.sarees (is_new_arrival);
CREATE INDEX IF NOT EXISTS idx_sarees_in_stock ON public.sarees (in_stock);
CREATE INDEX IF NOT EXISTS idx_sarees_created_at ON public.sarees (created_at DESC);

-- 4. Enable Row Level Security (RLS) on 'sarees'
ALTER TABLE public.sarees ENABLE ROW LEVEL SECURITY;

-- 5. Define Table RLS Policies
-- Policy: Public can view all sarees
DROP POLICY IF EXISTS "Public can view all sarees" ON public.sarees;
CREATE POLICY "Public can view all sarees" 
ON public.sarees 
FOR SELECT 
TO public 
USING (true);

-- Policy: Authenticated owner can insert sarees
DROP POLICY IF EXISTS "Authenticated users can insert sarees" ON public.sarees;
CREATE POLICY "Authenticated users can insert sarees" 
ON public.sarees 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Policy: Authenticated owner can update sarees
DROP POLICY IF EXISTS "Authenticated users can update sarees" ON public.sarees;
CREATE POLICY "Authenticated users can update sarees" 
ON public.sarees 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Policy: Authenticated owner can delete sarees
DROP POLICY IF EXISTS "Authenticated users can delete sarees" ON public.sarees;
CREATE POLICY "Authenticated users can delete sarees" 
ON public.sarees 
FOR DELETE 
TO authenticated 
USING (true);

-- 6. Setup Supabase Storage Bucket 'saree-images'
-- Note: 'storage.buckets' table is provided natively by Supabase
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'saree-images', 
  'saree-images', 
  true, 
  10485760, -- 10 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

-- 7. Define Storage Bucket Policies in 'storage.objects'
-- Public read access for anyone to see the saree images
DROP POLICY IF EXISTS "Public can view saree images" ON storage.objects;
CREATE POLICY "Public can view saree images"
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'saree-images');

-- Only authenticated owner can upload photos
DROP POLICY IF EXISTS "Authenticated users can upload saree images" ON storage.objects;
CREATE POLICY "Authenticated users can upload saree images"
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'saree-images');

-- Only authenticated owner can update photos
DROP POLICY IF EXISTS "Authenticated users can update saree images" ON storage.objects;
CREATE POLICY "Authenticated users can update saree images"
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'saree-images');

-- Only authenticated owner can delete photos
DROP POLICY IF EXISTS "Authenticated users can delete saree images" ON storage.objects;
CREATE POLICY "Authenticated users can delete saree images"
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'saree-images');

-- 8. Seed Sample Starter Data (Optional)
INSERT INTO public.sarees (
  name, 
  marathi_name, 
  category, 
  fabric, 
  price_inr, 
  length, 
  colour, 
  description, 
  blouse_details, 
  care_instructions, 
  is_new_arrival, 
  is_featured, 
  in_stock, 
  images
) VALUES (
  'Rani Pink Maharani Mor-Bangadi Paithani',
  'राणी गुलाबी मोर-बांगडी पैठणी',
  'Paithani Pure Silk',
  'Pure Silk',
  48500,
  '6.3 m (with blouse piece)',
  'Rani Pink (गुलाबी)',
  'Signature bridal Paithani handwoven with traditional peacock in bangle (Mor-Bangadi) motifs on the grand zari pallu. Ideal for Maharashtrian weddings.',
  '85 cm unstitched pure silk blouse piece with matching zari border included.',
  'Strictly dry clean only. Store wrapped in pure unbleached cotton muslin cloth.',
  true,
  true,
  true,
  ARRAY['/images/saree_rani_pink_peacock_1793599014522.jpg', '/images/hero_paithani_bridal_1793599014021.jpg']
), (
  'Emerald Green Royal Peshwai Asawali Paithani',
  'हिरवी पेशवाई असावली पैठणी',
  'Paithani Pure Silk',
  'Pure Silk',
  54000,
  '6.3 m (with blouse piece)',
  'Emerald Green (हिरवा)',
  'Regal forest emerald green pure silk with historic Peshwai Asawali flowering vine borders and twin peacock medallions.',
  '90 cm contrast zari brocade blouse piece included.',
  'Dry clean only. Refold along pleats every few months.',
  true,
  true,
  true,
  ARRAY['/images/saree_emerald_mor_pallu_1793599015334.jpg']
) ON CONFLICT DO NOTHING;
