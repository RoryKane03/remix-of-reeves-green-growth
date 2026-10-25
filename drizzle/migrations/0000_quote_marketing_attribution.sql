ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS marketing_attribution jsonb;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS tracking_consent jsonb;
COMMENT ON COLUMN public.quotes.marketing_attribution IS 'Consent-permitted landing attribution; click identifiers are not proof of campaign attribution.';
COMMENT ON COLUMN public.quotes.tracking_consent IS 'Event-time advertising choice, region and reference to versioned visitor consent evidence; no customer matching or uploads.';