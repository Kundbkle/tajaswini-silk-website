-- Run once in Supabase SQL Editor after the main catalogue schema is installed.
-- These are OPTIONAL product metadata fields. They do not imply a discount or provenance by default.
ALTER TABLE public.sarees ADD COLUMN IF NOT EXISTS sale_price_inr numeric;
ALTER TABLE public.sarees ADD COLUMN IF NOT EXISTS is_upcoming boolean NOT NULL DEFAULT false;
ALTER TABLE public.sarees ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE public.sarees ADD COLUMN IF NOT EXISTS origin_region text;
ALTER TABLE public.sarees ADD COLUMN IF NOT EXISTS weaver_community text;
ALTER TABLE public.sarees ADD COLUMN IF NOT EXISTS occasion text;
ALTER TABLE public.sarees
  DROP CONSTRAINT IF EXISTS sarees_sale_price_valid;
ALTER TABLE public.sarees
  ADD CONSTRAINT sarees_sale_price_valid
  CHECK (sale_price_inr IS NULL OR (sale_price_inr >= 0 AND sale_price_inr < price_inr));
CREATE INDEX IF NOT EXISTS idx_sarees_upcoming ON public.sarees (is_upcoming);
-- IMPORTANT: The existing RLS admin-user policies must be deployed separately.
